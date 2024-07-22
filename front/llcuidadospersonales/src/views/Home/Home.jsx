import Contact from "../../components/primary/Contact"
import Hero from "../../components/primary/CarouselNavigation"

const images = [
    'https://logrono.fisio-clinics.com/sites/default/files/field/image/masaje-relajante-fisioclinics-logrono.png',
    'https://via.placeholder.com/500',
    'https://via.placeholder.com/500',
];

function Home() {
    return (
        <>
            <Hero />
            <Contact />
        </>
    )
}

export default Home