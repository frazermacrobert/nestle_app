import React, { useState } from 'react';
import { cvData } from './data/cvData';

// Sub-component for the interactive Nodes
const NavNode = ({ pillar, isActive, onClick }) => (
  <button
    onClick={() => onClick(pillar.id)}
    className={`group relative flex flex-col items-center justify-center p-6 transition-all duration-500 transform 
      ${isActive ? 'scale-110' : 'hover:scale-105'} 
      bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl w-48 h-48`}
  >
    <div className={`w-3 h-3 rounded-full mb-4 shadow-[0_0_15px_rgba(255,255,255,0.5)] 
      ${isActive ? 'bg-white scale-125' : 'bg-white/40 group-hover:bg-white/80'}`} 
    />
    <span className="text-sm font-semibold tracking-widest uppercase text-center opacity-80 group-hover:opacity-100">
      {pillar.label}
    </span>
    {/* Subtle pulse effect for inactive nodes to invite interaction */}
    {!isActive && (
      <div className="absolute inset-0 rounded-2xl border border-white/5 animate-pulse" />
    )}
  </button>
);

export default function App() {
  const [activeId, setActiveId] = useState(null);
  const activePillar = cvData.pillars.find(p => p.id === activeId);

  return (
    <main className="relative h-screen w-screen bg-zinc-950 text-zinc-100 overflow-hidden font-sans">
      
      {/* 1. BACKGROUND LAYER: Full-bleed imagery */}
      <div 
  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
  style={{ 
    // This dynamically adjusts the path based on your vite.config.js base setting
    backgroundImage: `url('${import.meta.env.BASE_URL}assets/bg-main.jpg')`, 
    filter: activeId ? 'brightness(0.3) blur(8px)' : 'brightness(0.6)'
  }}
/>

      {/* 2. HUD LAYER: Persistent Sidebar (The Expert Identity) */}
      <div className="absolute top-12 left-12 z-20 max-w-xs">
        <h1 className="text-4xl font-bold tracking-tighter mb-2">{cvData.header.name}</h1>
        <div className="h-1 w-12 bg-white mb-4" />
        <p className="text-xs uppercase tracking-widest text-white/60 mb-1">{cvData.header.status}</p>
        <p className="text-sm font-medium text-white/80 italic">"{cvData.header.tagline}"</p>
        
        <div className="mt-8 pt-8 border-t border-white/10">
          <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Current Mission</p>
          <p className="text-sm text-white/70">Transforming L&D for Nestlé York</p>
          <p className="text-[10px] text-white/40 mt-1">Status: {cvData.header.location}</p>
        </div>
      </div>

      {/* 3. INTERACTIVE LAYER: Nodes & Details */}
      <div className="relative z-10 h-full flex items-center justify-center px-24">
        
        {/* If no node is selected, show the Node Grid */}
        {!activeId ? (
          <div className="grid grid-cols-2 gap-8 animate-in fade-in zoom-in duration-700">
            {cvData.pillars.map(pillar => (
              <NavNode 
                key={pillar.id} 
                pillar={pillar} 
                isActive={activeId === pillar.id}
                onClick={setActiveId}
              />
            ))}
          </div>
        ) : (
          /* Detailed View: Frosted Glass Panel */
          <div className="w-full max-w-4xl bg-white/5 backdrop-blur-2xl border border-white/10 p-12 rounded-3xl shadow-2xl animate-in slide-in-from-bottom-12 duration-500">
            <button 
              onClick={() => setActiveId(null)}
              className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors text-sm tracking-widest"
            >
              [ ESCAPE / BACK ]
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-xs uppercase tracking-[0.3em] text-white/40 mb-2">{activePillar.label}</h2>
                <h3 className="text-4xl font-bold mb-6 leading-tight">{activePillar.title}</h3>
                <p className="text-xl text-white/80 font-light leading-relaxed mb-8">
                  {activePillar.hook}
                </p>
                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                  <p className="text-xs text-white/40 uppercase mb-2">Strategy Note</p>
                  <p className="text-sm italic text-white/70">{activePillar.philosophy}</p>
                </div>
              </div>

              <div className="flex flex-col justify-center space-y-6">
                <h4 className="text-xs uppercase tracking-widest text-white/40">Evidence of Impact</h4>
                <ul className="space-y-4">
                  {activePillar.proof.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-sm text-white/80 group">
                      <span className="text-white/30 group-hover:text-white transition-colors mt-1">▹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-6 mt-6 border-t border-white/5">
                  <span className="text-[10px] px-2 py-1 bg-white/10 rounded uppercase tracking-tighter">
                    Context: {activePillar.cvLink}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. FOOTER: Quick Actions */}
      <div className="absolute bottom-12 right-12 z-20 flex space-x-8">
        {cvData.footer.links.map((link, idx) => (
          <a 
            key={idx}
            href={link.url}
            className="text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-white transition-all hover:tracking-[0.3em]"
          >
            {link.label}
          </a>
        ))}
      </div>

    </main>
  );
}
