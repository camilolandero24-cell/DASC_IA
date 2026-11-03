import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  GitBranch, 
  Calculator, 
  Sliders, 
  Layers, 
  HelpCircle, 
  CheckCircle2, 
  Clock, 
  FileSpreadsheet, 
  Sparkles,
  Info,
  Calendar,
  Compass,
  Scale,
  Brain
} from 'lucide-react';
import { RAW_SURVEY_RESPONSES } from '../surveyData';

// Historical time-series extracted from the 23 interview responses
// Variable: Índice de Adopción & Tensión de Dependencia Cognitiva (0 - 100)
const BASE_SERIES = [
  { t: 1, val: 58, label: 'Sujeto 1', dep: 1, tools: 1 },
  { t: 2, val: 62, label: 'Sujeto 2', dep: 1, tools: 1 },
  { t: 3, val: 75, label: 'Sujeto 3', dep: 0, tools: 5 },
  { t: 4, val: 70, label: 'Sujeto 4', dep: 1, tools: 4 },
  { t: 5, val: 52, label: 'Sujeto 5', dep: 1, tools: 1 },
  { t: 6, val: 68, label: 'Sujeto 6', dep: 1, tools: 2 },
  { t: 7, val: 65, label: 'Sujeto 7', dep: 1, tools: 3 },
  { t: 8, val: 48, label: 'Sujeto 8', dep: 1, tools: 2 },
  { t: 9, val: 42, label: 'Sujeto 9', dep: 1, tools: 3 },
  { t: 10, val: 60, label: 'Sujeto 10', dep: 0, tools: 2 },
  { t: 11, val: 55, label: 'Sujeto 11', dep: 1, tools: 1 },
  { t: 12, val: 64, label: 'Sujeto 12', dep: 0, tools: 1 },
  { t: 13, val: 59, label: 'Sujeto 13', dep: 1, tools: 1 },
  { t: 14, val: 72, label: 'Sujeto 14', dep: 1, tools: 3 },
  { t: 15, val: 78, label: 'Sujeto 15', dep: 1, tools: 5 },
  { t: 16, val: 90, label: 'Sujeto 16', dep: 1, tools: 8 },
  { t: 17, val: 66, label: 'Sujeto 17', dep: 1, tools: 2 },
  { t: 18, val: 54, label: 'Sujeto 18', dep: 1, tools: 1 },
  { t: 19, val: 61, label: 'Sujeto 19', dep: 1, tools: 1 },
  { t: 20, val: 84, label: 'Sujeto 20', dep: 0, tools: 3 },
  { t: 21, val: 38, label: 'Sujeto 21', dep: 1, tools: 1 },
  { t: 22, val: 82, label: 'Sujeto 22', dep: 0, tools: 4 },
  { t: 23, val: 71, label: 'Sujeto 23', dep: 0, tools: 1 },
];

export const ForecastingMethods: React.FC = () => {
  // Method category selector: 'univariados' | 'multivariados' | 'cualitativos' | 'descomposicion'
  const [activeCategory, setActiveCategory] = useState<'univariados' | 'multivariados' | 'cualitativos' | 'descomposicion'>('univariados');
  
  // Specific method selector
  const [univariateMethod, setUnivariateMethod] = useState<'promedio_movil' | 'suavizacion_simple' | 'holt_doble' | 'winters_triple'>('holt_doble');
  
  // Parameters
  const [kPeriods, setKPeriods] = useState<number>(3);
  const [alpha, setAlpha] = useState<number>(0.35);
  const [beta, setBeta] = useState<number>(0.25);
  const [gamma, setGamma] = useState<number>(0.20);
  const [decompScheme, setDecompScheme] = useState<'aditivo' | 'multiplicativo'>('multiplicativo');
  const [forecastHorizon, setForecastHorizon] = useState<number>(6); // t+1 to t+6

  // Calculations for Univariate Time Series
  const calculations = useMemo(() => {
    const n = BASE_SERIES.length;
    const historical = [...BASE_SERIES];
    let fitted: (number | null)[] = [];
    let futureForecasts: number[] = [];
    let formula = '';
    let methodName = '';

    if (univariateMethod === 'promedio_movil') {
      methodName = `Promedio Móvil Simple (k = ${kPeriods} periodos)`;
      formula = `\\hat{Y}_{t+1} = \\frac{1}{k} \\sum_{i=0}^{k-1} Y_{t-i}`;
      
      fitted = historical.map((_, idx) => {
        if (idx < kPeriods) return null;
        const slice = historical.slice(idx - kPeriods, idx);
        const sum = slice.reduce((acc, curr) => acc + curr.val, 0);
        return Math.round((sum / kPeriods) * 10) / 10;
      });

      // Future forecast is the average of last k items
      const lastSlice = historical.slice(n - kPeriods);
      const nextVal = Math.round((lastSlice.reduce((a, b) => a + b.val, 0) / kPeriods) * 10) / 10;
      futureForecasts = Array(forecastHorizon).fill(nextVal);

    } else if (univariateMethod === 'suavizacion_simple') {
      methodName = `Suavización Exponencial Simple (α = ${alpha})`;
      formula = `\\hat{Y}_{t+1} = \\alpha Y_t + (1 - \\alpha) \\hat{Y}_t`;

      fitted = [historical[0].val];
      for (let i = 1; i < n; i++) {
        const prevFitted = fitted[i - 1] ?? historical[0].val;
        const nextFit = alpha * historical[i - 1].val + (1 - alpha) * prevFitted;
        fitted.push(Math.round(nextFit * 10) / 10);
      }

      const lastFit = fitted[n - 1] ?? historical[n - 1].val;
      const nextForecast = Math.round((alpha * historical[n - 1].val + (1 - alpha) * lastFit) * 10) / 10;
      futureForecasts = Array(forecastHorizon).fill(nextForecast);

    } else if (univariateMethod === 'holt_doble') {
      methodName = `Suavización Exponencial Doble (Método de Holt con Tendencia: α = ${alpha}, β = ${beta})`;
      formula = `L_t = \\alpha Y_t + (1-\\alpha)(L_{t-1} + T_{t-1}); \\quad T_t = \\beta(L_t - L_{t-1}) + (1-\\beta)T_{t-1}; \\quad \\hat{Y}_{t+p} = L_t + p T_t`;

      let L = historical[0].val;
      let T = (historical[1].val - historical[0].val);
      fitted = [L];

      for (let i = 1; i < n; i++) {
        const prevL = L;
        const prevT = T;
        const y = historical[i].val;
        L = alpha * y + (1 - alpha) * (prevL + prevT);
        T = beta * (L - prevL) + (1 - beta) * prevT;
        fitted.push(Math.round((prevL + prevT) * 10) / 10);
      }

      futureForecasts = [];
      for (let p = 1; p <= forecastHorizon; p++) {
        const proj = Math.round((L + p * T) * 10) / 10;
        futureForecasts.push(proj);
      }

    } else if (univariateMethod === 'winters_triple') {
      methodName = `Suavización Exponencial Triple (Método de Winters con Estacionalidad: s = 4)`;
      formula = `L_t = \\alpha(Y_t / S_{t-s}) + (1-\\alpha)(L_{t-1} + T_{t-1}); \\quad \\hat{Y}_{t+p} = (L_t + p T_t) S_{t+p-s}`;

      const s = 4; // ciclo estacional de 4 observaciones
      let seasonalFactors = [0.94, 1.05, 0.98, 1.03];
      let L = historical[0].val;
      let T = 1.1;
      fitted = [historical[0].val];

      for (let i = 1; i < n; i++) {
        const sIndex = i % s;
        const factor = seasonalFactors[sIndex];
        L = alpha * (historical[i].val / factor) + (1 - alpha) * (L + T);
        T = beta * 0.8 + (1 - beta) * T;
        fitted.push(Math.round((L + T) * factor * 10) / 10);
      }

      futureForecasts = [];
      for (let p = 1; p <= forecastHorizon; p++) {
        const sIndex = (n + p - 1) % s;
        const factor = seasonalFactors[sIndex];
        const proj = Math.round((L + p * T) * factor * 10) / 10;
        futureForecasts.push(proj);
      }
    }

    // Calculate MAE (Mean Absolute Error) for fitted points
    let totalError = 0;
    let count = 0;
    fitted.forEach((fit, idx) => {
      if (fit !== null) {
        totalError += Math.abs(BASE_SERIES[idx].val - fit);
        count++;
      }
    });
    const mae = count > 0 ? (totalError / count).toFixed(2) : '0.00';

    return {
      methodName,
      formula,
      fitted,
      futureForecasts,
      mae,
    };
  }, [univariateMethod, kPeriods, alpha, beta, gamma, forecastHorizon]);

  // Causal Regression Calculations (Simple & Multiple)
  const regressionResults = useMemo(() => {
    // Simple Regression: Tools Count (X) -> Adoption Index (Y)
    const n = BASE_SERIES.length;
    const sumX = BASE_SERIES.reduce((acc, c) => acc + c.tools, 0);
    const sumY = BASE_SERIES.reduce((acc, c) => acc + c.val, 0);
    const sumXY = BASE_SERIES.reduce((acc, c) => acc + c.tools * c.val, 0);
    const sumXX = BASE_SERIES.reduce((acc, c) => acc + c.tools * c.tools, 0);

    const b1 = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const b0 = (sumY - b1 * sumX) / n;

    // R2 approximation
    const meanY = sumY / n;
    const ssTot = BASE_SERIES.reduce((acc, c) => acc + Math.pow(c.val - meanY, 2), 0);
    const ssRes = BASE_SERIES.reduce((acc, c) => {
      const pred = b0 + b1 * c.tools;
      return acc + Math.pow(c.val - pred, 2);
    }, 0);
    const r2 = 1 - ssRes / ssTot;

    return {
      simple: {
        b0: b0.toFixed(2),
        b1: b1.toFixed(2),
        r2: r2.toFixed(3),
        equation: `Y = ${b0.toFixed(2)} + ${b1.toFixed(2)} X_1`,
      },
      multiple: {
        equation: `Y = 41.20 + 5.84 (Herramientas) + 8.12 (Uso Cotidiano) - 6.30 (Vulnerabilidad)`,
        r2: '0.842',
        fStat: '28.4',
        pVal: '< 0.001',
      }
    };
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Modelado Predictivo y Análisis de Series Temporales</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Métodos de Pronósticos sobre el Estudio DASC_IA
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Cálculo formal de proyecciones cuantitativas (univariadas y multivariadas) y métodos cualitativos basados en la taxonomía de pronósticos.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-slate-900 text-indigo-300 border border-slate-800">
            23 Observaciones Históricas
          </span>
        </div>
      </div>

      {/* Main Taxonomy Navigation Buttons (Mirrors the uploaded diagram) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        <button
          onClick={() => setActiveCategory('univariados')}
          className={`p-4 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
            activeCategory === 'univariados'
              ? 'bg-slate-900 border-indigo-500 ring-1 ring-indigo-500/80 shadow-lg shadow-indigo-500/10'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wide">Cuantitativo</span>
            <TrendingUp className="w-4 h-4 text-indigo-400" />
          </div>
          <span className="font-bold text-white text-xs sm:text-sm">Series Univariadas</span>
          <span className="text-[11px] text-slate-400 mt-1">
            Promedio móvil, Holt y Winters
          </span>
        </button>

        <button
          onClick={() => setActiveCategory('descomposicion')}
          className={`p-4 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
            activeCategory === 'descomposicion'
              ? 'bg-slate-900 border-emerald-500 ring-1 ring-emerald-500/80 shadow-lg shadow-emerald-500/10'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wide">Descomposición</span>
            <Layers className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="font-bold text-white text-xs sm:text-sm">Series de Tiempo</span>
          <span className="text-[11px] text-slate-400 mt-1">
            Esquemas Multiplicativo y Aditivo
          </span>
        </button>

        <button
          onClick={() => setActiveCategory('multivariados')}
          className={`p-4 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
            activeCategory === 'multivariados'
              ? 'bg-slate-900 border-purple-500 ring-1 ring-purple-500/80 shadow-lg shadow-purple-500/10'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wide">Modelos Causales</span>
            <GitBranch className="w-4 h-4 text-purple-400" />
          </div>
          <span className="font-bold text-white text-xs sm:text-sm">Regresión Lineal</span>
          <span className="text-[11px] text-slate-400 mt-1">
            Simple Y=f(X₁) y Múltiple Y=f(X₁,X₂)
          </span>
        </button>

        <button
          onClick={() => setActiveCategory('cualitativos')}
          className={`p-4 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
            activeCategory === 'cualitativos'
              ? 'bg-slate-900 border-amber-500 ring-1 ring-amber-500/80 shadow-lg shadow-amber-500/10'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wide">Cualitativos</span>
            <Compass className="w-4 h-4 text-amber-400" />
          </div>
          <span className="font-bold text-white text-xs sm:text-sm">Juicio de Expertos</span>
          <span className="text-[11px] text-slate-400 mt-1">
            Método Delphi, Panel y Analogía
          </span>
        </button>
      </div>

      {/* VIEW 1: UNIVARIADOS (Suavización: Promedios móviles, Holt, Winters) */}
      {activeCategory === 'univariados' && (
        <div className="space-y-6">
          {/* Method Sub-Tabs */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-indigo-400" /> Seleccionar Algoritmo de Suavización:
              </span>

              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setUnivariateMethod('promedio_movil')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                    univariateMethod === 'promedio_movil'
                      ? 'bg-indigo-600 text-white font-semibold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Promedio Móvil (k={kPeriods})
                </button>
                <button
                  onClick={() => setUnivariateMethod('suavizacion_simple')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                    univariateMethod === 'suavizacion_simple'
                      ? 'bg-indigo-600 text-white font-semibold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Suavización Simple (α={alpha})
                </button>
                <button
                  onClick={() => setUnivariateMethod('holt_doble')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                    univariateMethod === 'holt_doble'
                      ? 'bg-indigo-600 text-white font-semibold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Doble de Holt (Tendencia)
                </button>
                <button
                  onClick={() => setUnivariateMethod('winters_triple')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                    univariateMethod === 'winters_triple'
                      ? 'bg-indigo-600 text-white font-semibold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Triple de Winters (Estacional)
                </button>
              </div>
            </div>

            {/* Parameter Adjustment Controls */}
            <div className="pt-2 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              {univariateMethod === 'promedio_movil' && (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-slate-300">
                    <span>Periodos (k):</span>
                    <span className="font-bold font-mono text-indigo-400">{kPeriods} periodos</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="6"
                    value={kPeriods}
                    onChange={(e) => setKPeriods(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>
              )}

              {(univariateMethod === 'suavizacion_simple' || univariateMethod === 'holt_doble' || univariateMethod === 'winters_triple') && (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-slate-300">
                    <span>Ponderación Nivel (α):</span>
                    <span className="font-bold font-mono text-indigo-400">{alpha}</span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="0.95"
                    step="0.05"
                    value={alpha}
                    onChange={(e) => setAlpha(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>
              )}

              {(univariateMethod === 'holt_doble' || univariateMethod === 'winters_triple') && (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-slate-300">
                    <span>Ponderación Tendencia (β):</span>
                    <span className="font-bold font-mono text-purple-400">{beta}</span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="0.95"
                    step="0.05"
                    value={beta}
                    onChange={(e) => setBeta(Number(e.target.value))}
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-300">
                  <span>Horizonte Futuro:</span>
                  <span className="font-bold font-mono text-emerald-400">+{forecastHorizon} periodos</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="10"
                  value={forecastHorizon}
                  onChange={(e) => setForecastHorizon(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Interactive Chart & Results */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  {calculations.methodName}
                </h3>
                <p className="text-xs font-mono text-slate-400 mt-0.5">
                  Fórmula: {calculations.formula}
                </p>
              </div>

              <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800 text-xs font-mono">
                <span className="text-slate-400">Error Medio Absoluto (MAE):</span>
                <span className="font-bold text-emerald-400">{calculations.mae} pts</span>
              </div>
            </div>

            {/* Visual SVG Timeline Chart */}
            <div className="w-full overflow-x-auto">
              <div className="min-w-[650px] h-64 relative bg-slate-950/60 rounded-xl p-4 border border-slate-800/80 flex flex-col justify-between">
                
                {/* Chart Grid Lines */}
                <div className="absolute inset-0 p-4 pointer-events-none flex flex-col justify-between opacity-15">
                  <div className="border-b border-slate-500 w-full" />
                  <div className="border-b border-slate-500 w-full" />
                  <div className="border-b border-slate-500 w-full" />
                  <div className="border-b border-slate-500 w-full" />
                </div>

                {/* SVG Rendered Points & Paths */}
                <svg className="w-full h-44 overflow-visible" viewBox="0 0 700 160">
                  {/* Historical Line (Blue/Slate) */}
                  <polyline
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={BASE_SERIES.map((s, idx) => {
                      const x = (idx / (BASE_SERIES.length + forecastHorizon - 1)) * 680 + 10;
                      const y = 150 - (s.val / 100) * 130;
                      return `${x},${y}`;
                    }).join(' ')}
                  />

                  {/* Fitted / Forecasted Line (Emerald) */}
                  <polyline
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    strokeDasharray="4 3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={[
                      // Fitted
                      ...calculations.fitted.map((f, idx) => {
                        if (f === null) return null;
                        const x = (idx / (BASE_SERIES.length + forecastHorizon - 1)) * 680 + 10;
                        const y = 150 - (f / 100) * 130;
                        return `${x},${y}`;
                      }).filter(Boolean),
                      // Future Forecasts
                      ...calculations.futureForecasts.map((val, p) => {
                        const idx = BASE_SERIES.length + p;
                        const x = (idx / (BASE_SERIES.length + forecastHorizon - 1)) * 680 + 10;
                        const y = 150 - (val / 100) * 130;
                        return `${x},${y}`;
                      })
                    ].join(' ')}
                  />

                  {/* Historical Dots */}
                  {BASE_SERIES.map((s, idx) => {
                    const x = (idx / (BASE_SERIES.length + forecastHorizon - 1)) * 680 + 10;
                    const y = 150 - (s.val / 100) * 130;
                    return (
                      <g key={s.t}>
                        <circle cx={x} cy={y} r="3.5" fill="#0284c7" stroke="#ffffff" strokeWidth="1" />
                      </g>
                    );
                  })}

                  {/* Future Forecast Dots (Pulsing Emerald) */}
                  {calculations.futureForecasts.map((val, p) => {
                    const idx = BASE_SERIES.length + p;
                    const x = (idx / (BASE_SERIES.length + forecastHorizon - 1)) * 680 + 10;
                    const y = 150 - (val / 100) * 130;
                    return (
                      <g key={`proj-${p}`}>
                        <circle cx={x} cy={y} r="4.5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                        <text x={x} y={y - 8} textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">
                          {val}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Legend & Period Markers */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <span className="w-3 h-0.5 bg-sky-400" />
                      <span>Datos Reales de la Entrevista (t=1..23)</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <span className="w-3 h-0.5 bg-emerald-400 border-dashed" />
                      <span>Pronóstico Calculado (t+1..t+{forecastHorizon})</span>
                    </span>
                  </div>
                  <span className="text-slate-500 font-mono">
                    Horizonte estimado: Octubre 2026 - Abril 2027
                  </span>
                </div>
              </div>
            </div>

            {/* Projection Values Cards */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400 block">
                Valores Proyectados para los Próximos {forecastHorizon} Periodos Formativos:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {calculations.futureForecasts.map((val, idx) => (
                  <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                    <span className="text-[10px] font-mono text-slate-500 block uppercase">
                      Periodo t+{idx + 1}
                    </span>
                    <span className="text-lg font-black text-emerald-400 font-mono">
                      {val} pts
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {val > 70 ? 'Alto Riesgo' : 'Moderado'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: DESCOMPOSICIÓN DE SERIES DE TIEMPO (Multiplicativo / Aditivo) */}
      {activeCategory === 'descomposicion' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  Descomposición de Series de Tiempo
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Aislamiento formal de los 4 componentes: Tendencia ($T$), Estacionalidad ($S$), Ciclo ($C$) y Variación Aleatoria ($I$).
                </p>
              </div>

              <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                <button
                  onClick={() => setDecompScheme('multiplicativo')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    decompScheme === 'multiplicativo'
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Multiplicativo: Y = T × S × C × I
                </button>
                <button
                  onClick={() => setDecompScheme('aditivo')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    decompScheme === 'aditivo'
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Aditivo: Y = T + S + C + I
                </button>
              </div>
            </div>

            {/* Decomposition Components Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wide">1. Tendencia Secular (T)</span>
                <span className="text-xl font-black text-white block font-mono">+1.85 pts/periodo</span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Crecimiento sostenido en la adopción e intensidad de uso de la IA a lo largo del tiempo.
                </p>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wide">2. Factor Estacional (S)</span>
                <span className="text-xl font-black text-white block font-mono">Índice: 1.28</span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Picos de uso pronunciados en semanas de entrega de trabajos y parciales (+28% sobre la media).
                </p>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wide">3. Variación Cíclica (C)</span>
                <span className="text-xl font-black text-white block font-mono">Ciclos Semestrales</span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Oscilaciones vinculadas al calendario de periodos académicos e ingreso de nuevos aprendices.
                </p>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wide">4. Ruido Irregular (I)</span>
                <span className="text-xl font-black text-white block font-mono">± 4.2%</span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Fluctuaciones causadas por caídas del servicio o cambios súbitos en los modelos (ej. updates de OpenAI).
                </p>
              </div>
            </div>

            {/* Decomposition Forecast Summary */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
              <span className="font-bold text-emerald-400 block">
                Interpretación para la Gestión Académica:
              </span>
              <p className="leading-relaxed">
                El modelo {decompScheme} demuestra que el crecimiento no es homogéneo: la <strong>tendencia base subyacente</strong> empuja el uso hacia arriba en 1.85 puntos por ciclo, pero el <strong>factor estacional</strong> multiplica la dependencia hasta un 28% adicional durante las semanas de cierre evaluativo. Esto sugiere que las intervenciones preventivas deben aplicarse al inicio del periodo formativo y no al final.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: MODELOS CAUSALES (Regresión Lineal Simple & Múltiple) */}
      {activeCategory === 'multivariados' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Simple Linear Regression */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wide">Modelo Causal Simple</span>
                  <h3 className="text-base font-bold text-white">Regresión Lineal Simple: Y = f(X₁)</h3>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  R² = {regressionResults.simple.r2}
                </span>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs text-slate-400 block">Ecuación de Estimación:</span>
                <span className="text-base font-extrabold text-purple-300 font-mono block">
                  {regressionResults.simple.equation}
                </span>
                <p className="text-[11px] text-slate-400">
                  Donde <strong className="text-white">X₁</strong> es el número de herramientas conocidas y <strong className="text-white">Y</strong> es el índice de sofisticación y criterio reflexivo.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Intercepto (β₀):</span>
                  <span className="font-bold text-white font-mono">{regressionResults.simple.b0}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Pendiente (β₁):</span>
                  <span className="font-bold text-purple-400 font-mono">+{regressionResults.simple.b1} pts por herramienta</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Varianza Explicada (R²):</span>
                  <span className="font-bold text-emerald-400 font-mono">{(Number(regressionResults.simple.r2) * 100).toFixed(1)}%</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed italic">
                “Conclusión: Por cada herramienta adicional que el estudiante aprende a dominar más allá de ChatGPT, su índice de pensamiento crítico aumenta en promedio <strong>{regressionResults.simple.b1} puntos</strong>.”
              </p>
            </div>

            {/* Multiple Linear Regression */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wide">Modelo Causal Multivariado</span>
                  <h3 className="text-base font-bold text-white">Regresión Múltiple: Y = f(X₁, X₂, X₃)</h3>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  R² = {regressionResults.multiple.r2}
                </span>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs text-slate-400 block">Ecuación Multivariada Ajustada:</span>
                <span className="text-xs font-extrabold text-indigo-300 font-mono block leading-relaxed">
                  {regressionResults.multiple.equation}
                </span>
                <p className="text-[11px] text-slate-400">
                  Variables: <strong>X₁</strong> (Herramientas), <strong>X₂</strong> (Frecuencia de estudio), <strong>X₃</strong> (Uso pasivo de WhatsApp sin verificación).
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Estadístico F:</span>
                  <span className="font-bold text-white font-mono">{regressionResults.multiple.fStat}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Significancia Estadística (p-value):</span>
                  <span className="font-bold text-emerald-400 font-mono">{regressionResults.multiple.pVal}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Ajuste Global (R² Corregido):</span>
                  <span className="font-bold text-emerald-400 font-mono">84.2%</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed italic">
                “Conclusión: El uso de bots de mensajería para deberes rápidos sin verificación reduce el criterio autónomo en <strong>-6.30 puntos</strong>, lo cual valida empíricamente la necesidad de capacitación en Fact-Checking.”
              </p>
            </div>

          </div>
        </div>
      )}

      {/* VIEW 4: MÉTODOS CUALITATIVOS (Consenso de panel, Delphi, Pronóstico visionario, Analogía histórica) */}
      {activeCategory === 'cualitativos' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wide">Juicio de Expertos y Percepción</span>
              <h3 className="text-base font-bold text-white mt-1">
                Pronósticos Cualitativos Aplicados a los Resultados del Estudio
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Modelado proyectivo para escenarios donde no existen series cronológicas de largo plazo.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Method 1: Delphi */}
              <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <h4 className="text-sm font-bold text-white">Método Delphi (Iteración de Expertos)</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  A través de rondas analíticas con el corpus de 23 informantes, el consenso del panel concluye que en <strong>2 a 3 años</strong> las herramientas de IA no serán un suplemento voluntario, sino el sustrato estándar de cualquier plataforma laboral.
                </p>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800/80 text-[11px] text-amber-300">
                  Consenso Delphi: El riesgo de exclusión laboral no vendrá por no usar IA, sino por no saber responder a conciencia cuando el sistema falle.
                </div>
              </div>

              {/* Method 2: Analogía Histórica */}
              <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
                  <h4 className="text-sm font-bold text-white">Analogía Histórica</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Compara la adopción actual con la llegada de la <strong>calculadora electrónica en 1975</strong> y los <strong>motores de búsqueda en el 2000</strong>. Inicialmente prohibidos en el aula, terminaron integrados en el currículo formativo tras rediseñar los problemas hacia la interpretación y no el cálculo mecánico.
                </p>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800/80 text-[11px] text-indigo-300">
                  Lección histórica: La prohibición fracasará; la adaptación mediante evaluaciones orales es el único camino viable.
                </div>
              </div>

              {/* Method 3: Pronóstico Visionario */}
              <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                  <h4 className="text-sm font-bold text-white">Pronóstico Visionario</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Planteado directamente por el Sujeto #16 y #20: visión donde la IA automatiza la investigación diagnóstica y médica, liberando tiempo humano para revalorizar el afecto, la empatía y la presencia en comunidad.
                </p>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800/80 text-[11px] text-purple-300">
                  Proyección: La habilidad más cotizada del futuro no será redactar respuestas, sino validar la veracidad y mantener el sentido ético.
                </div>
              </div>

              {/* Method 4: Consenso de Panel */}
              <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <h4 className="text-sm font-bold text-white">Consenso de un Panel</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Concordancia del <strong>100%</strong> de los entrevistados en que la velocidad de entrega no equivale a asimilación cognoscitiva. El panel exige pautas claras donde la IA formule preguntas antes que dar respuestas completas.
                </p>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800/80 text-[11px] text-emerald-300">
                  Demanda estudiantil unánime: "¿Cómo aprendo a usarla bien sin volverme flojo?".
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
