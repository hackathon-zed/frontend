import Arts from "@/components/shared/Arts";
import Header from "@/components/shared/Header";
import Hero from "@/components/shared/Hero";
import TranslationButton from "@/components/floating_window/TranslationButton";
import { BsTranslate } from "react-icons/bs";
export default function Home() {
  return (
    <div className="space-y-12">
      <Hero backgroundImage="/hero.png" />
      <Header />
      <Arts />
      <div className="absolute z-50">
      <h1 className="text-center mt-10">Speech Translation App</h1>
      <TranslationButton />
    </div>
    </div>
  );
}
