import { useState, useEffect, useRef, useMemo } from 'react';
import { exportToPDF, exportToExcel } from '@/utils/exportData';
import Swal, { getSwalOpts } from '@/utils/swal';
import Loader from './Loader';


/**
 * Reusable DataTable with search, sort, pagination, column visibility, export.
 */
const DataTable = ({
  columns = [],
  data = [],
  loading = false,
  title,
  exportTitle,
  exportFileName,
  emptyIcon = 'ri-database-2-line',
  emptyMessage = 'No data found',
  searchPlaceholder = 'Search...',
  storageKey,
  defaultPageSize = 10,
  searchable = true,
  exportable = true,
  copyable = true,
  columnToggle = true,
  paginated = true,
  headerActions,
  headerFilters,
  onRowClick,
}) => {
  // Column visibility
  const defaultVisible = useMemo(() => columns.filter(c => c.visible !== false).map(c => c.key), []);
  const [visibleCols, setVisibleCols] = useState(() => {
    if (storageKey) {
      try { const s = localStorage.getItem(storageKey); if (s) return JSON.parse(s); } catch {}
    }
    return defaultVisible;
  });
  const [showColMenu, setShowColMenu] = useState(false);
  const colMenuRef = useRef(null);

  // Search, sort, pagination
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  // Persist columns
  useEffect(() => {
    if (storageKey) localStorage.setItem(storageKey, JSON.stringify(visibleCols));
  }, [visibleCols, storageKey]);

  // Close col menu on outside click
  useEffect(() => {
    const handler = (e) => { if (colMenuRef.current && !colMenuRef.current.contains(e.target)) setShowColMenu(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Reset page on search change
  useEffect(() => { setPage(1); }, [search, data.length]);

  const isColVisible = (key) => visibleCols.includes(key);
  const toggleCol = (key) => setVisibleCols(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  const restoreVisibility = () => setVisibleCols([...defaultVisible]);

  // Get raw cell value for sorting/searching
  const getRawValue = (row, col) => {
    if (col.exportValue) return col.exportValue(row);
    const val = row[col.key];
    if (val === null || val === undefined) return '';
    return val;
  };

  // Filtered data
  const filtered = useMemo(() => {
    if (!search.trim()) return data;
    const q = search.toLowerCase();
    return data.filter(row =>
      columns.some(col => {
        if (!isColVisible(col.key)) return false;
        const val = getRawValue(row, col);
        return String(val).toLowerCase().includes(q);
      })
    );
  }, [data, search, columns, visibleCols]);

  // Sorted data
  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    const col = columns.find(c => c.key === sortKey);
    if (!col) return filtered;
    return [...filtered].sort((a, b) => {
      let va = getRawValue(a, col);
      let vb = getRawValue(b, col);
      if (typeof va === 'string') va = va.toLowerCase();
      if (typeof vb === 'string') vb = vb.toLowerCase();
      if (va < vb) return sortDir === 'asc' ? -1 : 1;
      if (va > vb) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filtered, sortKey, sortDir]);

  // Paginated data
  const totalPages = Math.ceil(sorted.length / pageSize);
  const pageData = paginated ? sorted.slice((page - 1) * pageSize, page * pageSize) : sorted;

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  // Export helpers
  const getExportData = () => {
    const exportCols = columns.filter(c => c.key !== 'actions' && isColVisible(c.key));
    const cols = exportCols.map(c => c.label);
    const rows = sorted.map(row => exportCols.map(c => {
      const val = getRawValue(row, c);
      return val !== undefined && val !== null ? val : '';
    }));
    return { title: exportTitle || title || 'Export', columns: cols, rows, fileName: exportFileName || 'NextStep_Export' };
  };

  const handleCopy = () => {
    const exportCols = columns.filter(c => c.key !== 'actions' && isColVisible(c.key));
    const header = exportCols.map(c => c.label).join('\t');
    const rows = sorted.map(row => exportCols.map(c => getRawValue(row, c)).join('\t'));
    navigator.clipboard.writeText([header, ...rows].join('\n')).then(() => {
      Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Copied!', timer: 1200, showConfirmButton: false });
    });
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          {searchable && (
            <div className="relative">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input type="text" placeholder={searchPlaceholder} value={search} onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-xl bg-white dark-theme:bg-gray-900 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm w-52" />
            </div>
          )}

          {/* Extra filters */}
          {headerFilters}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Column visibility */}
          {columnToggle && (
            <div className="relative" ref={colMenuRef}>
              <button onClick={() => setShowColMenu(!showColMenu)}
                className="px-3 py-2 rounded-xl bg-white dark-theme:bg-gray-900 border border-sand dark-theme:border-gray-700 text-sm text-gray-600 dark-theme:text-gray-300 hover:border-primary transition-colors flex items-center gap-1.5">
                <i className="ri-layout-column-line text-sm"></i> Columns <i className="ri-arrow-down-s-line text-xs"></i>
              </button>
              {showColMenu && (
                <div className="absolute right-0 top-full mt-1 w-52 bg-white dark-theme:bg-gray-900 border border-sand dark-theme:border-gray-700 rounded-xl shadow-xl z-50 py-1 max-h-72 overflow-y-auto">
                  {columns.map(col => (
                    <button key={col.key} onClick={() => toggleCol(col.key)}
                      className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark-theme:text-gray-300 hover:bg-cream/50 dark-theme:hover:bg-gray-800/50 transition-colors">
                      <span>{col.label}</span>
                      {isColVisible(col.key) && <i className="ri-check-line text-primary font-bold"></i>}
                    </button>
                  ))}
                  <div className="border-t border-sand dark-theme:border-gray-700 mt-1 pt-1">
                    <button onClick={restoreVisibility}
                      className="w-full px-4 py-2 text-sm text-primary hover:bg-cream/50 dark-theme:hover:bg-gray-800/50 transition-colors text-left font-medium">
                      Restore visibility
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Copy */}
          {copyable && (
            <button onClick={handleCopy}
              className="px-3 py-2 rounded-xl bg-white dark-theme:bg-gray-900 border border-sand dark-theme:border-gray-700 text-sm text-gray-600 dark-theme:text-gray-300 hover:border-primary transition-colors flex items-center gap-1.5">
              <i className="ri-file-copy-line text-sm"></i> Copy
            </button>
          )}

          {/* Export */}
          {exportable && (
            <div className="flex items-center gap-0.5 bg-white dark-theme:bg-gray-900 border border-sand dark-theme:border-gray-700 rounded-xl px-1">
              <button onClick={() => exportToPDF(getExportData())} className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-red-500 hover:bg-red-50 dark-theme:hover:bg-red-900/20 transition-colors flex items-center gap-1" title="Download PDF">
                <i className="ri-file-pdf-2-line text-sm"></i> PDF
              </button>
              <div className="w-px h-4 bg-sand dark-theme:bg-gray-700"></div>
              <button onClick={() => exportToExcel(getExportData())} className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-green-600 hover:bg-green-50 dark-theme:hover:bg-green-900/20 transition-colors flex items-center gap-1" title="Download Excel">
                <i className="ri-file-excel-2-line text-sm"></i> Excel
              </button>
            </div>
          )}

          {/* Page Size */}
          {paginated && (
            <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
              className="px-2 py-2 rounded-xl bg-white dark-theme:bg-gray-900 border border-sand dark-theme:border-gray-700 text-sm text-gray-600 dark-theme:text-gray-300 outline-none">
              {[10, 25, 50, 100].map(n => <option key={n} value={n}>{n} rows</option>)}
            </select>
          )}

          {/* Custom actions */}
          {headerActions}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark-theme:bg-gray-900 rounded-2xl border border-sand dark-theme:border-gray-800 overflow-hidden">
        {loading ? (
          <Loader text="Loading table data..." />
        ) : pageData.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <i className={`${emptyIcon} text-4xl mb-3 block`}></i>
            <p>{search ? 'No matching results' : emptyMessage}</p>
          </div>
        ) : (

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-sand dark-theme:border-gray-800 bg-cream/50 dark-theme:bg-gray-800/50">
                  {columns.filter(c => isColVisible(c.key)).map(col => (
                    <th key={col.key}
                      onClick={col.sortable ? () => handleSort(col.key) : undefined}
                      className={`text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap select-none ${col.sortable ? 'cursor-pointer hover:text-primary transition-colors' : ''} ${col.key === 'actions' ? 'text-right' : ''}`}>
                      <span className="inline-flex items-center gap-1">
                        {col.label}
                        {col.sortable && sortKey === col.key && (
                          <i className={`ri-arrow-${sortDir === 'asc' ? 'up' : 'down'}-s-line text-primary`}></i>
                        )}
                        {col.sortable && sortKey !== col.key && (
                          <i className="ri-arrow-up-down-line text-gray-300 dark-theme:text-gray-600 text-[10px]"></i>
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-sand dark-theme:divide-gray-800">
                {pageData.map((row, idx) => (
                  <tr key={row.id || row._id || idx}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                    className={`hover:bg-cream/30 dark-theme:hover:bg-gray-800/30 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}>
                    {columns.filter(c => isColVisible(c.key)).map(col => (
                      <td key={col.key} className={`px-5 py-3 text-sm whitespace-nowrap ${col.key === 'actions' ? 'text-right' : 'text-gray-600 dark-theme:text-gray-400'}`}>
                        {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {paginated && totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-sand dark-theme:border-gray-800">
            <p className="text-sm text-gray-500 dark-theme:text-gray-400">
              {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, sorted.length)} of {sorted.length}
            </p>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(1)} disabled={page === 1}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs text-gray-500 hover:bg-cream dark-theme:hover:bg-gray-800 disabled:opacity-30 transition-colors">
                <i className="ri-skip-back-mini-line"></i>
              </button>
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs text-gray-500 hover:bg-cream dark-theme:hover:bg-gray-800 disabled:opacity-30 transition-colors">
                <i className="ri-arrow-left-s-line"></i>
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pn;
                if (totalPages <= 5) pn = i + 1;
                else if (page <= 3) pn = i + 1;
                else if (page >= totalPages - 2) pn = totalPages - 4 + i;
                else pn = page - 2 + i;
                return (
                  <button key={pn} onClick={() => setPage(pn)}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-medium transition-colors ${page === pn ? 'bg-primary text-white' : 'text-gray-500 hover:bg-cream dark-theme:hover:bg-gray-800'}`}>
                    {pn}
                  </button>
                );
              })}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs text-gray-500 hover:bg-cream dark-theme:hover:bg-gray-800 disabled:opacity-30 transition-colors">
                <i className="ri-arrow-right-s-line"></i>
              </button>
              <button onClick={() => setPage(totalPages)} disabled={page === totalPages}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs text-gray-500 hover:bg-cream dark-theme:hover:bg-gray-800 disabled:opacity-30 transition-colors">
                <i className="ri-skip-forward-mini-line"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;
