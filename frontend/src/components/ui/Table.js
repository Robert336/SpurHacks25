const Table = ({ 
  headers = [],
  data = [],
  variant = "default",
  className = "",
  ...props 
}) => {
  const variants = {
    default: "bg-white/60 backdrop-blur-sm border-[#E9D8C5]",
    minimal: "bg-transparent border-transparent",
    striped: "bg-white/60 backdrop-blur-sm border-[#E9D8C5]"
  };
  
  return (
    <div className={`rounded-2xl border shadow-lg overflow-hidden ${variants[variant]} ${className}`} {...props}>
      <table className="w-full">
        {headers.length > 0 && (
          <thead className="bg-gradient-to-r from-[#9A7FF5]/10 to-[#74A27E]/10">
            <tr>
              {headers.map((header, index) => (
                <th 
                  key={index}
                  className="px-6 py-4 text-left text-sm font-bold text-[#3C6E57] uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className="divide-y divide-[#E9D8C5]">
          {data.map((row, rowIndex) => (
            <tr 
              key={rowIndex}
              className={`${variant === 'striped' && rowIndex % 2 === 1 ? 'bg-[#FFF4E6]/30' : ''} hover:bg-[#9A7FF5]/5 transition-colors duration-200`}
            >
              {Array.isArray(row) ? (
                row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-6 py-4 text-[#2E5744]">
                    {cell}
                  </td>
                ))
              ) : (
                Object.values(row).map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-6 py-4 text-[#2E5744]">
                    {cell}
                  </td>
                ))
              )}
            </tr>
          ))}
        </tbody>
      </table>
      
      {data.length === 0 && (
        <div className="px-6 py-12 text-center text-[#2E5744]/60">
          No data available
        </div>
      )}
    </div>
  );
};

export default Table; 