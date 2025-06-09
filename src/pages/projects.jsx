import { useState } from 'react';
import { X, Plus, Github, ExternalLink } from 'lucide-react';

function Project() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    image: null,
    githubUrl: '',
    liveUrl: ''
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleAddProject = () => {
    if (newProject.title.trim() === '') return;
    
    setProjects(prev => [...prev, { ...newProject, id: Date.now() }]);
    setNewProject({
      title: '',
      description: '',
      image: null,
      githubUrl: '',
      liveUrl: ''
    });
    setImagePreview(null);
    setShowModal(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setNewProject(prev => ({ ...prev, image: url }));
    }
  };

  const handleRemoveProject = (id) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  return (
    <div className="space-y-20">
      <div className="h-[80vh] bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl p-10">
        <h1 className="text-4xl font-bold text-white mb-8">Projects</h1>
        
        {projects.length === 0 ? (
          // Initial state - single add button
          <div className="flex items-start">
            <button
              onClick={() => setShowModal(true)}
              className="bg-transparent border-2 border-black rounded-xl w-32 h-32 flex flex-col items-center justify-center hover:bg-black/10 transition-colors"
            >
              <Plus size={24} className="text-black mb-1" />
              <span className="text-black font-semibold text-sm">add project</span>
            </button>
          </div>
        ) : (
          // Grid layout with projects
          <div className="grid grid-cols-4 gap-4 max-w-4xl">
            {projects.map((project) => (
              <div key={project.id} className="relative group">
                <div className="bg-cyan-400 border-2 border-black rounded-xl w-32 h-32 p-2 flex flex-col overflow-hidden">
                  {project.image && (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-16 object-cover rounded mb-1"
                    />
                  )}
                  <h3 className="text-black font-bold text-xs truncate">{project.title}</h3>
                  <p className="text-black text-xs flex-1 overflow-hidden">{project.description}</p>
                  
                  {/* Links */}
                  <div className="flex gap-1 mt-1">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github size={12} className="text-black hover:text-gray-700" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={12} className="text-black hover:text-gray-700" />
                      </a>
                    )}
                  </div>
                </div>
                
                {/* Remove button */}
                <button
                  onClick={() => handleRemoveProject(project.id)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
            
            {/* Add project button in grid */}
            <button
              onClick={() => setShowModal(true)}
              className="bg-transparent border-2 border-black rounded-xl w-32 h-32 flex flex-col items-center justify-center hover:bg-black/10 transition-colors"
            >
              <Plus size={24} className="text-black mb-1" />
              <span className="text-black font-semibold text-sm">add project</span>
            </button>
          </div>
        )}
      </div>

      {/* Add Project Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-96 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Add New Project</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Project Title</label>
                <input
                  className="w-full p-3 border rounded-xl text-black"
                  placeholder="Enter project title"
                  value={newProject.title}
                  onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  className="w-full p-3 border rounded-xl text-black resize-none h-20"
                  placeholder="Enter project description"
                  value={newProject.description}
                  onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Project Image</label>
                <div className="flex items-center gap-4">
                  <label className="cursor-pointer">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-16 h-16 object-cover rounded-xl hover:opacity-80" />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-300">
                        <Plus size={20} className="text-gray-500" />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                  <span className="text-sm text-gray-600">Click to add image</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">GitHub URL (optional)</label>
                <input
                  className="w-full p-3 border rounded-xl text-black"
                  placeholder="https://github.com/username/repo"
                  value={newProject.githubUrl}
                  onChange={(e) => setNewProject(prev => ({ ...prev, githubUrl: e.target.value }))}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Live URL (optional)</label>
                <input
                  className="w-full p-3 border rounded-xl text-black"
                  placeholder="https://your-project.com"
                  value={newProject.liveUrl}
                  onChange={(e) => setNewProject(prev => ({ ...prev, liveUrl: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  setImagePreview(null);
                  setNewProject({
                    title: '',
                    description: '',
                    image: null,
                    githubUrl: '',
                    liveUrl: ''
                  });
                }}
                className="bg-gray-300 px-4 py-2 rounded-xl hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProject}
                className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors"
              >
                Add Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Project;