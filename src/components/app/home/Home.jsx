import Hero from "./Hero.jsx";
import FeaturedBooks from "./FeaturedBooks.jsx";
import ContactSection from "./ContactSection.jsx";

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