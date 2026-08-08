import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion as motionReal } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { ArrowUpRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { loginUser } from '../features/auth/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Login failed');
    }
  };

  return (
    <main className="auth-page h-screen w-full bg-[#fbf9fd] text-black grid lg:grid-cols-2 overflow-hidden">
      {/* Left Feature Section */}
      <section className="relative hidden h-full overflow-hidden bg-zinc-200 lg:block">
        <motionReal.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 24, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src="/src/assets/images/img5.png"
            alt="Editorial Brand Spotlight"
            className="h-full w-full object-cover grayscale brightness-95"
          />
        </motionReal.div>

        <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
        <div className="absolute left-12 top-12 text-white z-10">
          <p className="font-poppins text-7xl font-bold leading-none tracking-normal drop-shadow-lg xl:text-8xl">FitFlex</p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.24em] text-white/90">The Archive of Modernity</p>
        </div>
      </section>

      {/* Right Form Section */}
      <section className="relative flex h-full items-center justify-center bg-[#fbf9fd] px-6 py-8 sm:px-12 lg:px-16 overflow-y-auto">
        {/* Top Header Switch Button */}
        <div className="absolute right-6 top-6 sm:right-12 sm:top-12 z-10">
          <Link 
            to="/register" 
            className="inline-flex items-center gap-3 rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-black transition-all hover:border-black hover:shadow-sm"
          >
            <span>Switch to Register</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Content Box */}
        <div className="w-full max-w-[460px] my-auto">
          <motionReal.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Typography Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-poppins font-bold text-black tracking-tight sm:text-4xl">
                Welcome Back
              </h1>
              <p className="mt-3 text-base text-zinc-600">
                Please enter your details to access your bespoke collections.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Address */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">Email Address</label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                      message: 'Invalid email address',
                    },
                  })}
                  type="email"
                  autoComplete="off"
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3.5 text-sm text-black placeholder-zinc-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
                />
                {errors.email && (
                  <p className="text-red-600 text-xs mt-1.5 font-medium">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">Password</label>
                <input
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3.5 text-sm text-black placeholder-zinc-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
                />
                {errors.password && (
                  <p className="text-red-600 text-xs mt-1.5 font-medium">{errors.password.message}</p>
                )}
              </div>

              {/* Utilities Row */}
              <div className="flex items-center justify-between select-none text-sm pt-1">
                <label className="flex items-center space-x-2.5 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded border-zinc-300 text-black focus:ring-0 focus:ring-offset-0 accent-black cursor-pointer" 
                  />
                  <span className="font-medium text-zinc-600 group-hover:text-black transition-colors">Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="font-semibold text-black hover:underline underline-offset-4 transition-all"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Action */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-zinc-950 py-4 text-white font-semibold hover:bg-black transition-all uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                  <span>{loading ? 'Verifying Details...' : 'Sign In'}</span>
                </button>
              </div>
            </form>

            {/* Footer switch prompt */}
            <p className="text-center text-zinc-500 font-normal mt-8 text-sm">
              Don't have an account?{' '}
              <Link 
                to="/register" 
                className="text-black font-semibold hover:underline underline-offset-4 ml-0.5"
              >
                Sign up
              </Link>
            </p>
          </motionReal.div>
        </div>
      </section>
    </main>
  );
};

export default Login;