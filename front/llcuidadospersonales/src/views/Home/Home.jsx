import Contact from "../../components/primary/Contact"
// import Hero from "../../components/primary/CarouselNavigation"
import Carousel from "../../components/primary/CarouselNavigation"

const images = [
    'https://logrono.fisio-clinics.com/sites/default/files/field/image/masaje-relajante-fisioclinics-logrono.png',
    'https://via.placeholder.com/500',
    'https://via.placeholder.com/500',
];

function Home() {
    return (
        <>
            {/* <div>HOME</div> */}
            {/* <Hero /> */}
            <div className="container mt-10 mx-auto">
                <Carousel images={images} />
            </div>

            <Contact />
        </>
    )
}

export default Home