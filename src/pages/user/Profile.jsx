import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HiArrowRight, HiCamera, HiCheck, HiCollection, HiOutlineBookOpen, HiPencil, HiTrash, HiUser } from "react-icons/hi";
import { books } from "../../consts/index.js";
import { useAuth } from "../../context/AuthContext.jsx";

const initialsFor = (name) => name?.trim().split(/\s+/).map((part) => part[0]).slice(0, 2).join("").toUpperCase() || "O";

const Avatar = ({ user, large = false }) => {
    const size = large ? "h-20 w-20 text-2xl sm:h-24 sm:w-24" : "h-16 w-16 text-xl";
    return user.avatar
        ? <img src={user.avatar} alt={`${user.name} profil resmi`} className={`${size} shrink-0 rounded-full border border-header-accent/60 object-cover`} />
        : <div className={`flex ${size} shrink-0 items-center justify-center rounded-full border border-header-accent/60 bg-header-accent/15 font-heading text-header-accent`}>{initialsFor(user.name)}</div>;
};

const Profile = () => {
    const { user, libraryBookIds, toggleLibraryBook, updateProfile } = useAuth();
    const [editing, setEditing] = useState(false);
    const [notice, setNotice] = useState("");
    const [draft, setDraft] = useState(() => ({ name: user?.name ?? "", email: user?.email ?? "", bio: user?.bio ?? "", avatar: user?.avatar ?? "" }));
    const fileInput = useRef(null);
    const library = books.filter((book) => libraryBookIds.includes(book.id));

    if (!user) return <GuestProfile />;

    const updateDraft = (field, value) => setDraft((current) => ({ ...current, [field]: value }));
    const chooseAvatar = (event) => {
        const image = event.target.files?.[0];
        if (!image) return;
        if (!image.type.startsWith("image/") || image.size > 2 * 1024 * 1024) {
            setNotice("PNG, JPG veya WEBP formatında, en fazla 2 MB bir görsel seçin.");
            return;
        }
        const reader = new FileReader();
        reader.onload = () => updateDraft("avatar", reader.result);
        reader.readAsDataURL(image);
        setNotice("");
    };
    const save = (event) => {
        event.preventDefault();
        const result = updateProfile(draft);
        setNotice(result.ok ? "Profilin güncellendi." : result.message);
        if (result.ok) setEditing(false);
    };
    const cancel = () => {
        setDraft({ name: user.name, email: user.email, bio: user.bio ?? "", avatar: user.avatar ?? "" });
        setNotice("");
        setEditing(false);
    };

    return (
        <div className="min-h-screen bg-background text-shadow-white">
            <main className="mx-auto max-w-[1400px] px-6 pb-24 pt-12 lg:px-10 lg:pt-20">
                <section className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-[#17130f] px-6 py-8 sm:px-10 lg:px-14 lg:py-12">
                    <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_70%_40%,rgba(139,94,75,0.45),transparent_42%)]" />
                    <div className="absolute -right-10 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full border border-header-accent/30" />
                    <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.34em] text-header-accent">Okuma odası</p>
                            <div className="mt-5 flex flex-wrap items-center gap-5"><Avatar user={user} large /><div><h1 className="font-heading text-4xl tracking-tight sm:text-5xl">{user.name}</h1><p className="mt-2 max-w-xl text-sm text-shadow-white/50">{user.bio || "Okuma yolculuğunu kendi seçtiğin hikâyelerle doldur."}</p></div></div>
                        </div>
                        <div className="flex gap-8 border-t border-white/10 pt-5 sm:gap-12 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0"><Metric value={library.length} label="Kitaplıkta" /><Metric value={library.filter((book) => book.status === "Devam ediyor").length} label="Seri takipte" /></div>
                    </div>
                </section>

                <div className="mt-10 grid gap-10 xl:grid-cols-[320px_minmax(0,1fr)]">
                    <aside className="h-fit rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                        <div className="flex items-center justify-between border-b border-white/10 pb-5"><div><p className="sectionLabel">Hesabın</p><h2 className="mt-2 font-heading text-2xl">Profil kartı</h2></div><button type="button" onClick={() => { setNotice(""); setEditing(true); }} className="iconButton" aria-label="Profili düzenle"><HiPencil className="h-4 w-4" /></button></div>
                        <dl className="mt-6 space-y-5"><div><dt className="text-[9px] uppercase tracking-[0.2em] text-shadow-white/35">E-posta</dt><dd className="mt-2 break-all text-sm text-shadow-white/70">{user.email}</dd></div><div><dt className="text-[9px] uppercase tracking-[0.2em] text-shadow-white/35">Profil notu</dt><dd className="mt-2 text-sm leading-6 text-shadow-white/55">{user.bio || "Henüz bir profil notu eklemedin."}</dd></div></dl>
                        <button type="button" onClick={() => { setNotice(""); setEditing(true); }} className="mt-7 w-full rounded-full border border-white/10 px-4 py-3 text-[10px] uppercase tracking-[0.18em] text-shadow-white/60 transition-colors hover:border-header-accent hover:text-header-accent">Profili düzenle</button>
                    </aside>

                    <section>
                        <div className="flex flex-wrap items-end justify-between gap-5 border-b border-white/10 pb-6"><div><p className="sectionLabel">Seçkinlerin</p><h2 className="mt-2 font-heading text-3xl">Kitaplığım</h2></div><Link to="/books" className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-header-accent hover:text-white">Yeni kitaplar keşfet <HiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link></div>
                        {library.length ? <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{library.map((book) => <LibraryCard key={book.id} book={book} onRemove={() => toggleLibraryBook(book.id)} />)}</div> : <EmptyLibrary />}
                    </section>
                </div>
            </main>

            {editing && <EditModal draft={draft} notice={notice} fileInput={fileInput} updateDraft={updateDraft} chooseAvatar={chooseAvatar} onClose={cancel} onSubmit={save} />}
        </div>
    );
};

const Metric = ({ value, label }) => <div><p className="font-heading text-3xl text-header-accent">{value}</p><p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-shadow-white/45">{label}</p></div>;

const LibraryCard = ({ book, onRemove }) => <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-3 transition-colors hover:border-header-accent/50"><div className="flex gap-4"><Link to={book.href} className="h-32 w-24 shrink-0 overflow-hidden rounded-xl bg-black/20"><img src={book.cover} alt={book.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /></Link><div className="flex min-w-0 flex-1 flex-col"><p className="text-[9px] uppercase tracking-[0.18em] text-header-accent">{book.status}</p><Link to={book.href} className="mt-2 font-heading text-xl leading-tight transition-colors hover:text-header-accent">{book.title}</Link><p className="mt-2 text-xs text-shadow-white/40">{book.chapters}</p><div className="mt-auto flex items-center justify-between"><Link to={`${book.href}/chapters`} className="text-[9px] uppercase tracking-[0.16em] text-shadow-white/55 hover:text-header-accent">Okumaya devam</Link><button type="button" onClick={onRemove} aria-label={`${book.title} kitabını çıkar`} className="text-shadow-white/30 transition-colors hover:text-red-400"><HiTrash className="h-4 w-4" /></button></div></div></div></article>;

const EmptyLibrary = () => <div className="mt-8 flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 px-6 text-center"><HiCollection className="h-11 w-11 text-header-accent/70" /><h3 className="mt-5 font-heading text-2xl">Rafların seni bekliyor</h3><p className="mt-3 max-w-sm text-sm leading-7 text-shadow-white/45">Kitap sayfasındaki “Kütüphaneme ekle” seçeneğiyle kendi okuma alanını oluşturmaya başla.</p><Link to="/books" className="mt-7 inline-flex items-center gap-2 rounded-full border border-header-accent px-5 py-3 text-[10px] uppercase tracking-[0.18em] text-header-accent transition-colors hover:bg-header-accent hover:text-white"><HiOutlineBookOpen className="h-4 w-4" /> Kitapları incele</Link></div>;

const EditModal = ({ draft, notice, fileInput, updateDraft, chooseAvatar, onClose, onSubmit }) => <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm"><form onSubmit={onSubmit} className="max-h-full w-full max-w-xl overflow-y-auto rounded-3xl border border-white/10 bg-[#181512] p-6 shadow-2xl sm:p-8"><div className="flex items-start justify-between gap-5"><div><p className="sectionLabel">Kişisel alanın</p><h2 className="mt-2 font-heading text-3xl">Profilini düzenle</h2></div><button type="button" onClick={onClose} className="text-sm text-shadow-white/45 hover:text-white">Vazgeç</button></div><div className="mt-8 flex items-center gap-5"><button type="button" onClick={() => fileInput.current?.click()} className="group relative"><Avatar user={{ name: draft.name, avatar: draft.avatar }} /><span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-header-accent text-white"><HiCamera className="h-3.5 w-3.5" /></span></button><div><button type="button" onClick={() => fileInput.current?.click()} className="text-[10px] uppercase tracking-[0.18em] text-header-accent hover:text-white">Fotoğraf değiştir</button><p className="mt-2 text-xs text-shadow-white/40">PNG, JPG veya WEBP · en fazla 2 MB</p></div><input ref={fileInput} onChange={chooseAvatar} type="file" accept="image/png,image/jpeg,image/webp" className="hidden" /></div><div className="mt-8 grid gap-5"><label><span className="fieldLabel">Ad soyad</span><input value={draft.name} onChange={(event) => updateDraft("name", event.target.value)} className="adminInput" /></label><label><span className="fieldLabel">E-posta</span><input type="email" value={draft.email} onChange={(event) => updateDraft("email", event.target.value)} className="adminInput" /></label><label><span className="fieldLabel">Kısa not</span><textarea rows="3" maxLength="180" value={draft.bio} onChange={(event) => updateDraft("bio", event.target.value)} placeholder="Okuma dünyandan kısaca bahset..." className="adminTextarea" /></label></div>{notice && <p role="alert" className={`mt-4 text-sm ${notice === "Profilin güncellendi." ? "text-header-accent" : "text-red-400"}`}>{notice}</p>}<div className="mt-8 flex justify-end gap-3"><button type="button" onClick={onClose} className="px-4 py-3 text-[10px] uppercase tracking-[0.18em] text-shadow-white/50 hover:text-white">İptal</button><button type="submit" className="inline-flex items-center gap-2 rounded-full bg-header-accent px-5 py-3 text-[10px] uppercase tracking-[0.18em] text-white hover:bg-header-accent/80"><HiCheck className="h-4 w-4" /> Kaydet</button></div></form></div>;

const GuestProfile = () => <div className="min-h-screen bg-background text-shadow-white"><main className="mx-auto flex min-h-[70vh] max-w-[1400px] flex-col items-center justify-center px-6 text-center lg:px-10"><HiUser className="h-10 w-10 text-header-accent" /><h1 className="mt-5 font-heading text-4xl">Profilin seni bekliyor</h1><p className="mt-4 max-w-md text-sm leading-7 text-shadow-white/50">Kitaplığını oluşturmak ve kaydettiğin kitaplara buradan erişmek için giriş yap.</p><Link to="/books" className="mt-8 rounded-full border border-header-accent px-5 py-3 text-[10px] uppercase tracking-[0.18em] text-header-accent transition-colors hover:bg-header-accent hover:text-white">Kitapları keşfet</Link></main></div>;

export default Profile;
