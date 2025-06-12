import { useState } from 'react';
import { Award, User, Trophy, X } from 'lucide-react';

function ProfilePage() {
  const [characterData, setCharacterData] = useState({
    name: '',
    age: '',
    sex: '',
    race: '',
    mood: '',
    bio: '',
    level: 1,
    status: 'Unemployed',
    languages: [],
    frameworks: [],
    platforms: [],
    tools: [],
    achievements: []
  });

  const [showModal, setShowModal] = useState(false);
  const [newAchievement, setNewAchievement] = useState({
    name: '',
    description: '',
    dateAchieved: ''
  });
  const [hoveredAchievement, setHoveredAchievement] = useState(null);

  const handleInputChange = (field, value) => {
    setCharacterData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddAchievement = () => {
    if (newAchievement.name.trim() && newAchievement.description.trim() && newAchievement.dateAchieved) {
      setCharacterData(prev => ({
        ...prev,
        achievements: [...prev.achievements, { ...newAchievement }]
      }));
      setNewAchievement({ name: '', description: '', dateAchieved: '' });
      setShowModal(false);
    }
  };

  const handleModalInputChange = (field, value) => {
    setNewAchievement(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 rounded-xl p-8 flex flex-col">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white ">Character Stats</h1>
      </div>

      {/* Main Content Grid */}
      <div className="flex-1 grid grid-cols-12 gap-6">
        
        {/* Left Column - Profile & Stats */}
        <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Profile Picture & Level */}
          <div className="md:col-span-1">
            <div className="bg-white/15 backdrop-blur-sm rounded-lg p-4 h-full flex flex-col items-center">
              {/* Profile Picture */}
              <div className="w-33 h-33 rounded-lg overflow-hidden border-2 border-white/30 mb-3 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                <User size={32} className="text-white" />
              </div>
              
              {/* Level Badge */}
              <div className="bg-green-600 text-white px-1 py-1 rounded-full text-xs font-bold">
                Lvl {characterData.level} {characterData.status}
              </div>
            </div>
          </div>

          {/* Stats Fields */}
          <div className="md:col-span-2">
            <div className="bg-white/15 backdrop-blur-sm rounded-lg p-4 h-full">
              <div className="space-y-3">
                {[
                  { label: 'Name:', field: 'name' },
                  { label: 'Age:', field: 'age' },
                  { label: 'Sex:', field: 'sex' },
                  { label: 'Race:', field: 'race' },
                  { label: 'Mood:', field: 'mood' }
                ].map(({ label, field }) => (
                  <div key={field} className="flex items-center space-x-3">
                    <label className="text-white font-medium text-sm w-12 flex-shrink-0">
                      {label}
                    </label>
                    <div className="flex-1 bg-gray-700/60 rounded h-6 overflow-hidden">
                      <input
                        type="text"
                        value={characterData[field]}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        className="w-full h-full bg-transparent text-white text-xs px-2 focus:outline-none focus:bg-gray-600/60 transition-colors"
                        placeholder={`Enter ${field}...`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Bio */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-white/15 backdrop-blur-sm rounded-lg p-4 h-full">
            <h3 className="text-white font-medium text-sm mb-2">Bio:</h3>
            <div className="bg-gray-700/60 rounded h-32 overflow-hidden">
              <textarea
                value={characterData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className="w-full h-full bg-transparent text-white p-2 resize-none focus:outline-none focus:bg-gray-600/60 transition-colors text-xs"
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Attributes & Achievements */}
      <div className="mt-6 grid grid-cols-12 gap-6 flex-1">
        
        {/* Attributes */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-white/15 backdrop-blur-sm rounded-lg p-6 h-full">
            <h2 className="text-2xl font-bold text-white mb-4">Attributes</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
              {[
                { label: 'Languages:', items: characterData.languages },
                { label: 'Frameworks:', items: characterData.frameworks },
                { label: 'Platforms:', items: characterData.platforms },
                { label: 'Tools:', items: characterData.tools }
              ].map(({ label, items }) => (
                <div key={label} className="space-y-2">
                  <h3 className="text-white font-medium text-sm">{label}</h3>
                  <div className="space-y-1">
                    {items.slice(0, 3).map((item, index) => (
                      <div key={index} className="bg-cyan-500/40 text-white px-2 py-1 rounded text-xs font-medium">
                        {item}
                      </div>
                    ))}
                    {items.length > 3 && (
                      <div className="text-white/70 text-xs">
                        +{items.length - 3} more...
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg p-4 h-full flex flex-col">
            <div className="flex items-center space-x-2 mb-3">
              <Award size={20} className="text-white" />
              <h2 className="text-xl font-bold text-white">Achievements</h2>
            </div>
            
            <div className="flex-1 flex flex-col justify-center relative">
              {characterData.achievements.length === 0 ? (
                <div className="text-center">
                  <Award size={32} className="text-white/60 mx-auto mb-2" />
                  <p className="text-white/80 text-sm font-medium">No achievements yet!</p>
                  <p className="text-white/60 text-xs mt-1">Complete challenges to unlock</p>
                </div>
              ) : (
                <div className="space-y-2 flex-1 overflow-y-auto">
                  {characterData.achievements.map((achievement, index) => (
                    <div 
                      key={index} 
                      className="bg-white/20 backdrop-blur-sm rounded p-2 flex items-center space-x-2 relative cursor-pointer hover:bg-white/30 transition-colors"
                      onMouseEnter={() => setHoveredAchievement(index)}
                      onMouseLeave={() => setHoveredAchievement(null)}
                    >
                      <Trophy size={16} className="text-yellow-200 flex-shrink-0" />
                      <span className="text-white text-xs font-medium truncate">{achievement.name}</span>
                      
                      {/* Tooltip */}
                      {hoveredAchievement === index && (
                        <div className="absolute left-0 bottom-full mb-2 bg-gray-900 text-white p-3 rounded-lg shadow-xl z-[9999] min-w-48 border border-gray-700">
                          <h4 className="font-semibold text-sm mb-1">{achievement.name}</h4>
                          <p className="text-xs text-gray-300 mb-2">{achievement.description}</p>
                          <p className="text-xs text-yellow-300">Achieved: {new Date(achievement.dateAchieved).toLocaleDateString()}</p>
                          <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <button
              onClick={() => setShowModal(true)}
              className="w-full mt-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-medium py-2 px-3 rounded text-sm transition-colors"
            >
              Add Achievement
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Add Achievement</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Achievement Name
                </label>
                <input
                  type="text"
                  value={newAchievement.name}
                  onChange={(e) => handleModalInputChange('name', e.target.value)}
                  className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter achievement name..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newAchievement.description}
                  onChange={(e) => handleModalInputChange('description', e.target.value)}
                  className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows="3"
                  placeholder="Describe your achievement..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Achieved
                </label>
                <input
                  type="date"
                  value={newAchievement.dateAchieved}
                  onChange={(e) => handleModalInputChange('dateAchieved', e.target.value)}
                  className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAchievement}
                className="flex-1 px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
              >
                Save Achievement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;