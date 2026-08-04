import { Mail, Phone, MapPin, Clock, Share2 } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center">
                <span className="font-bold text-secondary text-lg">MA</span>
              </div>
              <div>
                <span className="font-bold text-lg">Mamun&apos;s</span>
                <p className="text-xs text-white/80">Academy</p>
              </div>
            </div>
            <p className="text-sm text-white/80">
              Your trusted partner for international education. Study abroad with confidence.
            </p>
            <a 
              href="https://www.facebook.com/Mamunacademyofficial/" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition text-sm"
            >
              <Share2 className="h-5 w-5" />
              <span>Follow on Facebook</span>
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-white/80 hover:text-white transition">About Us</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition">Services</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition">Universities</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition">Blog</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition">Success Stories</a></li>
            </ul>
          </div>

          {/* Study Destinations */}
          <div>
            <h3 className="font-semibold mb-4">Study Destinations</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-white/80 hover:text-white transition">Study in UK</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition">Study in Canada</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition">Study in Australia</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition">Study in USA</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition">More Countries</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span className="text-white/80">5/12, Level 4, Block D, Lalamatia, Mohammadpur, Dhaka 1207</span>
              </li>
              <li className="flex gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <div className="flex flex-col text-white/80">
                  <a href="tel:+8801634000035" className="hover:text-white transition">+880 1634000035</a>
                  <a href="tel:+8801682626538" className="hover:text-white transition">+880 1682-626538</a>
                </div>
              </li>
              <li className="flex gap-2">
                <Mail className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <a href="mailto:info@mamunsacademy.com" className="text-white/80 hover:text-white transition break-all">
                  info@mamunsacademy.com
                </a>
              </li>
              <li className="flex gap-2">
                <Clock className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span className="text-white/80">Sat - Thu: 11 AM - 7 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/80">
              © 2024 Mamun&apos;s Academy. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-white/80 hover:text-white transition">Privacy Policy</a>
              <a href="#" className="text-white/80 hover:text-white transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
