const Container = ({ 
  children, 
  size = "default",
  className = "",
  ...props 
}) => {
  const sizes = {
    sm: "max-w-3xl",
    default: "max-w-7xl",
    lg: "max-w-8xl",
    full: "max-w-full"
  };
  
  const containerStyles = `${sizes[size]} mx-auto px-4 sm:px-6 lg:px-8 ${className}`;
  
  return (
    <div className={containerStyles} {...props}>
      {children}
    </div>
  );
};

export default Container; 