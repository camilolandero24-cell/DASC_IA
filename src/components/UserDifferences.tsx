import React, { useState } from 'react';
import { 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Scale
} from 'lucide-react';
import { USER_SEGMENTS } from '../surveyData';

export const UserDifferences: React.FC = () => {
  const [selectedProfileIndex, setSelectedProfileIndex] = useState<number>(0);

  const activeSegment = USER_SEGMENTS[selectedProfileIndex];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-2">
          <Users className="w-3.5 h-3.5" />
          <span>Segmentación & Contrastes Psicosociales</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Diferencias Encontradas Entre los Tipos de Personas
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          La investigación revela 3 arquetipos marcadamente divergentes en cuanto a su nivel de sofisticación, postura ética y proyección del futuro.
        </p>
      </div>

      {/* Segment Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {USER_SEGMENTS.map((seg, idx) => {
          const isSelected = selectedProfileIndex === idx;
          return (
            <div
              key={seg.segment}
              onClick={() => setSelectedProfileIndex(idx)}
              className={`rounded-2xl p-5 border transition-all cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'bg-slate-900 border-indigo-500 shadow-xl shadow-indigo-500/10 ring-1 ring-indigo-500'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{seg.avatar}</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
                  {seg.share} ({seg.count} casos)
                </span>
              </div>
              <h3 className="text-sm font-bold text-white leading-snug">
                {seg.segment}
              </h3>
              <p className="text-xs text-slate-400 mt-2 italic line-clamp-2">
                {seg.motto}
              </p>
              
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-medium">Ver perfil a fondo</span>
                <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-1 text-indigo-400' : 'text-slate-600'}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep Dive on the Selected Segment */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{activeSegment.avatar}</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">
                  {activeSegment.segment}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Representa el {activeSegment.share} de la muestra
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 italic">
                {activeSegment.motto}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Characteristics */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Patrones de Comportamiento Detectados
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {activeSegment.characteristics.map((char, i) => (
                <li key={i} className="flex items-start gap-2.5 bg-slate-950/40 p-3 rounded-xl border border-slate-800/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-1.5" />
                  <span>{char}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Risks & Pedagogical Challenge */}
          <div className="space-y-4">
            <div className="bg-rose-950/20 border border-rose-500/20 rounded-xl p-4 space-y-2">
              <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400" />
                Vulnerabilidad Principal del Segmento
              </h4>
              <p className="text-xs text-rose-200/90 leading-relaxed">
                {activeSegment.risks}
              </p>
            </div>

            {/* Representative subjects */}
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400" />
                Casos Típicos en la Muestra
              </h4>
              <p className="text-xs text-slate-400">
                {selectedProfileIndex === 0 && 'Sujetos #1, #2, #4, #10, #11, #12, #14, #19, #23: "Uso para hacer tareas rápido; ventaja menos trabajo; riesgo que no aprendo nada".'}
                {selectedProfileIndex === 1 && 'Sujetos #5, #7, #8, #9, #13, #17, #18, #21: "Hace a la gente estúpida; dejas de aprender; nunca responderíamos nada a conciencia".'}
                {selectedProfileIndex === 2 && 'Sujetos #3, #6, #15, #16, #20, #22: "Depende del prompt; expande conocimientos; catalizador en medicina, pero requiere cuidar datos".'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Comparative Matrix Table of Differences */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-indigo-400" />
          <div>
            <h3 className="text-base font-bold text-white">
              Matriz Comparativa de Contrastes entre Informantes
            </h3>
            <p className="text-xs text-slate-400">
              Comparación transversal de las 4 dimensiones clave evaluadas en la entrevista
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[11px] bg-slate-950/40">
                <th className="py-3 px-4">Dimensión de Análisis</th>
                <th className="py-3 px-4 text-emerald-400 font-bold">1. Pragmático Utilitario</th>
                <th className="py-3 px-4 text-rose-400 font-bold">2. Crítico Escéptico</th>
                <th className="py-3 px-4 text-purple-400 font-bold">3. Explorador Estratégico</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr className="hover:bg-slate-800/40 transition">
                <td className="py-3.5 px-4 font-semibold text-white">Ecosistema Conocido</td>
                <td className="py-3.5 px-4 text-slate-300">Monousuario (ChatGPT / Meta AI en WhatsApp).</td>
                <td className="py-3.5 px-4 text-slate-300">Conoce 2-3 herramientas pero las usa con recelo.</td>
                <td className="py-3.5 px-4 text-slate-300 font-medium text-purple-300">Multimodal (Claude, Gemini, Grok, Dola, Gamma, Leonardo).</td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition">
                <td className="py-3.5 px-4 font-semibold text-white">Propósito Primordial</td>
                <td className="py-3.5 px-4 text-slate-300">Terminar tareas escolares y deberes rápido.</td>
                <td className="py-3.5 px-4 text-slate-300">Consultas mínimas o rechazo por atrofia cognitiva.</td>
                <td className="py-3.5 px-4 text-slate-300">Ampliar conocimiento, optimizar flujos, creatividad.</td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition">
                <td className="py-3.5 px-4 font-semibold text-white">Actitud ante la Calidad</td>
                <td className="py-3.5 px-4 text-slate-300">Acepta la respuesta tal cual la da el sistema.</td>
                <td className="py-3.5 px-4 text-slate-300">Señala que "ayuda pero no enseña" nada perdurable.</td>
                <td className="py-3.5 px-4 text-slate-300">Sabe que la calidad "depende del prompt que des".</td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition">
                <td className="py-3.5 px-4 font-semibold text-white">Mayor Preocupación</td>
                <td className="py-3.5 px-4 text-slate-300">"Dejar de aprender por querer hacer todo con ella".</td>
                <td className="py-3.5 px-4 text-slate-300">"No saber qué decir en una entrevista de trabajo".</td>
                <td className="py-3.5 px-4 text-slate-300">Desinformación masiva, pérdida de empatía y privacidad.</td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition">
                <td className="py-3.5 px-4 font-semibold text-white">Visión a Largo Plazo</td>
                <td className="py-3.5 px-4 text-slate-300">Aceleración de deberes y vida tecnológica.</td>
                <td className="py-3.5 px-4 text-slate-300 text-rose-300 font-medium">Mundo sedentario, personas inútiles sin pensamiento.</td>
                <td className="py-3.5 px-4 text-slate-300 text-emerald-300 font-medium">Revolución en salud/economía + rescate del afecto humano.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
