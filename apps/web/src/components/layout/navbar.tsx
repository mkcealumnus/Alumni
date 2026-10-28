import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/authContext";

export function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Our Goal", href: "/our-goal" },
    { name: "Career", href: "/career" },
    { name: "Contact", href: "/contact" },
  ];

  const dashboardPath =
    user?.role === "student" ? "/student/dashboard" : "/alumni/dashboard";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-[#F8F8F5]/95 backdrop-blur-sm">
      {/* Top Advisory Banner (Independent Operation) */}
      <div className="bg-[#171717] text-[#D8D8D2] px-4 sm:px-6 2xl:px-10 py-1 text-[11px] font-mono tracking-tight flex items-center justify-between">
        <div className="flex items-center gap-2 truncate">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="truncate">
            ALUMNUX INDEPENDENT NETWORK &bull; ADMINISTERED BY 3 SENIOR ALUMNI &bull; NON-INSTITUTIONAL
          </span>
        </div>
        <div className="hidden md:flex items-center gap-3 text-[10px] text-[#A8A8A0] shrink-0">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Demo Active
          </span>
          <span className="border-l border-[#333] pl-3">STUDENT &bull; ALUMNI PORTAL</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Wordmark */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            aria-label="Alumnux Home"
          >
            <div className="w-8 h-8 rounded-sm bg-accent text-white flex items-center justify-center font-bold text-sm tracking-tighter shadow-sm">
              AL
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-primary leading-none group-hover:text-accent transition-colors">
                ALUMNUX
              </span>
              <span className="text-[10px] text-secondary font-mono tracking-tight">
                CAREER NETWORK
              </span>
            </div>
          </Link>

          <Badge
            variant="outline"
            className="hidden sm:inline-flex text-[10px] py-0 px-2 bg-surface text-secondary border-border"
          >
            Release 1.0
          </Badge>
        </div>

        {/* Primary Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-1 lg:gap-2 text-xs font-medium"
          aria-label="Main Navigation"
        >
          {navLinks.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`px-3 py-1.5 rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                isActive(item.href)
                  ? "bg-surface text-primary border border-border font-semibold shadow-subtle"
                  : "text-secondary hover:text-primary hover:bg-[#EFEFEA]/60"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right Desktop Actions */}
        <div className="hidden md:flex items-center gap-2.5">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              <Link to={dashboardPath}>
                <Button
                  size="sm"
                  className="gap-2 text-xs h-9 font-medium"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>
                    {user.role === "student" ? "Student Dashboard" : "Alumni Dashboard"}
                  </span>
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-xs h-9 gap-1.5 text-secondary hover:text-primary"
                title="Log out of demo session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">Logout</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-9 px-3.5 font-medium border-border hover:bg-surface"
                >
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  size="sm"
                  className="text-xs h-9 px-4 font-semibold shadow-subtle gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-sky-200" />
                  <span>Register</span>
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          {isAuthenticated && user && (
            <Link to={dashboardPath}>
              <div className="w-7 h-7 rounded-sm bg-accent text-white font-bold text-xs flex items-center justify-center">
                {user.initials}
              </div>
            </Link>
          )}
          <button
            type="button"
            className="p-2 rounded-sm border border-border text-primary hover:bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-[#F8F8F5] px-4 pt-3 pb-6 space-y-3 animate-in fade-in duration-150">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-sm text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-surface text-primary border border-border font-semibold"
                    : "text-secondary hover:text-primary hover:bg-[#EFEFEA]"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-border flex flex-col gap-2">
            {isAuthenticated && user ? (
              <>
                <div className="p-2.5 rounded-sm bg-surface border border-border flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-primary">{user.fullName}</p>
                    <p className="text-[11px] text-secondary capitalize">{user.role} Demo Account</p>
                  </div>
                  <Badge variant="outline" className="text-[10px]">Active</Badge>
                </div>
                <Link
                  to={dashboardPath}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full"
                >
                  <Button className="w-full text-xs h-9 justify-center gap-2">
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    Enter {user.role === "student" ? "Student" : "Alumni"} Dashboard
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-xs h-9 text-secondary justify-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </Button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full"
                >
                  <Button variant="outline" className="w-full text-xs h-9">
                    Login
                  </Button>
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full"
                >
                  <Button className="w-full text-xs h-9">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
