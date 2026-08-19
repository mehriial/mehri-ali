const Select = ({
                    children,
                    className = "",
                    ...props
                }) => {
    return (
        <select
            {...props}
            className={`
                rounded-md
                border
                border-white/10
                bg-background
                px-4
                py-2.5
                text-xs
                text-shadow-white/60
                outline-none
                transition-all
                duration-300
                focus:border-header-accent
                focus:ring-1
                focus:ring-header-accent/20
                ${className}
            `}
        >
            {children}
        </select>
    );
};

export default Select;