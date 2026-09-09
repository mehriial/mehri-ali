function GalleryTabs({ activeTab, onChange }) {
    const tabs = [
        {
            id: "photos",
            label: "Fotoğraflar",
        },
        {
            id: "edits",
            label: "Sizden gelenler",
        },
    ];

    return (
        <div className="flex items-center gap-2">
            {tabs.map((tab) => {
                const active = activeTab === tab.id;

                return (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => onChange(tab.id)}
                        className={`
                            rounded-full
                            border
                            px-5
                            py-2.5
                            text-[10px]
                            transition-all
                            duration-300
                            ${
                            active
                                ? "border-white/15 bg-white/[0.08] text-white"
                                : "border-white/[0.07] text-white/30 hover:border-white/10 hover:text-white/60"
                        }
                        `}
                    >
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
}

export default GalleryTabs;