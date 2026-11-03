import React, { useState } from 'react';
import { 
  Target, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Calendar
} from 'lucide-react';
import { STRATEGIC_RECOMMENDATIONS } from '../surveyData';

export const StrategicRecommendations: React.FC = () => {
  const [selectedPillar, setSelectedPillar] = useState<string>('all');
  const [selectedRecId, setSelectedRecId] = useState<string>('REC-01');

  const pillars = [
    { id: 'all', label: 'Todos los Pilares' },
    { id: 'Educativo & Pedagógico', label: 'Pedagógico' },
    { id: 'Evaluación & Pensamiento Crítico', label: 'Evaluación Oral' },
    { id: 'Alfabetización Algorítmica', label: 'Fact-Checking' },
    { id: 'Ética & Privacidad', label: 'Privacidad & Ética' },
  ];

  const filteredRecs = selectedPillar === 'all'
    ? STRATEGIC_RECOMMENDATIONS
    : STRATEGIC_RECOMMENDATIONS.filter((r) => r.pillar === selectedPillar);

  const activeRec = STRATEGIC_RECOMMENDATIONS.find((r) => r.id === selectedRecId) || STRATEGIC_RECOMMENDATIONS[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
          <Target className="w-3.5 h-3.5" />
          <span>Plan de Acción Basado en Evidencia de Campo</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Recomendaciones Estratégicas Basadas en el Comportamiento Detectado
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Hoja de ruta táctica para directivos, docentes e instituciones frente a la dependencia detectada en el 65.2% de los informantes.
        </p>
      </div>

      {/* Filter and Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {pillars.map((pil) => (
            <button
              key={pil.id}
              onClick={() => setSelectedPillar(pil.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                selectedPillar === pil.id
                  ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {pil.label}
            </button>
          ))}
        </div>
        <div className="text-xs text-slate-400 font-mono">
          {filteredRecs.length} propuestas estratégicas activas
        </div>
      </div>

      {/* Recommendations Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left List of Recommendations */}
        <div className="lg:col-span-1 space-y-3">
          {filteredRecs.map((rec) => {
            const isSelected = rec.id === activeRec.id;
            return (
              <div
                key={rec.id}
                onClick={() => setSelectedRecId(rec.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-slate-900 border-emerald-500 ring-1 ring-emerald-500/80 shadow-lg shadow-emerald-500/10'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-2">
                  <span className="font-mono font-bold text-slate-400">{rec.id}</span>
                  <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                    rec.priority === 'Inmediata'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : rec.priority === 'Alta'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  }`}>
                    Prioridad {rec.priority}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug">
                  {rec.title}
                </h4>
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="text-slate-500">{rec.pillar}</span>
                  <span className="text-emerald-400 font-medium">{rec.timeframe}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Detail Card for Selected Recommendation */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {activeRec.id}
                </span>
                <span className="text-xs font-semibold text-emerald-400">
                  {activeRec.pillar}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white pt-1">
                {activeRec.title}
              </h3>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                activeRec.priority === 'Inmediata'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : activeRec.priority === 'Alta'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
              }`}>
                Prioridad: {activeRec.priority}
              </span>
            </div>
          </div>

          {/* Problem vs Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-rose-950/20 border border-rose-500/20 rounded-xl p-4 space-y-2">
              <span className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-rose-400" />
                Comportamiento Diagnosticado en Encuesta
              </span>
              <p className="text-xs text-rose-200/90 leading-relaxed">
                {activeRec.problemDetected}
              </p>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-4 space-y-2">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Intervención Estratégica
              </span>
              <p className="text-xs text-emerald-200/90 leading-relaxed">
                {activeRec.actionPlan}
              </p>
            </div>
          </div>

          {/* Execution details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-slate-400 font-semibold block flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-400" /> Plazo Estimado de Despliegue
              </span>
              <p className="font-bold text-white text-sm">
                {activeRec.timeframe}
              </p>
              <span className="text-slate-500 text-[11px] block">
                Público Meta: {activeRec.targetAudience}
              </span>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-slate-400 font-semibold block flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-400" /> Indicadores Clave de Éxito (KPIs)
              </span>
              <ul className="space-y-1 text-slate-300 text-[11px]">
                {activeRec.metricsToTrack.map((metric, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>{metric}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>

      {/* Implementation Roadmap Timeline */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-5">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-indigo-400" />
          <div>
            <h3 className="text-base font-bold text-white">
              Cronograma Táctico de Implementación (Roadmap 2026 - 2027)
            </h3>
            <p className="text-xs text-slate-400">
              Secuencia progresiva para desarticular el uso fraudulento e impulsar la maestría reflexiva
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Phase 1 */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 relative overflow-hidden">
            <div className="w-full h-1 bg-rose-500 rounded-full mb-3" />
            <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wide">Fase 1 (Mes 1 - 2)</span>
            <h4 className="text-sm font-bold text-white">Contención de la Dependencia & Fact-Checking</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Jornadas de sensibilización sobre la atrofia del pensamiento. Lanzamiento del protocolo de Zero Sensitive Data y taller de detección de fuentes falsas.
            </p>
          </div>

          {/* Phase 2 */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 relative overflow-hidden">
            <div className="w-full h-1 bg-amber-500 rounded-full mb-3" />
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wide">Fase 2 (Mes 3 - 4)</span>
            <h4 className="text-sm font-bold text-white">Rediseño Evaluativo a Defensas Orales</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Transición de deberes escritos tradicionales a rúbricas de exposición oral y resolución de dilemas en vivo. La IA pasa a ser tutor guiado en aula.
            </p>
          </div>

          {/* Phase 3 */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 relative overflow-hidden">
            <div className="w-full h-1 bg-emerald-500 rounded-full mb-3" />
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wide">Fase 3 (Mes 5 - 6+)</span>
            <h4 className="text-sm font-bold text-white">Institucionalización del Humanismo Digital</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Creación del Club de Innovación y Debate Ético. Certificación de estudiantes como Prompt Engineers responsables y creativos conscientes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
