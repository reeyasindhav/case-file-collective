import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface CasebookUser {
  name: string;
  email: string;
  handle: string;
  role: string;
}

interface AuthValue {
  user: CasebookUser | null;
  ready: boolean;
  signIn: (email: string, name?: string) => void;
  signOut: () => void;
  saved: string[];
  toggleSaved: (slug: string) => void;
}

const STORAGE_KEY = "casebook.session";
const SAVED_KEY = "casebook.saved";

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CasebookUser | null>(null);
  const [ready, setReady] = useState(false);
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw) as CasebookUser);
      const rawSaved = localStorage.getItem(SAVED_KEY);
      setSaved(rawSaved ? (JSON.parse(rawSaved) as string[]) : ["the-vanishing-at-blackwater"]);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const signIn = useCallback((email: string, name?: string) => {
    const handle = email.split("@")[0] || "researcher";
    const next: CasebookUser = {
      email,
      name: name?.trim() || "Jordan Miller",
      handle,
      role: "Researcher",
    };
    setUser(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const toggleSaved = useCallback((slug: string) => {
    setSaved((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
      localStorage.setItem(SAVED_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ user, ready, signIn, signOut, saved, toggleSaved }),
    [user, ready, signIn, signOut, saved, toggleSaved],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

export function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
