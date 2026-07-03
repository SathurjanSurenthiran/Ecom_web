import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Clock, Heart, Mail, MapPin, Users } from 'lucide-react';
import { shopDetails } from '../data/shopDetails';

const Careers = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const benefits = [
    { icon: Heart, title: 'Health & Wellness', description: 'Comprehensive health insurance and wellness programs' },
    { icon: Clock, title: 'Flexible Hours', description: 'Work-life balance with flexible scheduling options' },
    { icon: Award, title: 'Growth Opportunities', description: 'Continuous learning and career advancement' },
    { icon: Users, title: 'Great Culture', description: 'Collaborative environment with inclusive values' },
  ];

  const openPositions = [
    {
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'Ragama, Colombo (Remote)',
      type: 'Full-time',
      description: 'Lead the development of our e-commerce platform using MERN stack.',
      requirements: ['5+ years of full-stack experience', 'Expert in React and Node.js', 'Experience with MongoDB and cloud services'],
    },
    {
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Wellawatta, Colombo (Hybrid)',
      type: 'Full-time',
      description: 'Design intuitive and beautiful user experiences for our fashion platform.',
      requirements: ['3+ years of UX/UI design experience', 'Proficiency in Figma', 'Fashion industry experience is a plus'],
    },
    {
      title: 'Digital Marketing Manager',
      department: 'Marketing',
      location: 'Remote (US-based)',
      type: 'Full-time',
      description: 'Lead our digital marketing strategy and brand presence across all channels.',
      requirements: ['5+ years in digital marketing', 'Experience with e-commerce', 'Strong analytical skills'],
    },
    {
      title: 'Customer Experience Specialist',
      department: 'Support',
      location: 'Town Road, Jaffna (In-office)',
      type: 'Full-time',
      description: 'Provide exceptional customer support and enhance the shopping experience.',
      requirements: ['2+ years in customer service', 'Excellent communication skills', 'Passion for fashion'],
    },
  ];

  const filteredPositions = activeFilter === 'all' 
    ? openPositions 
    : openPositions.filter(pos => pos.department.toLowerCase() === activeFilter);

  const departments = ['all', 'engineering', 'design', 'marketing', 'support'];

  return (
    <div className="min-h-screen bg-[#fcfbfe] support-page-light">
      <section className="relative pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-6">
              Join Our <span className="gradient-text">Team</span>
            </h1>
            <p className="text-white/70 text-lg">
              Build your career at FitFlex. Work with passionate people to redefine the future of fashion e-commerce.
            </p>
          </motion.div>

          {/* Benefits */}
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-poppins font-bold text-white text-center mb-6">
              Why Work With Us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass p-4 rounded-xl flex items-start space-x-3"
                >
                  <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{benefit.title}</h4>
                    <p className="text-white/60 text-sm">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Open Positions */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setActiveFilter(dept)}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                    activeFilter === dept
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'glass text-white/60 hover:text-white'
                  }`}
                >
                  {dept.charAt(0).toUpperCase() + dept.slice(1)}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {filteredPositions.map((position, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass p-6 rounded-xl hover:border-primary-500/20 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3">
                    <div>
                      <h3 className="text-xl font-poppins font-bold text-white">{position.title}</h3>
                      <p className="text-white/60 text-sm">{position.department}</p>
                    </div>
                    <div className="flex items-center space-x-3 mt-2 md:mt-0">
                      <span className="px-3 py-1 glass text-white/60 text-xs rounded-full flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{position.location}</span>
                      </span>
                      <span className="px-3 py-1 glass text-white/60 text-xs rounded-full flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{position.type}</span>
                      </span>
                    </div>
                  </div>

                  <p className="text-white/70 text-sm mb-3">{position.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {position.requirements.map((req, i) => (
                      <span key={i} className="px-2 py-1 bg-white/5 rounded text-white/40 text-xs">
                        {req}
                      </span>
                    ))}
                  </div>

                  <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity text-sm">
                    Apply Now
                  </button>
                </motion.div>
              ))}
            </div>

            {filteredPositions.length === 0 && (
              <div className="text-center py-8 text-white/40">
                <p>No open positions in this department at the moment.</p>
              </div>
            )}
          </div>

          {/* Contact */}
          <div className="max-w-3xl mx-auto mt-12 glass p-6 rounded-xl text-center">
            <h3 className="text-xl font-poppins font-bold text-white mb-2">Don't See Your Dream Role?</h3>
            <p className="text-white/60 mb-4">
              We're always looking for talented individuals. Send us your resume and we'll keep you in mind.
            </p>
            <a
              href={`mailto:${shopDetails.careersEmail}`}
              className="inline-flex items-center space-x-2 px-6 py-2 glass text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <Mail />
              <span>{shopDetails.careersEmail}</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Careers;
