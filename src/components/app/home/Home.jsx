import Hero from "./Hero";
import FeaturedBooks from "./FeaturedBooks";
import ContactSection from "./ContactSection";

function Home() {
    return (
        <div className="overflow-hidden">
            <Hero />

            <FeaturedBooks />


            <ContactSection />
        </div>
    );
}

export default Home;