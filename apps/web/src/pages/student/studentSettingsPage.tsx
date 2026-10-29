import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Shield, RefreshCw, CheckCircle2 } from "lucide-react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

export default function StudentSettingsPage() {
  const { loginAsDemo, logout } = useAuth();
  const navigate = useNavigate();
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [mentorshipAlerts, setMentorshipAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSwitchToAlumni = async () => {
    await loginAsDemo("alumni");
    navigate("/alumni/dashboard");
  };

  const handleResetDemo = () => {
    localStorage.removeItem("alumnux_demo_session");
    localStorage.removeItem("alumnux_saved_opp_ids");
    logout();
    navigate("/login");
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary">
            Settings &amp; Preferences
          </h1>
          <p className="text-xs text-secondary">
            Configure student notifications, demo environment preferences, and account switching.
          </p>
        </div>
        <Badge variant="outline" className="text-xs font-mono self-start sm:self-auto">
          Student Settings
        </Badge>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-950 rounded-sm flex items-center gap-2 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Settings saved successfully.</span>
        </div>
      )}

      {/* Notification Preferences */}
      <div className="bg-surface border border-border rounded-md p-6 shadow-subtle space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-border">
          <Bell className="w-4 h-4 text-accent" />
          <h2 className="text-sm font-bold text-primary">Notification Settings</h2>
        </div>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 rounded-sm bg-[#F8F8F5] border border-border cursor-pointer">
            <div>
              <p className="text-xs font-semibold text-primary">Mentorship Request Updates</p>
              <p className="text-[11px] text-secondary">Get notified when an alumnus accepts or responds to your mentorship request.</p>
            </div>
            <input
              type="checkbox"
              checked={mentorshipAlerts}
              onChange={(e) => setMentorshipAlerts(e.target.checked)}
              className="rounded-xs border-border text-accent focus:ring-accent w-4 h-4"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-sm bg-[#F8F8F5] border border-border cursor-pointer">
            <div>
              <p className="text-xs font-semibold text-primary">Opportunity &amp; Referral Digests</p>
              <p className="text-[11px] text-secondary">Weekly summary of newly posted internship leads matching your engineering branch.</p>
            </div>
            <input
              type="checkbox"
              checked={emailNotifs}
              onChange={(e) => setEmailNotifs(e.target.checked)}
              className="rounded-xs border-border text-accent focus:ring-accent w-4 h-4"
            />
          </label>
        </div>

        <div className="pt-2 flex justify-end">
          <Button size="sm" onClick={handleSave} className="text-xs">
            Save Preferences
          </Button>
        </div>
      </div>

      {/* Demo Account Switcher */}
      <div className="bg-surface border border-border rounded-md p-6 shadow-subtle space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-border">
          <RefreshCw className="w-4 h-4 text-accent" />
          <h2 className="text-sm font-bold text-primary">Demo Role Switcher</h2>
        </div>

        <p className="text-xs text-secondary leading-relaxed">
          Need to evaluate the platform from an alumni perspective? You can switch to the Alumni demo account (&lsquo;Jordan Vance&rsquo;) with one click.
        </p>

        <div className="pt-1">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSwitchToAlumni}
            className="text-xs gap-1.5 border-border hover:border-accent"
          >
            <span>Switch to Alumni Demo Dashboard &rarr;</span>
          </Button>
        </div>
      </div>

      {/* Session Management */}
      <div className="bg-surface border border-border rounded-md p-6 shadow-subtle space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-border">
          <Shield className="w-4 h-4 text-secondary" />
          <h2 className="text-sm font-bold text-primary">Demo Session Reset</h2>
        </div>

        <p className="text-xs text-secondary leading-relaxed">
          Clear all simulated bookmarks, registered events, and demo credentials from this browser session.
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
