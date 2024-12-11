import React from 'react';
import { motion } from 'framer-motion';
import { Headphones, Play, Pause, SkipBack, SkipForward, Volume2, Moon, Sun, Wind } from 'lucide-react';
import PageHeader from '../components/shared/PageHeader';
import Button from '../components/shared/Button';
import { FloatingElements, GradientBlob } from '../components/shared/BackgroundElements';

const sessions = [
  {
    id: 1,
    title: "Peaceful Forest",
    duration: "15 min",
    category: "Nature",
    description: "Immerse yourself in a serene forest environment with gentle bird songs and rustling leaves.",
    background: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: 2,
    title: "Ocean Waves",
    duration: "20 min",
    category: "Water",
    description: "Experience the calming rhythm of ocean waves on a peaceful beach at sunset.",
    background: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: 3,
    title: "Mountain Retreat",
    duration: "30 min",
    category: "Nature",
    description: "Find peace in a high mountain sanctuary with panoramic views and crisp air.",
    background: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2070"
  }
];

const VRMeditation = () => {
  const [selectedSession, setSelectedSession] = React.useState(sessions[0]);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [volume, setVolume] = React.useState(80);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-24 pb-16 min-h-screen relative"
    >
      <FloatingElements />
      <GradientBlob />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <PageHeader
          title="VR Meditation Space"
          subtitle="Immersive meditation experiences in virtual environments"
          gradient="from-purple-500 to-indigo-500"
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* VR View */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-2xl overflow-hidden"
            style={{ height: '600px' }}
          >
            <img
              src={selectedSession.background}
              alt={selectedSession.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Session Info */}
            <div className="absolute inset-x-0 bottom-0 p-6">
              <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <Headphones className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedSession.title}</h2>
                    <p className="text-white/80">{selectedSession.duration}</p>
                  </div>
                </div>

                {/* Controls */}
                <div className="space-y-6">
                  <div className="flex items-center justify-center gap-6">
                    <button className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                      <SkipBack className="w-6 h-6 text-white" />
                    </button>
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-6 rounded-full bg-white text-purple-600 hover:bg-white/90 transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="w-8 h-8" />
                      ) : (
                        <Play className="w-8 h-8" />
                      )}
                    </button>
                    <button className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                      <SkipForward className="w-6 h-6 text-white" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <Volume2 className="w-5 h-5 text-white" />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) => setVolume(parseInt(e.target.value))}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Session Selection */}
          <div className="space-y-6">
            {sessions.map((session) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`bg-white rounded-2xl p-6 shadow-lg cursor-pointer transition-all duration-300
                  ${selectedSession.id === session.id ? 'ring-2 ring-purple-500' : ''}`}
                onClick={() => setSelectedSession(session)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                    {session.category === 'Nature' ? (
                      <Wind className="w-6 h-6 text-purple-600" />
                    ) : (
                      <Moon className="w-6 h-6 text-purple-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{session.title}</h3>
                    <p className="text-gray-600">{session.duration}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-600">
                      {session.category}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{session.description}</p>

                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    icon={Headphones}
                  >
                    Preview
                  </Button>
                  <Button
                    className="flex-1"
                    icon={Play}
                  >
                    Start Session
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VRMeditation;