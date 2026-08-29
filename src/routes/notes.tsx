import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, FileText, Plus, Trash2 } from "lucide-react";
import { AuthedShell, SectionHeading } from "@/components/site-chrome";
import { useAuth } from "@/lib/auth";
import { notes as allNotes, cases } from "@/lib/data";
import { useState } from "react";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Private notes — Casebook" },
      {
        name: "description",
        content: "Your private research notes, organised by case.",
      },
    ],
  }),
  component: NotesPage,
});

function NotesPage() {
  const { user } = useAuth();
  const [selectedCase, setSelectedCase] = useState<string>("all");
  const [showForm, setShowForm] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [noteCase, setNoteCase] = useState(cases[0]?.id ?? "");
  const [notes, setNotes] = useState(allNotes);

  const filtered = selectedCase === "all"
    ? notes
    : notes.filter((n) => n.caseId === selectedCase);

  const handleCreate = () => {
    if (!noteTitle.trim() || !noteBody.trim()) return;
    const newNote = {
      id: `n${Date.now()}`,
      title: noteTitle.trim(),
      body: noteBody.trim(),
      caseId: noteCase,
      updated: "Just now",
    };
    setNotes([newNote, ...notes]);
    setNoteTitle("");
    setNoteBody("");
    setShowForm(false);
  };

  return (
    <AuthedShell>
      <section className="mx-auto max-w-6xl px-5 py-10 md:px-10 md:py-12">
        <Link to="/dashboard" className="mb-6 inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.18em] uppercase text-muted-foreground hover:text-ember">
          <ArrowLeft className="size-4" /> Workspace
        </Link>

        <div className="animate-rise flex flex-wrap items-center justify-between gap-4">
          <div>
            <SectionHeading index="03" title="Private notes" />
            <p className="mt-2 text-sm text-muted-foreground">
              Research notes only <span className="text-ember">{user?.name}</span> can see
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={selectedCase}
              onChange={(e) => setSelectedCase(e.target.value)}
              className="rounded border border-border bg-surface px-3 py-2 font-mono text-[0.7rem] tracking-[0.12em] uppercase text-foreground focus:border-ember focus:outline-none"
            >
              <option value="all">All cases</option>
              {cases.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.id} — {c.title}
                </option>
              ))}
            </select>
            <button
              onClick={() => setShowForm((v) => !v)}
              className="flex items-center gap-2 rounded border border-border bg-surface px-4 py-2 font-mono text-[0.7rem] tracking-[0.14em] uppercase text-muted-foreground hover:border-ember"
            >
              <Plus className="size-4" />
              New note
            </button>
          </div>
        </div>

        {showForm && (
          <div className="animate-rise mt-6 rounded border border-border bg-surface p-6">
            <h3 className="font-mono text-[0.7rem] tracking-[0.18em] uppercase text-ember">New note</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <label className="block font-mono text-[0.65rem] tracking-[0.14em] uppercase text-muted-foreground">Case</label>
                <select
                  value={noteCase}
                  onChange={(e) => setNoteCase(e.target.value)}
                  className="mt-2 w-full rounded border border-border bg-background px-3 py-3 font-mono text-[0.7rem] tracking-[0.12em] uppercase text-foreground focus:border-ember focus:outline-none"
                >
                  {cases.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.id} — {c.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-mono text-[0.65rem] tracking-[0.14em] uppercase text-muted-foreground">Title</label>
                <input
                  type="text"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  className="mt-2 w-full rounded border border-border bg-background px-3 py-3 font-mono text-[0.7rem] tracking-[0.12em] text-foreground focus:border-ember focus:outline-none"
                  placeholder="Note title"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block font-mono text-[0.65rem] tracking-[0.14em] uppercase text-muted-foreground">Note</label>
              <textarea
                value={noteBody}
                onChange={(e) => setNoteBody(e.target.value)}
                rows={4}
                className="mt-2 w-full rounded border border-border bg-background px-3 py-3 font-mono text-[0.7rem] tracking-[0.12em] text-foreground focus:border-ember focus:outline-none"
                placeholder="Write your research note..."
              />
            </div>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="rounded border border-border px-4 py-2 font-mono text-[0.7rem] tracking-[0.14em] uppercase text-muted-foreground hover:border-ember"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!noteTitle.trim() || !noteBody.trim()}
                className="rounded bg-ember px-6 py-2 font-mono text-[0.7rem] tracking-[0.14em] uppercase text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-50"
              >
                Save note
              </button>
            </div>
          </div>
        )}

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((n, i) => (
            <div
              key={n.id}
              className="animate-rise dossier-card group rounded p-6"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-ember">
                  {n.caseId}
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[0.6rem] tracking-widest text-muted-foreground">
                    {n.updated}
                  </span>
                  <button
                    onClick={() => setNotes(notes.filter((x) => x.id !== n.id))}
                    className="rounded p-1.5 text-muted-foreground hover:text-ember transition-colors"
                    aria-label="Delete note"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
              <h3 className="mt-3 text-lg text-foreground transition-colors group-hover:text-brass">{n.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{n.body}</p>
              <Link
                to="/cases/$slug"
                params={{ slug: cases.find((c) => c.id === n.caseId)?.slug ?? "" }}
                className="mt-4 inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.14em] uppercase text-ember hover:underline"
              >
                Open case file ↗
              </Link>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="animate-rise mt-10 rounded border border-border bg-surface p-12 text-center">
            <FileText className="mx-auto size-8 text-muted-foreground" />
            <p className="mt-4 text-sm text-muted-foreground">No notes yet. Create your first note above.</p>
          </div>
        )}
      </section>
    </AuthedShell>
  );
}
