import About from "@/components/shared/About";
import Footer from "@/components/shared/Footer";
import Hero from "@/components/shared/Hero";
import LocationDetails from "@/components/shared/LocationDetails";

export default function Home() {
  return (
    <div className="space-y-12">
      <Hero backgroundImage="/hero.png" />
      <About />
      {/* <Arts /> */}
      <LocationDetails />
      <Footer />
    </div>
  );
}
