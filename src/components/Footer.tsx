
import { MapPin, Phone, Mail, Instagram, MessageCircle, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const socialInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    content: "Positive Travel and Holidays, Malappuram, Kerala, India",
    action: "Get Directions",
    href: "https://www.google.com/maps/place/POSITIVE+TRAVEL+AND+HOLIDAYS/@10.877443,75.9829016,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba7b1196a6f0e15:0x8a8842a1bc3902c9!8m2!3d10.8774377!4d75.9854765!16s%2Fg%2F11lmqz43ly?entry=ttu"
  },
  {
    icon: Instagram,
    title: "Follow Us",
    content: "positivetravelandholidays",
    action: "View Profile",
    href: "https://www.instagram.com/positivetravelandholidays"
  },
  {
    icon: Facebook,
    title: "Facebook",
    content: "Positive Travel and Holidays",
    action: "Visit Page",
    href: "https://www.facebook.com/share/19rhFzkc4q/"
  }
];

const contactInfo = [
  {
    icon: Phone,
    content: "+91 94974 58282",
    href: "tel:+919497458282"
  },
  {
    icon: Mail,
    content: "positivetravelandholidays@gmail.com",
    href: "mailto:positivetravelandholidays@gmail.com"
  },
  {
    icon: MessageCircle,
    content: "+91 75939 46666",
    href: "https://wa.me/917593946666"
  }
];

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white font-brandon text-lg tracking-wider">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-brandonBold mb-4 uppercase tracking-wider">About Us</h3>
            <p className="text-gray-400 font-brandon text-xl tracking-wider ">
              Positive Travel and Holidays is dedicated to creating unforgettable travel experiences 
              for our clients. We specialize in personalized travel solutions and exceptional service.
            </p>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4 uppercase font-brandonBold tracking-wider">Quick Links</h3>
            <ul className="space-y-2">

              <li>
                <Link 
                  to="/support" 
                  className="text-gray-400 hover:text-white transition-colors font-brandon tracking-wider text-lg"
                >
                  Customer Support
                </Link>
              </li>
              
              <li><button onClick={() => scrollToSection('hero')} className="text-gray-400 hover:text-white transition-colors font-brandon tracking-wider text-lg">Home</button></li>
              <li><button onClick={() => scrollToSection('about')} className="text-gray-400 hover:text-white transition-colors font-brandon tracking-wider text-lg">About Us</button></li>
              <li><button onClick={() => scrollToSection('vision')} className="text-gray-400 hover:text-white transition-colors font-brandon tracking-wider text-lg">Our Vision</button></li>
              <li><button onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-white transition-colors font-brandon tracking-wider text-lg">Services</button></li>
              <li><button onClick={() => scrollToSection('destinations')} className="text-gray-400 hover:text-white transition-colors font-brandon tracking-wider text-lg">Destinations</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="text-gray-400 hover:text-white transition-colors text-lg font-brandon tracking-wider">Contact</button></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-2xl font-brandonBold mb-4 uppercase tracking-wider">Get In Touch</h3>
            <div className="space-y-4">
              {socialInfo.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.content}</span>
                </a>
              ))}
              {contactInfo.map((item) => (
                <a
                  key={item.content}
                  href={item.href}
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.content}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 font-brandonBold uppercase text-lg tracking-wider">
          <p>&copy; {new Date().getFullYear()} Positive Travel and Holidays. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
