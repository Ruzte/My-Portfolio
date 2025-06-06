import { Home, User, Folder, Settings, Star } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import HomePage from './pages/homepage.jsx';
import ProfilePage from './pages/aboutme.jsx';
import ProjectsPage from './pages/projects.jsx';
import SettingsPage from './pages/settings.jsx';
import SystemPage from './pages/interests.jsx';

function App() {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.findIndex(ref => ref.current === entry.target);
            setActiveSection(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionRefs.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (index) => {
    sectionRefs[index].current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="min-h-screen bg-[#011318] text-white flex">
      {/* Profile Section */}
      <div className="w-[20%] h-[40vh] bg-[#011318] rounded-xl m-4 flex items-center justify-center mt-[170px] sticky top-[170px]">
        <div className="w-[100%] h-[70vh] bg-gray-800 text-white rounded-xl p-6 shadow-lg">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
              <User size={32} className="text-white" />
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2 text-cyan-300">Engr. Ruzte James Temblor</h2>
            <p className="text-slate-300 text-sm mb-3">B.S Computer Engineering</p>
            <div className="bg-slate-700 rounded-lg p-3">
              <p className="text-xs text-slate-400">
                Passionate about creating amazing web experiences
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-center mt-4">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            <span className="text-xs text-slate-400">Available for work</span>
          </div>
        </div>
      </div>

      {/* Vertical Navbar */}
      <div className="w-[3.5%] h-[40vh] flex flex-col justify-center items-center space-y-4 bg-gray-800 px-2 py-6 rounded-full mx-2 mt-[80px] sticky top-[80px]">
        <button 
          onClick={() => scrollToSection(0)}
          className={`p-2 rounded-full transition-all duration-200 ease-in-out ${
            activeSection === 0 
              ? 'bg-yellow-500 shadow-[0_0_5px_2px_rgb(234,179,8)] scale-130' 
              : 'hover:bg-cyan-700 hover:shadow-[0_0_5px_2px_rgba(34,211,238,0.5)] hover:scale-120'
          } active:bg-yellow-500 active:scale-90 active:shadow-[0_0_5px_2px_rgb(234,179,8)]`}
        >
          <Home size={20} />
        </button>
        
        <button 
          onClick={() => scrollToSection(1)}
          className={`p-2 rounded-full transition-all duration-200 ease-in-out ${
            activeSection === 1 
              ? 'bg-yellow-500 shadow-[0_0_5px_2px_rgb(234,179,8)] scale-130' 
              : 'hover:bg-cyan-700 hover:shadow-[0_0_5px_2px_rgba(34,211,238,0.5)] hover:scale-130'
          } active:bg-yellow-500 active:scale-90 active:shadow-[0_0_5px_2px_rgb(234,179,8)]`}
        >
          <User size={20} />
        </button>
        
        <button 
          onClick={() => scrollToSection(2)}
          className={`p-2 rounded-full transition-all duration-200 ease-in-out ${
            activeSection === 2 
              ? 'bg-yellow-500 shadow-[0_0_5px_2px_rgb(234,179,8)] scale-130' 
              : 'hover:bg-cyan-700 hover:shadow-[0_0_5px_2px_rgba(34,211,238,0.5)] hover:scale-130'
          } active:bg-yellow-500 active:scale-90 active:shadow-[0_0_5px_2px_rgb(234,179,8)]`}
        >
          <Folder size={20} />
        </button>
        
        <button 
          onClick={() => scrollToSection(3)}
          className={`p-2 rounded-full transition-all duration-200 ease-in-out ${
            activeSection === 3 
              ? 'bg-yellow-500 shadow-[0_0_5px_2px_rgb(234,179,8)] scale-130' 
              : 'hover:bg-cyan-700 hover:shadow-[0_0_5px_2px_rgba(34,211,238,0.5)] hover:scale-130'
          } active:bg-yellow-500 active:scale-90 active:shadow-[0_0_5px_2px_rgb(234,179,8)]`}
        >
          <Settings size={20} />
        </button>
        
        <button 
          onClick={() => scrollToSection(4)}
          className={`p-2 rounded-full transition-all duration-200 ease-in-out ${
            activeSection === 4 
              ? 'bg-yellow-500 shadow-[0_0_5px_2px_rgb(234,179,8)] scale-130' 
              : 'hover:bg-cyan-700 hover:shadow-[0_0_5px_2px_rgba(34,211,238,0.5)] hover:scale-130'
          } active:bg-yellow-500 active:scale-90 active:shadow-[0_0_5px_2px_rgb(234,179,8)]`}
        >
          <Star size={20} />
        </button>
      </div>

      {/* Content Section */}
      <div className="flex-1 bg-[#011318] rounded-xl m-16 p-8">
        <div ref={sectionRefs[0]} className="min-h-screen mb-20">
          <HomePage />
        </div>
        <div ref={sectionRefs[1]} className="min-h-screen mb-20">
          <ProfilePage />
        </div>
        <div ref={sectionRefs[2]} className="min-h-screen mb-20">
          <ProjectsPage />
        </div>
        <div ref={sectionRefs[3]} className="min-h-screen mb-20">
          <SettingsPage />
        </div>
        <div ref={sectionRefs[4]} className="min-h-screen">
          <SystemPage />
        </div>
      </div>
    </div>
  );
}

export default App;