import { useState } from 'react';
import ParallaxSection from '../components/parallax';

function AboutMe() {
  const [characterBio, setCharacterBio] = useState({ location: '', sideQuest: '' });
  const [attributes, setAttributes] = useState({ specialization: '', languages: '', frameworks: '', tools: '' });
  const [achievements, setAchievements] = useState('');
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);

  const handleSave = () => {
    // Save logic can go here (localStorage, API, etc.)
    alert('Character Stats Saved!');
  };

  return (
    <div className="space-y-20">
      <ParallaxSection className="h-[80vh] bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl p-10 items-start justify-start">
        <h1 className="text-4xl font-bold text-white mb-1">Character Stats</h1>
        <div className="flex gap-6 w-full h-full">
          {/* Left Panel */}
          <div className="flex flex-col gap-4 w-1/2">
            {/* Character Bio */}
            <div className="bg-transparent rounded-lg">
              <input
                className="w-full mt-2 p-2 rounded text-black font-normal"
                placeholder="Bio"
                value={characterBio.Bio}
                onChange={(e) => setCharacterBio({ ...characterBio, location: e.target.value })}
              />
              <input
                className="w-full mt-2 p-2 rounded text-black font-normal"
                placeholder="Location"
                value={characterBio.location}
                onChange={(e) => setCharacterBio({ ...characterBio, location: e.target.value })}
              />
              <input  
                className="w-full mt-2 p-2 rounded text-black"
                placeholder="Side Quest"
                value={characterBio.sideQuest}
                onChange={(e) => setCharacterBio({ ...characterBio, sideQuest: e.target.value })}
              />
            </div>

            {/* Attributes */}
            <div className="bg-transparent rounded-lg flex-1">
              <h2 className="text-xl font-bold text-white">Attributes</h2>
              <input
                className="w-full mt-2 p-2 rounded text-black"
                placeholder="Specialization"
                value={attributes.specialization}
                onChange={(e) => setAttributes({ ...attributes, specialization: e.target.value })}
              />
              <input
                className="w-full mt-2 p-2 rounded text-black"
                placeholder="Languages"
                value={attributes.languages}
                onChange={(e) => setAttributes({ ...attributes, languages: e.target.value })}
              />
              <input
                className="w-full mt-2 p-2 rounded text-black"
                placeholder="Frameworks"
                value={attributes.frameworks}
                onChange={(e) => setAttributes({ ...attributes, frameworks: e.target.value })}
              />
              <input
                className="w-full mt-2 p-2 rounded text-black"
                placeholder="Software & Tools"
                value={attributes.tools}
                onChange={(e) => setAttributes({ ...attributes, tools: e.target.value })}
              />
            </div>
          </div>

          {/* Right Panel - Image + Achievements + Save */}
          <div className="w-1/2 flex flex-col items-center justify-between">
            <div className="bg-blue-600 w-full h-3/4 rounded-lg"></div>
            {/* Achievements moved directly below the blue box */}
            <div className="mt-4 bg-gradient-to-r from-yellow-200 to-yellow-400 p-4 rounded-lg w-full">
              <h2 className="text-xl font-bold text-black mb-2">Achievements</h2>
              <button
                onClick={() => setShowAchievementsModal(true)}
                className="bg-black text-white px-4 py-2 rounded"
              >
                Edit Achievements
              </button>
            </div>
            <button
              onClick={handleSave}
              className="bg-pink-500 mt-4 px-6 py-3 text-white font-bold rounded-full shadow self-end"
            >
              Save
            </button>
          </div>
        </div>
      </ParallaxSection>

      {/* Modal */}
      {showAchievementsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Achievements</h2>
            <textarea
              className="w-full h-40 p-2 border rounded text-black"
              value={achievements}
              onChange={(e) => setAchievements(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowAchievementsModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >Cancel</button>
              <button
                onClick={() => setShowAchievementsModal(false)}
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
