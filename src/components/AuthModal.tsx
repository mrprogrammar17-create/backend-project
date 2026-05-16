import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: { name: string; email: string }) => void;
}

export const AuthModal = ({ isOpen, onClose, onSuccess }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      if (formData.password.length < 6) {
        setError('Please enter correct details. Password must be at least 6 characters.');
        return;
      }
    } else {
      if (!formData.name || formData.password.length < 6) {
        setError('Please enter correct details. All fields are required.');
        return;
      }
    }

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mode: isLogin ? 'login' : 'signup',
          email: formData.email,
          password: formData.password,
          name: formData.name,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || 'Unable to authenticate. Please try again later.');
        return;
      }

      onSuccess(result.user);
      onClose();
    } catch (error) {
      console.error('Authentication error:', error);
      setError('Unable to connect to the backend. Please try again later.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md glass-dark rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10"
          >
            <div className="p-8 md:p-12">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-10">
                <h2 className="text-3xl font-serif mb-2">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-sm text-white/40">
                  {isLogin 
                    ? 'Enter your credentials to access your luxury portfolio.' 
                    : 'Join our elite circle of property investors.'}
                </p>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-widest text-center"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {!isLogin && (
                  <div className="space-y-2">
                    <label className="luxury-label">Full Name</label>
                    <div className="luxury-input flex items-center gap-4 group focus-within:border-white/30 transition-all">
                      <User className="w-4 h-4 text-white/20 group-focus-within:text-white/40 transition-colors shrink-0" />
                      <div className="w-[1px] h-4 bg-white/10 shrink-0" />
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="bg-transparent w-full outline-none text-sm placeholder:text-white/20" 
                        placeholder="John Doe" 
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="luxury-label">Email Address</label>
                  <div className="luxury-input flex items-center gap-4 group focus-within:border-white/30 transition-all">
                    <Mail className="w-4 h-4 text-white/20 group-focus-within:text-white/40 transition-colors shrink-0" />
                    <div className="w-[1px] h-4 bg-white/10 shrink-0" />
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="bg-transparent w-full outline-none text-sm placeholder:text-white/20" 
                      placeholder="john@example.com" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="luxury-label">Password</label>
                  <div className="luxury-input flex items-center gap-4 group focus-within:border-white/30 transition-all">
                    <Lock className="w-4 h-4 text-white/20 group-focus-within:text-white/40 transition-colors shrink-0" />
                    <div className="w-[1px] h-4 bg-white/10 shrink-0" />
                    <input 
                      required
                      type="password" 
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="bg-transparent w-full outline-none text-sm placeholder:text-white/20" 
                      placeholder="••••••••" 
                    />
                  </div>
                </div>

                {isLogin && (
                  <div className="text-right">
                    <button type="button" className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors">
                      Forgot Password?
                    </button>
                  </div>
                )}

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-5 bg-white text-black rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-neutral-200 transition-all flex items-center justify-center gap-2"
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-xs text-white/40">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                  <button 
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-white font-bold hover:underline underline-offset-4"
                  >
                    {isLogin ? 'Sign Up' : 'Log In'}
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
