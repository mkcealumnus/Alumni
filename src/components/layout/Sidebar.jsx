import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const location = useLocation();

  // Only show the section-tracking sidebar on the home page.
  // If we're on /auth, /admin, or /dashboard, we might want to hide it or act differently.
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      const sections = ['hero', 'advantage', 'features', 'how-it-works', 'testimonials', 'cta'];
      const scrollPosition = window.scrollY + 200; // Offset for better tracking
      
      let current = '';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            current = section;
            break;
          }
        }
      }

      // If we scroll past the bottom, highlight the last section
      if (!current) {
        const lastSection = document.getElementById('cta');
        if (lastSection && scrollPosition >= lastSection.offsetTop) {
           current = 'cta';
        } else if (scrollPosition < (document.getElementById('hero')?.offsetTop || 0)) {
           current = 'hero';
        }
      }

      if (current) {
        setActiveSection(current);
      }
    };

    handleScroll(); // Check on mount
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const handleNavClick = (e, target) => {
    e.preventDefault();
    if (!isHomePage) {
      window.location.href = `/#${target}`;
      return;
    }
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "hero", icon: "ri-home-4-line", label: "Home" },
    { id: "advantage", icon: "ri-shield-star-line", label: "Advantage" },
    { id: "features", icon: "ri-apps-2-line", label: "Features" },
    { id: "how-it-works", icon: "ri-guide-line", label: "How It Works" },
    { id: "testimonials", icon: "ri-chat-quote-line", label: "Impact" },
    { id: "cta", icon: "ri-arrow-right-up-line", label: "Join Now" },
  ];

  if (!isHomePage) {
    // If we're not on the home page, we can either hide the sidebar or render a back-to-home button.
    // For now, let's keep it minimal and just redirect to home.
    return null;
  }

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 w-20 z-50 hidden lg:flex justify-center">
      <nav className="bg-white/80 dark-theme:bg-[#18181A]/80 backdrop-blur-md border border-[#E5DCD5] dark-theme:border-gray-800 rounded-full p-2.5 flex flex-col items-center gap-3 shadow-lg shadow-black/5">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`group relative flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300
                ${
                  isActive
                    ? "bg-[#2C2926] dark-theme:bg-white text-white dark-theme:text-black shadow-md"
                    : "text-[#8C8985] dark-theme:text-gray-400 hover:bg-[#F2EBE5] dark-theme:hover:bg-[#2A2A2D] hover:text-[#2C2926] dark-theme:hover:text-white"
                }`}
              aria-label={item.label}
            >
              <i className={`${item.icon} text-[20px] transition-transform`}></i>
              
              {/* Tooltip */}
              <span
                className="absolute left-14 px-3 py-1.5 rounded-xl bg-[#2C2926] dark-theme:bg-white text-white dark-theme:text-black text-xs font-bold tracking-wide
                opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-x-2 group-hover:translate-x-0
                whitespace-nowrap pointer-events-none shadow-xl"
              >
                {item.label}
                {/* Arrow pointer for tooltip */}
                <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-transparent border-r-[#2C2926] dark-theme:border-r-white"></div>
              </span>
            </a>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
