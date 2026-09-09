import {
    FaInstagram,
    FaGoodreads,
} from "react-icons/fa";
import {FaXTwitter} from "react-icons/fa6";


const socialLinks = [
    {
        label: "Instagram",
        href: "#",
        icon: FaInstagram,
    },
    {
        label: "Goodreads",
        href: "#",
        icon: FaGoodreads,
    },
    {
        label: "X",
        href: "#",
        icon: FaXTwitter,
    },
];


function AboutAuthor() {
    return (
        <div className="flex h-full flex-col">
            <div>
                <div className="flex items-center gap-3">
                    <span className="text-[9px] font-medium uppercase tracking-[0.35em] text-white/30">
                        Hakkımda
                    </span>

                    <span className="h-px w-8 bg-white/15" />
                </div>

                <div className="mt-9">
                    <p
                        className="
                            max-w-[360px]
                            font-serif
                            text-3xl
                            leading-[1.12]
                            tracking-tight
                            text-white
                            sm:text-4xl
                        "
                    >
                        Hikâyeler,
                        <br />
                        karakterler ve
                        <br />
                        başka dünyalar.
                    </p>
                </div>
            </div>

            <div className="mt-10 flex items-center gap-4">
                <span className="text-[10px] text-white/20">
                    Takip et
                </span>

                <div className="h-px w-8 bg-white/10" />

                <div className="flex items-center gap-1">
                    {socialLinks.map((social) => {
                        const Icon = social.icon;

                        return (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={social.label}
                                className="
                                    group
                                    flex
                                    h-8
                                    w-8
                                    items-center
                                    justify-center
                                    text-white/30
                                    transition-all
                                    duration-300
                                    hover:text-white
                                "
                            >
                                <Icon
                                    className="
                                        text-[14px]
                                        transition-transform
                                        duration-300
                                        group-hover:-translate-y-0.5
                                    "
                                />
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default AboutAuthor;