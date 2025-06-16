import ParallaxSection from '../components/parallax';

function settings() {
  const techStack = [
    {
      name: 'React',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      color: '#61DAFB'
    },
    {
      name: 'Tailwind CSS',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
      color: '#06B6D4'
    },
    {
      name: 'Vite',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg',
      color: '#646CFF'
    },
    {
      name: 'GitHub',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
      color: '#181717'
    }
  ];

  return (
    <div className="space-y-20">
      <ParallaxSection className="h-[80vh] bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl p-10 items-start justify-start">
        <h1 className="text-4xl font-bold text-white mb-8">Tech Stack</h1>
        
        {/* Tech Stack Section */}
        <div className="mt-12">
          <div className="grid grid-cols-4 gap-8 max-w-md">
            {techStack.map((tech, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 hover:bg-white/30 transition-all duration-300 hover:scale-110">
                  <img 
                    src={tech.logo} 
                    alt={tech.name}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <span className="text-white text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </ParallaxSection>
    </div>
  );
}

export default settings;