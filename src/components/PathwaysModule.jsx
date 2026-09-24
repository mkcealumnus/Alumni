import React, { useState } from 'react';
import { PATHWAYS } from '../data/mockData';
import { Code, Brain, Cpu, CheckCircle, Layers } from 'lucide-react';

const iconMap = {
  Code,
  Brain,
  Cpu
};

export default function PathwaysModule() {
  const [selectedPathwayId, setSelectedPathwayId] = useState(PATHWAYS[0].id);
  const activePathway = PATHWAYS.find(p => p.id === selectedPathwayId) || PATHWAYS[0];

  return (
    <section id="pathways" className="py-20 bg-slate-50 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5" /> Structured Career Roadmaps
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            From <span className="gradient-text">1st Year Beginner</span> to High-Paying Placement
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Detailed, step-by-step engineering domain paths curated by MKCE alumni working in top tech companies.
          </p>
        </div>

        {/* Branch / Pathway Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          {PATHWAYS.map((path) => {
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
                  <div className={`text-[10px] ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>{path.branch}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Pathway Details Header */}
        <div className="glass-card p-6 sm:p-8 rounded-2xl border border-indigo-200 mb-8 bg-gradient-to-r from-indigo-50/60 via-white to-purple-50/60">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Target Domain Roadmap</span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{activePathway.title}</h3>
              <p className="text-slate-600 text-sm mt-1 max-w-2xl">{activePathway.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 border border-indigo-200">
                Branches: {activePathway.branch}
              </span>
            </div>
          </div>
        </div>

        {/* Timeline Grid (1st Year to 4th Year) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activePathway.milestones.map((milestone, idx) => (
            <div
              key={idx}
              className="glass-card glass-card-hover p-6 rounded-2xl flex flex-col justify-between border-slate-200 bg-white relative group"
            >
              {/* Year Tag */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {milestone.year}
                </span>
                <span className="text-xs text-slate-400 font-semibold">Phase {idx + 1}</span>
              </div>

              {/* Title */}
              <h4 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                {milestone.title}
              </h4>

              {/* Topics List */}
              <ul className="space-y-2.5 mb-6 flex-1">
                {milestone.topics.map((topic, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>

              {/* Status Indicator */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Recommended Pace</span>
                <span className="text-indigo-600 font-semibold">2-3 hrs/day</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
