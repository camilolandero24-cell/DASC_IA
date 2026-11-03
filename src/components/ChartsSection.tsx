import React from 'react';
import { 
  BarChart3, 
  PieChart as PieIcon, 
  AlertTriangle, 
  Sparkles, 
  Info
} from 'lucide-react';
import { 
  TOOL_ADOPTION_STATS, 
  PERCEIVED_UTILITY_STATS, 
  RISKS_PERCEIVED_STATS, 
  FUTURE_VISION_STATS
} from '../surveyData';

export const ChartsSection: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Métricas Cuantitativas & Distribuciones</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Análisis Estadístico y Visualización de Datos
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Tabulación y modelado visual de las 23 entrevistas estructuradas (Muestra N=23).
          </p>
        </div>

        {/* Global summary badge */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl text-xs text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Datos Consolidados: <strong>23 Encuestas Validadas</strong></span>
        </div>
      </div>

      {/* Grid of Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Tool Adoption Bar Chart */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Ecosistema & Penetración</span>
              <h3 className="text-base font-bold text-white mt-0.5">
                Herramientas de IA más Conocidas por los Usuarios
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Frecuencia de mención espontánea entre los 23 encuestados (admite multirrespuesta).
              </p>
            </div>
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <BarChart3 className="w-5 h-5" />
            </div>
          </div>

          <div className="space-y-4 pt-2">
            {TOOL_ADOPTION_STATS.map((tool) => (
              <div key={tool.name} className="space-y-1.5 group">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tool.color }} />
                    {tool.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-mono text-[11px]">{tool.count} menciones</span>
                    <span className="font-bold text-white font-mono">{tool.percentage.toFixed(1)}%</span>
                  </div>
                </div>
                <div className="h-3 w-full bg-slate-800/80 rounded-full overflow-hidden p-0.5">
                  <div 
                    className="h-full rounded-full transition-all duration-700 ease-out group-hover:brightness-125"
                    style={{ 
                      width: `${tool.percentage}%`, 
                      backgroundColor: tool.color,
                      boxShadow: `0 0 12px ${tool.color}30` 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 text-xs text-slate-300 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Hallazgo Clave:</strong> OpenAI monopoliza la recordación (91.3%). Resalta el auge de asistentes integrados en <em>WhatsApp</em> como <strong>Meta AI</strong> (34.8%), <strong>Luzia</strong> (21.7%) y <strong>Dola</strong> (17.4%), preferidos por no requerir apps dedicadas.
            </div>
          </div>
        </div>

        {/* Chart 2: Perceived Utility Donut / Distribution */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider">Impacto Diario</span>
              <h3 className="text-base font-bold text-white mt-0.5">
                ¿La IA Ayuda o Complica las Tareas Diarias?
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Balance de utilidad percibida en la rutina escolar y profesional.
              </p>
            </div>
            <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
              <PieIcon className="w-5 h-5" />
            </div>
          </div>

          {/* Donut representation via SVG */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
            <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#10b981"
                  strokeWidth="14"
                  strokeDasharray="185.7 251.32"
                  strokeDashoffset="0"
                  className="transition-all duration-300 hover:opacity-80"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#f59e0b"
                  strokeWidth="14"
                  strokeDasharray="54.5 251.32"
                  strokeDashoffset="-185.7"
                  className="transition-all duration-300 hover:opacity-80"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#ef4444"
                  strokeWidth="14"
                  strokeDasharray="11.1 251.32"
                  strokeDashoffset="-240.2"
                  className="transition-all duration-300 hover:opacity-80"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-white">73.9%</span>
                <span className="text-[10px] text-slate-400 font-medium">Reconoce Ayuda</span>
              </div>
            </div>

            {/* Legend with details */}
            <div className="space-y-3 w-full sm:w-auto text-xs">
              {PERCEIVED_UTILITY_STATS.map((item) => (
                <div key={item.label} className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/80 space-y-1">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      {item.label}
                    </span>
                    <span className="font-bold text-white font-mono">{item.percentage.toFixed(1)}% ({item.count})</span>
                  </div>
                  <p className="text-[11px] text-slate-400 pl-4">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 text-xs text-slate-300 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Matiz Relevante:</strong> Aunque el 73.9% dice que ayuda, el <strong>21.7%</strong> añade la condición: <em>"ayuda si se da un buen prompt, pero si no, solo entorpece o engaña"</em>.
            </div>
          </div>
        </div>

        {/* Chart 3: Risks & Concerns Detected */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider">Amenazas Percibidas</span>
              <h3 className="text-base font-bold text-white mt-0.5">
                Riesgos y Desventajas más Señalados
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                ¿Qué temen los encuestados que ocurra con el uso continuo de la IA?
              </p>
            </div>
            <div className="p-2 bg-rose-500/10 text-rose-400 rounded-lg">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>

          <div className="space-y-4 pt-1">
            {RISKS_PERCEIVED_STATS.map((risk) => (
              <div key={risk.label} className="space-y-1.5 bg-slate-950/40 p-3 rounded-xl border border-slate-800/60">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: risk.color }} />
                    <span className="font-bold text-slate-200">{risk.label}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-slate-400 text-[11px]">{risk.count} menciones</span>
                    <span className="font-extrabold text-white">{risk.percentage.toFixed(1)}%</span>
                  </div>
                </div>
                
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{ 
                      width: `${risk.percentage}%`, 
                      backgroundColor: risk.color,
                      boxShadow: `0 0 10px ${risk.color}40`
                    }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 italic">“{risk.desc}”</p>
              </div>
            ))}
          </div>

          <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 text-xs text-slate-300 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Alerta Mayoritaria:</strong> Más del <strong>65%</strong> de los entrevistados teme explícitamente perder la capacidad de pensar autónomamente y no saber desenvolverse profesionalmente.
            </div>
          </div>
        </div>

        {/* Chart 4: Future Vision of Society */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-semibold text-purple-400 uppercase tracking-wider">Prospectiva & Sociedad</span>
              <h3 className="text-base font-bold text-white mt-0.5">
                ¿Cómo Cree que Cambiará el Mundo con la IA?
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Polarización entre entusiasmo económico-médico y temor a la deshumanización.
              </p>
            </div>
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>

          <div className="space-y-4 pt-1">
            {FUTURE_VISION_STATS.map((future) => (
              <div key={future.label} className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: future.color }} />
                    {future.label}
                  </span>
                  <span className="font-bold text-white font-mono">{future.percentage.toFixed(1)}% ({future.count})</span>
                </div>
                <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{ 
                      width: `${future.percentage}%`, 
                      backgroundColor: future.color 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Quick Quotes Snippet */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-slate-300">
              <span className="font-semibold text-emerald-400 block mb-1">Visión Optimista</span>
              “Beneficiará sectores de la economía, medicina y acelerará el conocimiento.”
            </div>
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-slate-300">
              <span className="font-semibold text-rose-400 block mb-1">Visión Pesimista</span>
              “Un mundo sedentario, donde todos dependen de la IA y se pierde el pensar propio.”
            </div>
          </div>
        </div>

      </div>

      {/* Cross-Analysis Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">
              Cruce Estadístico: Caso de Uso vs. Sentimiento de Impacto
            </h3>
            <p className="text-xs text-slate-400">
              Correlación entre el propósito para el que usan la IA y su nivel de inquietud cognitiva
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Categoría de Uso</th>
                <th className="py-3 px-4">Respuestas (N)</th>
                <th className="py-3 px-4">% de la Muestra</th>
                <th className="py-3 px-4">Principal Riesgo Verbalizado</th>
                <th className="py-3 px-4">Predisposición hacia el Futuro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr className="hover:bg-slate-800/40 transition">
                <td className="py-3 px-4 font-semibold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Académico / Tareas Escolares
                </td>
                <td className="py-3 px-4 font-mono">18</td>
                <td className="py-3 px-4 font-mono font-bold text-emerald-400">78.3%</td>
                <td className="py-3 px-4 text-rose-300">Dependencia mental / No aprender nada por copiar</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    Dividido (40% Opt / 60% Alerta)
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition">
                <td className="py-3 px-4 font-semibold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  Creatividad & Ampliar Conocimiento
                </td>
                <td className="py-3 px-4 font-mono">4</td>
                <td className="py-3 px-4 font-mono font-bold text-indigo-400">17.4%</td>
                <td className="py-3 px-4 text-purple-300">Pérdida de originalidad y privacidad de datos</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    Estratégico / Humanista
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition">
                <td className="py-3 px-4 font-semibold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-400" />
                  Exploración Ocasional / Casi Ninguno
                </td>
                <td className="py-3 px-4 font-mono">1</td>
                <td className="py-3 px-4 font-mono font-bold text-slate-300">4.3%</td>
                <td className="py-3 px-4 text-slate-400">Uso excesivo y desidia</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-700 text-slate-300">
                    Cauteloso
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
