import React from 'react';
import { 
  BarChart3, 
  FileText, 
  QrCode, 
  Users, 
  Lightbulb, 
  Table2, 
  Brain, 
  Sparkles,
  Share2,
  TrendingUp,
  BookOpen
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenReportModal: () => void;
  onQuickShare: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenReportModal,
  onQuickShare,
}) => {
  const navItems = [
    { id: 'resumen', label: 'Resumen Ejecutivo', icon: Sparkles },
    { id: 'graficas', label: 'Gráficas & Stats', icon: BarChart3 },
    { id: 'pronosticos', label: 'Pronósticos', icon: TrendingUp, badge: 'Métodos' },
    { id: 'manual', label: 'Manual de Roles', icon: BookOpen, badge: 'Guía' },
    { id: 'resultados', label: 'Hallazgos Clave', icon: FileText },
    { id: 'diferencias', label: 'Perfiles & Contraste', icon: Users },
    { id: 'analisis', label: 'Interpretación', icon: Brain },
    { id: 'recomendaciones', label: 'Estrategias', icon: Lightbulb },
    { id: 'datos', label: 'Base de Datos (N=23)', icon: Table2 },
    { id: 'qr', label: 'Código QR Dinámico', icon: QrCode },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                DASC_IA
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Observatorio & Pronósticos
              </span>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Muestra N = 23
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Sistema de Análisis Estadístico, Series de Tiempo y Manual por Roles
            </p>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('qr')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition shadow-sm cursor-pointer"
            title="Ir al Código QR Dinámico"
          >
            <QrCode className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Código QR</span>
          </button>

          <button
            onClick={onQuickShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition shadow-sm cursor-pointer"
            title="Copiar enlace del estudio"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-300" />
            <span className="hidden sm:inline">Compartir</span>
          </button>

          <button
            onClick={onOpenReportModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-md shadow-indigo-600/25 transition cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Informe Completo</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
        <nav className="flex space-x-1 overflow-x-auto py-2 scrollbar-none" aria-label="Tabs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-medium rounded-lg whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-1 px-1.5 py-0.2 rounded text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
