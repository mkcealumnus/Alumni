import { useState, useEffect } from "react";

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'moto', 'who-we-are', 'pricing', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      let current = '';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            current = section === 'hero' ? 'home' : section;
            break;
          }
        }
      }

      // If no section matches, check if we are past the last section
      if (!current) {
        const lastSection = document.getElementById('contact');
        if (lastSection && scrollPosition >= lastSection.offsetTop + lastSection.offsetHeight) {
           current = 'contact';
        } else if (scrollPosition < (document.getElementById('hero')?.offsetTop || 0)) {
           current = 'home';
        }
      }

      if (current) {
        setActiveSection(current);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, target) => {
    e.preventDefault();
    const element = document.getElementById(
      target === "home" ? "hero" : target,
    );
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "home", icon: "ri-home-4-line", label: "Home" },
    { id: "about", icon: "ri-information-line", label: "About" },
    { id: "moto", icon: "ri-focus-3-line", label: "Our Moto" },
    { id: "who-we-are", icon: "ri-team-line", label: "Who We Are" },
    { id: "pricing", icon: "ri-price-tag-3-line", label: "Pricing" },
    { id: "contact", icon: "ri-mail-line", label: "Contact" },
  ];

  return (
    <div className="fixed left-5 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <nav className="bg-white dark-theme:bg-gray-900 border border-sand dark-theme:border-gray-800 rounded-2xl p-1.5 flex flex-col gap-0.5 shadow-sm">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`group relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200
              ${
                activeSection === item.id
                  ? "bg-primary text-white"
                  : "text-gray-500 dark-theme:text-gray-400 hover:bg-cream-dark dark-theme:hover:bg-gray-800 hover:text-gray-800 dark-theme:hover:text-gray-200"
              }`}
            onClick={(e) => handleNavClick(e, item.id)}
          >
            <i className={`${item.icon} text-lg`}></i>
            <span
              className="absolute left-12 px-3 py-1.5 rounded-lg bg-gray-900 dark-theme:bg-gray-700 text-white text-xs font-medium
              opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150
              whitespace-nowrap pointer-events-none"
            >
              {item.label}
            </span>
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
