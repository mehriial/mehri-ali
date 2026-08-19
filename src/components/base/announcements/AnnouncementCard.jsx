const AnnouncementCard = ({
                              date,
                              title,
                              content,
                          }) => {
    return (
        <article className="
            border-b
            border-white/10
            py-16
            first:pt-0
        ">

            <p className="
                text-[9px]
                uppercase
                tracking-[0.25em]
                text-header-accent
            ">
                {date}
            </p>

            <h2 className="
                mt-4
                font-heading
                text-2xl
                sm:text-3xl
            ">
                {title}
            </h2>

            <p className="
                mt-4
                max-w-2xl
                text-sm
                leading-7
                text-shadow-white/50
            ">
                {content}
            </p>

        </article>
    );
};

export default AnnouncementCard;