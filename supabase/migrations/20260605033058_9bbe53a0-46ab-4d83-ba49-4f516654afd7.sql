
CREATE TABLE public.lesson_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject_slug text NOT NULL,
  video_id text NOT NULL,
  completed_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, subject_slug, video_id)
);

GRANT SELECT, INSERT ON public.lesson_completions TO authenticated;
GRANT ALL ON public.lesson_completions TO service_role;

ALTER TABLE public.lesson_completions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users view own completions" ON public.lesson_completions
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "users insert own completions" ON public.lesson_completions
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE INDEX lesson_completions_user_subject_idx
  ON public.lesson_completions (user_id, subject_slug);

-- Atomic complete lesson: inserts (idempotent) and updates profile XP + streak
CREATE OR REPLACE FUNCTION public.complete_lesson(
  _subject_slug text,
  _video_id text
) RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _inserted boolean := false;
  _today date := (now() AT TIME ZONE 'America/Sao_Paulo')::date;
  _last date;
  _new_streak int;
  _new_longest int;
  _new_xp int;
  _new_level int;
BEGIN
  IF _uid IS NULL THEN
    RAISE EXCEPTION 'unauthenticated';
  END IF;

  INSERT INTO public.lesson_completions (user_id, subject_slug, video_id)
  VALUES (_uid, _subject_slug, _video_id)
  ON CONFLICT DO NOTHING
  RETURNING true INTO _inserted;

  IF _inserted IS NULL THEN
    -- already completed: return current state, no XP change
    SELECT xp, streak_days, longest_streak INTO _new_xp, _new_streak, _new_longest
    FROM public.profiles WHERE id = _uid;
    RETURN jsonb_build_object(
      'already', true, 'xp', _new_xp,
      'level', GREATEST(1, (_new_xp / 100) + 1),
      'streak_days', _new_streak, 'longest_streak', _new_longest
    );
  END IF;

  SELECT last_study_date, streak_days, longest_streak, xp
  INTO _last, _new_streak, _new_longest, _new_xp
  FROM public.profiles WHERE id = _uid FOR UPDATE;

  IF _last IS NULL OR _today - _last > 1 THEN
    _new_streak := 1;
  ELSIF _today - _last = 1 THEN
    _new_streak := COALESCE(_new_streak, 0) + 1;
  END IF;
  -- if _today = _last, keep streak

  _new_longest := GREATEST(COALESCE(_new_longest, 0), _new_streak);
  _new_xp := COALESCE(_new_xp, 0) + 10;
  _new_level := GREATEST(1, (_new_xp / 100) + 1);

  UPDATE public.profiles
  SET xp = _new_xp,
      streak_days = _new_streak,
      longest_streak = _new_longest,
      last_study_date = _today,
      updated_at = now()
  WHERE id = _uid;

  RETURN jsonb_build_object(
    'already', false, 'xp', _new_xp, 'level', _new_level,
    'streak_days', _new_streak, 'longest_streak', _new_longest
  );
END; $$;

GRANT EXECUTE ON FUNCTION public.complete_lesson(text, text) TO authenticated;

-- Zera progresso de qualquer usuário existente para começar do zero
UPDATE public.profiles SET xp = 0, streak_days = 0, longest_streak = 0, last_study_date = NULL;
