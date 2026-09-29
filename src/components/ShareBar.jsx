import React, { useState } from 'react';
import { Share2, Check, Copy, MessageCircle, Linkedin, Twitter } from 'lucide-react';

export default function ShareBar() {
  const [copied, setCopied] = useState(false);

  const siteUrl = 'https://mkcealumni.org';
  const shareText = 'The official MKCE Alumni Network (mkcealumni.org) is launching on February 1, 2027! Connect with alumni, get career roadmaps & mentorship:';

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
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm backdrop-blur-md">
        <p className="text-xs font-mono text-slate-700 mb-3 flex items-center justify-center gap-1.5 font-bold">
          <Share2 className="w-3.5 h-3.5 text-orange-600" />
          SPREAD THE WORD TO MKCE CLASSMATES
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {/* WhatsApp */}
          <a
            href={shareWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold transition-all shadow-2xs"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>WhatsApp</span>
          </a>

          {/* LinkedIn */}
          <a
            href={shareLinkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition-all shadow-2xs"
          >
            <Linkedin className="w-4 h-4 text-blue-600" />
            <span>LinkedIn</span>
          </a>

          {/* Twitter / X */}
          <a
            href={shareTwitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-xs font-bold transition-all shadow-2xs"
          >
            <Twitter className="w-4 h-4 text-sky-600" />
            <span>X (Twitter)</span>
          </a>

          {/* Copy Link */}
          <button
            onClick={copyLink}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-bold cursor-pointer transition-all shadow-2xs"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-600">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-600" />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
