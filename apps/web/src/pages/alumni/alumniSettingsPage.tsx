import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Shield, RefreshCw, CheckCircle2 } from "lucide-react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

export default function AlumniSettingsPage() {
  const { loginAsDemo, logout } = useAuth();
  const navigate = useNavigate();
  const [maxMentees, setMaxMentees] = useState("6");
  const [hoursPerMonth, setHoursPerMonth] = useState("8");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSwitchToStudent = async () => {
    await loginAsDemo("student");
    navigate("/student/dashboard");
  };

  const handleResetDemo = () => {
    localStorage.removeItem("alumnux_demo_session");
    logout();
    navigate("/login");
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary">
            Alumni Mentor Settings
          </h1>
          <p className="text-xs text-secondary">
            Configure mentorship availability, capacity caps, notifications, and demo account switching.
          </p>
        </div>
        <Badge variant="outline" className="text-xs font-mono self-start sm:self-auto">
          Alumni Settings
        </Badge>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-950 rounded-sm flex items-center gap-2 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Alumni preferences saved successfully.</span>
        </div>
      )}

      {/* Mentorship Capacity Limits */}
      <div className="bg-surface border border-border rounded-md p-6 shadow-subtle space-y-4">
        <h2 className="text-sm font-bold text-primary pb-3 border-b border-border">
          Mentorship Capacity &amp; Availability
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-primary">
              Maximum Concurrent Mentees
            </label>
            <select
              value={maxMentees}
              onChange={(e) => setMaxMentees(e.target.value)}
              className="w-full h-9 rounded-sm border border-border bg-[#F8F8F5] px-3 text-xs text-primary"
            >
              <option value="2">2 students (light guidance)</option>
              <option value="4">4 students</option>
              <option value="6">6 students (recommended)</option>
              <option value="10">10 students (cohort mentor)</option>
            </select>
            <p className="text-[11px] text-secondary">
              Incoming request buttons will pause automatically when capacity is reached.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-primary">
              Guidance Hours Per Month
            </label>
            <select
              value={hoursPerMonth}
              onChange={(e) => setHoursPerMonth(e.target.value)}
              className="w-full h-9 rounded-sm border border-border bg-[#F8F8F5] px-3 text-xs text-primary"
            >
              <option value="4">4 hours / month (1 hr/week)</option>
              <option value="8">8 hours / month (2 hrs/week)</option>
              <option value="12">12 hours / month</option>
            </select>
            <p className="text-[11px] text-secondary">
              Visible on your mentor profile to set honest student expectations.
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <Button size="sm" onClick={handleSave} className="text-xs">
            Save Availability
          </Button>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-surface border border-border rounded-md p-6 shadow-subtle space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-border">
          <Bell className="w-4 h-4 text-accent" />
          <h2 className="text-sm font-bold text-primary">Notification Alerts</h2>
        </div>

        <label className="flex items-center justify-between p-3 rounded-sm bg-[#F8F8F5] border border-border cursor-pointer">
          <div>
            <p className="text-xs font-semibold text-primary">Incoming Mentorship Requests</p>
            <p className="text-[11px] text-secondary">Receive immediate alerts whenever a student requests guidance on your designated topics.</p>
          </div>
          <input
            type="checkbox"
            checked={emailAlerts}
            onChange={(e) => setEmailAlerts(e.target.checked)}
            className="rounded-xs border-border text-accent focus:ring-accent w-4 h-4"
          />
        </label>
      </div>

      {/* Demo Account Switcher */}
      <div className="bg-surface border border-border rounded-md p-6 shadow-subtle space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-border">
          <RefreshCw className="w-4 h-4 text-accent" />
          <h2 className="text-sm font-bold text-primary">Demo Role Switcher</h2>
        </div>

        <p className="text-xs text-secondary leading-relaxed">
          Switch to the Student demo account (&lsquo;Alex Rivera&rsquo;) to view how opportunities and mentorship requests appear from the student&apos;s perspective.
        </p>

        <div className="pt-1">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSwitchToStudent}
            className="text-xs gap-1.5 border-border hover:border-accent"
          >
            <span>Switch to Student Demo Dashboard &rarr;</span>
          </Button>
        </div>
      </div>

      {/* Session Management */}
      <div className="bg-surface border border-border rounded-md p-6 shadow-subtle space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-border">
          <Shield className="w-4 h-4 text-secondary" />
          <h2 className="text-sm font-bold text-primary">Reset Demo Session</h2>
        </div>

        <p className="text-xs text-secondary leading-relaxed">
          Clear your local demo state and log out of the current session.
        </p>

        <Button
          variant="outline"
          size="sm"
          onClick={handleResetDemo}
          className="text-xs text-red-600 border-red-200 hover:bg-red-50"
        >
          Reset Demo State &amp; Logout
        </Button>
      </div>
    </div>
  );
}
