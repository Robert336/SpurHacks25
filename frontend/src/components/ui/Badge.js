const Badge = ({ 
  children, 
  variant = "default", 
  size = "md",
  className = "",
  ...props 
}) => {
  const baseStyles = "inline-block rounded-full font-medium transition-all duration-200";
  
  const variants = {
    default: "bg-[#FFD972]/20 text-[#2E5744]",
    purple: "bg-[#9A7FF5]/20 text-[#2E5744]",
    pink: "bg-[#D4A6A6]/20 text-[#2E5744]",
    green: "bg-[#74A27E]/20 text-[#2E5744]",
    solid: "bg-gradient-to-br from-[#9A7FF5] to-[#74A27E] text-white"
  };
  
  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-6 py-2 text-lg",
    lg: "px-8 py-3 text-xl"
  };
  
  const badgeStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <span className={badgeStyles} {...props}>
      {children}
    </span>
  );
};

export default Badge; 