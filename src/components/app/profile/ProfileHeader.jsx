import {
    BookOpen,
    Camera,
    Users,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import ProfileEditDialog from "./ProfileEditDialog";


function ProfileHeader({
                           profile,
                           libraryCount,
                       }) {
    const [isEditOpen, setIsEditOpen] = useState(false);

    const [currentProfile, setCurrentProfile] = useState(
        profile
    );


    const handleSave = (updatedProfile) => {
        localStorage.setItem(
            "profile",
            JSON.stringify(updatedProfile)
        );

        setCurrentProfile(updatedProfile);

        window.dispatchEvent(
            new Event("profileChanged")
        );

        setIsEditOpen(false);
    };


    return (
        <>
            <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025]">
                <div className="relative h-48 bg-white/[0.03] sm:h-60">
                    {currentProfile.cover ? (
                        <img
                            src={currentProfile.cover}
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-white/[0.02]" />
                    )}

                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                            setIsEditOpen(true)
                        }
                        className="
                            absolute
                            right-4
                            top-4
                            h-8
                            w-8
                            rounded-lg
                            border
                            border-white/10
                            bg-black/50
                            text-white/40
                            backdrop-blur-md
                            hover:bg-black/70
                            hover:text-white
                        "
                        aria-label="Kapak fotoğrafını değiştir"
                    >
                        <Camera className="h-3.5 w-3.5" />
                    </Button>
                </div>


                <div className="relative px-5 pb-6 sm:px-7">
                    <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
                        <div className="flex items-end gap-4">
                            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-black bg-white/[0.06] sm:h-28 sm:w-28">
                                {currentProfile.avatar ? (
                                    <img
                                        src={currentProfile.avatar}
                                        alt={currentProfile.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <span className="text-2xl font-medium text-white/50">
                                        {currentProfile.name.charAt(0)}
                                    </span>
                                )}
                            </div>

                            <div className="pb-1">
                                <h1 className="text-xl font-medium text-white">
                                    {currentProfile.name}
                                </h1>

                                <p className="mt-1 text-xs text-white/30">
                                    @{currentProfile.username}
                                </p>
                            </div>
                        </div>


                        <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                                setIsEditOpen(true)
                            }
                            className="
                                h-9
                                rounded-lg
                                border-white/[0.1]
                                bg-white/[0.04]
                                px-4
                                text-[10px]
                                font-normal
                                text-white/60
                                shadow-none
                                hover:bg-white/[0.07]
                                hover:text-white
                            "
                        >
                            Profili düzenle
                        </Button>
                    </div>


                    <p className="mt-6 max-w-xl text-xs leading-6 text-white/40">
                        {currentProfile.bio}
                    </p>

                </div>
            </div>


            <ProfileEditDialog
                profile={currentProfile}
                open={isEditOpen}
                onOpenChange={setIsEditOpen}
                onSave={handleSave}
            />
        </>
    );
}


export default ProfileHeader;