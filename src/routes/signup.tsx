import { useState } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { AuthShell } from "@/components/site-chrome";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Join the index — Casebook" },
      {
        name: "description",
        content: "Create a researcher account and join the collective.",
      },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn(email, name || "Researcher");
    navigate({ to: "/dashboard" });
  };

  return (
    <AuthShell title="Join the index" subtitle="Create a researcher account">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="animate-rise" style={{ animationDelay: "100ms" }}>
          <label className="block font-mono text-[0.7rem] tracking-[0.18em] uppercase text-muted-foreground">
            Display name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-2 w-full rounded border border-border bg-background px-4 py-3 text-sm text-foreground placeholder-muted-foreground transition-colors focus:border-ember focus:outline-none"
            placeholder="Alex R."
          />
        </div>
        <div className="animate-rise" style={{ animationDelay: "180ms" }}>
          <label className="block font-mono text-[0.7rem] tracking-[0.18em] uppercase text-muted-foreground">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-2 w-full rounded border border-border bg-background px-4 py-3 text-sm text-foreground placeholder-muted-foreground transition-colors focus:border-ember focus:outline-none"
            placeholder="researcher@casebook.io"
          />
        </div>
        <div className="animate-rise" style={{ animationDelay: "260ms" }}>
          <label className="block font-mono text-[0.7rem] tracking-[0.18em] uppercase text-muted-foreground">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-2 w-full rounded border border-border bg-background px-4 py-3 text-sm text-foreground placeholder-muted-foreground transition-colors focus:border-ember focus:outline-none"
            placeholder="••••••••"
          />
        </div>
        <div className="animate-rise" style={{ animationDelay: "340ms" }}>
          <button
            type="submit"
            className="w-full rounded bg-ember px-6 py-3 font-mono text-xs tracking-[0.2em] uppercase text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Create account
          </button>
        </div>
      </form>

      <p className="animate-rise mt-6 text-center text-sm text-muted-foreground" style={{ animationDelay: "420ms" }}>
        Already have an account?{" "}
        <Link to="/login" className="text-ember hover:underline">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
