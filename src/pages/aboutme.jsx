import { useState } from 'react';
import { MapPin, X, Github, Linkedin, Mail, Phone } from 'lucide-react';

function AboutMe() {
  const [characterBio, setCharacterBio] = useState({ bio: '', location: '' });
  const [attributes, setAttributes] = useState({
    specialization: [],
    languages: [],
    frameworks: [],
    tools: []
  });
  const [showModals, setShowModals] = useState({
    specialization: false,
    languages: false,
    frameworks: false,
    tools: false
  });
  const [newAttribute, setNewAttribute] = useState('');
  const [achievements, setAchievements] = useState([]);
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);
  const [newAchievement, setNewAchievement] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const handleAddAttribute = (key) => {
    if (newAttribute.trim() === '') return;
    setAttributes((prev) => ({
      ...prev,
      [key]: [...prev[key], newAttribute]
    }));
    setNewAttribute('');
    setShowModals({ ...showModals, [key]: false });
  };

  const handleRemoveAttribute = (key, index) => {
    setAttributes((prev) => {
      const updated = [...prev[key]];
      updated.splice(index, 1);
      return { ...prev, [key]: updated };
    });
  };

  const handleAddAchievement = () => {
    if (newAchievement.trim() === '') return;
    setAchievements((prev) => [...prev, newAchievement]);
    setNewAchievement('');
    setShowAchievementsModal(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
  };

  const handleSave = () => {
    alert('Character Stats Saved!');
  };

  return (
    <div className="space-y-20">
      <div className="h-[90vh] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl p-10 items-start justify-start">
        <div className="flex w-full h-full">
          {/* Left Panel */}
          <div className="w-1/2 pr-6 overflow-y-auto scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent">
            <h1 className="text-4xl font-bold text-white mb-6">Character Stats</h1>

            {/* Character Bio */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white">Bio</h2>
              <textarea
                className="w-full p-2 rounded text-black mt-2 resize-none h-24"
                placeholder="Enter your bio"
                value={characterBio.bio}
                onChange={(e) => setCharacterBio({ ...characterBio, bio: e.target.value })}
              />
              <div className="flex items-center gap-2 mt-4">
                <span className="text-white w-28 flex items-center gap-1">
                  <MapPin size={16} /> Location:
                </span>
                <input
                  className="flex-1 p-2 rounded text-black"
                  placeholder="Enter your location"
                  value={characterBio.location}
                  onChange={(e) => setCharacterBio({ ...characterBio, location: e.target.value })}
                />
              </div>
            </div>

            {/* Attributes */}
            <h2 className="text-lg font-semibold text-white mb-2">Attributes</h2>
            {['specialization', 'languages', 'frameworks', 'tools'].map((key) => (
              <div key={key} className="mb-3">
                <div className="flex items-center gap-2 relative group">
                  <span className="text-white capitalize w-32 cursor-help">
                    {key.replace(/([A-Z])/g, ' $1')}:
                  </span>
                  <div className="absolute left-36 top-0 bg-black text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 w-64">
                    {key === 'specialization' && 'Areas of professional focus or technical expertise.'}
                    {key === 'languages' && 'Programming languages you are proficient in.'}
                    {key === 'frameworks' && 'Libraries or frameworks you frequently use.'}
                    {key === 'tools' && 'Software or utilities you work with regularly.'}
                  </div>
                  <button
                    onClick={() => setShowModals({ ...showModals, [key]: true })}
                    className="bg-white text-black px-2 rounded"
                  >+
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-1 ml-32">
                  {attributes[key].map((item, i) => (
                    <span key={i} className="bg-white text-black text-sm px-2 py-1 rounded-full flex items-center gap-1">
                      {item}
                      <button
                        onClick={() => handleRemoveAttribute(key, i)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Panel */}
          <div className="w-1/2 flex flex-col items-center">
            {/* Gray Box Aligned to Title */}
            <div className="bg-gray-700 rounded-3xl w-3/4 h-2/3 mb-6 p-4 flex flex-col items-center justify-center">
              {/* Character Image */}
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <label className="cursor-pointer">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-xl hover:opacity-80 transition-opacity" />
                    ) : (
                      <div className="w-32 h-32 bg-gray-600 rounded-xl flex items-center justify-center hover:bg-gray-500 transition-colors">
                        <span className="text-white text-xs">Click to Add Image</span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                  {imagePreview && (
                    <button
                      onClick={handleRemoveImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* Level and Status */}
              <div className="text-center mb-4">
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Lvl. 1 Ready for Work
                </div>
              </div>

              {/* Character Info Fields */}
              <div className="w-full space-y-2 text-white text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-bold w-12">Name:</span>
                  <input
                    className="flex-1 p-1 rounded bg-gray-600 text-white text-sm"
                    placeholder="Enter name"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold w-12">Age:</span>
                  <input
                    className="flex-1 p-1 rounded bg-gray-600 text-white text-sm"
                    placeholder="Enter age"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold w-12">Sex:</span>
                  <input
                    className="flex-1 p-1 rounded bg-gray-600 text-white text-sm"
                    placeholder="Enter sex"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold w-12">Race:</span>
                  <input
                    className="flex-1 p-1 rounded bg-gray-600 text-white text-sm"
                    placeholder="Enter race"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold w-12">Mood:</span>
                  <input
                    className="flex-1 p-1 rounded bg-gray-600 text-white text-sm"
                    placeholder="Enter mood"
                  />
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex justify-center gap-4 mt-4 text-white">
                <Github className="cursor-pointer hover:text-gray-300" size={20} />
                <Linkedin className="cursor-pointer hover:text-blue-400" size={20} />
                <Mail className="cursor-pointer hover:text-red-400" size={20} />
                <Phone className="cursor-pointer hover:text-green-400" size={20} />
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-yellow-300 rounded-3xl w-3/4 p-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-black">Achievements</h2>
                <button
                  onClick={() => setShowAchievementsModal(true)}
                  className="text-black text-xl font-bold"
                >+
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {achievements.map((item, i) => (
                  <div
                    key={i}
                    className="relative group cursor-pointer"
                  >
                    <span className="text-2xl">🏅</span>
                    <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="bg-pink-500 mt-4 px-6 py-3 text-white font-bold rounded shadow self-end"
            >Save</button>
          </div>
        </div>
      </div>

      {/* Attribute Modals */}
      {Object.entries(showModals).map(([key, isVisible]) => (
        isVisible && (
          <div key={key} className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-xl font-bold mb-4">Add {key}</h2>
              <input
                className="w-full p-2 border rounded text-black"
                placeholder={`Enter ${key}`}
                value={newAttribute}
                onChange={(e) => setNewAttribute(e.target.value)}
              />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setShowModals({ ...showModals, [key]: false })}
                  className="bg-gray-300 px-4 py-2 rounded"
                >Cancel</button>
                <button
                  onClick={() => handleAddAttribute(key)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >Save</button>
              </div>
            </div>
          </div>
        )
      ))}

      {/* Achievements Modal */}
      {showAchievementsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">New Achievement</h2>
            <input
              className="w-full p-2 border rounded text-black"
              placeholder="Enter achievement name"
              value={newAchievement}
              onChange={(e) => setNewAchievement(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowAchievementsModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >Cancel</button>
              <button
                onClick={handleAddAchievement}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AboutMe;