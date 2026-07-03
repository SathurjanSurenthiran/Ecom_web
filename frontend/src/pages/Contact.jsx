import React, { useState } from 'react';
import { motion as motionReal } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi';
import toast from 'react-hot-toast';
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
    Facebook: FiFacebook,
    Instagram: FiInstagram,
    Twitter: FiTwitter,
    YouTube: FiYoutube,
  };

  const mapSearchQuery = encodeURIComponent(`${shopDetails.address}, ${shopDetails.city}, ${shopDetails.postalCode}`);

  return (
    <div className="min-h-screen bg-[#fcfbfe] text-black pt-24 pb-20 px-4 md:px-8">
      {/* Header Section */}
      <section className="relative pb-10 max-w-4xl mx-auto text-center">
        <motionReal.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-zinc-400 text-xs tracking-widest uppercase font-semibold mb-2">Customer Relations</p>
          <h1 className="text-4xl md:text-5xl font-poppins font-bold text-black uppercase tracking-tight">
            Get In Touch
          </h1>
          <p className="text-zinc-500 font-light mt-3 text-sm md:text-base max-w-xl mx-auto">
            Have questions? We would love to hear from you. Reach out and our concierge team will get back to you within 24 hours.
          </p>
        </motionReal.div>
      </section>

      {/* Main Content Form & Contact Info Section */}
      <section className="py-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Left Column: Info Cards */}
          <div className="lg:col-span-1 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motionReal.div
                    key={info.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="bg-white border border-zinc-200/80 p-5 rounded-2xl flex items-start space-x-4 shadow-sm"
                  >
                    <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center flex-shrink-0 text-black">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-black font-semibold text-sm uppercase tracking-wider">{info.title}</h4>
                      <p className="text-zinc-800 text-sm mt-1">{info.details}</p>
                      <p className="text-zinc-400 text-xs mt-0.5">{info.sub}</p>
                    </div>
                  </motionReal.div>
                );
              })}
            </div>

            {/* Redesigned Follow Us Box */}
            <motionReal.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-zinc-200/80 p-6 rounded-2xl shadow-sm"
            >
              <h4 className="text-black font-semibold tracking-wider text-xs uppercase mb-4">
                Connect With Us
              </h4>
              <div className="flex flex-wrap gap-3">
                {shopDetails.socialLinks.map(({ name, href }) => {
                  const Icon = socialIcons[name] || Mail;
                  return (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                      className="w-10 h-10 bg-zinc-55 border border-zinc-200 rounded-xl hover:bg-black hover:text-white hover:border-black transition-all duration-300 flex items-center justify-center text-zinc-500 shadow-sm"
                    >
                      <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                    </a>
                  );
                })}
              </div>
            </motionReal.div>
          </div>

          {/* Right Column: Message Form */}
          <motionReal.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-white border border-zinc-200/80 p-8 rounded-3xl shadow-sm h-full flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-poppins font-bold text-black uppercase tracking-tight mb-6 flex items-center space-x-3">
                  <MessageSquare className="w-5 h-5 text-black" />
                  <span>Send a Message</span>
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-black font-semibold text-xs tracking-wider uppercase mb-2 block">Full Name</label>
                      <input
                        {...register('name', { required: 'Name is required' })}
                        type="text"
                        placeholder="Your name"
                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-black focus:outline-none focus:border-black transition-colors"
                      />
                      {errors.name && (
                        <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-black font-semibold text-xs tracking-wider uppercase mb-2 block">Email Address</label>
                      <input
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                            message: 'Invalid email address',
                          },
                        })}
                        type="email"
                        placeholder="example@email.com"
                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-black focus:outline-none focus:border-black transition-colors"
                      />
                      {errors.email && (
                        <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-black font-semibold text-xs tracking-wider uppercase mb-2 block">Subject</label>
                    <input
                      {...register('subject', { required: 'Subject is required' })}
                      type="text"
                      placeholder="Concerns or Inquiry topic"
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-black focus:outline-none focus:border-black transition-colors"
                    />
                    {errors.subject && (
                      <p className="text-red-600 text-xs mt-1">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-black font-semibold text-xs tracking-wider uppercase mb-2 block">Message</label>
                    <textarea
                      {...register('message', { required: 'Message is required' })}
                      rows={5}
                      placeholder="Write your message here..."
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-black focus:outline-none focus:border-black transition-colors resize-none"
                    />
                    {errors.message && (
                      <p className="text-red-600 text-xs mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-black text-white font-semibold rounded-xl hover:bg-zinc-800 transition-colors uppercase tracking-wider text-xs flex items-center justify-center space-x-2 shadow-sm"
                  >
                    {loading ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </motionReal.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 max-w-7xl mx-auto">
        <div className="bg-white border border-zinc-200/80 p-2 rounded-3xl shadow-sm overflow-hidden">
          <div className="w-full h-80 bg-zinc-50 rounded-2xl overflow-hidden relative">
            <iframe
              title="Shop Location Map"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(0.8) contrast(1.1)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://maps.google.com/maps?q=${mapSearchQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;