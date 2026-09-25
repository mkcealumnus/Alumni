import React from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink } from 'lucide-react';
import { INITIAL_INSTAGRAM_POSTS } from '../data/initialData';

export default function InstagramFeed({ initialPosts }) {
  const posts = initialPosts && initialPosts.length > 0 ? initialPosts : INITIAL_INSTAGRAM_POSTS;

  return (
    <section className="py-20 bg-[#09090b] relative border-b border-white/10 overflow-hidden">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 right-10 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="label-mono text-xs text-pink-400 font-bold mb-1">Social Community Integration</p>
            <h2 className="text-3xl sm:text-5xl font-normal text-white font-sans tracking-tight">
              Follow Us On <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 font-sans">Instagram @mkce.alumni</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
              Daily tech reels, alumni interviews, placement alerts, and quick study guides.
            </p>
          </div>

          <a
            href="https://instagram.com/mkce.alumni"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-600 via-purple-600 to-orange-600 hover:opacity-95 text-white text-xs font-semibold shadow-lg shadow-pink-600/20 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Instagram className="w-4 h-4 text-white" />
            <span>Visit @mkce.alumni</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="py-16 text-center bg-[#121318] rounded-3xl border border-white/10 p-8 max-w-md mx-auto space-y-3 shadow-xl">
            <div className="w-12 h-12 rounded-full bg-pink-500/10 text-pink-400 flex items-center justify-center mx-auto border border-pink-500/20">
              <Instagram className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Join Our Instagram Page</h3>
            <p className="text-xs text-zinc-400">
              Follow @mkce.alumni on Instagram for real-time posts, career tips, and alumni updates.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="glass-card glass-card-hover p-6 rounded-3xl border-white/10 bg-[#121318] flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 p-0.5 shadow">
                        <div className="w-full h-full bg-[#09090b] rounded-full flex items-center justify-center">
                          <Instagram className="w-4 h-4 text-pink-400" />
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-white">@mkce.alumni</span>
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-pink-500/10 text-pink-400 font-semibold border border-pink-500/20">
                      #{post.tag}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed mb-6 font-normal">
                    {post.caption}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                    <div className="flex items-center gap-1.5 text-pink-400 font-medium">
                      <Heart className="w-3.5 h-3.5 fill-pink-500/20" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-orange-400 font-medium">
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{post.comments}</span>
                    </div>
                  </div>

                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1"
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
