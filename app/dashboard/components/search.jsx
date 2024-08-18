import { Input } from '@/components/ui/input';

export function Search({ searchQuery, setSearchQuery }) {
  return (
    <div>
      <Input
        type="search"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        placeholder="Search..."
        className="w-96"
      />
    </div>
  );
}
