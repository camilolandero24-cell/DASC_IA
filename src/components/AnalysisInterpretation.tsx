import React from 'react';
import { 
  Brain, 
  Lightbulb, 
  TrendingDown, 
  Zap, 
  Sparkles, 
  AlertOctagon,
  BookOpen,
  Compass
} from 'lucide-react';

export const AnalysisInterpretation: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-2">
          <Brain className="w-3.5 h-3.5" />
          <span>Marco Teórico & Lectura Cualitativa Profunda</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Análisis e Interpretación Sociotécnica del Comportamiento
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Decodificación de los patrones subyacentes, paradojas cognitivas y dinámicas pedagógicas reveladas en las 23 entrevistas.
        </p>
      </div>

      {/* The 4 Analytical Pillars */}
      <div className="space-y-6">
        
        {/* Pillar 1 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Paradoja Central</span>
              <h3 className="text-base sm:text-lg font-bold text-white">
                1. La Paradoja de la Eficiencia vs. la Atrofia Cognitiva
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            El hallazgo más contundente del estudio es la <strong>coexistencia de fascinación y culpa</strong>. El usuario agradece que la IA le ahorre <em>"horas de trabajo en minutos"</em> (73.9%), pero al mismo tiempo confiesa con una honestidad desarmante que <em>"no aprendo nada"</em> y que el sistema <em>"pone muy flojas a las personas"</em>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Beneficio Percibido (La Promesa)
              </span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Entregar a tiempo, eludir la fricción inicial de la página en blanco y superar asignaturas con menor desgaste de energía.
              </p>
            </div>
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-rose-400 flex items-center gap-1.5">
                <AlertOctagon className="w-4 h-4" /> Coste Silencioso (La Realidad)
              </span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Erosión de las conexiones neuronales que fijan el aprendizaje: al no haber esfuerzo de síntesis ni lucha con el texto, la memoria a largo plazo no consolida los conceptos.
              </p>
            </div>
          </div>
        </div>

        {/* Pillar 2 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
              <TrendingDown className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider">Impacto Psicológico</span>
              <h3 className="text-base sm:text-lg font-bold text-white">
                2. El "Efecto Prótesis" y la Inseguridad ante el Mundo Real
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Una de las frases más lúcidas de la muestra provino del Sujeto #5: <em>“Una desventaja sería no saber qué responder sin su apoyo en una entrevista de trabajo; nunca responderíamos nada a conciencia”</em>. Esto evidencia el nacimiento de un <strong>síndrome de invalidez cognitiva percibida</strong>.
          </p>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/80 space-y-2 text-xs text-slate-300">
            <p className="leading-relaxed">
              Cuando el estudiante se acostumbra a que una máquina formule por él las respuestas elaboradas, desarrolla miedo al escenario sincrónico (entrevistas presenciales, exámenes orales, debates laborales). La IA se convierte en una <strong>muleta psicológica</strong> cuya ausencia genera pánico a la exposición de la propia ignorancia.
            </p>
          </div>
        </div>

        {/* Pillar 3 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">Evolución Cultural</span>
              <h3 className="text-base sm:text-lg font-bold text-white">
                3. La Amenaza a la Autoría Humana y la Uniformidad del Pensamiento
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            El testimonio del Sujeto #17 advierte que <em>“el mundo se volverá más 'hecho con IA' que 'hecho por un artista o ingeniero'”</em>. Se detecta una temprana preocupación por la homogeneización del pensamiento: si todos consultan el mismo modelo con prompts genéricos, las respuestas, ensayos, estilos e ideas tienden a converger en un promedio plano y estandarizado.
          </p>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Asimismo, el Sujeto #16 rescata la dimensión ética más madura de la entrevista: recordar que la tecnología no debe despojar al ser humano de su vocación gregaria, familiar y artística.
          </p>
        </div>

        {/* Pillar 4 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">Canal & Usabilidad</span>
              <h3 className="text-base sm:text-lg font-bold text-white">
                4. La Colonización de WhatsApp: La IA Invisible y Desregulada
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            La alta mención de asistentes como <strong>Meta AI, Luzia y Dola</strong> (que suman más del 40% de menciones conjuntas) demuestra que la barrera de entrada fue demolida al incrustar la IA en WhatsApp.
          </p>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Esto tiene una consecuencia crucial para las instituciones educativas: el estudiante no requiere iniciar sesión en un ordenador o plataforma escolar; la IA convive en el mismo chat donde coordina salidas o conversa con su familia. Por ende, <strong>cualquier política de prohibición técnica es inviable</strong>. La única vía de intervención es pedagógica y cultural.
          </p>
        </div>

      </div>

      {/* Synthesis Callout */}
      <div className="bg-gradient-to-r from-indigo-950/40 via-purple-950/40 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          <span>Conclusión Sintética de la Investigación</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
          La IA no está reemplazando el trabajo manual en este grupo muestral; <strong>está reemplazando el tiempo de incubación del pensamiento</strong>. Cuando el objetivo de la educación se mide únicamente por el entregable final ("hacer la tarea"), la IA triunfa como máquina de fraude involuntario. Para recuperar el sentido del aprendizaje, es imperativo transitar hacia la <strong className="text-emerald-400">evaluación dialógica, socrática y de criterio humano en vivo</strong>.
        </p>
      </div>
    </div>
  );
};
