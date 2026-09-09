import {useState} from "react";
import {ArrowUpRight} from "lucide-react";
import AboutAuthor from "@/components/app/home/AboutAuthor.jsx";

function ContactSection() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (event) => {
        const {name, value} = event.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(form);
    };

    return (
        <section className="border-t border-white/[0.06]">
            <div
                className="
                    mx-auto
                    max-w-[1440px]
                    px-5
                    py-24
                    sm:px-8
                    lg:px-12
                    lg:py-32
                "
            >
                <div
                    className="
                        grid
                        grid-cols-1
                        gap-16
                        lg:grid-cols-[0.7fr_1.3fr]
                        lg:gap-24
                    "
                >
                    <AboutAuthor/>

                    <ContactForm
                        form={form}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                    />
                </div>
            </div>
        </section>
    );
}

function ContactForm({form, onChange, onSubmit}) {
    return (
        <div>
            <div className="mb-10">
                <span
                    className="
                        text-[9px]
                        font-medium
                        uppercase
                        tracking-[0.35em]
                        text-white/30
                    "
                >
                    İletişim
                </span>

                <h2
                    className="
                        mt-5
                        font-serif
                        text-4xl
                        tracking-tight
                        text-white
                        sm:text-5xl
                    "
                >
                    Bana yaz.
                </h2>
            </div>

            <form
                onSubmit={onSubmit}
                className="space-y-8"
            >
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <FormField
                        label="Adın"
                        name="name"
                        value={form.name}
                        onChange={onChange}
                        placeholder="Adını yaz"
                    />

                    <FormField
                        label="E-posta"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={onChange}
                        placeholder="E-posta adresin"
                    />
                </div>

                <FormField
                    label="Mesajın"
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    placeholder="Mesajını yaz..."
                    textarea
                />

                <button
                    type="submit"
                    className="
                        group
                        inline-flex
                        items-center
                        gap-3
                        border-b
                        border-white/20
                        pb-2
                        text-xs
                        font-medium
                        text-white
                        transition-colors
                        hover:border-white
                    "
                >
                    Mesajı gönder

                    <ArrowUpRight
                        className="
                            h-4
                            w-4
                            transition-transform
                            duration-300
                            group-hover:-translate-y-0.5
                            group-hover:translate-x-0.5
                        "
                    />
                </button>
            </form>
        </div>
    );
}

function FormField({
                       label,
                       name,
                       type = "text",
                       value,
                       onChange,
                       placeholder,
                       textarea = false,
                   }) {
    return (
        <label className="block">
            <span
                className="
                    text-[9px]
                    font-medium
                    uppercase
                    tracking-[0.3em]
                    text-white/30
                "
            >
                {label}
            </span>

            {textarea ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    rows={5}
                    className="
                        mt-3
                        w-full
                        resize-none
                        border-b
                        border-white/[0.1]
                        bg-transparent
                        py-3
                        text-sm
                        text-white
                        outline-none
                        placeholder:text-white/20
                        transition-colors
                        focus:border-white/40
                    "
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="
                        mt-3
                        w-full
                        border-b
                        border-white/[0.1]
                        bg-transparent
                        py-3
                        text-sm
                        text-white
                        outline-none
                        placeholder:text-white/20
                        transition-colors
                        focus:border-white/40
                    "
                />
            )}
        </label>
    );
}

export default ContactSection;