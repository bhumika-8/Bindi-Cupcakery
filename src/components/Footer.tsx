import { FaInstagram, FaFacebook, FaWhatsapp, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa"
import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer id="contact" className="bg-pink-50 text-gray-700 py-12 relative scroll-mt-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and About */}
          <div className="text-center md:text-left">
            <Image
              src="/bindis.png"
              alt="Bindi's Cupcakery Logo"
              width={150}
              height={150}
              className="mx-auto md:mx-0 mb-4"
            />
            <p className="mt-2 text-sm">Delighting taste buds with our handcrafted, pure veg desserts.</p>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-xl mb-4 text-pink-600">Contact Us</h3>
            <div className="space-y-2">
              <p className="flex items-center justify-center md:justify-start">
                <FaPhone className="mr-2 text-pink-500" />
                <a href="tel:+919876543210" className="hover:text-pink-600 transition-colors">
                  +91 98765 43210
                </a>
              </p>
              <p className="flex items-center justify-center md:justify-start">
                <FaEnvelope className="mr-2 text-pink-500" />
                <a href="mailto:contact@bindiscupcakery.com" className="hover:text-pink-600 transition-colors">
                  contact@bindiscupcakery.com
                </a>
              </p>
              <p className="flex items-center justify-center md:justify-start">
                <FaMapMarkerAlt className="mr-2 text-pink-500" />
                <span>123 Cupcake Street, Sweet City, 395007</span>
              </p>
              <Link
                href="https://goo.gl/maps/your-google-maps-link"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-pink-600 hover:text-pink-700 transition-colors"
              >
                View on Google Maps
              </Link>
            </div>
          </div>

          {/* Quick Links and Social Media */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-xl mb-4 text-pink-600">Quick Links</h3>
            <ul className="space-y-2 mb-6">
              <li>
                <Link href="/menu" className="hover:text-pink-600 transition-colors">
                  Our Menu
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-pink-600 transition-colors">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-pink-600 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
            <h3 className="font-bold text-xl mb-4 text-pink-600">Follow Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="https://instagram.com/bindis_cupcakery"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-pink-500 transition-colors"
              >
                <FaInstagram />
              </a>
              <a
                href="https://facebook.com/bindi.malji"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-blue-600 transition-colors"
              >
                <FaFacebook />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Bindi's Cupcakery. All rights reserved.</p>
        </div>
      </div>

      {/* Floating WhatsApp Icon */}
      <a
        href="https://wa.me/919923810809"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 bg-green-500 p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-3xl text-white" />
      </a>

      {/* Decorative Elements */}
      <div
        className="absolute left-0 top-0 w-16 h-16 bg-contain bg-no-repeat opacity-20"
        style={{ backgroundImage: "url('/.png')" }}
      ></div>
      <div
        className="absolute right-0 bottom-0 w-16 h-16 bg-contain bg-no-repeat opacity-20"
        style={{ backgroundImage: "url('/cupcake-icon.png')" }}
      ></div>
    </footer>
  )
}

export default Footer
