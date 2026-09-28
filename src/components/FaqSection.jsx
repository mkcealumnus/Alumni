import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'When will mkcealumni.org officially launch?',
      answer: 'The official platform launches on Thursday, January 14, 2027 at 00:00 IST. Register your email on this page to get priority early access.'
    },
    {
      question: 'Who can register on the MKCE Alumni Network?',
      answer: 'All alumni (graduates of any batch), current engineering students, faculty members, and institutional recruiters associated with M. Kumarasamy College of Engineering (MKCE), Karur.'
    },
    {
      question: 'Is joining the platform free of charge?',
      answer: 'Yes! The MKCE Alumni Network (mkcealumni.org) is 100% free for all students and alumni. There are no subscription fees or hidden costs.'
    },
    {
      question: 'How do I claim my Verified Alumnus Badge?',
      answer: 'Upon launch on Jan 14, 2027, you can sign up with your MKCE graduation roll number or college email address. Once verified against official academic records, your account receives the verified green badge.'
    },
    {
      question: 'Can current MKCE students connect with senior alumni?',
      answer: 'Absolutely. The platform features a dedicated 1-on-1 Mentorship Portal where current students can schedule resume reviews, mock interview practice, and career pathway advice directly with alumni.'
    },
    {
      question: 'How can alumni post job openings or offer referrals?',
      answer: 'Verified alumni can post job openings, internship opportunities, and offer direct employee referrals to junior MKCE students through the dedicated Placement Vault and Careers Board.'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto my-12 px-4">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-800 text-xs font-mono font-semibold mb-3">
          <HelpCircle className="w-3.5 h-3.5 text-orange-400" />
          FREQUENTLY ASKED QUESTIONS
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-sans tracking-tight">
          Got Questions About <span className="gradient-text">mkcealumni.org</span>?
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Everything you need to know about the upcoming portal launch.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 font-semibold text-sm sm:text-base text-slate-100 hover:text-orange-400 cursor-pointer transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-orange-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-5 pt-1 sm:px-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 animate-fadeIn">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
