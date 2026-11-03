import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { ExecutiveSummary } from './components/ExecutiveSummary';
import { ChartsSection } from './components/ChartsSection';
import { KeyFindings } from './components/KeyFindings';
import { UserDifferences } from './components/UserDifferences';
import { AnalysisInterpretation } from './components/AnalysisInterpretation';
import { StrategicRecommendations } from './components/StrategicRecommendations';
import { DataTableSection } from './components/DataTableSection';
import { DynamicQRCode } from './components/DynamicQRCode';
import { ReportModal } from './components/ReportModal';
import { ForecastingMethods } from './components/ForecastingMethods';
import { ManualViewer } from './components/ManualViewer';
import { SURVEY_METADATA } from './surveyData';
import { 
  Brain, 
  Sparkles, 
  Check, 
  ExternalLink, 
  Share2, 
  QrCode, 
  FileText, 
  Heart,
  ChevronRight
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('resumen');
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [showShareToast, setShowShareToast] = useState<boolean>(false);

  const handleQuickShare = () => {
    const url = typeof window !== 'undefined' ? window.location.href : SURVEY_METADATA.defaultReportUrl;
    navigator.clipboard.writeText(url);
    setShowShareToast(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 }
    });
    setTimeout(() => setShowShareToast(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Toast Notification */}
      {showShareToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-2xl animate-bounce text-xs font-semibold">
          <Check className="w-4 h-4" />
          <span>¡Enlace del estudio copiado al portapapeles!</span>
        </div>
      )}

      {/* Main App Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onQuickShare={handleQuickShare}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'resumen' && (
          <ExecutiveSummary onNavigate={(tab) => setActiveTab(tab)} />
        )}

        {activeTab === 'graficas' && (
          <ChartsSection />
        )}

        {activeTab === 'pronosticos' && (
          <ForecastingMethods />
        )}

        {activeTab === 'manual' && (
          <ManualViewer />
        )}

        {activeTab === 'resultados' && (
          <KeyFindings />
        )}

        {activeTab === 'diferencias' && (
          <UserDifferences />
        )}

        {activeTab === 'analisis' && (
          <AnalysisInterpretation />
        )}

        {activeTab === 'recomendaciones' && (
          <StrategicRecommendations />
        )}

        {activeTab === 'datos' && (
          <DataTableSection />
        )}

        {activeTab === 'qr' && (
          <DynamicQRCode onOpenReportModal={() => setIsReportModalOpen(true)} />
        )}
      </main>

      {/* Global Bottom Navigation Breadcrumbs / Quick Tour */}
      <div className="no-print border-t border-slate-900 bg-slate-950/80 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            <span>Navegando: <strong>{activeTab.toUpperCase()}</strong></span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-slate-500">23 Entrevistas Analizadas</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('qr')}
              className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Generar Código QR</span>
            </button>
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="text-purple-400 hover:text-purple-300 flex items-center gap-1 font-medium cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Ver Informe en Pantalla Completa</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="no-print border-t border-slate-900 bg-slate-950 text-slate-500 text-xs py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1">
            <p className="font-semibold text-slate-400">
              {SURVEY_METADATA.title}
            </p>
            <p className="text-[11px] text-slate-600">
              Datos recolectados el {SURVEY_METADATA.dateCollected} • Metodología: Entrevista semiestructurada (N=23).
            </p>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="px-2.5 py-1 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
              Código QR Dinámico Integrado
            </span>
            <span className="px-2.5 py-1 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-900/50">
              Exportación de Datos CSV
            </span>
          </div>
        </div>
      </footer>

      {/* Comprehensive Full Report Modal */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
    </div>
  );
}
