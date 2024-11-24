import Arts from "@/components/shared/Arts";
import Header from "@/components/shared/Header";
import Hero from "@/components/shared/Hero";
import AiFeatureDashBoard from "../ai/page";

export default function Home() {
  return (
    <div className="space-y-12">
      <Hero backgroundImage="/hero.png" />
      <Header />
      {/* <Arts /> */}
      <AiFeatureDashBoard />
    </div>
  );
}
