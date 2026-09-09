import { useEffect, useRef, useState } from "react";
import {
    Camera,
    ImagePlus,
    Upload,
} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { Button } from "@/components/ui/button.jsx";


function ProfileEditDialog({
                               profile,
                               open,
                               onOpenChange,
                               onSave,
                           }) {
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [cover, setCover] = useState(null);

    const avatarInputRef = useRef(null);
    const coverInputRef = useRef(null);


    useEffect(() => {
        if (!open) {
            return;
        }

        setName(profile.name ?? "");
        setBio(profile.bio ?? "");
        setAvatar(profile.avatar ?? null);
        setCover(profile.cover ?? null);
    }, [open, profile]);


    const readImage = (file, callback) => {
        if (!file) {
            return;
        }

        if (!file.type.startsWith("image/")) {
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            callback(reader.result);
        };

        reader.readAsDataURL(file);
    };


    const handleAvatarChange = (event) => {
        const file = event.target.files?.[0];

        readImage(file, setAvatar);

        event.target.value = "";
    };


    const handleCoverChange = (event) => {
        const file = event.target.files?.[0];

        readImage(file, setCover);

        event.target.value = "";
    };


    const handleSave = () => {
        if (!name.trim()) {
            return;
        }

        onSave({
            ...profile,
            name: name.trim(),
            bio: bio.trim(),
            avatar,
            cover,
        });
    };


    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent
                className="
                    max-w-lg
                    gap-0
                    overflow-hidden
                    border-white/[0.08]
                    bg-[#0a0a0a]
                    p-0
                    text-white
                    shadow-2xl
                "
            >
                <DialogHeader className="border-b border-white/[0.06] px-6 py-5">
                    <DialogTitle className="text-sm font-medium text-white">
                        Profili düzenle
                    </DialogTitle>

                    <DialogDescription className="text-[10px] leading-5 text-white/30">
                        Profil bilgilerini ve görsellerini
                        güncelleyebilirsin.
                    </DialogDescription>
                </DialogHeader>


                <div className="max-h-[70vh] overflow-y-auto px-6 py-6">
                    {/* Kapak fotoğrafı */}
                    <div>
                        <label className="text-[9px] uppercase tracking-[0.2em] text-white/30">
                            Kapak fotoğrafı
                        </label>

                        <div className="relative mt-2 h-36 overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.025]">
                            {cover ? (
                                <img
                                    src={cover}
                                    alt=""
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full flex-col items-center justify-center text-white/20">
                                    <ImagePlus className="h-5 w-5" />

                                    <span className="mt-2 text-[9px]">
                                        Kapak fotoğrafı ekle
                                    </span>
                                </div>
                            )}

                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                    coverInputRef.current?.click()
                                }
                                className="
                                    absolute
                                    bottom-3
                                    right-3
                                    h-8
                                    w-8
                                    rounded-lg
                                    border
                                    border-white/10
                                    bg-black/70
                                    text-white/50
                                    backdrop-blur-md
                                    hover:bg-black/80
                                    hover:text-white
                                "
                            >
                                <Camera className="h-3.5 w-3.5" />
                            </Button>
                        </div>

                        <input
                            ref={coverInputRef}
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            onChange={handleCoverChange}
                            className="hidden"
                        />
                    </div>


                    {/* Profil fotoğrafı */}
                    <div className="mt-6">
                        <label className="text-[9px] uppercase tracking-[0.2em] text-white/30">
                            Profil fotoğrafı
                        </label>

                        <div className="mt-3 flex items-center gap-4">
                            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/[0.1] bg-white/[0.04]">
                                {avatar ? (
                                    <img
                                        src={avatar}
                                        alt={name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <span className="text-xl text-white/40">
                                        {name.charAt(0)}
                                    </span>
                                )}
                            </div>

                            <Button
                                type="button"
                                variant="outline"
                                onClick={() =>
                                    avatarInputRef.current?.click()
                                }
                                className="
                                    h-9
                                    rounded-lg
                                    border-white/[0.1]
                                    bg-white/[0.03]
                                    text-[10px]
                                    font-normal
                                    text-white/50
                                    shadow-none
                                    hover:bg-white/[0.06]
                                    hover:text-white
                                "
                            >
                                <Upload className="h-3 w-3" />
                                Fotoğraf seç
                            </Button>
                        </div>

                        <input
                            ref={avatarInputRef}
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            onChange={handleAvatarChange}
                            className="hidden"
                        />
                    </div>


                    {/* Ad */}
                    <div className="mt-6">
                        <label className="text-[9px] uppercase tracking-[0.2em] text-white/30">
                            Ad
                        </label>

                        <Input
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                            placeholder="Adını gir"
                            className="
                                mt-2
                                h-10
                                rounded-lg
                                border-white/[0.08]
                                bg-white/[0.025]
                                text-xs
                                text-white
                                shadow-none
                                placeholder:text-white/20
                                focus-visible:border-white/[0.15]
                                focus-visible:ring-0
                            "
                        />
                    </div>


                    {/* Bio */}
                    <div className="mt-6">
                        <label className="text-[9px] uppercase tracking-[0.2em] text-white/30">
                            Bio
                        </label>

                        <Textarea
                            value={bio}
                            onChange={(event) =>
                                setBio(event.target.value)
                            }
                            rows={4}
                            placeholder="Kendinden bahset..."
                            className="
                                mt-2
                                resize-none
                                rounded-lg
                                border-white/[0.08]
                                bg-white/[0.025]
                                text-xs
                                leading-6
                                text-white
                                shadow-none
                                placeholder:text-white/20
                                focus-visible:border-white/[0.15]
                                focus-visible:ring-0
                            "
                        />
                    </div>
                </div>


                <DialogFooter className="border-t border-white/[0.06] px-6 py-4 bg-black">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => onOpenChange(false)}
                        className="

                            h-9
                            rounded-lg
                            text-[10px]
                            font-normal
                            text-white/40
                            hover:text-white
                        "
                    >
                        İptal
                    </Button>

                    <Button
                        type="button"
                        onClick={handleSave}
                        disabled={!name.trim()}
                        className="
                            h-9
                            rounded-lg
                            bg-white
                            px-5
                            text-[10px]
                            font-medium
                            text-black
                            shadow-none
                            hover:bg-white/90
                        "
                    >
                        Kaydet
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}


export default ProfileEditDialog;