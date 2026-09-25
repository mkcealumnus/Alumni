import React, { useState } from 'react';
import { Code, Brain, Cpu, CheckCircle2, Circle, ChevronDown, ChevronUp, Layers, Sparkles, Trophy } from 'lucide-react';
import { INITIAL_PATHWAYS } from '../data/initialData';

const iconMap = { Code, Brain, Cpu };

export default function PathwaysModule({ initialPathways }) {
  const pathways = initialPathways && initialPathways.length > 0 ? initialPathways : INITIAL_PATHWAYS;
  const [selectedPathwayId, setSelectedPathwayId] = useState(pathways[0]?.id || 'sde-pathway');
  const [completedTopics, setCompletedTopics] = useState({});
  const [expandedMilestones, setExpandedMilestones] = useState({ '1st Year': true, '2nd Year': true, '3rd Year': true, '4th Year': true });

  const activePathway = pathways.find(p => p.id === selectedPathwayId) || pathways[0];

  const totalTopicsCount = activePathway ? (activePathway.milestones || []).reduce((acc, m) => acc + (m.topics ? m.topics.length : 0), 0) : 0;
  const completedCount = activePathway ? (activePathway.milestones || []).reduce((acc, m) => {
    return acc + (m.topics || []).filter(t => completedTopics[`${activePathway.id}-${t.name}`]).length;
  }, 0) : 0;
  const progressPercent = totalTopicsCount > 0 ? Math.round((completedCount / totalTopicsCount) * 100) : 0;

  const toggleTopic = (topicName) => {
    if (!activePathway) return;
    const key = `${activePathway.id}-${topicName}`;
    setCompletedTopics(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleMilestone = (year) => {
    setExpandedMilestones(prev => ({ ...prev, [year]: !prev[year] }));
  };

  return (
    <section id="pathways" className="py-20 bg-[#fcfcfc] relative border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <p className="label-mono text-xs text-orange-600 font-bold">Structured Engineering Roadmaps</p>
          <h2 className="text-3xl sm:text-5xl font-normal text-slate-900 font-sans tracking-tight">
            From <span className="font-serif italic text-orange-600">1st Year Beginner</span> to Tier-1 Placement
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Track your year-by-year technical milestone progress live. Tailored specifically for MKCE branch curricula.
          </p>
        </div>

        {/* Branch / Pathway Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {pathways.map((path) => {
            const Icon = iconMap[path.icon] || Code;
            const isSelected = path.id === selectedPathwayId;
            return (
              <button
                key={path.id}
                onClick={() => setSelectedPathwayId(path.id)}
                className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl font-semibold text-xs transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-500/20 scale-[1.03]'
                    : 'bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-orange-300 shadow-2xs'
                }`}
              >
                <div className={`p-2 rounded-xl ${isSelected ? 'bg-white/20' : 'bg-slate-100'}`}>
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-orange-600'}`} />
                </div>
                <div className="text-left">
                  <div className="font-bold text-sm">{path.title}</div>
                  <div className={`text-[10px] font-mono ${isSelected ? 'text-orange-100' : 'text-slate-500'}`}>{path.branch || (path.target_branches ? path.target_branches.join(' / ') : '')}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Pathway Details Header & Interactive Progress Bar */}
        {activePathway && (
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200/90 mb-8 bg-gradient-to-r from-orange-50/50 via-white to-amber-50/40 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-orange-600 text-white">
                    Active Roadmap
                  </span>
                  <span className="text-xs font-mono text-slate-600">
                    Branches: {activePathway.branch || (activePathway.target_branches ? activePathway.target_branches.join(' / ') : 'Engineering')}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 border border-emerald-200 px-3 py-1 rounded-full">
                    Avg Package: {activePathway.avg_package || activePathway.avgPackage || '8 - 25 LPA'}
                  </span>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{activePathway.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">{activePathway.description}</p>
                
                {/* Target Roles */}
                {(activePathway.target_roles || activePathway.targetRoles) && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-2">
                    <span className="text-xs font-mono font-bold text-slate-500">Target Roles:</span>
                    {(activePathway.target_roles || activePathway.targetRoles).map((role, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 shadow-2xs font-semibold">
                        {role}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Live Interactive Progress Card */}
              <div className="w-full lg:w-80 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-orange-600" />
                    <span className="text-xs font-mono font-bold text-slate-900">Roadmap Progress</span>
                  </div>
                  <span className="text-xs font-mono font-black text-orange-600">{progressPercent}%</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                  <div
                    className="h-full bg-gradient-to-r from-orange-600 to-amber-500 transition-all duration-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>{completedCount} of {totalTopicsCount} skills completed</span>
                  {progressPercent === 100 && (
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Complete!
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Timeline Grid (1st Year to 4th Year) */}
        {activePathway && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(activePathway.milestones || []).map((milestone, idx) => {
              const isExpanded = expandedMilestones[milestone.year];
              return (
                <div
                  key={idx}
                  className="glass-card glass-card-hover p-6 rounded-3xl border-slate-200/90 bg-white flex flex-col justify-between shadow-sm"
                >
                  <div>
                    {/* Year Tag & Toggle */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-extrabold px-3.5 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200">
                          {milestone.year}
                        </span>
                        <span className="text-xs font-mono text-slate-400">Phase {idx + 1}</span>
                      </div>

                      <button
                        onClick={() => toggleMilestone(milestone.year)}
                        className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Title & Description */}
                    <h4 className="text-lg font-bold text-slate-900 mb-1">
                      {milestone.title}
                    </h4>
                    <p className="text-xs text-slate-500 mb-4 leading-relaxed">{milestone.description}</p>

                    {/* Topics List with Interactive Checkboxes */}
                    {isExpanded && (
                      <div className="space-y-2.5 mb-4 animate-in fade-in duration-200">
                        {(milestone.topics || []).map((topic, i) => {
                          const isDone = completedTopics[`${activePathway.id}-${topic.name}`];
                          return (
                            <div
                              key={i}
                              onClick={() => toggleTopic(topic.name)}
                              className={`p-3 rounded-2xl border text-xs cursor-pointer transition-all flex items-start gap-3 ${
                                isDone
                                  ? 'bg-emerald-50/70 border-emerald-200 text-slate-800'
                                  : 'bg-slate-50/80 border-slate-200/80 text-slate-700 hover:bg-orange-50/40 hover:border-orange-200'
                              }`}
                            >
                              <button className="mt-0.5 shrink-0">
                                {isDone ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                                ) : (
                                  <Circle className="w-4 h-4 text-slate-400 hover:text-orange-600" />
                                )}
                              </button>
                              <div className="flex-1">
                                <span className={`font-semibold block ${isDone ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                                  {topic.name}
                                </span>
                                <span className="text-[11px] text-slate-500 block mt-0.5">{topic.description}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>Pace: 2-3 hrs/day</span>
                    <span className="text-orange-600 font-semibold">
                      {(milestone.topics || []).filter(t => completedTopics[`${activePathway.id}-${t.name}`]).length} / {(milestone.topics || []).length} Completed
                    </span>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
