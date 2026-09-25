import React, { useState } from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink } from 'lucide-react';

export default function InstagramFeed() {
  const [posts] = useState([]);

  return (
    <section className="py-20 bg-slate-50 relative border-t border-slate-200/80 overflow-hidden">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 right-10 w-[300px] h-[300px] bg-pink-200/25 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 text-pink-700 border border-pink-200 text-xs font-semibold mb-3">
              <Instagram className="w-3.5 h-3.5" /> Social Media Integration
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Follow Us On <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600">Instagram @mkce.alumni</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-xl">
              Daily tech reels, alumni interviews, placement alerts, and quick study guides.
            </p>
          </div>

          <a
            href="https://instagram.com/mkce.alumni"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-pink-500/15 transition-all hover:scale-105"
          >
            <Instagram className="w-4 h-4 text-white" />
            <span>Visit @mkce.alumni</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Posts Grid / Empty State */}
        {posts.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8 max-w-md mx-auto space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center mx-auto">
              <Instagram className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Join Our Instagram Page</h3>
            <p className="text-xs text-slate-500">
              Follow @mkce.alumni on Instagram for real-time posts, career tips, and alumni updates.
            </p>
            <a
              href="https://instagram.com/mkce.alumni"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs font-bold shadow-md"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow @mkce.alumni</span>
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="glass-card glass-card-hover p-6 rounded-2xl border-slate-200 bg-white flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-0.5">
                        <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                          <Instagram className="w-3.5 h-3.5 text-pink-600" />
                        </div>
                      </div>
                      <span className="text-xs font-bold text-slate-900">@mkce.alumni</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-pink-50 text-pink-700 font-semibold border border-pink-200">
                      #{post.tag}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed mb-6 font-normal">
                    {post.caption}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5 text-pink-600 font-medium">
                      <Heart className="w-3.5 h-3.5 fill-pink-50" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-indigo-600 font-medium">
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{post.comments}</span>
                    </div>
                  </div>

                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    <span>View Post</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
