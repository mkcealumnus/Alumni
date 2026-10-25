import { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  PlusCircle,
  Briefcase,
  MessageSquare,
  Calendar,
  User,
  Settings,
  LogOut,
  Bell,
  Menu,
  X,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../context/authContext";

export function AlumniDashboardLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { name: "Overview", href: "/alumni/dashboard", icon: LayoutDashboard },
    { name: "Student Directory", href: "/alumni/students", icon: Users },
    { name: "Mentorship Requests", href: "/alumni/mentorship", icon: GraduationCap },
    { name: "Share an Opportunity", href: "/alumni/opportunities", icon: PlusCircle },
    { name: "My Opportunities", href: "/alumni/opportunities", icon: Briefcase },
    { name: "Messages", href: "/alumni/messages", icon: MessageSquare },
    { name: "Events", href: "/alumni/events", icon: Calendar },
    { name: "My Profile", href: "/alumni/profile", icon: User },
    { name: "Settings", href: "/alumni/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F8F8F5] flex flex-col md:flex-row text-primary font-sans antialiased">
      {/* 1. DESKTOP ALUMNI SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border bg-surface shrink-0 h-screen sticky top-0 justify-between">
        <div>
          {/* Top Logo */}
          <div className="h-16 px-6 border-b border-border flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-sm bg-accent text-white font-bold text-sm flex items-center justify-center shadow-sm">
                AL
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base tracking-tight text-primary leading-none">
                  ALUMNUX
                </span>
                <span className="text-[10px] text-secondary font-mono">
                  ALUMNI PORTAL
                </span>
              </div>
            </Link>
            <Badge variant="outline" className="text-[10px] py-0 px-1.5 font-mono bg-accent/10 border-accent/30 text-accent">
              Alumni
            </Badge>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-10rem)]" aria-label="Alumni Navigation">
            {navItems.map((item, idx) => {
              // Highlight "My Opportunities" when active on /alumni/opportunities
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={`${item.name}-${idx}`}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-sm text-xs font-medium transition-colors ${
                    active
                      ? "bg-accent text-white font-semibold shadow-xs"
                      : "text-secondary hover:text-primary hover:bg-[#F2F2EC]"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? "text-white" : "text-secondary"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar User Footnote & Logout */}
        <div className="p-4 border-t border-border space-y-3 bg-[#F8F8F5]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-accent text-white font-bold text-xs flex items-center justify-center">
              {user?.initials || "JV"}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-primary truncate">
                {user?.fullName || "Jordan Vance"}
              </p>
              <p className="text-[10px] text-secondary truncate font-mono">
                {user?.company ? `${user.roleTitle || "Engineer"} @ ${user.company}` : "Verified Alumnus"}
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="w-full text-xs h-8 justify-start gap-2 border-border text-secondary hover:text-red-600 hover:border-red-200"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout Session</span>
          </Button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA WITH TOPBAR */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 border-b border-border bg-surface px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30">
          {/* Mobile hamburger + Page title */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="md:hidden p-2 rounded-sm border border-border text-primary hover:bg-surface"
              onClick={() => setMobileSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-sm font-bold text-primary">
                Alumni Mentorship &amp; Opportunity Hub
              </h1>
              <p className="hidden sm:block text-[10px] text-secondary font-mono">
                Guide Students &bull; Post Referrals &bull; Independent Platform
              </p>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3">
            <Link to="/career" className="hidden lg:flex">
              <Button variant="ghost" size="sm" className="text-xs h-8 text-secondary gap-1">
                <ExternalLink className="w-3 h-3" />
                <span>Public Career Board</span>
              </Button>
            </Link>

            {/* Notifications Popover */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-sm border border-border text-secondary hover:text-primary hover:bg-[#F8F8F5] relative focus:outline-none"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-surface border border-border rounded-md shadow-lg p-3 space-y-2.5 z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-border">
                    <span className="text-xs font-bold text-primary font-mono">Alumni Alerts</span>
                    <Badge variant="outline" className="text-[10px]">Demo</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 bg-[#F8F8F5] rounded-sm text-xs space-y-0.5">
                      <div className="font-semibold text-primary">New Mentorship Request</div>
                      <div className="text-[11px] text-secondary">Priya Dharshini requested guidance on System Design.</div>
                      <div className="text-[9px] font-mono text-secondary pt-0.5">10 mins ago</div>
                    </div>
                    <div className="p-2 bg-[#F8F8F5] rounded-sm text-xs space-y-0.5">
                      <div className="font-semibold text-primary">Opportunity Viewed</div>
                      <div className="text-[11px] text-secondary">Your Stripe referral posting reached 14 student views.</div>
                      <div className="text-[9px] font-mono text-secondary pt-0.5">2 hours ago</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Avatar & Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-sm hover:bg-[#F8F8F5] focus:outline-none border border-transparent hover:border-border"
              >
                <div className="w-8 h-8 rounded-sm bg-accent text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  {user?.initials || "JV"}
                </div>
                <div className="hidden sm:block text-left text-xs leading-none">
                  <div className="font-semibold text-primary">{user?.fullName || "Jordan Vance"}</div>
                  <div className="text-[10px] text-secondary mt-0.5">Alumni Mentor</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-secondary hidden sm:block" />
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-md shadow-lg py-1.5 z-50 text-xs">
                  <div className="px-3 py-2 border-b border-border">
                    <p className="font-semibold text-primary">{user?.fullName}</p>
                    <p className="text-[10px] text-secondary truncate">{user?.email}</p>
                  </div>
                  <Link
                    to="/alumni/profile"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-secondary hover:text-primary hover:bg-[#F8F8F5]"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    to="/alumni/settings"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-secondary hover:text-primary hover:bg-[#F8F8F5]"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Settings</span>
                  </Link>
                  <div className="border-t border-border mt-1 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        handleLogout();
                      }}
                      className="w-full text-left flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Nested Content Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* 3. MOBILE SIDEBAR DRAWER */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-72 bg-surface h-full flex flex-col justify-between p-4 shadow-xl z-50">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-sm bg-accent text-white font-bold text-xs flex items-center justify-center">
                    AL
                  </div>
                  <span className="font-bold text-sm">ALUMNUX</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-sm border border-border"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <nav className="py-4 space-y-1">
                {navItems.map((item, idx) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={`${item.name}-${idx}`}
                      to={item.href}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-sm text-xs font-medium ${
                        active
                          ? "bg-accent text-white font-semibold"
                          : "text-secondary hover:text-primary hover:bg-[#F8F8F5]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-border space-y-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setMobileSidebarOpen(false);
                  handleLogout();
                }}
                className="w-full text-xs justify-center gap-2 text-red-600"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout Demo</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
