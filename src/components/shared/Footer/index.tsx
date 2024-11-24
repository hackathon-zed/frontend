import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-background text-gray-600 ">
      <div className="border-b"></div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-gray-600 text-lg font-semibold">MithiliArt</h3>
            <p className="text-sm">
              Creating innovative solutions for tomorrow&apos;s challenges.
              Building a better future together.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-gray-600 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#about"
                  className="text-sm hover:text-gray-800  transition-colors"
                >
                  About Culture
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sm hover:text-gray-800  transition-colors"
                >
                  Explore
                </Link>
              </li>
              <li>
                <Link
                  href="/auth"
                  className="text-sm hover:text-gray-800  transition-colors"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm hover:text-gray-800 hover:scale-120 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-gray-600 text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">123 Business Ave, Suite 100</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span className="text-sm">contact@company.com</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-gray-600 text-lg font-semibold">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-gray-800  transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-gray-800  transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-gray-800  transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <Link href="#" className="hover:text-gray-800  transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">
              © {new Date().getFullYear()} Company Name. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-sm hover:text-gray-800  transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm hover:text-gray-800  transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
