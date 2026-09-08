import { useState } from "react";
import {
    HiCheck,
    HiGlobeAlt,
    HiMail,
    HiUser,
} from "react-icons/hi";

const Settings = () => {
    const defaults = {
        authorName: "Mehri",
        email: "author@example.com",
        siteTitle: "Yazarın Dünyası",
        description:
            "Kitaplar, hikayeler ve yazardan notlar.",
        instagram: "",
        twitter: "",
        instagramVisible: true,
        boardEnabled: true,
        commentsEnabled: true,
        announcementsEnabled: true,
    };
    const [settings, setSettings] = useState(() => {
        try { return { ...defaults, ...JSON.parse(localStorage.getItem("mehri-ali-settings")) }; } catch { return defaults; }
    });
    const [saved, setSaved] = useState(false);

    const update = (key, value) => {
        setSettings((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        localStorage.setItem("mehri-ali-settings", JSON.stringify(settings));
        setSaved(true);
    };

    return (
        <div className="min-h-screen bg-background">

            <main className="mx-auto max-w-[1000px] px-6 py-10 lg:px-10">

                <div className="border-b border-white/10 pb-8">

                    <p className="sectionLabel">
                        Yönetim
                    </p>

                    <h1 className="mt-3 font-heading text-3xl">
                        Ayarlar
                    </h1>

                    <p className="mt-2 text-sm text-shadow-white/40">
                        Site ve yazar bilgilerini yönet.
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mt-10 space-y-10"
                >

                    {/* AUTHOR */}

                    <SettingsSection
                        icon={HiUser}
                        title="Yazar bilgileri"
                        description="Sitede gösterilecek yazar bilgileri."
                    >

                        <div className="grid gap-5 md:grid-cols-2">

                            <Field
                                label="Yazar adı"
                                value={settings.authorName}
                                onChange={(value) =>
                                    update("authorName", value)
                                }
                            />

                            <Field
                                label="E-posta"
                                type="email"
                                value={settings.email}
                                onChange={(value) =>
                                    update("email", value)
                                }
                            />

                        </div>

                    </SettingsSection>

                    {/* SITE */}

                    <SettingsSection
                        icon={HiGlobeAlt}
                        title="Site bilgileri"
                        description="Ana sayfa ve SEO için kullanılacak bilgiler."
                    >

                        <Field
                            label="Site başlığı"
                            value={settings.siteTitle}
                            onChange={(value) =>
                                update("siteTitle", value)
                            }
                        />

                        <div className="mt-5">

                            <label className="fieldLabel">
                                Site açıklaması
                            </label>

                            <textarea
                                rows={4}
                                value={settings.description}
                                onChange={(e) =>
                                    update(
                                        "description",
                                        e.target.value
                                    )
                                }
                                className="adminTextarea"
                            />

                        </div>

                    </SettingsSection>

                    {/* SOCIAL */}

                    <SettingsSection
                        icon={HiMail}
                        title="Sosyal medya"
                        description="Sitede gösterilecek sosyal medya hesapları."
                    >

                        <div className="grid gap-5 md:grid-cols-2">

                            <Field
                                label="Instagram"
                                value={settings.instagram}
                                onChange={(value) =>
                                    update("instagram", value)
                                }
                            />

                            <Field
                                label="Twitter / X"
                                value={settings.twitter}
                                onChange={(value) =>
                                    update("twitter", value)
                                }
                            />

                        </div>

                    </SettingsSection>

                    {/* FEATURES */}

                    <SettingsSection
                        title="Site özellikleri"
                        description="Kullanıcıların erişebileceği özellikleri kontrol et."
                    >

                        <div className="space-y-4">

                            <Toggle
                                label="Yorumlar"
                                description="Kitap ve bölümlerde yorum yapılmasına izin ver."
                                checked={settings.commentsEnabled}
                                onChange={(value) =>
                                    update("commentsEnabled", value)
                                }
                            />

                            <Toggle
                                label="Pano"
                                description="Okurların pano paylaşımı yapmasına izin ver."
                                checked={settings.boardEnabled}
                                onChange={(value) =>
                                    update("boardEnabled", value)
                                }
                            />

                            <Toggle
                                label="Duyurular"
                                description="Duyuru sistemini aktif tut."
                                checked={settings.announcementsEnabled}
                                onChange={(value) =>
                                    update(
                                        "announcementsEnabled",
                                        value
                                    )
                                }
                            />

                        </div>

                    </SettingsSection>

                    {/* SAVE */}

                    <div className="
                        flex
                        items-center
                        justify-end
                        border-t
                        border-white/10
                        pt-8
                    ">

                        {saved && <span className="mr-4 text-xs text-header-accent">Değişiklikler kaydedildi.</span>}
                        <button
                            type="submit"
                            className="primaryButton"
                        >
                            <HiCheck />
                            Değişiklikleri kaydet
                        </button>

                    </div>

                </form>

            </main>
        </div>
    );
};

const SettingsSection = ({
                             icon: Icon,
                             title,
                             description,
                             children,
                         }) => (
    <section>

        <div className="mb-6 flex gap-4">

            {Icon && (
                <Icon className="
                    mt-1
                    h-5
                    w-5
                    shrink-0
                    text-header-accent
                " />
            )}

            <div>

                <h2 className="font-heading text-xl">
                    {title}
                </h2>

                <p className="
                    mt-1
                    text-xs
                    text-shadow-white/35
                ">
                    {description}
                </p>

            </div>

        </div>

        {children}

    </section>
);

const Field = ({
                   label,
                   value,
                   onChange,
                   type = "text",
               }) => (
    <div>

        <label className="fieldLabel">
            {label}
        </label>

        <input
            type={type}
            value={value}
            onChange={(e) =>
                onChange(e.target.value)
            }
            className="adminInput"
        />

    </div>
);

const Toggle = ({
                    label,
                    description,
                    checked,
                    onChange,
                }) => (
    <label className="
        flex
        cursor-pointer
        items-center
        justify-between
        gap-5
        border
        border-white/10
        p-5
    ">

        <div>

            <p className="text-sm">
                {label}
            </p>

            <p className="
                mt-1
                text-xs
                text-shadow-white/35
            ">
                {description}
            </p>

        </div>

        <button
            type="button"
            onClick={() => onChange(!checked)}
            className={`
                relative
                h-6
                w-11
                shrink-0
                rounded-full
                transition-colors
                ${
                checked
                    ? "bg-header-accent"
                    : "bg-white/10"
            }
            `}
        >

            <span className={`
                absolute
                top-1
                h-4
                w-4
                rounded-full
                bg-white
                transition-transform
                ${
                checked
                    ? "translate-x-6"
                    : "translate-x-1"
            }
            `} />

        </button>

    </label>
);

export default Settings;
