
-- Trigger-only functions: revoke all execute access
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

-- complete_lesson: only authenticated users should call it
REVOKE ALL ON FUNCTION public.complete_lesson(text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.complete_lesson(text, text) TO authenticated;

-- has_role: used in RLS policies; keep callable by authenticated, revoke from anon/public
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
