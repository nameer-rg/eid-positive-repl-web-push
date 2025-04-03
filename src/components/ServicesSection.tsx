import React from "react"; // Ensure React is imported
import { motion } from "framer-motion";
import { Plane, Hotel, Compass, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

// Define Services Data
const services = [
  {
    icon: Plane,
    title: "Flight Bookings",
    description: "Find the best flights with our global airline partnerships.",
    link: "/services/flights",
  },
  {
    icon: FileText,
    title: "Visa Services",
    description: "Hassle-free visa processing for your desired destinations.",
    link: "/services/visa",
  },
  {
    icon: Hotel,
    title: "Hotel Reservations",
    description: "Luxurious stays at handpicked hotels worldwide.",
    link: "/services/hotels",
  },
  {
    icon: Compass,
    title: "Tour Packages",
    description: "Curated experiences that showcase the best of each destination.",
    link: "/services/tours",
  },
];

// Counter Item Component
const CounterItem = ({ start, end, title }: { start: number; end: number; title: string }) => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <div ref={ref} className="flex items-center gap-4 text-black">
      <h3 className="text-6xl font-bold flex items-center">
        {inView ? <CountUp start={start} end={end} duration={2} /> : "0"}
        <span className="text-3xl ml-1">+</span> {/* Adjusted size & alignment */}
      </h3>
      <p className="text-lg font-semibold font-brandonBold uppercase tracking-wide">{title}</p>
    </div>
  );
};


// Services Section Component
export default function ServicesSection() {
  return (
    <section className="section-padding" id="services">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-black font-bold font-brandonBold uppercase tracking-wider text-5xl">
            THE LUXURY TRAVEL EXPERTS
          </span>

          <p className="font-brandon mt-10 mb-20 text-muted-foreground max-w-2xl mx-auto text-lg tracking-wide">
            The world is vast, full of wonders. But information engulfs us. See this, do that, don’t
            miss this. It seems the more choice there is, the more overwhelmed we feel. What’s more,
            you’re never asked how you want to feel. In fact, you’re rarely asked anything. That’s
            not us. We are people. People who value human connection and thrive on connecting you to
            our vast world. A company of people renowned for planning remarkable and luxurious
            travel experiences.
          </p>

          <p className="mb-20 font-brandon text-muted-foreground max-w-2xl mx-auto text-2xl">
            So let’s begin. Let’s do something remarkable.
          </p>

          <span className="mt-20 mb-20 text-primary font-alternate uppercase tracking-wider text-5xl">
            Our Services
          </span>

          <h2 className="mt-10 text-4xl md:text-5xl font-brandonBold uppercase tracking-tight font-bold">
            Comprehensive Travel Solutions
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg font-brandon tracking-wide">
            We offer a complete range of travel services to make your journey seamless and
            memorable.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Link key={service.title} to={service.link} className="block">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-8 rounded-2xl border bg-card hover:bg-secondary/50 transition-colors"
              >
                <service.icon className="w-12 h-12 text-primary" />
                <h3 className="mt-4 text-xl font-semibold font-brandon uppercase tracking-wider">
                  {service.title}
                </h3>
                <p className="font-brandon mt-2 text-muted-foreground text-lg tracking-wide">
                  {service.description}
                </p>
                <div className="mt-4 flex items-center justify-start">
                  <span className="text-primary font-medium group-hover:text-primary/80 transition-colors inline-flex items-center">
                    Learn More
                    <span className="inline-block ml-1 relative top-[1px]">→</span>
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* COUNTER SECTION */}
        <section className="bg-white py-16 mt-20">
          <div className="group p-8 rounded-2xl border bg-card hover:bg-secondary/50 transition-colors container mx-auto flex flex-wrap justify-center gap-12">
            
            <CounterItem start={0} end={6} title="Years Of Experience" />
            <CounterItem start={0} end={300} title="Travel Packages" />
            <CounterItem start={0} end={6000} title="Total Travelers" />
          </div>
        </section>
      </div>
    </section>
  );
}
