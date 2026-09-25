import React, { useState } from 'react';
import { Code, Brain, Cpu, CheckCircle2, Circle, ChevronDown, ChevronUp, Layers, Sparkles, Trophy } from 'lucide-react';

const iconMap = { Code, Brain, Cpu };

export default function PathwaysModule() {
  const [pathways] = useState([]);
  const [selectedPathwayId, setSelectedPathwayId] = useState('');
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
    <section id="pathways" className="py-20 bg-slate-50 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5" /> Domain Roadmaps
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            From <span className="gradient-text">1st Year Beginner</span> to High-Paying Placement
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Track your year-by-year technical milestone progress live.
          </p>
        </div>

        {pathways.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8 max-w-md mx-auto space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No Roadmaps Loaded</h3>
            <p className="text-xs text-slate-500">
              No career pathways currently loaded.
            </p>
          </div>
        ) : (
          <>
            {/* Branch / Pathway Selector Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
              {pathways.map((path) => {
                const Icon = iconMap[path.icon] || Code;
                const isSelected = path.id === selectedPathwayId;
                return (
                  <button
                    key={path.id}
                    onClick={() => setSelectedPathwayId(path.id)}
                    className={`flex items-center gap-3 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      isSelected
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20 scale-105'
                        : 'bg-white border border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-300 shadow-sm'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-white/20' : 'bg-slate-100'}`}>
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-indigo-600'}`} />
                    </div>
                    <div className="text-left">
                      <div>{path.title}</div>
                      <div className={`text-[10px] ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>{path.branch || (path.target_branches ? path.target_branches.join(' / ') : '')}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Pathway Details Header & Interactive Progress Bar */}
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-indigo-200 mb-8 bg-gradient-to-r from-indigo-50/70 via-white to-purple-50/70 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-indigo-600 text-white">
                      Target Roadmap
                    </span>
                    <span className="text-xs font-semibold text-slate-600">
                      Branches: {activePathway.branch || (activePathway.target_branches ? activePathway.target_branches.join(' / ') : 'Engineering')}
                    </span>
                    <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-full">
                      Avg Package: {activePathway.avg_package || activePathway.avgPackage || '8 - 25 LPA'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{activePathway.title}</h3>
                  <p className="text-slate-600 text-sm max-w-2xl">{activePathway.description}</p>
                  
                  {/* Target Roles */}
                  {(activePathway.target_roles || activePathway.targetRoles) && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-xs font-bold text-slate-500">Target Roles:</span>
                      {(activePathway.target_roles || activePathway.targetRoles).map((role, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold shadow-2xs">
                          {role}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Live Interactive Progress Card */}
                <div className="w-full lg:w-72 p-4 rounded-xl bg-white border border-indigo-100 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Trophy className="w-4 h-4 text-indigo-600" />
                      <span className="text-xs font-bold text-slate-900">Your Learning Progress</span>
                    </div>
                    <span className="text-xs font-black text-indigo-600">{progressPercent}%</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-500 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>{completedCount} of {totalTopicsCount} skills completed</span>
                    {progressPercent === 100 && (
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Completed!
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Grid (1st Year to 4th Year) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(activePathway.milestones || []).map((milestone, idx) => {
                const isExpanded = expandedMilestones[milestone.year];
                return (
                  <div
                    key={idx}
                    className="glass-card p-6 rounded-2xl border-slate-200 bg-white flex flex-col justify-between shadow-sm"
                  >
                    <div>
                      {/* Year Tag & Toggle */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                            {milestone.year}
                          </span>
                          <span className="text-xs font-bold text-slate-400">Phase {idx + 1}</span>
                        </div>

                        <button
                          onClick={() => toggleMilestone(milestone.year)}
                          className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>

                      {/* Title */}
                      <h4 className="text-lg font-bold text-slate-900 mb-1">
                        {milestone.title}
                      </h4>
                      <p className="text-xs text-slate-500 mb-4">{milestone.description}</p>

                      {/* Topics List with Interactive Checkboxes */}
                      {isExpanded && (
                        <div className="space-y-3 mb-4 animate-in fade-in duration-200">
                          {(milestone.topics || []).map((topic, i) => {
                            const isDone = completedTopics[`${activePathway.id}-${topic.name}`];
                            return (
                              <div
                                key={i}
                                onClick={() => toggleTopic(topic.name)}
                                className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-3 ${
                                  isDone
                                    ? 'bg-emerald-50/60 border-emerald-200 text-slate-800'
                                    : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-indigo-50/40 hover:border-indigo-200'
                                }`}
                              >
                                <button className="mt-0.5 shrink-0">
                                  {isDone ? (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                                  ) : (
                                    <Circle className="w-4 h-4 text-slate-400 hover:text-indigo-600" />
                                  )}
                                </button>
                                <div className="flex-1">
                                  <span className={`font-semibold block ${isDone ? 'line-through text-slate-500' : 'text-slate-900'}`}>
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
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Pace: 2-3 hrs/day</span>
                      <span className="text-indigo-600 font-semibold">
                        {(milestone.topics || []).filter(t => completedTopics[`${activePathway.id}-${t.name}`]).length} / {(milestone.topics || []).length} Done
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>
          </>
        )}

      </div>
    </section>
  );
}
