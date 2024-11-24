"use client";

import { FC, useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import { Globe } from "lucide-react";
import Container from "@/components/ui/container";
import CustomButton from "@/components/ui/customButton";
import LearnMore from "./LearnMore";
import Link from "next/link";

interface HeroProps {
  backgroundImage: string;
}

const Hero: FC<HeroProps> = ({ backgroundImage }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden" id="home">
      <div
        className="absolute inset-0 bg-cover bg-fixed bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPositionY: `-${scrollY * 0.4}px`,
          filter: "brightness(0.8)",
          opacity: 0.2,
        }}
      />
      <Container className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <h1 className="h1 font-bold animate-fade-in-up flex flex-col gap-2">
          <span>Mithila, an ancient culture</span>
          <span>that is home to many traditions, festivals, and art forms</span>
        </h1>
        <p className="text-lg md:text-xl animate-fade-in-up-1">
          Mithila art is a well-known art style that originated in the Mithila
          region. The art is characterized by its bright colors and simple,
          feminine shapes. It is often used to decorate homes during festivals
          and ceremonies. The art is said to have originated during the wedding
          of Sita and Rama, as told in the epic Ramayana.
        </p>
        <CustomButton
          size="default"
          iconRight={<Globe />}
          className="animate-fade-in-up-2"
        >
          <Link href="#about">Explore</Link>
        </CustomButton>
        <LearnMore label="Scroll for more" className="animate-fade-in-up-3" />
      </Container>

      {/* Skewed Bottom Section */}
      <div className="bg-background p-6 -skew-y-6 md:-skew-y-3 h-32 md:h-40 -mt-12 md:-mt-16 z-10" />
    </div>
  );
};

export default Hero;
