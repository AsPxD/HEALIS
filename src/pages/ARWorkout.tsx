import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Camera, Play, Pause, RotateCcw, Award, Activity } from 'lucide-react';
import PageHeader from '../components/shared/PageHeader';
import Button from '../components/shared/Button';
import { FloatingElements, GradientBlob } from '../components/shared/BackgroundElements';

const workouts = [
  {
    id: 1,
    name: "Full Body Strength",
    duration: "45 min",
    difficulty: "Intermediate",
    calories: "400-500",
    exercises: ["Squats", "Push-ups", "Lunges", "Planks"]
  },
  {
    id: 2,
    name: "HIIT Cardio",
    duration: "30 min",
    difficulty: "Advanced",
    calories: "300-400",
    exercises: ["Burpees", "Mountain Climbers", "Jump Squats", "High Knees"]
  },
  {
    id: 3,
    name: "Yoga Flow",
    duration: "60 min",
    difficulty: "Beginner",
    calories: "200-300",
    exercises: ["Sun Salutation", "Warrior Poses", "Balance Poses", "Meditation"]
  }
];

const ARWorkout = () => {
  const [selectedWorkout, setSelectedWorkout] = React.useState(workouts[0]);
  const [isStarted, setIsStarted] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);

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
          title="AR Workout Assistant"
          subtitle="Experience personalized workouts with augmented reality guidance"
          gradient="from-blue-500 to-indigo-500"
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* AR View */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl p-6 text-white"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Camera className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">AR View</h2>
                <p className="opacity-90">Position yourself in the camera view</p>
              </div>
            </div>

            <div className="aspect-video bg-black/20 rounded-xl mb-6 flex items-center justify-center">
              {isStarted ? (
                <div className="text-center">
                  <Activity className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-xl">Workout in progress...</p>
                </div>
              ) : (
                <div className="text-center">
                  <Camera className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-xl">Camera feed will appear here</p>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              {!isStarted ? (
                <Button
                  onClick={() => setIsStarted(true)}
                  className="flex-1 bg-white/20 hover:bg-white/30"
                  icon={Play}
                >
                  Start Workout
                </Button>
              ) : (
                <>
                  <Button
                    onClick={() => setIsPaused(!isPaused)}
                    className="flex-1 bg-white/20 hover:bg-white/30"
                    icon={isPaused ? Play : Pause}
                  >
                    {isPaused ? 'Resume' : 'Pause'}
                  </Button>
                  <Button
                    onClick={() => setIsStarted(false)}
                    variant="outline"
                    className="flex-1 border-white/20 hover:bg-white/10"
                    icon={RotateCcw}
                  >
                    End Workout
                  </Button>
                </>
              )}
            </div>
          </motion.div>

          {/* Workout Selection */}
          <div className="space-y-6">
            {workouts.map((workout) => (
              <motion.div
                key={workout.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`bg-white rounded-2xl p-6 shadow-lg cursor-pointer transition-all duration-300
                  ${selectedWorkout.id === workout.id ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => setSelectedWorkout(workout)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Dumbbell className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{workout.name}</h3>
                    <p className="text-gray-600">{workout.duration}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-600">
                      {workout.difficulty}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600">Calories</p>
                    <p className="font-semibold text-gray-900">{workout.calories}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600">Exercises</p>
                    <p className="font-semibold text-gray-900">{workout.exercises.length}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {workout.exercises.map((exercise, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-gray-600"
                    >
                      <Award className="w-4 h-4 text-blue-500" />
                      <span>{exercise}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ARWorkout;