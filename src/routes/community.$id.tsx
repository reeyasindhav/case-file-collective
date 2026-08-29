import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PublicShell, SectionHeading } from "@/components/site-chrome";
import { discussions, getCase } from "@/lib/data";
import { useState } from "react";

export const Route = createFileRoute("/community/$id")({
  head: ({ params }) => {
    const discussion = discussions.find((d) => d.id === params.id);
    return {
      meta: [
        { title: discussion ? `${discussion.title} — Casebook` : "Thread — Casebook" },
        {
          name: "description",
          content: discussion ? discussion.body : "Community discussion thread.",
        },
      ],
    };
  },
  component: DiscussionThread,
});

function DiscussionThread() {
  const { id } = useParams({ from: "/community/$id" });
  const discussion = discussions.find((d) => d.id === id);
  const [reply, setReply] = useState("");

  if (!discussion) {
    return (
      <PublicShell>
        <div className="mx-auto max-w-7xl px-5 py-20">
          <p className="text-muted-foreground">Thread not found.</p>
          <Link to="/community" className="mt-4 inline-flex items-center gap-2 text-ember hover:underline">
            <ArrowLeft className="size-4" /> Back to community
          </Link>
        </div>
      </PublicShell>
    );
  }

  const relatedCase = getCase(discussion.caseSlug);

  const mockReplies = [
    { author: "Casebook Team", initials: "CB", body: "Thanks for flagging this — we've added the source requirement to the wiki.", time: "12h ago" },
    { author: "Mira K.", initials: "MK", body: "I ran the same analysis last month and got the same result. The second voice is real.", time: "8h ago" },
    { author: "Alex R.", initials: "AR", body: "If the tower log is UTC, that puts the ping at 22:07 local. Entirely different window.", time: "2h ago" },
  ];

  return (
    <PublicShell>
      <section className="mx-auto max-w-7xl px-5 py-16">
        <Link
          to="/community"
          className="mb-6 inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.18em] uppercase text-muted-foreground hover:text-ember"
        >
          <ArrowLeft className="size-4" /> Community
        </Link>

        <div className="animate-rise">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded border border-border bg-muted px-3 py-1 font-mono text-[0.65rem] tracking-[0.18em] uppercase text-muted-foreground">
              {discussion.tag}
            </span>
            <span className="font-mono text-[0.65rem] tracking-widest text-muted-foreground">
              {discussion.caseId}
            </span>
          </div>
          <h1 className="mt-6 text-4xl leading-tight text-foreground md:text-5xl">{discussion.title}</h1>
          <div className="mt-4 flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded bg-ember/15 font-mono text-[0.65rem] text-ember">
              {discussion.initials}
            </span>
            <div>
              <p className="text-sm text-foreground">{discussion.author}</p>
              <p className="font-mono text-[0.6rem] tracking-widest text-muted-foreground">
                {discussion.lastActive}
              </p>
            </div>
          </div>
          <p className="mt-6 text-muted-foreground">{discussion.body}</p>

          {relatedCase && (
            <Link
              to="/cases/$slug"
              params={{ slug: relatedCase.slug }}
              className="mt-6 inline-flex items-center gap-2 text-ember hover:underline"
            >
              View related case file ↗
            </Link>
          )}
        </div>

        <div className="mt-12 border-t border-border/60 pt-8">
          <SectionHeading index="01" title={`${discussion.replies} replies`} />

          <div className="mt-8 space-y-6">
            {mockReplies.map((r, i) => (
              <div
                key={i}
                className="animate-rise rounded border border-border bg-surface p-6"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex size-7 items-center justify-center rounded bg-ember/15 font-mono text-[0.65rem] text-ember">
                      {r.initials}
                    </span>
                    <span className="text-sm text-foreground">{r.author}</span>
                  </div>
                  <span className="font-mono text-[0.6rem] tracking-widest text-muted-foreground">{r.time}</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{r.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded border border-border bg-surface p-6">
            <h3 className="font-mono text-[0.7rem] tracking-[0.18em] uppercase text-muted-foreground">
              Add to the thread
            </h3>
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Share a source, a theory, or a question..."
              className="mt-4 w-full rounded border border-border bg-background p-4 text-sm text-foreground placeholder-muted-foreground focus:border-ember focus:outline-none"
              rows={4}
            />
            <div className="mt-4 flex justify-end">
              <button
                disabled={!reply.trim()}
                className="rounded bg-ember px-6 py-2.5 font-mono text-[0.7rem] tracking-[0.18em] uppercase text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-50"
              >
                Post reply
              </button>
            </div>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
