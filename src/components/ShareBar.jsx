import React, { useState } from 'react';
import { Share2, Check, Copy, MessageCircle, Linkedin, Twitter } from 'lucide-react';

export default function ShareBar() {
  const [copied, setCopied] = useState(false);

  const siteUrl = 'https://mkcealumni.org';
  const shareText = 'The official MKCE Alumni Network (mkcealumni.org) is launching on January 14, 2027! Connect with alumni, get career roadmaps & mentorship:';

  const copyLink = () => {
    navigator.clipboard.writeText(siteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${siteUrl}`)}`;
  const shareLinkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(siteUrl)}`;
  const shareTwitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(siteUrl)}`;

  return (
    <div className="w-full max-w-xl mx-auto my-8 px-4 text-center">
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
        <p className="text-xs font-mono text-slate-400 mb-3 flex items-center justify-center gap-1.5 font-semibold">
          <Share2 className="w-3.5 h-3.5 text-orange-400" />
          SPREAD THE WORD TO MKCE CLASSMATES
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {/* WhatsApp */}
          <a
            href={shareWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>

          {/* LinkedIn */}
          <a
            href={shareLinkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-semibold transition-all"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>

          {/* Twitter / X */}
          <a
            href={shareTwitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-semibold transition-all"
          >
            <Twitter className="w-4 h-4" />
            <span>X (Twitter)</span>
          </a>

          {/* Copy Link */}
          <button
            onClick={copyLink}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold cursor-pointer transition-all"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
