import About from "@/components/shared/About";
import Arts from "@/components/shared/Arts";
import Footer from "@/components/shared/Footer";
import Hero from "@/components/shared/Hero";
<<<<<<< HEAD
import LocationDetails from "@/components/shared/LocationDetails";
=======
import AiFeatureDashBoard from "../ai/page";
>>>>>>> e63bf5fc7ca7a94bccbb6bc7f6c17de9accc30e5

export default function Home() {
  return (
    <div className="space-y-12">
      <Hero backgroundImage="/hero.png" />
<<<<<<< HEAD
      <About />
      <Arts />
      <LocationDetails />
      <Footer />
=======
      <Header />
      {/* <Arts /> */}
      <AiFeatureDashBoard />
>>>>>>> e63bf5fc7ca7a94bccbb6bc7f6c17de9accc30e5
    </div>
  );
}
