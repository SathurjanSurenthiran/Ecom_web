import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  AtSign,
  Camera,
  CirclePlay,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Smartphone,
} from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { shopDetails } from '../data/shopDetails';

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Message sent successfully! We'll get back to you soon.");
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: shopDetails.supportEmail,
      sub: shopDetails.responseTime,
    },
    {
      icon: Phone,
      title: 'Phone',
      details: shopDetails.phone,
      sub: shopDetails.phoneHours,
    },
    {
      icon: MapPin,
      title: 'Address',
      details: shopDetails.address,
      sub: `${shopDetails.city}, ${shopDetails.postalCode}`,
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: shopDetails.workingHours.weekdays,
      sub: shopDetails.workingHours.weekends,
    },
  ];

  const socialIcons = {
    Facebook: Smartphone,
    Instagram: Camera,
    Twitter: AtSign,
    YouTube: CirclePlay,
  };

  // Safe encoding for dynamic map location queries
  const mapSearchQuery = encodeURIComponent(`${shopDetails.address}, ${shopDetails.city}, ${shopDetails.postalCode}`);

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-primary-900/20 to-dark">
      {/* Header Section */}
      <section className="relative pt-28 pb-10 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-4">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-white/70 text-lg">
              Have questions? We'd love to hear from you. Reach out and we'll get back to you as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Form & Contact Info Section */}
      <section className="py-6 px-4">
        <div className="container mx-auto">
         
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            
            {/* Left Column: Info Cards */}
            <div className="lg:col-span-1 flex flex-col justify-between space-y-4 h-full">
              <div className="space-y-4 flex-grow">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;

                  return (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="glass p-4 rounded-xl flex items-start space-x-4"
                    >
                      <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{info.title}</h4>
                        <p className="text-white/80">{info.details}</p>
                        <p className="text-white/40 text-sm">{info.sub}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Redesigned Follow Us Box */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass p-5 rounded-xl border border-white/5 bg-white/[0.02]"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-poppins font-semibold tracking-wide text-sm uppercase text-white/60">
                    Connect With Us
                  </h4>
                  <div className="h-[1px] bg-gradient-to-r from-primary-500/40 to-transparent flex-grow ml-4" />
                </div>
                <div className="flex flex-wrap gap-3">
                  {shopDetails.socialLinks.map(({ name, href }) => {
                    const Icon = socialIcons[name] || AtSign;

                    return (
                      <a
                        key={name}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={name}
                        className="w-11 h-11 bg-white/5 border border-white/10 rounded-xl hover:bg-primary-500/30 hover:border-primary-400/50 transition-all duration-300 flex items-center justify-center group shadow-lg"
                      >
                        <Icon className="w-5 h-5 text-white/70 group-hover:text-primary-400 group-hover:scale-110 transition-transform" />
                      </a>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Right Column: Message Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 h-full"
            >
              <div className="glass p-6 rounded-xl h-full flex flex-col">
                <h2 className="text-2xl font-poppins font-bold text-white mb-6 flex items-center space-x-2 flex-shrink-0">
                  <MessageCircle className="text-primary-400" />
                  <span>Send a Message</span>
                </h2>

                <form 
                  onSubmit={handleSubmit(onSubmit)} 
                  className="flex flex-col justify-between flex-grow space-y-4"
                >
                  <div className="space-y-4 flex-grow">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Full Name *"
                        {...register('name', { required: 'Name is required' })}
                        error={errors.name?.message}
                        placeholder="Your name"
                      />
                      <Input
                        label="Email *"
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                            message: 'Invalid email address',
                          },
                        })}
                        error={errors.email?.message}
                        placeholder="example@email.com"
                      />
                    </div>

                    <Input
                      label="Subject *"
                      {...register('subject', { required: 'Subject is required' })}
                      error={errors.subject?.message}
                      placeholder="Subject of your message"
                    />

                    <div className="flex flex-col h-[calc(100%-190px)] min-h-[160px]">
                      <label className="text-white/60 text-sm block mb-1 flex-shrink-0">Message *</label>
                      <textarea
                        {...register('message', { required: 'Message is required' })}
                        className="w-full flex-grow px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                        placeholder="Write your message here..."
                      />
                      {errors.message && (
                        <p className="text-red-400 text-sm mt-1 flex-shrink-0">{errors.message.message}</p>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    loading={loading}
                    className="w-full text-lg flex items-center justify-center space-x-2 mt-auto flex-shrink-0"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="glass p-2 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <div className="w-full h-80 bg-white/5 rounded-xl overflow-hidden relative">
              <iframe
                title="Shop Location Map"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(0.6) invert(0.92) contrast(1.2)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${mapSearchQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;