const Input = ({
                   label,
                   className = "",
                   ...props
               }) => {
    return (
        <label className="block">
            {label && <span className="mb-2 block text-[9px] uppercase tracking-[0.2em] text-shadow-white/50">{label}</span>}
            <input
                {...props}
                className={`
                w-full
                rounded-md
                border
                border-white/10
                bg-transparent
                px-4
                py-2.5
                text-sm
                text-shadow-white
                outline-none
                transition-all
                duration-300
                placeholder:text-shadow-white/30
                focus:border-header-accent
                focus:ring-1
                focus:ring-header-accent/20
                ${className}
            `}
            />
        </label>
    );
};

export default Input;
