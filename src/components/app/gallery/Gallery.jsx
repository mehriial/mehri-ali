import { useEffect, useMemo, useState } from "react";

import {
    galleryBooks,
    initialGalleryItems,
} from "@/data/gallery.js";

import GalleryTabs from "./GalleryTabs.jsx";
import GalleryFilters from "./GalleryFilters.jsx";
import GalleryGrid from "./GalleryGrid.jsx";
import EditComposer from "./EditComposer.jsx";
import GalleryEmpty from "./GalleryEmpty.jsx";

const STORAGE_KEY = "galleryItems";

function Gallery() {
    const [items, setItems] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);

            if (stored) {
                return JSON.parse(stored);
            }

            return initialGalleryItems;
        } catch {
            return initialGalleryItems;
        }
    });

    const [activeTab, setActiveTab] = useState("photos");
    const [activeBook, setActiveBook] = useState("all");

    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(items)
        );
    }, [items]);

    const filteredItems = useMemo(() => {
        return items
            .filter((item) => item.status === "approved")
            .filter((item) => {
                if (activeTab === "photos") {
                    return item.type === "photo";
                }

                return item.type === "edit";
            })
            .filter((item) => {
                if (activeBook === "all") {
                    return true;
                }

                return item.bookSlug === activeBook;
            })
            .sort(() => Math.random() - 0.5);
    }, [items, activeTab, activeBook]);

    const handleAddEdit = ({ image, bookSlug, title }) => {
        const newItem = {
            id: Date.now(),
            bookSlug,
            type: "edit",
            image,
            title: title || "",
            username: "Mehri",
            status: "pending",
            isMine: true,
            createdAt: "Şimdi",
        };

        setItems((current) => [
            newItem,
            ...current,
        ]);
    };

    const handleDelete = (id) => {
        setItems((current) =>
            current.filter((item) => item.id !== id)
        );
    };

    return (
        <div className="overflow-hidden pt-24">
            <section>
                <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">

                    <div className="">
                        <GalleryTabs
                            activeTab={activeTab}
                            onChange={setActiveTab}
                        />
                    </div>

                    <div className="mt-8">
                        <GalleryFilters
                            books={galleryBooks}
                            activeBook={activeBook}
                            onChange={setActiveBook}
                        />
                    </div>

                    {activeTab === "edits" && (
                        <div className="mt-10">
                            <EditComposer
                                books={galleryBooks}
                                onSubmit={handleAddEdit}
                            />
                        </div>
                    )}

                    <div className="mt-12">
                        {filteredItems.length > 0 ? (
                            <GalleryGrid
                                items={filteredItems}
                                onDelete={handleDelete}
                            />
                        ) : (
                            <GalleryEmpty type={activeTab} />
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Gallery;