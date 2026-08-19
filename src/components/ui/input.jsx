const Input = ({
                   className = "",
                   ...props
               }) => {
    return (
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
    );
};

export default Input;