const Button = ({
                    children,
                    type = "button",
                    variant = "default",
                    className = "",
                    ...props
                }) => {
    const variants = {
        default: `
            rounded-md
            border
            border-white/10
            text-shadow-white/60
            hover:border-header-accent
            hover:text-header-accent
        `,

        primary: `
            rounded-md
            bg-header-accent
            text-white
            hover:bg-header-accent/90
        `,

        outline: `
            rounded-md
            border
            border-white/10
            text-shadow-white/50
            hover:border-header-accent
            hover:text-header-accent
        `,
    };

    return (
        <button
            type={type}
            className={`
                inline-flex
                items-center
                justify-center
                px-4
                py-2
                text-[10px]
                font-medium
                uppercase
                tracking-[0.18em]
                transition-all
                duration-300
                cursor-pointer
                ${variants[variant]}
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;