"use client";

import { useState, useEffect, useRef } from "react";
import { ExternalLink, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/constants";
import CustomButton from "@/components/ui/customButton";
import { CloseMenu, MobileMenu } from "./MobileMenu";

const Header = () => {
  const [activeLink, setActiveLink] = useState<string>(NAV_LINKS[0].label);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateIndicator = () => {
      const activeItem = document.getElementById(`nav-${activeLink}`);
      if (activeItem && navRef.current) {
        const { offsetLeft, offsetWidth } = activeItem;
        setIndicatorStyle({
          left: offsetLeft,
          width: offsetWidth,
        });
      }
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);

    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeLink]);

  return (
    <nav className="bg-background sticky top-0 z-50 border-b">
      {/* Desktop Navigation */}
      <div
        ref={navRef}
        className="max-w-7xl mx-auto px-6 py-4 flex justify-between relative"
      >
        <Link
          href="#home"
          className="flex md:flex-1"
          onClick={() => setActiveLink("Home")}
        >
          {/* <Image src="/logo.svg" width={100} height={100} alt="Logo" /> */}
          <p className="h2">Logo</p>
        </Link>
        {/* Links */}
        <div className="space-x-8 hidden md:flex items-center relative">
          {NAV_LINKS.map((link) => (
            <Link
              href={`${!link.target ? "#" : ""}${link.to}`}
              id={`nav-${link.label}`}
              key={link.label}
              target={link.target}
              onClick={() => {
                if (!link.target) setActiveLink(link.label);
                return setIsMenuOpen(false);
              }}
              className={`text-lg flex gap-2 font-semibold cursor-pointer transition-colors duration-200 relative 
                ${
                  activeLink === link.label
                    ? "text-blue-500"
                    : "text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                }`}
            >
              {link.label} {link.target && <ExternalLink />}
            </Link>
          ))}
          {/* Active Link Indicator */}
          <span
            className="absolute top-full h-0.5 bg-blue-500 transition-all duration-300"
            style={{
              left: `${indicatorStyle.left - 32}px`,
              width: `${indicatorStyle.width}px`,
            }}
          />
        </div>
        {/* Mobile Navigation */}
        <div className="md:hidden">
          <CustomButton
            variant="outline"
            onClick={() => setIsMenuOpen(true)}
            size="iconOnly"
          >
            <Menu />
          </CustomButton>

          <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
            <CloseMenu onClose={() => setIsMenuOpen(false)} />
            <a href="#home" className="flex md:flex-1">
              <Image src="/logo.svg" height={100} width={100} alt="Logo" />
            </a>
            <div className="space-y-8 flex flex-col min-h-[80vh] items-center justify-center">
              {NAV_LINKS.map((link) => (
                <a
                  href={`${!link.target ? "#" : ""}${link.to}`}
                  id={`nav-${link.label}`}
                  key={link.label}
                  target={link.target}
                  onClick={() => {
                    if (!link.target) setActiveLink(link.label);
                    return setIsMenuOpen(false);
                  }}
                  className={`text-lg flex gap-2 font-semibold cursor-pointer transition-colors duration-200 relative 
                ${
                  activeLink === link.label
                    ? "text-blue-500"
                    : "text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
                }`}
                >
                  {link.label} {link.target && <ExternalLink />}
                </a>
              ))}
            </div>
            <a
              className="text-center"
              href="https://sidlabs.net/"
              target="_blank"
            >
              Powered by Sidlabs
            </a>
          </MobileMenu>
        </div>
      </div>
    </nav>
  );
};

export default Header;
