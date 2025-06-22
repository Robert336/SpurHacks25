import Header from './Header';
import Footer from './Footer';

const PageLayout = ({ 
  children,
  user = null,
  navigation = [],
  showHeader = true,
  showFooter = true,
  headerProps = {},
  footerProps = {},
  className = "",
  ...props 
}) => {
  return (
    <div className={`min-h-screen bg-[#FFF4E6] ${className}`} {...props}>
      {showHeader && (
        <Header 
          user={user} 
          navigation={navigation}
          {...headerProps}
        />
      )}
      
      <main className="flex-1">
        {children}
      </main>
      
      {showFooter && (
        <Footer {...footerProps} />
      )}
    </div>
  );
};

export default PageLayout; 