import React from "react";
import Link from "next/link";
import { FaFacebook, FaGithub, FaTwitter, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-3">IdeaVault</h2>
          <p className="text-sm text-slate-300">
            Share your startup ideas, explore innovations, and connect with
            creators worldwide.
          </p>
        </div>

        {/* Platform Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Platform</h3>
          <ul className="space-y-2 text-slate-300">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/ideas" className="hover:text-white">
                Ideas
              </Link>
            </li>
            <li>
              <Link href="/add-ideas" className="hover:text-white">
                Add Idea
              </Link>
            </li>
            <li>
              <Link href="/my-ideas" className="hover:text-white">
                My Ideas
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact + Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>

          <p className="text-slate-300 flex items-center gap-2 mb-2">
            <FaEnvelope /> support@ideavault.com
          </p>

          <div className="flex gap-4 mt-4 text-xl">
            <a href="#" className="hover:text-blue-400">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-sky-400">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-white">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700 text-center py-4 text-sm text-slate-400">
        © {new Date().getFullYear()} IdeaVault. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;