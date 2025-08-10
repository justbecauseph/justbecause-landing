import Header from './components/Header';
import Footer from './components/Footer';
import ServiceCard from './components/ServiceCard';
import ContactForm from './components/ContactForm';
import ScrollButton from './components/ScrollButton';
import { FaCloud, FaCogs, FaLaptopCode, FaComments } from 'react-icons/fa';
import Image from 'next/image';

export default function Home() {
  const services = [
    {
      title: 'Platform Integration',
      description: 'Seamlessly connect your existing systems with our integration solutions.',
      icon: <FaCogs className="text-4xl" />
    },
    {
      title: 'Cloud Deployment',
      description: 'Migrate to the cloud with our secure and scalable deployment services.',
      icon: <FaCloud className="text-4xl" />
    },
    {
      title: 'Solutions Development',
      description: 'Custom software solutions tailored to your business needs.',
      icon: <FaLaptopCode className="text-4xl" />
    },
    {
      title: 'IT Consultancy',
      description: 'Expert advice to optimize your IT infrastructure and strategy.',
      icon: <FaComments className="text-4xl" />
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-20 px-6">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/justbecauseph.png"
              alt="Technology background"
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <div className="container mx-auto relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Transform Your Business with <span className="text-blue-400">JustBecause</span>
              </h1>
              <p className="text-xl mb-10 text-blue-100">
                We deliver cutting-edge IT solutions including platform integration, 
                cloud deployment, and custom software development to drive your success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <ScrollButton targetId="contact">
                  Contact Us
                </ScrollButton>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 px-6 bg-gray-100">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We provide comprehensive IT solutions to help your business thrive in the digital landscape.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service) => (
                <ServiceCard
                  key={service.title}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 px-6 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Have questions or ready to start your project? Get in touch with our team.
              </p>
            </div>
            
            <ContactForm />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}