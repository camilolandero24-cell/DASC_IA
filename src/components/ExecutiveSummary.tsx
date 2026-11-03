import React from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  Clock, 
  Brain, 
  Bot, 
  ShieldAlert, 
  ArrowRight, 
  Sparkles,
  Award,
  Zap,
  Target
} from 'lucide-react';
import { SURVEY_METADATA } from '../surveyData';

interface ExecutiveSummaryProps {
  onNavigate: (tab: string) => void;
}

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-64 h-64 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Sistema DASC_IA | Métodos de Pronósticos & Manual por Roles</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            DASC_IA: Estudio de Percepción, Pronósticos y Hábitos de la IA
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Análisis integral de <strong className="text-white">23 testimonios a profundidad</strong> y modelado predictivo formal de series de tiempo y modelos causales. Los resultados revelan una <span className="text-amber-400 font-semibold">tensión crítica</span>: los usuarios celebran la velocidad récord para resolver deberes escolares y académicos, pero alertan unánimemente sobre el riesgo inminente de <span className="text-rose-400 font-semibold">dependencia cognitiva, atrofia del pensamiento crítico y pérdida del esfuerzo reflexivo</span>.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('pronosticos')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/30 transition cursor-pointer"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Ver Métodos de Pronósticos</span>
            </button>
            <button
              onClick={() => onNavigate('manual')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition cursor-pointer"
            >
              <span>Manual de Roles (Instructor / Aprendiz)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('graficas')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
            >
              <span>Gráficas & Stats</span>
            </button>
            <button
              onClick={() => onNavigate('qr')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
            >
              <span>Código QR</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Muestra Analizada</span>
            <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
              <Brain className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">23</span>
            <span className="text-xs text-slate-400 font-medium">encuestados</span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            100% de respuestas completas y cualificadas.
          </p>
          <div className="mt-3 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full w-full" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Penetración ChatGPT</span>
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
              <Bot className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-400 tracking-tight">91.3%</span>
            <span className="text-xs text-slate-400 font-medium">21 de 23</span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Líder indiscutible en recordación y uso cotidiano.
          </p>
          <div className="mt-3 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '91.3%' }} />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Uso en Deberes/Tareas</span>
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
              <Zap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-400 tracking-tight">78.3%</span>
            <span className="text-xs text-slate-400 font-medium">18 de 23</span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Principal caso de uso declarado: entrega de tareas escolares.
          </p>
          <div className="mt-3 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full" style={{ width: '78.3%' }} />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Alerta de Dependencia</span>
            <div className="p-2 bg-rose-500/10 rounded-lg text-rose-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-rose-400 tracking-tight">65.2%</span>
            <span className="text-xs text-slate-400 font-medium">15 de 23</span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Temen atrofia cognitiva, pereza y pérdida de pensamiento.
          </p>
          <div className="mt-3 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-rose-500 rounded-full" style={{ width: '65.2%' }} />
          </div>
        </div>
      </div>

      {/* 4 Pillars of Key Findings */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Los 4 Hallazgos Principales del Estudio
            </h3>
            <p className="text-xs text-slate-400">
              Síntesis analítica del patrón de comportamiento y respuestas recolectadas
            </p>
          </div>
          <button
            onClick={() => onNavigate('resultados')}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
          >
            <span>Ver todas las citas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Finding 1 */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3 hover:border-slate-700 transition">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wide">Ventaja Dominante</span>
                <h4 className="text-sm font-bold text-white">Velocidad Récord y Ahorro Inmediato de Horas</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  El <strong>73.9%</strong> de los encuestados destaca que la IA convierte tareas que antes tomaban horas en cuestión de minutos. Actúa como un atajo eficiente para desatascar dudas conceptuales y entregar deberes a tiempo.
                </p>
              </div>
            </div>
            <div className="bg-slate-950/60 rounded-lg p-3 border border-slate-800/80 text-xs italic text-slate-300">
              “Tareas que ahora toman horas de trabajo hechas por una persona, con la IA podrían hacerse en minutos.”
            </div>
          </div>

          {/* Finding 2 */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3 hover:border-slate-700 transition">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-rose-400 uppercase tracking-wide">La Gran Alarma</span>
                <h4 className="text-sm font-bold text-white">Pereza Cognitiva y Síndrome del Impostor</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Casi <strong className="text-rose-300">dos tercios (65.2%)</strong> admiten espontáneamente el peligro de volverse dependientes. Se verbaliza el temor de "no aprender nada", "no saber qué responder en una entrevista laboral" o "volver a la gente estúpida o inútil".
                </p>
              </div>
            </div>
            <div className="bg-slate-950/60 rounded-lg p-3 border border-slate-800/80 text-xs italic text-slate-300">
              “¿Riesgo? De qué no aprendo nada... una desventaja sería no saber qué responder sin su apoyo en una entrevista de trabajo.”
            </div>
          </div>

          {/* Finding 3 */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3 hover:border-slate-700 transition">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wide">Riesgos Técnicos</span>
                <h4 className="text-sm font-bold text-white">Desinformación, Alucinaciones y Privacidad</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Un <strong>17.4%</strong> advierte que los modelos cometen alucinaciones ("da información errada o falsa") que pueden inducir al error en exámenes. Adicionalmente, emergen alertas sobre la necesidad de entregar datos personales en herramientas de mensajería.
                </p>
              </div>
            </div>
            <div className="bg-slate-950/60 rounded-lg p-3 border border-slate-800/80 text-xs italic text-slate-300">
              “Se puede conseguir cualquier información, pero el riesgo es que mucha de la información que te dé puede ser falsa.”
            </div>
          </div>

          {/* Finding 4 */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3 hover:border-slate-700 transition">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0 mt-0.5">
                <Brain className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-purple-400 uppercase tracking-wide">Visión de Futuro</span>
                <h4 className="text-sm font-bold text-white">Humanismo Digital vs. Cultura Homogénea</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Frente a los que pronostican un mundo "sedentario y hecho con IA en vez de por artistas", los usuarios avanzados destacan que la IA potenciará la medicina y la economía, pero que la verdadera felicidad radicará en valorar lo humano y compartir con otros.
                </p>
              </div>
            </div>
            <div className="bg-slate-950/60 rounded-lg p-3 border border-slate-800/80 text-xs italic text-slate-300">
              “En el futuro tendremos mucha tecnología, pero lo que nos hará felices seguirá siendo compartir con las personas que queremos.”
            </div>
          </div>
        </div>
      </div>

      {/* Methodology & Technical Specifications Card */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Award className="w-4 h-4 text-indigo-400" />
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Ficha Metodológica del Estudio</h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-500 block">Tamaño Muestral</span>
            <span className="font-semibold text-white">N = 23 informantes</span>
          </div>
          <div>
            <span className="text-slate-500 block">Fecha de Ejecución</span>
            <span className="font-semibold text-white">{SURVEY_METADATA.dateCollected}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Técnica de Indagación</span>
            <span className="font-semibold text-white">Entrevista cuali-cuantitativa abierta</span>
          </div>
          <div>
            <span className="text-slate-500 block">Población Objetivo</span>
            <span className="font-semibold text-white">Estudiantes / Usuarios de IA en tareas</span>
          </div>
        </div>
      </div>
    </div>
  );
};
