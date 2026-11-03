import React, { useState } from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  UserCheck, 
  Award, 
  CheckCircle2, 
  Printer, 
  Copy, 
  Check, 
  Download, 
  FileText,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  Zap,
  Target,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ManualViewer: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'instructor' | 'aprendiz' | 'coordinador'>('instructor');
  const [copied, setCopied] = useState(false);

  const handleCopyManual = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    confetti({
      particleCount: 35,
      spread: 50,
      origin: { y: 0.8 }
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Documentación Operativa y Guías de Uso</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Manual de Usuario DASC_IA por Roles
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Guía oficial de operación adaptada para Instructores, Aprendices y Coordinación Académica. Disponible también en el archivo raíz <code className="text-indigo-300 font-mono">/manual.md</code>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir Manual</span>
          </button>
        </div>
      </div>

      {/* Role Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Role 1: Instructor */}
        <button
          onClick={() => setSelectedRole('instructor')}
          className={`p-5 rounded-2xl border text-left transition cursor-pointer relative overflow-hidden ${
            selectedRole === 'instructor'
              ? 'bg-slate-900 border-indigo-500 ring-1 ring-indigo-500 shadow-xl shadow-indigo-500/10'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-800">
              Docencia & Taller
            </span>
          </div>
          <h3 className="text-sm font-bold text-white">Manual del Instructor</h3>
          <p className="text-xs text-slate-400 mt-1 line-clamp-2">
            Orientación didáctica, diseño de rúbricas socráticas y enseñanza de métodos de pronósticos en aula.
          </p>
        </button>

        {/* Role 2: Aprendiz */}
        <button
          onClick={() => setSelectedRole('aprendiz')}
          className={`p-5 rounded-2xl border text-left transition cursor-pointer relative overflow-hidden ${
            selectedRole === 'aprendiz'
              ? 'bg-slate-900 border-emerald-500 ring-1 ring-emerald-500 shadow-xl shadow-emerald-500/10'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <UserCheck className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
              Autodiagnóstico
            </span>
          </div>
          <h3 className="text-sm font-bold text-white">Manual del Aprendiz</h3>
          <p className="text-xs text-slate-400 mt-1 line-clamp-2">
            Autoevaluación de hábitos, superación de la pereza cognitiva, talleres prácticos y privacidad de datos.
          </p>
        </button>

        {/* Role 3: Coordinador Académico */}
        <button
          onClick={() => setSelectedRole('coordinador')}
          className={`p-5 rounded-2xl border text-left transition cursor-pointer relative overflow-hidden ${
            selectedRole === 'coordinador'
              ? 'bg-slate-900 border-purple-500 ring-1 ring-purple-500 shadow-xl shadow-purple-500/10'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
              <Award className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-950 text-purple-300 border border-purple-800">
              Gestión Directiva
            </span>
          </div>
          <h3 className="text-sm font-bold text-white">Manual del Coordinador</h3>
          <p className="text-xs text-slate-400 mt-1 line-clamp-2">
            Monitoreo de indicadores, toma de decisiones con series de tiempo y gobernanza institucional 2026-2027.
          </p>
        </button>
      </div>

      {/* Manual Content Display Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-9 shadow-2xl space-y-6">
        
        {/* INSTRUCTOR MANUAL */}
        {selectedRole === 'instructor' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Guía de Operación Pedagógica para el Instructor
                  </h3>
                  <span className="text-xs text-indigo-400 font-medium">
                    Misión: Convertir la IA de fraude involuntario a acelerador socrático
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleCopyManual("Manual del Instructor DASC_IA...")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado' : 'Copiar Rol'}</span>
              </button>
            </div>

            <div className="space-y-5 text-xs sm:text-sm text-slate-300 leading-relaxed">
              
              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  1. Cómo Conducir la Sesión Inicial de Diagnóstico
                </h4>
                <p>
                  Abra la pestaña <strong>"Hallazgos Clave"</strong> en el proyector del aula. Muestre a los aprendices cómo el 91.3% utiliza ChatGPT y cómo el 78.3% la destina a resolver tareas escolares.
                </p>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs italic text-slate-300">
                  “Dilema para debate grupal: Si una máquina redacta tu ensayo y tú solo lo entregas, ¿quién aprendió realmente? ¿Qué responderás en una entrevista de trabajo cuando te evalúen sin el móvil?”
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  2. Cómo Enseñar Métodos de Pronósticos con DASC_IA
                </h4>
                <p>
                  Diríjase a la pestaña <strong>"Pronósticos"</strong>. Utilice el simulador interactivo para explicar la diferencia entre métodos cualitativos (Delphi y Analogía) y cuantitativos:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-400 text-xs">
                  <li><strong>Promedio Móvil:</strong> Muestre cómo $k=3$ suaviza picos puntuales de estrés en la entrega de tareas.</li>
                  <li><strong>Suavización Exponencial (Holt):</strong> Ajuste $\alpha$ y $\beta$ para enseñar cómo la tendencia alcista anticipa un incremento del 25% en dependencia si no se interviene.</li>
                  <li><strong>Regresión Lineal Simple y Múltiple:</strong> Muestre la correlación matemática ($R^2 = 0.842$) que demuestra que conocer más de 3 herramientas correlaciona positivamente con el pensamiento crítico.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  3. Pauta para Rúbricas Inmunes a IA (Estrategia REC-02)
                </h4>
                <p>
                  Implemente la regla <strong>40/60</strong>: 40% entregable previo documentando los prompts usados con la IA, y 60% defensa oral individual sin dispositivos para validar la comprensión real del estudiante.
                </p>
              </div>

            </div>
          </div>
        )}

        {/* APRENDIZ MANUAL */}
        {selectedRole === 'aprendiz' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Guía de Autodiagnóstico y Uso Ético para el Aprendiz
                  </h3>
                  <span className="text-xs text-emerald-400 font-medium">
                    Misión: Dominar la IA como herramienta y fortalecer tu propio criterio
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleCopyManual("Manual del Aprendiz DASC_IA...")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado' : 'Copiar Rol'}</span>
              </button>
            </div>

            <div className="space-y-5 text-xs sm:text-sm text-slate-300 leading-relaxed">
              
              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  1. Autodiagnóstico: ¿En Qué Arquetipo Estás?
                </h4>
                <p>
                  Entra a <strong>"Perfiles & Contraste"</strong>. Si utilizas la IA simplemente para copiar y pegar textos en tus deberes sin leerlos, estás en el segmento <strong className="text-amber-400">Pragmático Utilitario</strong> y corres alto riesgo de olvidar los conocimientos.
                </p>
                <p>
                  Tu objetivo es evolucionar al perfil de <strong className="text-purple-400">Explorador Estratégico</strong>: pedirle a la IA que te haga preguntas de prueba, que te explique paso a paso las fórmulas y que evalúe tus propios resúmenes.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  2. Cómo Practicar Métodos de Pronósticos
                </h4>
                <p>
                  En la pestaña <strong>"Pronósticos"</strong> puedes interactuar con los deslizadores de promedios móviles, Holt y regresión. Observa cómo cambian las predicciones numéricas y comprende el significado del error (MAE) para tus tareas de estadística.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  3. Decálogo de Seguridad y Privacidad
                </h4>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <p className="text-rose-300 font-semibold">⚠️ Regla de Oro:</p>
                  <p className="text-slate-400">
                    Nunca compartas números de identificación, fotos privadas, contraseñas o nombres de familiares con chatbots en WhatsApp ni plataformas abiertas.
                  </p>
                  <p className="text-slate-400">
                    Verifica siempre los datos: un 17.4% de los participantes sufrió alucinaciones de IA que causaron errores en sus exámenes.
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* COORDINADOR ACADÉMICO MANUAL */}
        {selectedRole === 'coordinador' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Manual Directivo para la Coordinación Académica
                  </h3>
                  <span className="text-xs text-purple-400 font-medium">
                    Misión: Gobernanza institucional, adaptación curricular y blindaje ético
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleCopyManual("Manual del Coordinador DASC_IA...")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado' : 'Copiar Rol'}</span>
              </button>
            </div>

            <div className="space-y-5 text-xs sm:text-sm text-slate-300 leading-relaxed">
              
              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  1. Monitoreo del Panel de Alerta Temprana
                </h4>
                <p>
                  En <strong>"Resumen Ejecutivo"</strong> y <strong>"Gráficas & Stats"</strong>, supervise el indicador de alarma por atrofia del pensamiento (65.2%). Si los instructores continúan evaluando mediante ensayos caseros estándar, la integridad académica estará en riesgo.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  2. Utilización de Pronósticos para Planificación Docente
                </h4>
                <p>
                  Las proyecciones de <strong>Descomposición de Series de Tiempo</strong> revelan un incremento estacional del +28% en el uso intensivo de IA durante los cierres semestrales. Planifique los talleres de capacitación pedagógica al inicio del periodo para mitigar los picos de plagio.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  3. Implementación del Roadmap Institucional 2026-2027
                </h4>
                <p>
                  Revise la pestaña <strong>"Estrategias"</strong> y lidere el despliegue de las 3 fases: Contención y Fact-Checking (Fase 1), Transición hacia Evaluaciones Orales (Fase 2) e Institucionalización del Humanismo Digital (Fase 3).
                </p>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
