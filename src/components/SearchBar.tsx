
import { useState, useRef, useEffect } from "react";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [term, setTerm] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = term.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-3xl mx-auto items-center gap-3"
    >
      <div className="relative flex-1">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-emerald-600">
          ⌕
        </span>

        <input
          ref={inputRef}
          type="text"
          placeholder="Search delicious recipes... chicken, pasta, beef"
          className="input input-bordered w-full h-14 pl-12 pr-4 rounded-2xl bg-white border-gray-200 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="btn h-14 px-7 rounded-2xl border-0 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md normal-case"
      >
        <span>Search</span>
        <span className="text-lg">→</span>
      </button>
    </form>
  );
}
