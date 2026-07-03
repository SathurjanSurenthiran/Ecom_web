import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { ArrowUpRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { registerUser } from '../features/auth/authSlice';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const { register, handleSubmit, getValues, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await dispatch(registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      })).unwrap();
      toast.success('Registration successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Registration failed');
    }
  };

  return (
    <main className="auth-page h-screen w-full bg-[#fbf9fd] text-black grid lg:grid-cols-2 overflow-hidden">
      {/* Left Feature Section */}
      <section className="relative hidden h-full overflow-hidden bg-zinc-200 lg:block">
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 24, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src="/src/assets/images/img5.png"
            alt="Editorial Brand Spotlight"
            className="h-full w-full object-cover grayscale brightness-95"
          />
        </motion.div>

        <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
        <div className="absolute left-12 top-12 text-white z-10">
          <p className="font-poppins text-7xl font-bold leading-none tracking-normal drop-shadow-lg xl:text-8xl">FitFlex</p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.24em] text-white/90">The Archive of Modernity</p>
        </div>
      </section>

      {/* Right Form Section */}
      <section className="relative flex h-full items-center justify-center bg-[#fbf9fd] px-6 py-6 sm:px-12 lg:px-16 overflow-hidden">
        {/* Top Header Switch Button */}
        <div className="absolute right-6 top-6 sm:right-12 sm:top-12 z-10">
          <Link 
            to="/login" 
            className="inline-flex items-center gap-3 rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-black transition-all hover:border-black hover:shadow-sm"
          >
            <span>Switch to Login</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Content Box */}
        <div className="w-full max-w-[440px] my-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Typography Header */}
            <div className="mb-5">
              <h1 className="text-3xl font-poppins font-bold text-black tracking-tight sm:text-4xl">
                Create Account
              </h1>
              <p className="mt-2 text-sm sm:text-base text-zinc-600">
                Create your profile to access curated collections and faster checkout.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
              {/* Full Name */}
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-700">Full Name</label>
                <input
                  {...register('name', {
                    required: 'Name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters',
                    },
                  })}
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-black placeholder-zinc-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
                />
                {errors.name && (
                  <p className="text-red-600 text-xs mt-1 font-medium">{errors.name.message}</p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-700">Email Address</label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                      message: 'Invalid email address',
                    },
                  })}
                  type="email"
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-black placeholder-zinc-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
                />
                {errors.email && (
                  <p className="text-red-600 text-xs mt-1 font-medium">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-700">Password</label>
                <input
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-black placeholder-zinc-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
                />
                {errors.password && (
                  <p className="text-red-600 text-xs mt-1 font-medium">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-700">Confirm Password</label>
                <input
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) =>
                      value === getValues('password') || 'Passwords do not match',
                  })}
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-black placeholder-zinc-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
                />
                {errors.confirmPassword && (
                  <p className="text-red-600 text-xs mt-1 font-medium">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Submit Action */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-zinc-950 py-3.5 text-white font-semibold hover:bg-black transition-all uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                  <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
                </button>
              </div>
            </form>

            {/* Footer switch prompt */}
            <p className="text-center text-zinc-500 font-normal mt-5 text-sm">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-black font-semibold hover:underline underline-offset-4 ml-0.5"
              >
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Register;