import React, { useState } from 'react';
import { 
  Quote, 
  Award, 
  Sparkles, 
  Filter
} from 'lucide-react';
import { RAW_SURVEY_RESPONSES } from '../surveyData';

export const KeyFindings: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const quotesWithCategories = RAW_SURVEY_RESPONSES.filter((r) => r.featuredQuote);

  const categories = [
    { id: 'all', label: 'Todas las Citas' },
    { id: 'Alarma de Atrofia Cognitiva', label: 'Atrofia Cognitiva' },
    { id: 'Reflexión Humanista', label: 'Humanismo & Sociedad' },
    { id: 'Confesión de Impostor', label: 'Confesiones de Estudio' },
    { id: 'Contraste Radical', label: 'Contraste Eficiencia vs. Mente' },
    { id: 'Alucinaciones y Veracidad', label: 'Desinformación' },
    { id: 'Impacto Científico-Médico', label: 'Medicina & Futuro' },
  ];

  const filteredQuotes = selectedCategory === 'all'
    ? quotesWithCategories
    : quotesWithCategories.filter((q) => q.quoteCategory === selectedCategory);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
          <Award className="w-3.5 h-3.5" />
          <span>Resultados Principales & Voces Directas</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Lo Que Más Respondieron & Las Opiniones Más Destacadas
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Síntesis de los consensos mayoritarios de los 23 encuestados y recopilación de testimonios textuales más reveladores.
        </p>
      </div>

      {/* PARTE 1: Lo que más respondieron */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-bold text-white">
            1. Consensos Mayoritarios: Lo Que Más Respondieron
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Card Q1 */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
              <span>Pregunta 1: Herramientas</span>
              <span className="text-emerald-400 font-mono">91.3% Consenso</span>
            </div>
            <h4 className="text-sm font-bold text-white">ChatGPT como Sinónimo Universal de IA</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              21 de los 23 entrevistados mencionaron de forma espontánea a <strong>ChatGPT</strong>. Solo usuarios con intereses específicos citaron alternativas como <em>Gemini, Claude, Dola o Luzia</em>.
            </p>
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>Segundo lugar: Meta AI (34.8%)</span>
              <span className="text-indigo-400 font-semibold">Efecto WhatsApp</span>
            </div>
          </div>

          {/* Card Q2 */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
              <span>Pregunta 2: Uso Habitual</span>
              <span className="text-amber-400 font-mono">78.3% Consenso</span>
            </div>
            <h4 className="text-sm font-bold text-white">Deberes Escolares y Trabajos del Colegio</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              La inmensa mayoría emplea la IA para resolver tareas escolares pendientes y responder cuestionarios que no comprenden, priorizando la entrega oportuna.
            </p>
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>Solo 17.4% la usa para crear o innovar</span>
              <span className="text-amber-400 font-semibold">Uso Utilitario</span>
            </div>
          </div>

          {/* Card Q3 */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
              <span>Pregunta 3: ¿Ayuda o Complica?</span>
              <span className="text-indigo-400 font-mono">73.9% Consenso</span>
            </div>
            <h4 className="text-sm font-bold text-white">Ayuda en Tiempo, pero no Enseña</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Responden que <em>"ayuda mucho a ahorrar tiempo"</em>, pero introducen una queja fundamental: <strong>facilita el resultado sin garantizar el aprendizaje interiorizado</strong>.
            </p>
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>21.7% tiene postura ambivalente</span>
              <span className="text-indigo-400 font-semibold">"Depende del Prompt"</span>
            </div>
          </div>

          {/* Card Q4 */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
              <span>Pregunta 4: Ventajas</span>
              <span className="text-emerald-400 font-mono">Consenso Unánime</span>
            </div>
            <h4 className="text-sm font-bold text-white">Ahorro Drástico de Horas de Esfuerzo</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              La ventaja número uno indiscutible es la rapidez con la que se completan investigaciones que antes demandaban horas de búsqueda manual en bibliotecas o internet.
            </p>
            <div className="pt-2 border-t border-slate-800/80 text-[11px] text-emerald-400 font-semibold">
              Efecto multiplicador de productividad inmediata.
            </div>
          </div>

          {/* Card Q5 */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
              <span>Pregunta 4: Riesgos</span>
              <span className="text-rose-400 font-mono">65.2% Consenso</span>
            </div>
            <h4 className="text-sm font-bold text-white">Pereza Intelectual y Dependencia Severa</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              El miedo no es a que la IA destruya el mundo, sino a volverse <strong>"flojos, inútiles y sin capacidad de pensar por sí mismos"</strong> en la vida real.
            </p>
            <div className="pt-2 border-t border-slate-800/80 text-[11px] text-rose-400 font-semibold">
              Riesgo existencial centrado en el cerebro humano.
            </div>
          </div>

          {/* Card Q6 */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
              <span>Pregunta 5: Futuro Global</span>
              <span className="text-purple-400 font-mono">Visión Polarizada</span>
            </div>
            <h4 className="text-sm font-bold text-white">Salto Científico vs. Mundo Sedentario</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Por un lado, prevén avances en medicina, detección de enfermedades y economía; por el otro, temen un mundo deshumanizado, homogéneo y sedentario.
            </p>
            <div className="pt-2 border-t border-slate-800/80 text-[11px] text-purple-400 font-semibold">
              Dualidad utopía médica vs. distopía de desidia.
            </div>
          </div>

        </div>
      </div>

      {/* PARTE 2: Las Opiniones Más Destacadas */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Quote className="w-5 h-5 text-indigo-400" />
              <h3 className="text-lg font-bold text-white">
                2. Las Opiniones Más Destacadas (Voces Verbatim de la Entrevista)
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Frases textuales que capturan los dilemas éticos, pedagógicos y existenciales de los participantes.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quotes Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredQuotes.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900/90 border border-slate-800/90 hover:border-slate-700 rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-4 group transition"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[11px]">
                    {item.quoteCategory}
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">
                    Sujeto #{item.id} • {item.userProfile}
                  </span>
                </div>

                <div className="relative pl-6">
                  <Quote className="w-5 h-5 text-indigo-500/40 absolute -left-0.5 top-0 rotate-180" />
                  <blockquote className="text-sm font-medium text-slate-100 leading-relaxed italic">
                    "{item.featuredQuote}"
                  </blockquote>
                </div>
              </div>

              {/* Context footer */}
              <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/70 text-xs text-slate-400 space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Herramientas que usa:</span>
                  <span className="font-semibold text-slate-300">{item.toolsList.join(', ')}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Riesgo diagnosticado:</span>
                  <span className="text-rose-400 font-medium">{item.mainRisk}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
