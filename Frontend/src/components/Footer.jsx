import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Briefcase, Mail, MapPin, Phone } from "lucide-react";

function Footer() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 dark:from-black dark:via-gray-950 dark:to-black text-gray-300 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      {/* Main footer content */}
      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand column */}
          <div className="space-y-5">
            <button onClick={() => navigate("/")} className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">JobPortal</span>
            </button>
            <p className="text-sm text-gray-400 leading-relaxed">
              Connecting talent with opportunity. Your career journey starts here with thousands of opportunities waiting for you.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 pt-2">
              {[
                { icon: FaFacebook,  href: "#", hover: "hover:bg-blue-600",  label: "Facebook"  },
                { icon: FaTwitter,   href: "#", hover: "hover:bg-sky-500",   label: "Twitter"   },
                { icon: FaLinkedin,  href: "#", hover: "hover:bg-blue-700",  label: "LinkedIn"  },
                { icon: FaInstagram, href: "#", hover: "hover:bg-pink-600",  label: "Instagram" },
                { icon: FaGithub,    href: "#", hover: "hover:bg-gray-700",  label: "GitHub"    },
              ].map(({ icon: Icon, href, hover, label }) => (
                <a key={label} href={href} aria-label={label}
                  className={`w-10 h-10 rounded-xl bg-gray-800/50 backdrop-blur-sm flex items-center justify-center text-gray-400 ${hover} hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg`}>
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { to: "/",          label: "Home"       },
                { to: "/about-us",  label: "About Us"   },
                { to: "/contact-us",label: "Contact Us" },
                { to: "/login",     label: "Login"      },
                { to: "/signup",    label: "Sign Up"    },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to}
                    className="text-sm text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-2 group">
                    <svg className="w-4 h-4 text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For job seekers */}
          <div className="space-y-5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></span>
              For Job Seekers
            </h3>
            <ul className="space-y-3">
              {[
                { to: "/jobs", label: "Browse Jobs" },
                { to: "/browse", label: "Job Categories" },
                { label: "Career Resources" },
                { label: "Resume Tips" },
                { label: "Interview Prep" },
              ].map((item, i) => (
                <li key={i}>
                  {item.to ? (
                    <Link to={item.to} className="text-sm text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-2 group">
                      <svg className="w-4 h-4 text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-sm text-gray-400 hover:text-indigo-400 transition-colors cursor-pointer flex items-center gap-2 group">
                      <svg className="w-4 h-4 text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></span>
              Get In Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-400 group hover:text-indigo-400 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-gray-800/50 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600/20 transition-colors">
                  <MapPin size={16} className="text-indigo-400" />
                </div>
                <span className="pt-1.5">Ahmedabad, Gujarat, India</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400 group hover:text-indigo-400 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-gray-800/50 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600/20 transition-colors">
                  <Mail size={16} className="text-indigo-400" />
                </div>
                <span className="pt-1.5">support@jobportal.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400 group hover:text-indigo-400 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-gray-800/50 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600/20 transition-colors">
                  <Phone size={16} className="text-indigo-400" />
                </div>
                <span className="pt-1.5">+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400 group hover:text-indigo-400 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-gray-800/50 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600/20 transition-colors">
                  <Briefcase size={16} className="text-indigo-400" />
                </div>
                <span className="pt-1.5">Mon – Fri, 9am – 6pm IST</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-gray-800/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              &copy; {year} <span className="text-indigo-400 font-semibold">JobPortal</span>. All rights reserved.
            </p>
            <p className="text-sm text-gray-500">
              Designed &amp; Developed by <span className="text-white font-semibold">Het Patel &amp; Srushti Nayi</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
