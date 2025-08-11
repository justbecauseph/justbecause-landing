"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Obfuscate from "react-obfuscate"
import { FaEnvelope, FaPhone, FaArrowRight } from "react-icons/fa"
import Image from "next/image"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
      <header
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "top-0 bg-black/80 backdrop-blur-2xl border-b border-white/5"
            : "top-16 lg:top-20 bg-black/40 backdrop-blur-xl"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="group flex items-center">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <Image
                    src="/justbecause-logo.png"
                    alt="JustBecause Research & Development"
                    width={275}
                    height={44}
                    className="relative h-10 w-auto transition-all duration-300 group-hover:scale-105"
                    priority
                  />
                </div>
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-2">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full p-1 shadow-2xl">
                <div className="flex items-center space-x-1">
                  <Link
                    href="/#services"
                    className="px-6 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 font-medium"
                  >
                    Services
                  </Link>
                  <span className="text-white/60">|</span>
                  <Link
                    href="/#contact"
                    className="px-6 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 font-medium"
                  >
                    Contact
                  </Link>
                </div>
              </div>

              <Link
                href="/#contact"
                className="ml-4 group relative bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-full hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 font-semibold overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-2">
                  <span>Get Started</span>
                  <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Link>
            </nav>

            <button
              type="button"
              className="md:hidden relative w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                <div
                  className={`absolute w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "rotate-45" : "-translate-y-1.5"}`}
                ></div>
                <div
                  className={`absolute w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
                ></div>
                <div
                  className={`absolute w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "-rotate-45" : "translate-y-1.5"}`}
                ></div>
              </div>
            </button>
          </div>
        </div>

        <div
          className={`md:hidden transition-all duration-500 ${
            isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="bg-black/95 backdrop-blur-2xl border-t border-white/10">
            <div className="container mx-auto px-6 py-8">
              <div className="space-y-6">
                <Link
                  href="/#services"
                  className="block text-2xl font-semibold text-white/80 hover:text-white transition-colors duration-300 py-3"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </Link>

                <Link
                  href="/#contact"
                  className="block text-2xl font-semibold text-white/80 hover:text-white transition-colors duration-300 py-3"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>

                <div className="pt-8 border-t border-white/10 space-y-4">
                  <div className="flex items-center text-white/60 hover:text-white/80 transition-colors duration-300">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center mr-4">
                      <FaEnvelope className="text-purple-400" />
                    </div>
                    <span className="font-medium"><Obfuscate email="info@justbecause.ph" /></span>
                  </div>
                  <div className="flex items-center text-white/60 hover:text-white/80 transition-colors duration-300">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center mr-4">
                      <FaPhone className="text-blue-400" />
                    </div>
                    <span className="font-medium"><Obfuscate tel="+63 952 480 7466" /></span>
                  </div>
                </div>

                <div className="pt-6">
                  <Link
                    href="/#contact"
                    className="block w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-center px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
  )
}
