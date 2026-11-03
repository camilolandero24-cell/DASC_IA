import React, { useState, useRef } from 'react';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
import confetti from 'canvas-confetti';
import { 
  QrCode, 
  ExternalLink, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  Sliders, 
  Smartphone, 
  RefreshCw,
  Share2,
  Globe,
  Printer
} from 'lucide-react';
import { SURVEY_METADATA } from '../surveyData';

interface DynamicQRCodeProps {
  onOpenReportModal: () => void;
}

export const DynamicQRCode: React.FC<DynamicQRCodeProps> = ({ onOpenReportModal }) => {
  const currentAppUrl = typeof window !== 'undefined' ? window.location.href : SURVEY_METADATA.defaultReportUrl;
  
  const [targetUrl, setTargetUrl] = useState<string>(currentAppUrl);
  const [qrSize, setQrSize] = useState<number>(240);
  const [fgColor, setFgColor] = useState<string>('#0f172a');
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [includeMargin, setIncludeMargin] = useState<boolean>(true);
  const [errorLevel, setErrorLevel] = useState<'L' | 'M' | 'Q' | 'H'>('H');
  const [copied, setCopied] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [showMobileSimulator, setShowMobileSimulator] = useState<boolean>(false);

  const qrCanvasRef = useRef<HTMLDivElement>(null);

  const presets = [
    { label: 'Plataforma Web (Esta URL)', url: currentAppUrl },
    { label: 'Reporte Ejecutivo Completo', url: `${currentAppUrl}#informe-ejecutivo` },
    { label: 'Base de Datos de Respuestas', url: `${currentAppUrl}#datos-entrevista` },
  ];

  const colorPresets = [
    { name: 'Negro Clásico', fg: '#0f172a', bg: '#ffffff' },
    { name: 'Índigo Ejecutivo', fg: '#312e81', bg: '#eef2ff' },
    { name: 'Esmeralda Tech', fg: '#064e3b', bg: '#ecfdf5' },
    { name: 'Púrpura Profundo', fg: '#4c1d95', bg: '#faf5ff' },
    { name: 'Modo Oscuro Invertido', fg: '#38bdf8', bg: '#0b0f19' },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadPNG = () => {
    if (!qrCanvasRef.current) return;
    const canvas = qrCanvasRef.current.querySelector('canvas');
    if (!canvas) return;

    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.download = `codigo_qr_estudio_ia_${new Date().toISOString().slice(0, 10)}.png`;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setDownloadSuccess(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 }
    });
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleDownloadSVG = () => {
    const svg = document.getElementById('dynamic-qr-svg');
    if (!svg) return;

    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.download = `codigo_qr_estudio_ia_${new Date().toISOString().slice(0, 10)}.svg`;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-2">
            <QrCode className="w-3.5 h-3.5" />
            <span>Redirección Dinámica & Acceso Móvil</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Generador de Código QR Dinámico del Estudio
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Genera un código QR dinámico en tiempo real que redirige a la plataforma web oficial con el informe detallado de la investigación.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowMobileSimulator(!showMobileSimulator)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
            <span>{showMobileSimulator ? 'Ocultar Simulador' : 'Simular Escaneo'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: QR Code Visualizer & Download Card */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col items-center text-center space-y-6">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wide">
              Código QR Activo y Escaneable
            </span>
            <h3 className="text-base font-bold text-white">
              Escanea para abrir el Informe Web
            </h3>
            <p className="text-xs text-slate-400 max-w-xs">
              Apunta la cámara de tu smartphone para acceder inmediatamente al informe completo e interactivo.
            </p>
          </div>

          {/* QR Display Frame */}
          <div className="relative p-5 rounded-2xl bg-white shadow-2xl border-4 border-slate-800/60 transition-transform hover:scale-[1.02]">
            <div id="qr-container" className="flex items-center justify-center">
              <QRCodeSVG
                id="dynamic-qr-svg"
                value={targetUrl || currentAppUrl}
                size={qrSize}
                fgColor={fgColor}
                bgColor={bgColor}
                level={errorLevel}
                includeMargin={includeMargin}
              />
            </div>

            {/* Hidden canvas for PNG export */}
            <div ref={qrCanvasRef} className="hidden">
              <QRCodeCanvas
                value={targetUrl || currentAppUrl}
                size={512}
                fgColor={fgColor}
                bgColor={bgColor}
                level={errorLevel}
                includeMargin={includeMargin}
              />
            </div>
          </div>

          {/* Target URL Pill */}
          <div className="w-full bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-left space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              URL de Destino Configurada:
            </span>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-mono text-indigo-300 truncate" title={targetUrl}>
                {targetUrl}
              </span>
              <a
                href={targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white p-1"
                title="Abrir URL en pestaña"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Download & Action Buttons */}
          <div className="w-full grid grid-cols-2 gap-3">
            <button
              onClick={handleDownloadPNG}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar PNG</span>
            </button>

            <button
              onClick={handleDownloadSVG}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar SVG</span>
            </button>
          </div>

          <div className="w-full grid grid-cols-2 gap-3">
            <button
              onClick={handleCopyLink}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 transition cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '¡Copiado!' : 'Copiar Enlace'}</span>
            </button>

            <button
              onClick={onOpenReportModal}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 transition cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span>Ver Informe Web</span>
            </button>
          </div>
        </div>

        {/* Right Column: Customizer & URL Configuration */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Target URL Control */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-indigo-400" />
                1. Configuración de la URL de Destino
              </h3>
              <button
                onClick={() => setTargetUrl(currentAppUrl)}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" /> Restaurar predeterminado
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300 block">
                Enlace al que redirigirá el código QR:
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  placeholder="https://tu-plataforma-web.com/informe"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white font-mono focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
            </div>

            {/* Presets */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-semibold text-slate-400 block">Accesos rápidos:</span>
              <div className="flex flex-wrap gap-2">
                {presets.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => setTargetUrl(p.url)}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* QR Design & Aesthetics */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-400" />
              2. Personalización Visual del Código QR
            </h3>

            {/* Color Palettes */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300 block">
                Paletas de Color Estilizadas:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {colorPresets.map((palette) => (
                  <button
                    key={palette.name}
                    onClick={() => {
                      setFgColor(palette.fg);
                      setBgColor(palette.bg);
                    }}
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 flex items-center gap-2.5 text-xs text-slate-300 transition cursor-pointer"
                  >
                    <div className="flex items-center -space-x-1">
                      <span className="w-4 h-4 rounded-full border border-slate-700" style={{ backgroundColor: palette.fg }} />
                      <span className="w-4 h-4 rounded-full border border-slate-700" style={{ backgroundColor: palette.bg }} />
                    </div>
                    <span className="truncate">{palette.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Slider & Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-2 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">Tamaño del QR</span>
                  <span className="font-mono text-indigo-400 font-bold">{qrSize}px</span>
                </div>
                <input
                  type="range"
                  min="160"
                  max="320"
                  step="20"
                  value={qrSize}
                  onChange={(e) => setQrSize(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div className="space-y-2 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">Corrección de Error</span>
                  <span className="font-mono text-emerald-400 font-bold">Nivel {errorLevel}</span>
                </div>
                <div className="grid grid-cols-4 gap-1 text-xs">
                  {(['L', 'M', 'Q', 'H'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setErrorLevel(lvl)}
                      className={`py-1 rounded text-center font-mono font-bold transition cursor-pointer ${
                        errorLevel === lvl
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Margin Toggle */}
            <div className="flex items-center justify-between bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 text-xs">
              <div>
                <span className="font-medium text-slate-200 block">Margen Blanco Perimetral</span>
                <span className="text-slate-500 text-[11px]">Recomendado para óptima lectura con cámaras de smartphone</span>
              </div>
              <input
                type="checkbox"
                checked={includeMargin}
                onChange={(e) => setIncludeMargin(e.target.checked)}
                className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Use Case Box for Print Materials */}
          <div className="bg-gradient-to-r from-indigo-950/40 to-slate-900 border border-indigo-500/30 rounded-2xl p-5 space-y-2 text-xs">
            <h4 className="font-bold text-white flex items-center gap-2">
              <Printer className="w-4 h-4 text-indigo-400" />
              Aplicación en Posters, Presentaciones y Diapositivas
            </h4>
            <p className="text-slate-300 leading-relaxed">
              Descarga el formato <strong>SVG</strong> para imprimir en alta resolución en pósteres científicos, infografías de congresos o proyectarlo en la diapositiva final de tu presentación para que la audiencia explore el dataset interactivo en vivo.
            </p>
          </div>

        </div>

      </div>

      {/* Mobile Scanning Simulator */}
      {showMobileSimulator && (
        <div className="mt-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl animate-fadeIn space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-indigo-400" />
              <h3 className="text-base font-bold text-white">
                Simulador de Experiencia Móvil al Escanear
              </h3>
            </div>
            <span className="text-xs text-slate-400">
              Vista previa del destino al que accederá el usuario
            </span>
          </div>

          <div className="flex justify-center py-4">
            <div className="w-[320px] h-[520px] rounded-[36px] bg-slate-950 border-4 border-slate-700 shadow-2xl overflow-hidden flex flex-col relative">
              {/* Phone notch */}
              <div className="h-6 bg-slate-900 w-full flex items-center justify-center">
                <div className="w-20 h-3 bg-black rounded-full" />
              </div>

              {/* Mobile screen content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 text-[11px] text-slate-300">
                <div className="bg-indigo-600/20 border border-indigo-500/30 p-2.5 rounded-xl text-center">
                  <span className="font-bold text-indigo-300 block">Observatorio de Percepción de IA</span>
                  <span className="text-[10px] text-slate-400">Informe Ejecutivo Completo</span>
                </div>

                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-emerald-400 font-bold block text-xs">Muestra: 23 Entrevistas</span>
                  <p className="text-slate-400 text-[10px]">91.3% uso de ChatGPT • 65.2% alarma por dependencia cognitiva.</p>
                </div>

                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-amber-400 font-bold block text-xs">Hallazgo Mayoritario</span>
                  <p className="text-slate-300 italic text-[10px]">“Ayuda mucho para ahorrar tiempo en tareas, pero dejas de aprender por querer hacer todo con ella.”</p>
                </div>

                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-indigo-400 font-bold block text-xs">Acción Pedagógica</span>
                  <p className="text-slate-400 text-[10px]">Migración hacia evaluaciones orales y tutoría socrática en aula.</p>
                </div>

                <button
                  onClick={onOpenReportModal}
                  className="w-full py-2 rounded-lg bg-indigo-600 font-bold text-white text-center cursor-pointer hover:bg-indigo-500"
                >
                  Abrir Informe Completo
                </button>
              </div>

              {/* Bottom bar */}
              <div className="h-4 bg-slate-900 w-full flex items-center justify-center">
                <div className="w-24 h-1 bg-slate-600 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
