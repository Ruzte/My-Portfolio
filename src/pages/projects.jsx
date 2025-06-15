import { useState } from 'react';
import { X, Plus, Eye } from 'lucide-react';

function Project() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showToolsModal, setShowToolsModal] = useState(false);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    tools: [],
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [newTool, setNewTool] = useState('');

  const handleAddProject = () => {
    if (newProject.title.trim() === '') return;
    
    setProjects(prev => [...prev, { ...newProject, id: Date.now() }]);
    setNewProject({
      title: '',
      description: '',
      tools: [],
      image: null
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

  const handleAddTool = () => {
    if (newTool.trim() === '') return;
    
    setNewProject(prev => ({
      ...prev,
      tools: [...prev.tools, newTool.trim()]
    }));
    setNewTool('');
    setShowToolsModal(false);
  };

  const handleRemoveTool = (index) => {
    setNewProject(prev => ({
      ...prev,
      tools: prev.tools.filter((_, i) => i !== index)
    }));
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setShowProjectDetails(true);
  };

  const resetModal = () => {
    setShowModal(false);
    setImagePreview(null);
    setNewProject({
      title: '',
      description: '',
      tools: [],
      image: null
    });
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
                <div className="bg-cyan-400 border-2 border-black rounded-xl w-32 h-32 p-2 flex flex-col overflow-hidden cursor-pointer hover:bg-cyan-300 transition-colors relative"
                     onClick={() => handleProjectClick(project)}>
                  {project.image && (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-16 object-cover rounded mb-1"
                    />
                  )}
                  <h3 className="text-black font-bold text-xs truncate">{project.title}</h3>
                  
                  {/* View details icon */}
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye size={12} className="text-black" />
                  </div>
                  
                  {/* Remove button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveProject(project.id);
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <X size={10} />
                  </button>
                </div>
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

      {/* Project Details Popup */}
      {showProjectDetails && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-96 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{selectedProject.title}</h2>
              <button
                onClick={() => setShowProjectDetails(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            {selectedProject.image && (
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title}
                className="w-full h-32 object-cover rounded-xl mb-4"
              />
            )}
            
            {selectedProject.description && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Description:</h3>
                <p className="text-gray-700 leading-relaxed">{selectedProject.description}</p>
              </div>
            )}
            
            {selectedProject.tools && selectedProject.tools.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Tools Used:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tools.map((tool, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-sm">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

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
                <label className="block text-sm font-medium mb-1">Tools Used</label>
                <div className="border rounded-xl p-3 min-h-[80px]">
                  {newProject.tools.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {newProject.tools.map((tool, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-sm flex items-center gap-1">
                          {tool}
                          <button
                            onClick={() => handleRemoveTool(index)}
                            className="text-blue-600 hover:text-red-600"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm mb-2">No tools added yet</p>
                  )}
                  <button
                    onClick={() => setShowToolsModal(true)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600 transition-colors flex items-center gap-1"
                  >
                    <Plus size={12} />
                    Add Tool
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={resetModal}
                className="bg-gray-300 px-4 py-2 rounded-xl hover:bg-red-400 transition-colors"
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

      {/* Add Tool Modal */}
      {showToolsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-60">
          <div className="bg-white p-6 rounded-2xl w-80">
            <h3 className="text-lg font-bold mb-4">Add Tool</h3>
            
            <div className="mb-4">
              <input
                className="w-full p-3 border rounded-xl text-black"
                placeholder="Enter tool name (e.g., React, Node.js, Python)"
                value={newTool}
                onChange={(e) => setNewTool(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTool()}
                autoFocus
              />
            </div>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowToolsModal(false);
                  setNewTool('');
                }}
                className="bg-gray-300 px-4 py-2 rounded-xl hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTool}
                className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors"
              >
                Add Tool
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Project;