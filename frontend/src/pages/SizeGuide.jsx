import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CircleDot, Lightbulb, MapPin, Ruler, ScanLine } from 'lucide-react';

const SizeGuide = () => {
  const [activeCategory, setActiveCategory] = useState('women');

  const sizeCategories = [
    { id: 'women', label: 'Women' },
    { id: 'men', label: 'Men' },
    { id: 'kids', label: 'Kids' },
  ];

  const sizeCharts = {
    women: {
      tops: {
        headers: ['Size', 'Bust (in)', 'Waist (in)', 'Hip (in)', 'US Size'],
        rows: [
          ['XS', '30-32', '24-26', '33-35', '0-2'],
          ['S', '33-35', '27-29', '36-38', '4-6'],
          ['M', '36-38', '30-32', '39-41', '8-10'],
          ['L', '39-41', '33-35', '42-44', '12-14'],
          ['XL', '42-44', '36-38', '45-47', '16-18'],
          ['XXL', '45-47', '39-41', '48-50', '20-22'],
        ],
      },
      bottoms: {
        headers: ['Size', 'Waist (in)', 'Hip (in)', 'Inseam (in)', 'US Size'],
        rows: [
          ['XS', '24-26', '33-35', '30', '0-2'],
          ['S', '27-29', '36-38', '30.5', '4-6'],
          ['M', '30-32', '39-41', '31', '8-10'],
          ['L', '33-35', '42-44', '31.5', '12-14'],
          ['XL', '36-38', '45-47', '32', '16-18'],
          ['XXL', '39-41', '48-50', '32.5', '20-22'],
        ],
      },
      shoes: {
        headers: ['US Size', 'EU Size', 'UK Size', 'Foot Length (in)'],
        rows: [
          ['5', '35', '3', '8.7'],
          ['6', '36', '4', '9.0'],
          ['7', '37', '5', '9.3'],
          ['8', '38', '6', '9.6'],
          ['9', '39', '7', '9.9'],
          ['10', '40', '8', '10.2'],
          ['11', '41', '9', '10.5'],
        ],
      },
    },
    men: {
      tops: {
        headers: ['Size', 'Chest (in)', 'Waist (in)', 'Sleeve (in)', 'US Size'],
        rows: [
          ['S', '34-36', '28-30', '32-33', '36'],
          ['M', '38-40', '32-34', '33-34', '38'],
          ['L', '42-44', '36-38', '34-35', '40'],
          ['XL', '46-48', '40-42', '35-36', '42'],
          ['XXL', '50-52', '44-46', '36-37', '44'],
          ['XXXL', '54-56', '48-50', '37-38', '46'],
        ],
      },
      bottoms: {
        headers: ['Size', 'Waist (in)', 'Inseam (in)', 'US Size'],
        rows: [
          ['S', '28-30', '30', '28'],
          ['M', '32-34', '31', '30'],
          ['L', '36-38', '32', '32'],
          ['XL', '40-42', '33', '34'],
          ['XXL', '44-46', '34', '36'],
          ['XXXL', '48-50', '35', '38'],
        ],
      },
      shoes: {
        headers: ['US Size', 'EU Size', 'UK Size', 'Foot Length (in)'],
        rows: [
          ['7', '40', '6', '9.8'],
          ['8', '41', '7', '10.1'],
          ['9', '42', '8', '10.4'],
          ['10', '43', '9', '10.7'],
          ['11', '44', '10', '11.0'],
          ['12', '45', '11', '11.3'],
          ['13', '46', '12', '11.6'],
        ],
      },
    },
    kids: {
      tops: {
        headers: ['Size', 'Age', 'Height (in)', 'Weight (lbs)'],
        rows: [
          ['XS', '4-5', '40-43', '35-42'],
          ['S', '6-7', '44-47', '43-50'],
          ['M', '8-9', '48-51', '51-58'],
          ['L', '10-11', '52-55', '59-65'],
          ['XL', '12-13', '56-59', '66-75'],
          ['XXL', '14-15', '60-63', '76-85'],
        ],
      },
      shoes: {
        headers: ['US Size', 'EU Size', 'UK Size', 'Foot Length (in)'],
        rows: [
          ['10', '27', '9', '6.5'],
          ['11', '28', '10', '6.9'],
          ['12', '29', '11', '7.3'],
          ['13', '30', '12', '7.7'],
          ['1', '31', '13', '8.1'],
          ['2', '32', '1', '8.5'],
          ['3', '33', '2', '8.9'],
        ],
      },
    },
  };

  const howToMeasure = [
    {
      title: 'Chest / Bust',
      description: 'Measure around the fullest part of your chest/bust, keeping the tape measure horizontal.',
      icon: Ruler,
    },
    {
      title: 'Waist',
      description: 'Measure around your natural waistline, keeping the tape comfortably loose.',
      icon: MapPin,
    },
    {
      title: 'Hips',
      description: 'Measure around the fullest part of your hips, keeping the tape horizontal.',
      icon: ScanLine,
    },
    {
      title: 'Inseam',
      description: 'Measure from the crotch to the bottom of the leg along the inside seam.',
      icon: Ruler,
    },
  ];

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
              Size <span className="gradient-text">Guide</span>
            </h1>
            <p className="text-white/70 text-lg">
              Find your perfect fit with our comprehensive size guide. Measure yourself and compare with our charts.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-poppins font-bold text-white text-center mb-6">
              How to Measure Yourself
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {howToMeasure.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass p-4 rounded-xl flex items-start space-x-4"
                  >
                    <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{item.title}</h4>
                      <p className="text-white/60 text-sm">{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center space-x-2 mb-8">
            {sizeCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'glass text-white/60 hover:text-white'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {Object.entries(sizeCharts[activeCategory]).map(([type, chart]) => (
              <motion.div
                key={type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-6 rounded-xl"
              >
                <h3 className="text-xl font-poppins font-bold text-white mb-4 capitalize">
                  {type}
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        {chart.headers.map((header, index) => (
                          <th key={index} className="text-left py-3 px-4 text-white/60 text-sm font-medium">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {chart.rows.map((row, index) => (
                        <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="py-3 px-4 text-white/80">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto mt-12 glass p-6 rounded-xl">
            <h3 className="text-xl font-poppins font-bold text-white mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary-400" />
              <span>Fitting Tips</span>
            </h3>
            <ul className="space-y-2 text-white/70">
              {[
                'Measure yourself wearing the undergarments you plan to wear with the item.',
                "If you're between sizes, we recommend sizing up for a more comfortable fit.",
                'Check product descriptions for specific fit notes (e.g., slim fit, relaxed fit).',
                'Still unsure? Contact our support team for personalized sizing advice.',
              ].map((tip) => (
                <li key={tip} className="flex items-start space-x-2">
                  <CircleDot className="w-4 h-4 text-primary-400 mt-1 flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SizeGuide;
