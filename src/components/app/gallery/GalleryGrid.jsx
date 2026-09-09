import GalleryItem from "./GalleryItem.jsx";

function GalleryGrid({ items, onDelete }) {
    return (
        <div className="columns-2 gap-3 sm:columns-3 sm:gap-5 lg:columns-4 lg:gap-6">
            {items.map((item, index) => (
                <GalleryItem
                    key={item.id}
                    item={item}
                    index={index}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}

export default GalleryGrid;