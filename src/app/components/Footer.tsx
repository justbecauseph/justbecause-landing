"use client"

import { useState, useEffect } from "react"
import Obfuscate from "react-obfuscate"
import Image from "next/image"
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaTwitter, FaGithub, FaRocket } from "react-icons/fa"

export default function Footer() {
  const [loadTime, setLoadTime] = useState<number | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && window.performance) {
      const navigationTiming = window.performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
      if (navigationTiming) {
        setLoadTime(Math.round(navigationTiming.duration));
      }
    }
  }, [])

  return (
    <footer className="relative bg-black border-t border-white/10 text-white overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 via-black to-black"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 container mx-auto max-w-7xl px-6 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company info */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Architecting Tomorrow&apos;s Digital Solutions
            </h3>
            <p className="text-white/70 leading-relaxed mb-8 max-w-md">
              We build scalable cloud, web, and AI solutions to drive your business forward. Partner with us for reliable technology and seamless digital transformation.
            </p>

            {/* Certifications */}
            <div className="flex items-center space-x-6">
              <div className="group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Image
                  src="/digitalocean.svg"
                  alt="DigitalOcean Partner"
                  width={120}
                  height={40}
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, 120px"
                  className="relative opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <div className="group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Image
                  src="/gcp.png"
                  alt="Google Cloud Professional"
                  width={40}
                  height={40}
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, 40px"
                  className="relative opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </div>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Get In Touch</h4>
            <div className="space-y-4">
              <div className="group flex items-center text-white/70 hover:text-white transition-colors duration-300">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center mr-4 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                  <FaEnvelope className="text-purple-400" />
                </div>
                <div>
                  <div className="text-sm text-white/50">Email</div>
                  <span className="font-semibold"><Obfuscate email="info@justbecause.ph" /></span>
                </div>
              </div>

              <div className="group flex items-center text-white/70 hover:text-white transition-colors duration-300">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mr-4 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                  <FaPhone className="text-blue-400" />
                </div>
                <div>
                  <div className="text-sm text-white/50">Phone</div>
                  <span className="font-semibold"><Obfuscate tel="+63 952 480 7466" /></span>
                </div>
              </div>

              <div className="group flex items-center text-white/70 hover:text-white transition-colors duration-300">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mr-4 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                  <FaMapMarkerAlt className="text-pink-400" />
                </div>
                <div>
                  <div className="text-sm text-white/50">Location</div>
                  <div className="font-semibold">Philippines</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
            <div className="space-y-3">
              <a
                href="#services"
                className="block text-white/70 hover:text-purple-400 transition-colors duration-300 font-medium"
              >
                Our Services
              </a>
              <a
                href="#contact"
                className="block text-white/70 hover:text-blue-400 transition-colors duration-300 font-medium"
              >
                Start a Project
              </a>
            </div>

            {/* Social links */}
            <div className="mt-8">
              <h5 className="text-sm font-semibold text-white/80 mb-4 uppercase tracking-wider">Follow Us</h5>
              <div className="flex space-x-4">
                <a
                  href="https://x.com/justbecauseph" title="Twitter"
                  className="w-10 h-10 bg-white/5 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 border border-white/10 hover:border-white/20"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://github.com/justbecauseph/" title="GitHub"
                  className="w-10 h-10 bg-white/5 hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 border border-white/10 hover:border-white/20"
                >
                  <FaGithub />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center text-white/60 mb-4 md:mb-0">
              <FaRocket className="mr-2 text-purple-400" />
              <span className="text-sm">
                © {new Date().getFullYear()} JustBecause IT Solutions
              </span>
            </div>

            <div className="flex items-center space-x-6 text-sm text-white/60">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                  {loadTime !== null && (
                      <>
                          <span>Page loaded in: {loadTime}ms</span>
                      </>
                  )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
