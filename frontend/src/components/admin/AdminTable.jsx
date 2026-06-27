import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const AdminTable = ({
  columns,
  data,
  loading,
  onRowClick,
  actions,
  pagination,
  onPageChange,
}) => {
  if (loading) {
    return (
      <div className="glass rounded-xl p-8">
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 bg-white/5 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-white/40 text-sm border-b border-white/10">
              {columns.map((col, index) => (
                <th
                  key={index}
                  className={`text-left py-3 px-4 ${col.className || ''}`}
                  style={{ width: col.width }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-8 text-white/40"
                >
                  No data available
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <motion.tr
                  key={rowIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: rowIndex * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className={`py-3 px-4 ${col.className || ''}`}
                    >
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                  {actions && (
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        {actions.map((action, actionIndex) => (
                          <button
                            key={actionIndex}
                            onClick={(e) => {
                              e.stopPropagation();
                              action.onClick(row);
                            }}
                            className={`p-2 ${action.className || 'text-primary-400 hover:text-primary-300'} transition-colors`}
                          >
                            {action.icon}
                          </button>
                        ))}
                      </div>
                    </td>
                  )}
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-white/10">
          <p className="text-white/40 text-sm">
            Showing {pagination.from} to {pagination.to} of {pagination.total} entries
          </p>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onPageChange?.(pagination.current - 1)}
              disabled={pagination.current === 1}
              className="p-2 glass text-white rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FiChevronLeft />
            </button>
            <span className="text-white/60 text-sm">
              Page {pagination.current}
            </span>
            <button
              onClick={() => onPageChange?.(pagination.current + 1)}
              disabled={pagination.current === pagination.totalPages}
              className="p-2 glass text-white rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTable;