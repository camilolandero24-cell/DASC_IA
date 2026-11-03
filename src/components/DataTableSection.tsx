import React, { useState, useMemo } from 'react';
import { 
  Table2, 
  Search, 
  Eye, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  XCircle,
  X,
  FileSpreadsheet,
  Clock,
  Quote
} from 'lucide-react';
import { RAW_SURVEY_RESPONSES } from '../surveyData';
import { SurveyResponse } from '../types';

export const DataTableSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedToolFilter, setSelectedToolFilter] = useState('all');
  const [selectedVerdictFilter, setSelectedVerdictFilter] = useState('all');
  const [selectedProfileFilter, setSelectedProfileFilter] = useState('all');
  const [activeModalItem, setActiveModalItem] = useState<SurveyResponse | null>(null);

  // Filtered rows
  const filteredRows = useMemo(() => {
    return RAW_SURVEY_RESPONSES.filter((item) => {
      // Search text
      const term = searchTerm.toLowerCase();
      const matchesSearch = 
        item.toolsKnownRaw.toLowerCase().includes(term) ||
        item.usageRaw.toLowerCase().includes(term) ||
        item.prosAndConsRaw.toLowerCase().includes(term) ||
        item.worldFutureRaw.toLowerCase().includes(term) ||
        item.id.toString().includes(term);

      if (!matchesSearch) return false;

      // Filter tool
      if (selectedToolFilter !== 'all') {
        const hasTool = item.toolsList.some(t => t.toLowerCase().includes(selectedToolFilter.toLowerCase()));
        if (!hasTool) return false;
      }

      // Filter verdict
      if (selectedVerdictFilter !== 'all' && item.utilityVerdict !== selectedVerdictFilter) {
        return false;
      }

      // Filter profile
      if (selectedProfileFilter !== 'all' && item.userProfile !== selectedProfileFilter) {
        return false;
      }

      return true;
    });
  }, [searchTerm, selectedToolFilter, selectedVerdictFilter, selectedProfileFilter]);

  // Export to CSV function
  const handleExportCSV = () => {
    const headers = [
      'ID',
      'Marca Temporal',
      'Herramientas Conocidas',
      'Uso Declarado',
      'Veredicto Utilidad',
      'Ventaja Principal',
      'Riesgo Principal',
      'Categoria Riesgo',
      'Vision de Futuro',
      'Perfil Asignado'
    ];

    const rows = RAW_SURVEY_RESPONSES.map((r) => [
      r.id,
      `"${r.timestamp}"`,
      `"${r.toolsKnownRaw.replace(/"/g, '""')}"`,
      `"${r.usageRaw.replace(/"/g, '""')}"`,
      `"${r.utilityVerdict}"`,
      `"${r.mainAdvantage.replace(/"/g, '""')}"`,
      `"${r.mainRisk.replace(/"/g, '""')}"`,
      `"${r.riskCategory}"`,
      `"${r.worldFutureRaw.replace(/"/g, '""')}"`,
      `"${r.userProfile}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `entrevista_ia_dataset_n23_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-2">
            <Table2 className="w-3.5 h-3.5" />
            <span>Dataset Estructurado & Respuestas Textuales</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Base de Datos Completa de las 23 Entrevistas
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Exploración tabular, búsqueda en lenguaje natural y visualización del registro íntegro de cada informante.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 shadow-sm transition cursor-pointer shrink-0"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
          <span>Exportar a CSV ({filteredRows.length})</span>
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por palabra clave (ej. 'dependencia', 'colegio', 'medicina', 'floja', 'entrevista')..."
            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-slate-400 font-semibold flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Filtrar por:
          </span>

          {/* Tool filter */}
          <select
            value={selectedToolFilter}
            onChange={(e) => setSelectedToolFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-300 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="all">Todas las Herramientas</option>
            <option value="ChatGPT">ChatGPT (OpenAI)</option>
            <option value="Meta">Meta AI (WhatsApp)</option>
            <option value="Gemini">Gemini (Google)</option>
            <option value="Luzia">Luzia</option>
            <option value="Dola">Dola AI</option>
            <option value="Claude">Claude / Grok / Otras</option>
          </select>

          {/* Verdict filter */}
          <select
            value={selectedVerdictFilter}
            onChange={(e) => setSelectedVerdictFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-300 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="all">Todos los Veredictos</option>
            <option value="Ayuda significativamente">Ayuda significativamente</option>
            <option value="Mixto / Depende del uso">Mixto / Depende del uso</option>
            <option value="Complica / No ayuda">Complica / No ayuda</option>
          </select>

          {/* Profile filter */}
          <select
            value={selectedProfileFilter}
            onChange={(e) => setSelectedProfileFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-300 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="all">Todos los Perfiles</option>
            <option value="Pragmático Utilitario">Pragmático Utilitario</option>
            <option value="Crítico Escéptico">Crítico Escéptico</option>
            <option value="Explorador Estratégico">Explorador Estratégico</option>
          </select>

          {(selectedToolFilter !== 'all' || selectedVerdictFilter !== 'all' || selectedProfileFilter !== 'all' || searchTerm) && (
            <button
              onClick={() => {
                setSelectedToolFilter('all');
                setSelectedVerdictFilter('all');
                setSelectedProfileFilter('all');
                setSearchTerm('');
              }}
              className="text-xs text-indigo-400 hover:text-indigo-300 underline font-medium ml-2 cursor-pointer"
            >
              Restablecer filtros
            </button>
          )}

          <span className="ml-auto text-slate-500 font-mono text-[11px]">
            Mostrando {filteredRows.length} de {RAW_SURVEY_RESPONSES.length} registros
          </span>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[11px] bg-slate-950/60">
                <th className="py-3 px-3 text-center">ID</th>
                <th className="py-3 px-4">Herramientas</th>
                <th className="py-3 px-4">Uso Cotidiano</th>
                <th className="py-3 px-4">Veredicto Utilidad</th>
                <th className="py-3 px-4">Riesgo Diagnosticado</th>
                <th className="py-3 px-4">Visión de Futuro</th>
                <th className="py-3 px-4">Perfil</th>
                <th className="py-3 px-3 text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    No se encontraron respuestas con los criterios de búsqueda seleccionados.
                  </td>
                </tr>
              ) : (
                filteredRows.map((row) => (
                  <tr 
                    key={row.id} 
                    className="hover:bg-slate-800/50 transition cursor-pointer group"
                    onClick={() => setActiveModalItem(row)}
                  >
                    <td className="py-3.5 px-3 text-center font-mono font-bold text-slate-400">
                      #{row.id}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-white max-w-[180px]">
                      <div className="flex flex-wrap gap-1">
                        {row.toolsList.slice(0, 3).map((tool, i) => (
                          <span key={i} className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                            {tool}
                          </span>
                        ))}
                        {row.toolsList.length > 3 && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-indigo-300">
                            +{row.toolsList.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 max-w-[150px] truncate" title={row.usageRaw}>
                      {row.usageRaw}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        row.utilityVerdict === 'Ayuda significativamente'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : row.utilityVerdict === 'Mixto / Depende del uso'
                          ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {row.utilityVerdict === 'Ayuda significativamente' && <CheckCircle2 className="w-3 h-3" />}
                        {row.utilityVerdict === 'Mixto / Depende del uso' && <AlertCircle className="w-3 h-3" />}
                        {row.utilityVerdict === 'Complica / No ayuda' && <XCircle className="w-3 h-3" />}
                        <span>{row.utilityVerdict}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 max-w-[180px] truncate text-slate-300" title={row.mainRisk}>
                      <span className="text-rose-400/90 font-medium">{row.mainRisk}</span>
                    </td>
                    <td className="py-3.5 px-4 max-w-[160px] truncate text-slate-400" title={row.worldFutureRaw}>
                      {row.worldFutureRaw}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        row.userProfile === 'Pragmático Utilitario'
                          ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60'
                          : row.userProfile === 'Crítico Escéptico'
                          ? 'bg-rose-950/60 text-rose-300 border border-rose-800/60'
                          : 'bg-purple-950/60 text-purple-300 border border-purple-800/60'
                      }`}>
                        {row.userProfile}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModalItem(row);
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-400 hover:text-indigo-300 transition"
                        title="Ver ficha completa"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Individual Response Detail Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold font-mono">
                  #{activeModalItem.id}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">
                      Ficha Individual de Informante #{activeModalItem.id}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {activeModalItem.userProfile}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                    <Clock className="w-3 h-3" />
                    <span>Marca temporal: {activeModalItem.timestamp}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setActiveModalItem(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Questions & Verbatim Responses */}
            <div className="space-y-4 text-xs">
              
              {/* Q1 */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-1.5">
                <span className="font-semibold text-indigo-400 block">
                  1. ¿Qué herramientas de IA conoces?
                </span>
                <p className="text-slate-200 text-sm font-medium">
                  {activeModalItem.toolsKnownRaw}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeModalItem.toolsList.map((tool, i) => (
                    <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Q2 */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-1.5">
                <span className="font-semibold text-indigo-400 block">
                  2. ¿Normalmente cuál es el uso que le das a la IA?
                </span>
                <p className="text-slate-200 text-sm">
                  {activeModalItem.usageRaw}
                </p>
                <span className="inline-block text-[10px] text-slate-500 font-semibold uppercase">
                  Categoría: {activeModalItem.usageCategory}
                </span>
              </div>

              {/* Q3 */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-1.5">
                <span className="font-semibold text-indigo-400 block">
                  3. ¿Crees que la IA ayuda o complica las tareas diarias?
                </span>
                <p className="text-slate-200 text-sm font-semibold">
                  {activeModalItem.perceivedUtilityRaw}
                </p>
                <span className="inline-block px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Veredicto Analítico: {activeModalItem.utilityVerdict}
                </span>
              </div>

              {/* Q4 */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-2">
                <span className="font-semibold text-indigo-400 block">
                  4. ¿Qué ventajas y riesgos crees que tiene la IA?
                </span>
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-slate-200 italic">
                  "{activeModalItem.prosAndConsRaw}"
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                  <div>
                    <span className="text-emerald-400 font-semibold block">Ventaja sintetizada:</span>
                    <span className="text-slate-300">{activeModalItem.mainAdvantage}</span>
                  </div>
                  <div>
                    <span className="text-rose-400 font-semibold block">Riesgo diagnosticado:</span>
                    <span className="text-slate-300">{activeModalItem.mainRisk}</span>
                  </div>
                </div>
              </div>

              {/* Q5 */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-2">
                <span className="font-semibold text-indigo-400 block">
                  5. ¿Cómo cree usted que cambiará el mundo con el avance de la IA?
                </span>
                <p className="text-slate-200 text-sm italic">
                  "{activeModalItem.worldFutureRaw}"
                </p>
                <span className="inline-block px-2 py-0.5 rounded-full text-[10px] bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  Tono prospectivo: {activeModalItem.futureSentiment}
                </span>
              </div>

              {/* Featured Quote if available */}
              {activeModalItem.featuredQuote && (
                <div className="bg-gradient-to-r from-indigo-950/50 to-purple-950/50 p-4 rounded-xl border border-indigo-500/30 space-y-1">
                  <div className="flex items-center gap-1.5 text-indigo-300 font-bold text-[11px]">
                    <Quote className="w-3.5 h-3.5" />
                    <span>Cita Textual Seleccionada para el Informe Ejecutivo</span>
                  </div>
                  <p className="text-slate-100 font-medium italic text-xs">
                    "{activeModalItem.featuredQuote}"
                  </p>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="flex justify-end pt-2 border-t border-slate-800">
              <button
                onClick={() => setActiveModalItem(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition cursor-pointer"
              >
                Cerrar Ficha
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
