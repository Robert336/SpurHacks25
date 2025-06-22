import Container from "./Container";

const Section = ({ 
  children, 
  background = "default",
  padding = "default",
  containerSize = "default",
  className = "",
  ...props 
}) => {
  const backgrounds = {
    default: "bg-[#FFF4E6]",
    gradient: "bg-gradient-to-b from-[#E9D8C5] to-[#FFF4E6]",
    warm: "bg-gradient-to-br from-[#FFF4E6] via-[#E9D8C5] to-[#FFF4E6]",
    dark: "bg-gradient-to-r from-[#3C6E57] to-[#2E5744]",
    transparent: "bg-transparent"
  };
  
  const paddings = {
    none: "",
    sm: "py-10",
    default: "py-20",
    lg: "py-32",
    xl: "py-40"
  };
  
  const sectionStyles = `${backgrounds[background]} ${paddings[padding]} ${className}`;
  
  return (
    <section className={sectionStyles} {...props}>
      <Container size={containerSize}>
        {children}
      </Container>
    </section>
  );
};

export default Section; 