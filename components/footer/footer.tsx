"use client";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement subscribe functionality
    console.log("Subscribing email:", email);
    setEmail("");
  };

  const footerLinks = {
    about: [
      { label: "About Us", href: "/about" },
      { label: "Our Story", href: "/story" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
    ],
    help: [
      { label: "Customer Service", href: "/help" },
      { label: "Shipping & Returns", href: "/shipping" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
    contact: {
      phone: "+91 1234567890",
      email: "contact@yourstore.com",
      address: "123, XYZ Street, ABC Colony, New Delhi, India",
    },
    social: [
      { icon: Facebook, label: "Facebook", href: "#" },
      { icon: Instagram, label: "Instagram", href: "#" },
      { icon: Twitter, label: "Twitter", href: "#" },
      { icon: Youtube, label: "YouTube", href: "#" },
    ],
  };

  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">About Us</h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Help</h3>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-gray-600">
                <Phone className="h-5 w-5" />
                <span>{footerLinks.contact.phone}</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-600">
                <Mail className="h-5 w-5" />
                <span>{footerLinks.contact.email}</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-600">
                <MapPin className="h-5 w-5 mt-1" />
                <span>{footerLinks.contact.address}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Stay Updated
            </h3>
            <p className="text-gray-600">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 min-w-0 px-4 py-2 text-sm text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Subscribe
                </button>
              </div>
            </form>

            {/* Social Links */}
            <div className="pt-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                Follow Us
              </h4>
              <div className="flex space-x-4">
                {footerLinks.social.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="text-gray-400 hover:text-gray-900 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-6 w-6" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Shree Balaji Jewellers. All rights
              reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Terms of Service
              </Link>
              <Link
                href="/sitemap"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
