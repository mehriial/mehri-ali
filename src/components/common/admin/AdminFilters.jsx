import { Search } from "lucide-react";

import { Input } from "@/components/ui/input.jsx";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.jsx";

function AdminFilters({
                          search,
                          onSearchChange,
                          searchPlaceholder = "Ara...",
                          filters = [],
                      }) {
    return (
        <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative min-w-0 flex-1">
                <Search
                    className="
                        pointer-events-none
                        absolute
                        left-3
                        top-1/2
                        h-4
                        w-4
                        -translate-y-1/2
                        text-white/25
                    "
                />

                <Input
                    value={search}
                    onChange={(event) =>
                        onSearchChange(event.target.value)
                    }
                    placeholder={searchPlaceholder}
                    className="
                        h-11
                        border-white/[0.08]
                        bg-white/[0.025]
                        pl-10
                        text-white
                        placeholder:text-white/25
                    "
                />
            </div>

            {filters.map((filter) => (
                <Select
                    key={filter.key}
                    value={filter.value}
                    onValueChange={filter.onChange}
                >
                    <SelectTrigger
                        className="
                            h-11
                            w-full
                            border-white/[0.08]
                            bg-white/[0.025]
                            text-white
                            sm:w-[200px]
                        "
                    >
                        <SelectValue
                            placeholder={filter.placeholder}
                        />
                    </SelectTrigger>

                    <SelectContent>
                        {filter.options.map((option) => (
                            <SelectItem
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            ))}
        </div>
    );
}

export default AdminFilters;