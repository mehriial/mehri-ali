import { useEffect, useMemo, useState } from "react";

import AnnouncementCard from "./AnnouncementCard";
import AnnouncementsEmpty from "./AnnouncementsEmpty";

import { initialAnnouncements } from "@/data/announcements";


const STORAGE_KEY = "announcements";


function Announcements() {
    const [announcements, setAnnouncements] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);

            return stored
                ? JSON.parse(stored)
                : initialAnnouncements;
        } catch {
            return initialAnnouncements;
        }
    });

    const visibleAnnouncements = useMemo(() => {
        return [...announcements]
            .filter(
                (announcement) =>
                    announcement.status === "published"
            )
            .reverse();
    }, [announcements]);


    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(announcements)
        );
    }, [announcements]);


    return (
        <section className="mx-auto max-w-[1440px] px-5 pb-24 pt-32 sm:px-8 lg:px-12">

            {visibleAnnouncements.length > 0 ? (
                <div className="mt-10 grid gap-4 lg:grid-cols-2">
                    {visibleAnnouncements.map(
                        (announcement) => (
                            <AnnouncementCard
                                key={announcement.id}
                                announcement={announcement}
                            />
                        )
                    )}
                </div>
            ) : (
                <AnnouncementsEmpty />
            )}
        </section>
    );
}


export default Announcements;