import Header from "./components/Header"
import Footer from "./components/Footer"
import ServiceCard from "./components/ServiceCard"
import ContactForm from "./components/ContactForm"
import ScrollButton from "./components/ScrollButton"
import { FaCloud, FaCogs, FaLaptopCode, FaComments, FaArrowRight } from "react-icons/fa"

export default function Home() {
  const services = [
    {
      title: "Platform Integration",
      description: "Seamlessly connect your existing systems with our integration solutions.",
      icon: <FaCogs className="text-4xl" />,
    },
    {
      title: "Cloud Deployment",
      description: "Migrate to the cloud with our secure and scalable deployment services.",
      icon: <FaCloud className="text-4xl" />,
    },
    {
      title: "Solutions Development",
      description: "Custom software solutions tailored to your business needs.",
      icon: <FaLaptopCode className="text-4xl" />,
    },
    {
      title: "IT Consultancy",
      description: "Expert advice to optimize your IT infrastructure and strategy.",
      icon: <FaComments className="text-4xl" />,
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Header />

      <main>
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 animate-pulse" />

          {/* Floating orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-full blur-3xl animate-spin custom-spin-duration"
          ></div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

          {/* Spotlight effect */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_70%)]" />

          <div className="container mx-auto px-6 relative z-10 pt-32">
            <div className="max-w-6xl mx-auto text-center">
              {/* Status badge */}
              <div className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white mb-8 border border-white/10 backdrop-blur-xl shadow-2xl">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-3"></div>
                Transforming Businesses Since 2016
              </div>

              {/* Main headline */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tight leading-none">
                <span className="block bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent animate-pulse">
                  REDEFINE
                </span>
                <span className="block text-white/90 mt-2">YOUR DIGITAL</span>
                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  FUTURE
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
                We don&apos;t just build software. We architect digital ecosystems that{" "}
                <span className="text-purple-300 font-semibold">revolutionize</span> how you do business. From
                cloud-native solutions to AI-powered integrations.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                <ScrollButton targetId="contact">
                  <span className="relative z-10 flex items-center text-lg font-bold">
                    Start Your Transformation
                    <FaArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </ScrollButton>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </section>

        <section id="services" className="py-24 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-white/70 mb-6 border border-white/30">
                Our Expertise
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-white">
                Comprehensive IT Solutions
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
                We provide end-to-end technology solutions designed to accelerate your business growth and digital
                transformation journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <ServiceCard
                  key={service.title}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-24 px-6 border-t border-white/30">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-white/70 mb-6 border border-white/30">
                Get In Touch
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-white">
                Ready to Transform Your Business?
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
                Let&apos;s discuss how our expert team can help you achieve your technology goals and drive your business
                forward.
              </p>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
