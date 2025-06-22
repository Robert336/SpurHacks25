const Input = ({ 
  type = "text",
  placeholder,
  label,
  error,
  size = "md",
  variant = "default",
  className = "",
  ...props 
}) => {
  const baseStyles = "rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2";
  
  const variants = {
    default: "border-[#E9D8C5] bg-white/80 backdrop-blur-sm focus:border-[#9A7FF5] focus:ring-[#9A7FF5]/20",
    filled: "border-[#E9D8C5] bg-[#FFF4E6] focus:border-[#9A7FF5] focus:ring-[#9A7FF5]/20",
    ghost: "border-transparent bg-transparent focus:border-[#9A7FF5] focus:ring-[#9A7FF5]/20"
  };
  
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-6 py-4 text-lg"
  };
  
  const inputStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''} ${className}`;
  
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#3C6E57] mb-2">
          {label}
        </label>
      )}
      <input 
        type={type}
        placeholder={placeholder}
        className={inputStyles}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input; 