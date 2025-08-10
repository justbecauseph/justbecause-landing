'use client';

export default function ScrollButton({ children, targetId }: Readonly<{ 
  children: React.ReactNode, 
  targetId: string 
}>) {
  const scrollToSection = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button 
      type="button"
      className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold py-3 px-8 rounded-lg transition"
      onClick={scrollToSection}
      aria-label="Contact us"
    >
      {children}
    </button>
  );
}