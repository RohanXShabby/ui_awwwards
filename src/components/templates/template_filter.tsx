import { Search } from 'lucide-react';

interface TemplateFiltersProps {
    currentFilter: 'all' | 'free' | 'paid';
    setFilter: (filter: 'all' | 'free' | 'paid') => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export const TemplateFilters = ({
    currentFilter,
    setFilter,
    searchQuery,
    setSearchQuery
}: TemplateFiltersProps) => {
    return (
        <div className="sticky top-4 z-40 mb-12 rounded-xl border border-card-border bg-background/80 backdrop-blur-md shadow-sm p-2 flex flex-col md:flex-row gap-4 items-center justify-between animate-in fade-in zoom-in-95 duration-500">
            {/* Tabs */}
            <div className="flex p-1 bg-card-bg rounded-lg w-full md:w-auto border border-card-border/50">
                {(['all', 'free', 'paid'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setFilter(tab)}
                        className={`
                            flex-1 md:flex-none px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 capitalize
                            ${currentFilter === tab
                                ? 'bg-background text-foreground shadow-sm border border-card-border'
                                : 'text-muted-foreground hover:text-foreground hover:bg-background/50'}
                        `}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search templates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-card-bg border border-card-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-muted-foreground/50 text-foreground"
                />
            </div>
        </div>
    );
};