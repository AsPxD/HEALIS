import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Mail, Lock, User, ArrowRight } from 'lucide-react';
import Button from '../components/shared/Button';
import Input from '../components/shared/Input';
import { FloatingElements, GradientBlob } from '../components/shared/BackgroundElements';

const Auth = () => {
  const [isLogin, setIsLogin] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center overflow-hidden">
      <FloatingElements />
      <GradientBlob />
      
      <div className="w-full max-w-md px-4 relative">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full 
              bg-gradient-to-r from-blue-500 to-cyan-500 mb-4"
          >
            <Activity className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 
            bg-clip-text text-transparent mb-2">
            {isLogin ? 'Welcome back!' : 'Create an account'}
          </h1>
          <p className="text-gray-600">
            {isLogin ? 'Sign in to access your account' : 'Join us on your healthcare journey'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl 
            border border-white/20 p-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5" />
          
          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? 'login' : 'register'}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="space-y-6 relative"
            >
              {!isLogin && (
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="John Doe"
                  required
                  icon={User}
                />
              )}
              
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                required
                icon={Mail}
              />
              
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                required
                icon={Lock}
              />

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 
                  hover:from-blue-600 hover:to-cyan-600"
                isLoading={isLoading}
                icon={ArrowRight}
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Create an account' : 'Sign in instead'}
              </Button>
            </motion.form>
          </AnimatePresence>

          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br 
            from-blue-500/10 to-cyan-500/10 rounded-full blur-xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br 
            from-purple-500/10 to-pink-500/10 rounded-full blur-xl" />
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;