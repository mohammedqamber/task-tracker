"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import debounce from "lodash.debounce";

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [value, setValue] = useState("");

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        onSearch(query);
      }, 500),
    [onSearch]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setValue(query);
    debouncedSearch(query);
  };

  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        placeholder="Search tasks..."
        value={value}
        onChange={handleSearch}
        className="pl-9"
      />
    </div>
  );
};

export default SearchBar;
