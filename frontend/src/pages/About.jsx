import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Heart, Shield, Users } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Quality First',
      description: 'We source only the finest materials and work with ethical manufacturers to ensure every product meets our high standards.',
    },
    {
      icon: Users,
      title: 'Customer Centric',
      description: 'Your satisfaction is our priority. We listen, adapt, and strive to exceed your expectations at every step.',
    },
    {
      icon: Globe,
      title: 'Sustainable Fashion',
      description: 'Committed to reducing our environmental impact through sustainable practices and eco-friendly materials.',
    },
    {
      icon: Shield,
      title: 'Trust & Transparency',
      description: 'We believe in honest communication, fair pricing, and building lasting relationships with our customers.',
    },
  ];

  const team = [
    { name: 'Sarah Johnson', role: 'CEO & Founder', image: 'https://randomuser.me/api/portraits/women/3.jpg' },
    { name: 'Michael Chen', role: 'Creative Director', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { name: 'Emily Rodriguez', role: 'Head of Design', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { name: 'David Kim', role: 'Operations Manager', image: 'https://randomuser.me/api/portraits/men/4.jpg' },
  ];

  return (
    <div className="min-h-screen bg-[#fcfbfe] support-page-light">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-6">
              About <span className="gradient-text">FitFlex</span>
            </h1>
            <p className="text-white/70 text-lg">
              We're redefining fashion retail with a commitment to quality, sustainability, and customer satisfaction.
              Every piece tells a story of craftsmanship and care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 bg-white/5">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-poppins font-bold text-white mb-4">
                Our Story
              </h2>
              <p className="text-white/70 mb-4">
                Founded in 2020, FitFlex was born from a simple idea: create a clothing brand that combines
                timeless style with modern ethics. What started as a small boutique has grown into a global
                community of fashion enthusiasts who value quality over quantity.
              </p>
              <p className="text-white/70 mb-4">
                We believe that fashion should be accessible, sustainable, and empowering. Every collection
                is designed with purpose, using materials that are kind to both people and the planet.
              </p>
              <p className="text-white/70">
                Today, we're proud to serve thousands of customers worldwide, offering curated collections
                that reflect the latest trends while honoring timeless craftsmanship.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800"
                alt="Our Story"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 glass p-4 rounded-xl">
                <p className="text-white font-bold text-2xl">4+</p>
                <p className="text-white/60 text-sm">Years of Excellence</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-poppins font-bold text-white mb-4">
              Our Values
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass p-6 rounded-xl text-center hover:transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">{value.title}</h3>
                <p className="text-white/60 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 bg-white/5">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-poppins font-bold text-white mb-4">
              Meet the Team
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Passionate individuals dedicated to bringing you the best fashion experience
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="glass p-4 rounded-xl text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
                />
                <h4 className="text-white font-semibold">{member.name}</h4>
                <p className="text-white/60 text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
