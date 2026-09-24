import React from 'react';
import { INSTAGRAM_POSTS } from '../data/mockData';
import { Instagram, Heart, MessageCircle, ExternalLink, Sparkles } from 'lucide-react';

export default function InstagramFeed() {
  return (
    <section className="py-20 bg-[#0B0F19] relative border-t border-slate-800/60 overflow-hidden">
      
      {/* Glow */}
      <div className="absolute top-1/2 right-10 w-[300px] h-[300px] bg-pink-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20 text-xs font-semibold mb-3">
              <Instagram className="w-3.5 h-3.5" /> Social Media Integration
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Follow Us On <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">Instagram @mkce.alumni</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-xl">
              Daily tech reels, alumni interviews, placement alerts, and quick study guides.
            </p>
          </div>

          <a
            href="https://instagram.com/mkce.alumni"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-pink-500/20 transition-all hover:scale-105"
          >
            <Instagram className="w-4 h-4 text-white" />
            <span>Visit @mkce.alumni</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              className="glass-card glass-card-hover p-6 rounded-2xl border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-0.5">
                      <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                        <Instagram className="w-3.5 h-3.5 text-pink-400" />
                      </div>
                    </div>
                    <span className="text-xs font-bold text-white">@mkce.alumni</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-pink-500/10 text-pink-400 font-semibold border border-pink-500/20">
                    #{post.tag}
                  </span>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed mb-6 font-normal">
                  {post.caption}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 text-pink-400 font-medium">
                    <Heart className="w-3.5 h-3.5 fill-pink-500/20" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-indigo-400 font-medium">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{post.comments}</span>
                  </div>
                </div>

                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                >
                  <span>View Post</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
