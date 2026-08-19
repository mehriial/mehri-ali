import { HiSearch } from "react-icons/hi";
import Select from "../../ui/Select.jsx";
import Button from "../../ui/Button.jsx";
import Input from "../../ui/input.jsx";

const statuses = [
    {
        label: "Tümü",
        value: "all",
    },
    {
        label: "Devam ediyor",
        value: "Devam ediyor",
    },
    {
        label: "Tamamlandı",
        value: "Tamamlandı",
    },
];

const BooksFilters = ({
                          categories,
                          category,
                          status,
                          search,
                          onCategoryChange,
                          onStatusChange,
                          onSearchChange,
                      }) => {
    return (
        <section className="border-b border-white/10">
            <div className="
                mx-auto
                max-w-[1400px]
                px-6
                py-6
                lg:px-10
            ">
                <div className="
                    flex
                    flex-col
                    gap-5
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                ">

                    {/* Categories */}

                    <div className="
                        flex
                        flex-wrap
                        items-center
                        gap-2
                    ">
                        {categories.map((item) => {
                            const value =
                                item === "Tümü"
                                    ? "all"
                                    : item;

                            const isActive =
                                category === value;

                            return (
                                <Button
                                    key={item}
                                    variant={
                                        isActive
                                            ? "primary"
                                            : "outline"
                                    }
                                    onClick={() =>
                                        onCategoryChange(value)
                                    }
                                >
                                    {item}
                                </Button>
                            );
                        })}
                    </div>

                    {/* Right */}

                    <div className="
                        flex
                        flex-col
                        gap-3
                        sm:flex-row
                    ">

                        <Select
                            value={status}
                            onChange={(event) =>
                                onStatusChange(
                                    event.target.value
                                )
                            }
                        >
                            {statuses.map((item) => (
                                <option
                                    key={item.value}
                                    value={item.value}
                                >
                                    {item.label}
                                </option>
                            ))}
                        </Select>

                        <div className="relative">
                            <HiSearch className="
                                absolute
                                left-3
                                top-1/2
                                h-4
                                w-4
                                -translate-y-1/2
                                text-shadow-white/30
                            " />

                            <Input
                                type="text"
                                value={search}
                                onChange={(event) =>
                                    onSearchChange(
                                        event.target.value
                                    )
                                }
                                placeholder="Kitap ara..."
                                className="min-w-[220px] pl-10"
                            />
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default BooksFilters;