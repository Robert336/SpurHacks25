const IconButton = ({ 
  icon,
  children,
  size = "md",
  variant = "ghost",
  className = "",
  ...props 
}) => {
  const baseStyles = "rounded-full flex items-center justify-center transition-all duration-200 font-medium";
  
  const variants = {
    ghost: "text-[#3C6E57] hover:text-[#2E5744] hover:bg-[#74A27E]/10",
    filled: "bg-gradient-to-br from-[#9A7FF5] to-[#74A27E] text-white shadow-md hover:shadow-lg hover:scale-105",
    outline: "border-2 border-[#3C6E57] text-[#3C6E57] hover:bg-[#3C6E57] hover:text-white"
  };
  
  const sizes = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
    xl: "w-16 h-16 text-xl"
  };
  
  const buttonStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <button className={buttonStyles} {...props}>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default IconButton; 