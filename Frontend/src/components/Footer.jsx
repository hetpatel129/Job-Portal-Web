import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Briefcase, Mail, MapPin, Phone } from "lucide-react";

function Footer() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 transition-colors duration-300">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ── Brand column ── */}
          <div className="space-y-4">
            <button onClick={() => navigate("/")} className="flex items-center gap-1">
              <span className="text-2xl font-extrabold text-indigo-400">Job</span>
              <span className="text-2xl font-extrabold text-red-400">Portal</span>
            </button>
            <p className="text-sm text-gray-400 leading-relaxed">
              Empowering careers and connecting talent with opportunity. Your next milestone starts here.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 pt-1">
              {[
                { icon: FaFacebook,  href: "#", hover: "hover:text-blue-400",  label: "Facebook"  },
                { icon: FaTwitter,   href: "#", hover: "hover:text-sky-400",   label: "Twitter"   },
                { icon: FaLinkedin,  href: "#", hover: "hover:text-blue-500",  label: "LinkedIn"  },
                { icon: FaInstagram, href: "#", hover: "hover:text-pink-400",  label: "Instagram" },
                { icon: FaGithub,    href: "#", hover: "hover:text-white",     label: "GitHub"    },
              ].map(({ icon: Icon, href, hover, label }) => (
                <a key={label} href={href} aria-label={label}
                  className={`w-9 h-9 rounded-lg bg-gray-800 dark:bg-gray-900 flex items-center justify-center text-gray-400 ${hover} hover:bg-gray-700 dark:hover:bg-gray-800 transition`}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Quick links ── */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { to: "/",          label: "Home"       },
                { to: "/about-us",  label: "About Us"   },
                { to: "/contact-us",label: "Contact Us" },
                { to: "/login",     label: "Login"      },
                { to: "/signup",    label: "Sign Up"    },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to}
                    className="text-sm text-gray-400 hover:text-indigo-400 transition flex items-center gap-1.5 group">
                    <span className="w-1 h-1 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── For job seekers ── */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">For Job Seekers</h3>
            <ul className="space-y-2.5">
              {[
                "Browse Jobs",
                "Job Categories",
                "Career Resources",
                "Resume Tips",
                "Interview Prep",
              ].map((item) => (
                <li key={item}>
                  <span className="text-sm text-gray-400 hover:text-indigo-400 transition cursor-pointer flex items-center gap-1.5 group">
                    <span className="w-1 h-1 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition" />
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin size={15} className="text-indigo-400 mt-0.5 flex-shrink-0" />
                Ahmedabad, Gujarat, India
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail size={15} className="text-indigo-400 flex-shrink-0" />
                support@jobportal.com
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone size={15} className="text-indigo-400 flex-shrink-0" />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Briefcase size={15} className="text-indigo-400 flex-shrink-0" />
                Mon – Fri, 9am – 6pm IST
              </li>
            </ul>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="mt-12 border-t border-gray-800 dark:border-gray-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>
            &copy; {year}{" "}
            <span className="text-indigo-400 font-semibold">Job Portal</span>.
            All rights reserved.
          </p>
          <p>
            Designed &amp; built by{" "}
            <span className="text-white font-semibold">Het Patel</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
