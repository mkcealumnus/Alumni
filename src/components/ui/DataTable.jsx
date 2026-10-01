import { useState, useEffect, useRef, useMemo } from 'react';
import {
  Search, Columns3, Copy, FileText, FileSpreadsheet,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight,
  ArrowUp, ArrowDown, ArrowUpDown, Check, Database
} from 'lucide-react';
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
  emptyIcon,
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
    return { title: exportTitle || title || 'Export', columns: cols, rows, fileName: exportFileName || 'MKCE_Alumni_Export' };
  };

  const handleCopy = () => {
    const exportCols = columns.filter(c => c.key !== 'actions' && isColVisible(c.key));
    const header = exportCols.map(c => c.label).join('\t');
    const rows = sorted.map(row => exportCols.map(c => getRawValue(row, c)).join('\t'));
    navigator.clipboard.writeText([header, ...rows].join('\n')).then(() => {
      Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Copied!', timer: 1200, showConfirmButton: false });
    });
  };

  const btnStyle = {
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    color: 'var(--color-text-secondary)',
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          {searchable && (
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-muted)' }} />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-lg text-sm w-56 outline-none transition-colors"
                style={{
                  ...btnStyle,
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-secondary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
              />
            </div>
          )}

          {/* Extra filters */}
          {headerFilters}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Column visibility */}
          {columnToggle && (
            <div className="relative" ref={colMenuRef}>
              <button
                onClick={() => setShowColMenu(!showColMenu)}
                className="px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors"
                style={btnStyle}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-border-strong)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
              >
                <Columns3 size={15} /> Columns
              </button>
              {showColMenu && (
                <div
                  className="absolute right-0 top-full mt-1 w-52 rounded-xl z-50 py-1 max-h-72 overflow-y-auto animate-fade-in"
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-lg)',
                  }}
                >
                  {columns.map(col => (
                    <button
                      key={col.key}
                      onClick={() => toggleCol(col.key)}
                      className="w-full flex items-center justify-between px-4 py-2 text-sm transition-colors"
                      style={{ color: 'var(--color-text-secondary)' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-surface-muted)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <span>{col.label}</span>
                      {isColVisible(col.key) && <Check size={15} style={{ color: 'var(--color-secondary)' }} />}
                    </button>
                  ))}
                  <div style={{ borderTop: '1px solid var(--color-border)' }} className="mt-1 pt-1">
                    <button
                      onClick={restoreVisibility}
                      className="w-full px-4 py-2 text-sm font-medium text-left transition-colors"
                      style={{ color: 'var(--color-secondary)' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-surface-muted)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      Restore visibility
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Copy */}
          {copyable && (
            <button
              onClick={handleCopy}
              className="px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors"
              style={btnStyle}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-border-strong)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
            >
              <Copy size={15} /> Copy
            </button>
          )}

          {/* Export */}
          {exportable && (
            <div className="flex items-center gap-0.5 px-1 rounded-lg" style={btnStyle}>
              <button
                onClick={() => exportToPDF(getExportData())}
                className="px-2.5 py-1.5 rounded-md text-xs font-medium flex items-center gap-1 transition-colors"
                style={{ color: 'var(--color-danger)' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-danger-bg)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                title="Download PDF"
              >
                <FileText size={14} /> PDF
              </button>
              <div className="w-px h-4" style={{ background: 'var(--color-border)' }} />
              <button
                onClick={() => exportToExcel(getExportData())}
                className="px-2.5 py-1.5 rounded-md text-xs font-medium flex items-center gap-1 transition-colors"
                style={{ color: 'var(--color-success)' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-success-bg)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                title="Download Excel"
              >
                <FileSpreadsheet size={14} /> Excel
              </button>
            </div>
          )}

          {/* Page Size */}
          {paginated && (
            <select
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
              className="px-2 py-2 rounded-lg text-sm outline-none"
              style={btnStyle}
            >
              {[10, 25, 50, 100].map(n => <option key={n} value={n}>{n} rows</option>)}
            </select>
          )}

          {/* Custom actions */}
          {headerActions}
        </div>
      </div>

      {/* Table */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
        }}
      >
        {loading ? (
          <Loader text="Loading table data..." />
        ) : pageData.length === 0 ? (
          <div className="text-center py-20" style={{ color: 'var(--color-text-muted)' }}>
            <Database size={40} className="mx-auto mb-3" style={{ color: 'var(--color-border-strong)' }} />
            <p className="text-sm">{search ? 'No matching results' : emptyMessage}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-background)' }}>
                  {columns.filter(c => isColVisible(c.key)).map(col => (
                    <th
                      key={col.key}
                      onClick={col.sortable ? () => handleSort(col.key) : undefined}
                      className={`text-left px-5 py-3 text-[12px] font-semibold uppercase tracking-wider whitespace-nowrap select-none ${col.sortable ? 'cursor-pointer' : ''} ${col.key === 'actions' ? 'text-right' : ''}`}
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      <span className="inline-flex items-center gap-1">
                        {col.label}
                        {col.sortable && sortKey === col.key && (
                          sortDir === 'asc'
                            ? <ArrowUp size={12} style={{ color: 'var(--color-secondary)' }} />
                            : <ArrowDown size={12} style={{ color: 'var(--color-secondary)' }} />
                        )}
                        {col.sortable && sortKey !== col.key && (
                          <ArrowUpDown size={11} style={{ color: 'var(--color-border-strong)' }} />
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pageData.map((row, idx) => (
                  <tr
                    key={row.id || row._id || idx}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                    className={`transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
                    style={{ borderBottom: '1px solid var(--color-border)' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-background)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    {columns.filter(c => isColVisible(c.key)).map(col => (
                      <td
                        key={col.key}
                        className={`px-5 py-3.5 text-sm whitespace-nowrap ${col.key === 'actions' ? 'text-right' : ''}`}
                        style={{ color: col.key === 'actions' ? undefined : 'var(--color-text-secondary)' }}
                      >
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
          <div
            className="flex items-center justify-between px-5 py-3"
            style={{ borderTop: '1px solid var(--color-border)' }}
          >
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, sorted.length)} of {sorted.length}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(1)}
                disabled={page === 1}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors disabled:opacity-30"
                style={{ color: 'var(--color-text-muted)' }}
                onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.background = 'var(--color-surface-muted)')}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                aria-label="First page"
              >
                <ChevronsLeft size={16} />
              </button>
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors disabled:opacity-30"
                style={{ color: 'var(--color-text-muted)' }}
                onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.background = 'var(--color-surface-muted)')}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                aria-label="Previous page"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pn;
                if (totalPages <= 5) pn = i + 1;
                else if (page <= 3) pn = i + 1;
                else if (page >= totalPages - 2) pn = totalPages - 4 + i;
                else pn = page - 2 + i;
                return (
                  <button
                    key={pn}
                    onClick={() => setPage(pn)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium transition-colors"
                    style={{
                      background: page === pn ? 'var(--color-primary)' : 'transparent',
                      color: page === pn ? 'white' : 'var(--color-text-muted)',
                    }}
                    onMouseEnter={(e) => {
                      if (page !== pn) e.currentTarget.style.background = 'var(--color-surface-muted)';
                    }}
                    onMouseLeave={(e) => {
                      if (page !== pn) e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    {pn}
                  </button>
                );
              })}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors disabled:opacity-30"
                style={{ color: 'var(--color-text-muted)' }}
                onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.background = 'var(--color-surface-muted)')}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                aria-label="Next page"
              >
                <ChevronRight size={16} />
              </button>
              <button
                onClick={() => setPage(totalPages)}
                disabled={page === totalPages}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors disabled:opacity-30"
                style={{ color: 'var(--color-text-muted)' }}
                onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.background = 'var(--color-surface-muted)')}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                aria-label="Last page"
              >
                <ChevronsRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;
