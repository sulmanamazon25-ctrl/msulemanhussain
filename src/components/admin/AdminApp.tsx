"use client";

import { useCallback, useEffect, useState } from "react";
import { formatEur } from "@/lib/shop/utils";

type Tab = "digital" | "sessions" | "orders";

type Digital = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  priceCents: number;
  status: "draft" | "live";
  tags: string;
  seoTitle: string | null;
  seoDescription: string | null;
  fileName: string | null;
  coverImagePath: string | null;
};

type SessionPkg = {
  id: string;
  slug: string;
  name: string;
  blurb: string;
  durationMinutes: number;
  topicLabel: string;
  priceCents: number;
  status: "draft" | "live";
  sortOrder: number;
};

type Order = {
  id: string;
  kind: "digital" | "session";
  status: string;
  buyerEmail: string;
  buyerName: string | null;
  topic: string | null;
  amountCents: number;
  currency: string;
  preferredTimes: string | null;
  productSnapshot: string;
  createdAt: string;
  paidAt: string | null;
};

export function AdminApp({ initiallyAuthed }: { initiallyAuthed: boolean }) {
  const [authed, setAuthed] = useState(initiallyAuthed);
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<Tab>("digital");
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Digital[]>([]);
  const [packages, setPackages] = useState<SessionPkg[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    if (!authed) return;
    setError(null);
    try {
      if (tab === "digital") {
        const res = await fetch("/api/admin/digital");
        if (!res.ok) throw new Error("Failed to load products");
        const data = await res.json();
        setProducts(data.products);
      } else if (tab === "sessions") {
        const res = await fetch("/api/admin/sessions");
        if (!res.ok) throw new Error("Failed to load packages");
        const data = await res.json();
        setPackages(data.packages);
      } else {
        const res = await fetch("/api/admin/orders");
        if (!res.ok) throw new Error("Failed to load orders");
        const data = await res.json();
        setOrders(data.orders);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Load failed");
    }
  }, [authed, tab]);

  useEffect(() => {
    void load();
  }, [load]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) throw new Error("Invalid password");
      setAuthed(true);
      setPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    setAuthed(false);
  }

  if (!authed) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-16 text-bone">
        <p className="font-mono text-[11px] tracking-[0.28em] text-phosphor">ADMIN</p>
        <h1 className="mt-3 font-display text-3xl font-bold">Shop admin</h1>
        <form onSubmit={login} className="mt-8 space-y-4">
          <label className="block text-sm text-bone-dim">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full border border-white/15 bg-ink-3 px-3 py-2 text-bone outline-none focus:border-phosphor"
              autoComplete="current-password"
              required
            />
          </label>
          {error ? <p className="text-sm text-ember">{error}</p> : null}
          <button
            type="submit"
            disabled={busy}
            className="w-full border border-phosphor bg-phosphor/10 px-4 py-3 text-sm font-semibold tracking-[0.14em] text-phosphor hover:bg-phosphor/20 disabled:opacity-50"
          >
            {busy ? "…" : "Sign in"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-10 text-bone md:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] tracking-[0.28em] text-phosphor">ADMIN</p>
          <h1 className="mt-2 font-display text-3xl font-bold">Shop admin</h1>
        </div>
        <button
          type="button"
          onClick={() => void logout()}
          className="border border-white/20 px-3 py-2 text-xs tracking-[0.16em] text-bone-dim hover:border-phosphor hover:text-phosphor"
        >
          Sign out
        </button>
      </div>

      <div className="mt-8 flex flex-wrap gap-2 border-b border-white/10 pb-3">
        {(
          [
            ["digital", "Digital products"],
            ["sessions", "Sessions"],
            ["orders", "Orders"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={
              tab === id
                ? "border border-phosphor px-3 py-2 text-xs tracking-[0.14em] text-phosphor"
                : "border border-transparent px-3 py-2 text-xs tracking-[0.14em] text-bone-dim hover:text-bone"
            }
          >
            {label}
          </button>
        ))}
      </div>

      {error ? <p className="mt-4 text-sm text-ember">{error}</p> : null}

      {tab === "digital" ? (
        <DigitalTab products={products} onChanged={() => void load()} setError={setError} />
      ) : null}
      {tab === "sessions" ? (
        <SessionsTab packages={packages} onChanged={() => void load()} setError={setError} />
      ) : null}
      {tab === "orders" ? <OrdersTab orders={orders} onChanged={() => void load()} setError={setError} /> : null}
    </main>
  );
}

function DigitalTab({
  products,
  onChanged,
  setError,
}: {
  products: Digital[];
  onChanged: () => void;
  setError: (v: string | null) => void;
}) {
  const [busy, setBusy] = useState(false);

  async function create(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const form = new FormData(e.currentTarget);
      const res = await fetch("/api/admin/digital", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Create failed");
      e.currentTarget.reset();
      onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Create failed");
    } finally {
      setBusy(false);
    }
  }

  async function setStatus(id: string, status: "draft" | "live") {
    const form = new FormData();
    form.set("status", status);
    const res = await fetch(`/api/admin/digital/${id}`, { method: "PATCH", body: form });
    if (!res.ok) setError("Status update failed");
    else onChanged();
  }

  async function remove(id: string) {
    if (!confirm("Delete this product?")) return;
    const res = await fetch(`/api/admin/digital/${id}`, { method: "DELETE" });
    if (!res.ok) setError("Delete failed");
    else onChanged();
  }

  return (
    <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
      <form onSubmit={create} className="space-y-3 border border-white/10 bg-ink-2/60 p-5">
        <h2 className="font-display text-xl font-semibold">New digital product</h2>
        <Field name="title" label="Title" required />
        <Field name="slug" label="Slug (optional)" />
        <Field name="priceEuros" label="Price (EUR)" type="number" step="0.01" required />
        <Field name="shortDescription" label="Short description" />
        <label className="block text-sm text-bone-dim">
          Long description
          <textarea
            name="longDescription"
            rows={5}
            className="mt-2 w-full border border-white/15 bg-ink-3 px-3 py-2 text-bone outline-none focus:border-phosphor"
          />
        </label>
        <Field name="tags" label="Tags (comma-separated)" />
        <Field name="seoTitle" label="SEO title" />
        <label className="block text-sm text-bone-dim">
          SEO description
          <textarea
            name="seoDescription"
            rows={2}
            className="mt-2 w-full border border-white/15 bg-ink-3 px-3 py-2 text-bone outline-none focus:border-phosphor"
          />
        </label>
        <label className="block text-sm text-bone-dim">
          Status
          <select
            name="status"
            defaultValue="draft"
            className="mt-2 w-full border border-white/15 bg-ink-3 px-3 py-2 text-bone outline-none focus:border-phosphor"
          >
            <option value="draft">draft</option>
            <option value="live">live</option>
          </select>
        </label>
        <label className="block text-sm text-bone-dim">
          Cover image
          <input name="cover" type="file" accept="image/*" className="mt-2 block w-full text-sm" />
        </label>
        <label className="block text-sm text-bone-dim">
          Digital file
          <input name="file" type="file" className="mt-2 block w-full text-sm" />
        </label>
        <button
          type="submit"
          disabled={busy}
          className="border border-phosphor bg-phosphor/10 px-4 py-2 text-sm font-semibold tracking-[0.12em] text-phosphor disabled:opacity-50"
        >
          {busy ? "Saving…" : "Create listing"}
        </button>
      </form>

      <div className="space-y-4">
        <h2 className="font-display text-xl font-semibold">Listings ({products.length})</h2>
        {products.length === 0 ? <p className="text-sm text-bone-dim">No products yet.</p> : null}
        {products.map((p) => (
          <div key={p.id} className="border border-white/10 bg-ink-2/40 p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{p.title}</p>
                <p className="text-xs text-bone-faint">
                  /shop/{p.slug} · {formatEur(p.priceCents)} · {p.status}
                  {p.fileName ? ` · ${p.fileName}` : " · no file"}
                </p>
                <p className="mt-2 text-sm text-bone-dim">{p.shortDescription}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => void setStatus(p.id, p.status === "live" ? "draft" : "live")}
                  className="border border-white/20 px-2 py-1 text-[11px] tracking-[0.12em] text-bone-dim hover:border-phosphor"
                >
                  {p.status === "live" ? "Unpublish" : "Publish"}
                </button>
                <button
                  type="button"
                  onClick={() => void remove(p.id)}
                  className="border border-ember/40 px-2 py-1 text-[11px] tracking-[0.12em] text-ember"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SessionsTab({
  packages,
  onChanged,
  setError,
}: {
  packages: SessionPkg[];
  onChanged: () => void;
  setError: (v: string | null) => void;
}) {
  const [busy, setBusy] = useState(false);

  async function create(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/admin/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          slug: fd.get("slug"),
          blurb: fd.get("blurb"),
          durationMinutes: Number(fd.get("durationMinutes")),
          topicLabel: fd.get("topicLabel"),
          priceEuros: Number(fd.get("priceEuros")),
          sortOrder: Number(fd.get("sortOrder") || 0),
          status: fd.get("status"),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Create failed");
      e.currentTarget.reset();
      onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Create failed");
    } finally {
      setBusy(false);
    }
  }

  async function setStatus(id: string, status: "draft" | "live") {
    const res = await fetch(`/api/admin/sessions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) setError("Status update failed");
    else onChanged();
  }

  async function remove(id: string) {
    if (!confirm("Delete this package?")) return;
    const res = await fetch(`/api/admin/sessions/${id}`, { method: "DELETE" });
    if (!res.ok) setError("Delete failed");
    else onChanged();
  }

  return (
    <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
      <form onSubmit={create} className="space-y-3 border border-white/10 bg-ink-2/60 p-5">
        <h2 className="font-display text-xl font-semibold">New session package</h2>
        <Field name="name" label="Name" required />
        <Field name="slug" label="Slug (optional)" />
        <Field name="durationMinutes" label="Duration (minutes)" type="number" required />
        <Field name="priceEuros" label="Price (EUR)" type="number" step="0.01" required />
        <Field name="topicLabel" label="Default topic label" defaultValue="Personal Assistance" />
        <Field name="sortOrder" label="Sort order" type="number" defaultValue="0" />
        <label className="block text-sm text-bone-dim">
          Blurb
          <textarea
            name="blurb"
            rows={3}
            className="mt-2 w-full border border-white/15 bg-ink-3 px-3 py-2 text-bone outline-none focus:border-phosphor"
          />
        </label>
        <label className="block text-sm text-bone-dim">
          Status
          <select
            name="status"
            defaultValue="live"
            className="mt-2 w-full border border-white/15 bg-ink-3 px-3 py-2 text-bone outline-none focus:border-phosphor"
          >
            <option value="draft">draft</option>
            <option value="live">live</option>
          </select>
        </label>
        <button
          type="submit"
          disabled={busy}
          className="border border-phosphor bg-phosphor/10 px-4 py-2 text-sm font-semibold tracking-[0.12em] text-phosphor disabled:opacity-50"
        >
          {busy ? "Saving…" : "Create package"}
        </button>
      </form>

      <div className="space-y-4">
        <h2 className="font-display text-xl font-semibold">Packages ({packages.length})</h2>
        {packages.map((p) => (
          <div key={p.id} className="border border-white/10 bg-ink-2/40 p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{p.name}</p>
                <p className="text-xs text-bone-faint">
                  {p.durationMinutes} min · {formatEur(p.priceCents)} · {p.status} · {p.topicLabel}
                </p>
                <p className="mt-2 text-sm text-bone-dim">{p.blurb}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => void setStatus(p.id, p.status === "live" ? "draft" : "live")}
                  className="border border-white/20 px-2 py-1 text-[11px] tracking-[0.12em] text-bone-dim hover:border-phosphor"
                >
                  {p.status === "live" ? "Unpublish" : "Publish"}
                </button>
                <button
                  type="button"
                  onClick={() => void remove(p.id)}
                  className="border border-ember/40 px-2 py-1 text-[11px] tracking-[0.12em] text-ember"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrdersTab({
  orders,
  onChanged,
  setError,
}: {
  orders: Order[];
  onChanged: () => void;
  setError: (v: string | null) => void;
}) {
  async function setStatus(id: string, status: string) {
    const res = await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (!res.ok) setError("Order update failed");
    else onChanged();
  }

  return (
    <div className="mt-8 space-y-4">
      <h2 className="font-display text-xl font-semibold">Orders ({orders.length})</h2>
      {orders.length === 0 ? <p className="text-sm text-bone-dim">No orders yet.</p> : null}
      {orders.map((o) => {
        let snap = "";
        try {
          snap = JSON.parse(o.productSnapshot).title || JSON.parse(o.productSnapshot).name || "";
        } catch {
          snap = "";
        }
        return (
          <div key={o.id} className="border border-white/10 bg-ink-2/40 p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold">
                  {o.kind} · {snap || o.id.slice(0, 8)}
                </p>
                <p className="text-xs text-bone-faint">
                  {o.buyerEmail}
                  {o.buyerName ? ` · ${o.buyerName}` : ""} · {formatEur(o.amountCents, o.currency)} ·{" "}
                  {o.status}
                  {o.topic ? ` · topic: ${o.topic}` : ""}
                </p>
                {o.preferredTimes ? (
                  <p className="mt-2 whitespace-pre-wrap text-sm text-bone-dim">{o.preferredTimes}</p>
                ) : null}
              </div>
              {o.kind === "session" ? (
                <div className="flex flex-wrap gap-2">
                  {(["awaiting_schedule", "scheduled", "done"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => void setStatus(o.id, s)}
                      className="border border-white/20 px-2 py-1 text-[11px] tracking-[0.1em] text-bone-dim hover:border-phosphor"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  step,
  defaultValue,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  step?: string;
  defaultValue?: string;
}) {
  return (
    <label className="block text-sm text-bone-dim">
      {label}
      <input
        name={name}
        type={type}
        step={step}
        required={required}
        defaultValue={defaultValue}
        className="mt-2 w-full border border-white/15 bg-ink-3 px-3 py-2 text-bone outline-none focus:border-phosphor"
      />
    </label>
  );
}
