import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const CompleteInput = z.object({
  subject_slug: z.string().min(1).max(60).regex(/^[a-z0-9-]+$/),
  video_id: z.string().min(1).max(100).regex(/^[a-zA-Z0-9_-]+$/),
});

export const completeLesson = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => CompleteInput.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase } = context;
    const { data: res, error } = await supabase.rpc("complete_lesson", {
      _subject_slug: data.subject_slug,
      _video_id: data.video_id,
    });
    if (error) throw new Error(error.message);
    return res as {
      already: boolean;
      xp: number;
      level: number;
      streak_days: number;
      longest_streak: number;
    };
  });

export const getProgress = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const [{ data: profile }, { data: completions }] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
      supabase
        .from("lesson_completions")
        .select("subject_slug, video_id, completed_at")
        .eq("user_id", userId)
        .order("completed_at", { ascending: false }),
    ]);
    return {
      profile,
      completions: completions ?? [],
    };
  });