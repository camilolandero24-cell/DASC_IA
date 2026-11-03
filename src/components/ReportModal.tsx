import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  Copy, 
  Check, 
  FileText, 
  Brain, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle,
  Award
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  SURVEY_METADATA, 
  TOOL_ADOPTION_STATS, 
  PERCEIVED_UTILITY_STATS, 
  RISKS_PERCEIVED_STATS, 
  STRATEGIC_RECOMMENDATIONS,
  RAW_SURVEY_RESPONSES 
} from '../surveyData';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const currentUrl = typeof window !== 'undefined' ? window.location.href : SURVEY_METADATA.defaultReportUrl;

  const handleCopySummary = () => {
    const summary = `
OBSERVATORIO DE PERCEPCIÓN Y USO DE LA INTELIGENCIA ARTIFICIAL (OCTUBRE 2026)
Muestra: N = 23 entrevistas a profundidad.

HALLAZGOS CLAVE:
1. Penetración de Herramientas: ChatGPT lidera con 91.3%, seguido por Meta AI (34.8%), Gemini (34.8%), Luzia (21.7%) y Dola (17.4%).
2. Caso de Uso Dominante: 78.3% la utiliza casi exclusivamente para resolución de deberes escolares y tareas académicas.
3. Utilidad Percibida: 73.9% reporta que ayuda a ahorrar horas de trabajo, pero 21.7% advierte que no enseña o genera desinformación.
4. Riesgo Mayoritario: 65.2% alerta sobre dependencia cognitiva, pereza mental ("hace a la gente floja") y miedo a no saber qué responder en una entrevista laboral.
5. Visión del Futuro: Polarizada entre el salto médico-económico (43.5%) y una sociedad sedentaria sin pensamiento propio (26.1%).

RECOMENDACIONES ESTRATÉGICAS:
- Migrar del rol de "resolvedor" al de "tutor socrático".
- Implementar defensas orales y resolución de casos en vivo (evaluaciones inmunes a IA).
- Talleres obligatorios de Fact-Checking y detección de alucinaciones.
- Protocolo de Blindaje de Datos Sensibles en WhatsApp.

Accede a la plataforma web interactiva escaneando el código QR o en: ${currentUrl}
    `.trim();

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        
        {/* Modal Controls Bar (Hidden during print) */}
        <div className="no-print flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Award className="w-4 h-4 text-indigo-400" />
            <span className="font-semibold text-white">Informe Ejecutivo Oficial de Investigación</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400">Listo para Imprimir o Archivar</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado' : 'Copiar Texto'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 text-slate-200 bg-slate-900 print:bg-white print:text-black">
          
          {/* Document Cover / Header */}
          <div className="border-b border-slate-800 print:border-black pb-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-widest">
                INFORME DE INVESTIGACIÓN CUALI-CUANTITATIVA
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {SURVEY_METADATA.dateCollected}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white print:text-black tracking-tight">
              {SURVEY_METADATA.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 print:text-slate-700 leading-relaxed">
              Muestra representativa de <strong>23 informantes</strong>. Estudio focalizado en hábitos de resolución de tareas escolares, adopción de modelos generativos, contradicciones pedagógicas y prospectiva social.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 print:bg-slate-100 border border-slate-800 print:border-slate-300">
              <span className="text-slate-400 print:text-slate-600 block text-[10px] uppercase font-bold">Muestra Validada</span>
              <span className="text-xl font-extrabold text-white print:text-black">N = 23</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 print:bg-slate-100 border border-slate-800 print:border-slate-300">
              <span className="text-slate-400 print:text-slate-600 block text-[10px] uppercase font-bold">Tasa ChatGPT</span>
              <span className="text-xl font-extrabold text-emerald-400 print:text-emerald-700">91.3%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 print:bg-slate-100 border border-slate-800 print:border-slate-300">
              <span className="text-slate-400 print:text-slate-600 block text-[10px] uppercase font-bold">Uso en Deberes</span>
              <span className="text-xl font-extrabold text-amber-400 print:text-amber-700">78.3%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 print:bg-slate-100 border border-slate-800 print:border-slate-300">
              <span className="text-slate-400 print:text-slate-600 block text-[10px] uppercase font-bold">Alerta Dependencia</span>
              <span className="text-xl font-extrabold text-rose-400 print:text-rose-700">65.2%</span>
            </div>
          </div>

          {/* Section 1: Diagnóstico General */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-white print:text-black border-l-4 border-indigo-500 pl-3">
              1. Resumen Ejecutivo del Comportamiento Detectado
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 print:text-slate-700 leading-relaxed">
              La consulta de campo demostró que la inteligencia artificial se ha instalado en el día a día estudiantil como un <strong>acelerador de deberes mecánicos</strong>. Los jóvenes valoran masivamente el ahorro de tiempo, pasando de horas de búsqueda manual a respuestas instantáneas en cuestión de segundos.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 print:text-slate-700 leading-relaxed">
              Sin embargo, surge una alarma crítica expresada por el <strong>65.2%</strong>: el convencimiento de que el uso indiscriminado conduce a la <em className="text-white print:text-black font-semibold">atrofia del pensamiento crítico y la pereza cognitiva</em>. Frases como <em>"de qué no aprendo nada"</em> o <em>"nunca responderíamos nada a conciencia en una entrevista de trabajo"</em> demuestran que los propios usuarios sienten la necesidad de límites y guías pedagógicas.
            </p>
          </div>

          {/* Section 2: Consolidado de Tabulación */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-white print:text-black border-l-4 border-emerald-500 pl-3">
              2. Tabulación Estadística de las Variables Clave
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Tool Adoption */}
              <div className="bg-slate-950/60 print:bg-slate-50 p-4 rounded-xl border border-slate-800 print:border-slate-300 space-y-2">
                <span className="font-bold text-white print:text-black block text-xs">Herramientas más Conocidas</span>
                {TOOL_ADOPTION_STATS.map((t) => (
                  <div key={t.name} className="flex justify-between text-[11px] py-1 border-b border-slate-800/40 print:border-slate-200">
                    <span className="text-slate-300 print:text-slate-700">{t.name}</span>
                    <span className="font-bold text-white print:text-black font-mono">{t.percentage.toFixed(1)}% ({t.count})</span>
                  </div>
                ))}
              </div>

              {/* Risks */}
              <div className="bg-slate-950/60 print:bg-slate-50 p-4 rounded-xl border border-slate-800 print:border-slate-300 space-y-2">
                <span className="font-bold text-white print:text-black block text-xs">Riesgos y Amenazas Señaladas</span>
                {RISKS_PERCEIVED_STATS.map((r) => (
                  <div key={r.label} className="flex justify-between text-[11px] py-1 border-b border-slate-800/40 print:border-slate-200">
                    <span className="text-slate-300 print:text-slate-700">{r.label}</span>
                    <span className="font-bold text-rose-400 print:text-rose-700 font-mono">{r.percentage.toFixed(1)}% ({r.count})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Citas de Impacto */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-white print:text-black border-l-4 border-amber-500 pl-3">
              3. Citas Textuales Destacadas de Informantes
            </h2>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-950/70 print:bg-slate-100 rounded-lg border border-slate-800 print:border-slate-300 italic text-slate-300 print:text-slate-800">
                “Una desventaja sería no saber qué responder sin su apoyo en una entrevista de trabajo: nunca responderíamos nada a conciencia.” — Sujeto #5
              </div>
              <div className="p-3 bg-slate-950/70 print:bg-slate-100 rounded-lg border border-slate-800 print:border-slate-300 italic text-slate-300 print:text-slate-800">
                “Hace a la gente estúpida, ayuda a hacer cosas en tiempo récord.” — Sujeto #8
              </div>
              <div className="p-3 bg-slate-950/70 print:bg-slate-100 rounded-lg border border-slate-800 print:border-slate-300 italic text-slate-300 print:text-slate-800">
                “¿Riesgo? De qué no aprendo nada.” — Sujeto #11
              </div>
              <div className="p-3 bg-slate-950/70 print:bg-slate-100 rounded-lg border border-slate-800 print:border-slate-300 italic text-slate-300 print:text-slate-800">
                “En el futuro tendremos mucha tecnología a nuestro alrededor, pero lo que nos hará felices seguirá siendo compartir con las personas que queremos.” — Sujeto #16
              </div>
            </div>
          </div>

          {/* Section 4: Recomendaciones Estratégicas */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-white print:text-black border-l-4 border-purple-500 pl-3">
              4. Plan de Acción y Recomendaciones Estratégicas
            </h2>
            <div className="space-y-2.5 text-xs">
              {STRATEGIC_RECOMMENDATIONS.slice(0, 4).map((rec) => (
                <div key={rec.id} className="p-3.5 bg-slate-950/60 print:bg-slate-50 rounded-xl border border-slate-800 print:border-slate-300 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white print:text-black">{rec.title}</span>
                    <span className="text-[10px] font-bold text-emerald-400 print:text-emerald-700 uppercase font-mono">{rec.priority}</span>
                  </div>
                  <p className="text-slate-400 print:text-slate-600 text-[11px] leading-relaxed">
                    {rec.actionPlan}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: QR Code Verification Badge */}
          <div className="pt-4 border-t border-slate-800 print:border-black flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-950/80 print:bg-slate-100 p-6 rounded-2xl">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-[11px] font-bold text-indigo-400 print:text-indigo-700 uppercase tracking-wider block">
                Verificación & Acceso Interactivo
              </span>
              <h3 className="text-sm font-bold text-white print:text-black">
                Escanea para Consultar el Estudio en la Plataforma Web
              </h3>
              <p className="text-xs text-slate-400 print:text-slate-600 max-w-sm">
                Acceso al prototipo completo con filtros dinámicos, explorador de citas, simuladores y desglose por usuario.
              </p>
              <span className="text-[11px] font-mono text-indigo-300 print:text-indigo-800 block truncate max-w-xs">
                {currentUrl}
              </span>
            </div>

            <div className="p-3 bg-white rounded-xl shadow-lg border border-slate-200 shrink-0">
              <QRCodeSVG
                value={currentUrl}
                size={130}
                level="M"
                includeMargin={false}
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
