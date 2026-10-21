import {useState, RefObject} from 'react';
import {Search} from 'lucide-react';

export default function SearchBar({onSearch, searchRef}: {onSearch: (query: string) => void, searchRef: RefObject<HTMLInputElement>}) {
  const [query, setQuery] = useState('');

  return (
    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm mb-6 w-full max-w-md">
      <Search className="text-slate-400 w-5 h-5" />
      <input
        ref={searchRef}
        type="text"
        placeholder="Search countries..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onSearch(e.target.value);
        }}
        className="flex-1 outline-none text-sm text-slate-700"
      />
    </div>
  );
}
