const Footer = ({ 
  className = "",
  children,
  ...props 
}) => {
  return (
    <footer className={`bg-gradient-to-r from-[#3C6E57] to-[#2E5744] py-16 ${className}`} {...props}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {children || (
          <p className="text-[#FFF4E6]/90 text-lg leading-relaxed">
            © 2024 QuestFlat. Making household management simple and fair.
          </p>
        )}
      </div>
    </footer>
  );
};

export default Footer; 