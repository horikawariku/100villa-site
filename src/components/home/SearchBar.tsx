"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

export function SearchBar() {
    const router = useRouter();
    const [q, setQ] = useState("");
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!q.trim()) return;
        router.push(`/search?q=${encodeURIComponent(q.trim())}`);
    };
    return (
        <form
            onSubmit={submit}
            className="w-full max-w-xl mx-auto flex items-center gap-2 bg-bg/95 border border-line shadow-sm"
        >
            <Search className="w-4 h-4 ml-4 text-mute shrink-0" />
            <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="エリア・体験で検索  例: 滋賀 サウナ / カップル 沖縄"
                className="flex-1 py-3.5 px-2 text-sm tracking-wider bg-transparent placeholder:text-mute focus:outline-none"
            />
            <button
                type="submit"
                className="px-5 py-3.5 bg-ink text-bg text-xs tracking-widest font-medium hover:bg-gold-deep transition-colors"
            >
                探す
            </button>
        </form>
    );
}
