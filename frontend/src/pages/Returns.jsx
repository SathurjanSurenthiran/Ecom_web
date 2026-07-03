import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Clock,
  DollarSign,
  Package,
  RefreshCw,
} from 'lucide-react';

const Returns = () => {
  const returnSteps = [
    {
      icon: Package,
      title: 'Initiate Return',
      description:
        'Log into your account, open "My Orders", and select the order you want to return.',
    },
    {
      icon: CheckCircle,
      title: 'Print Return Label',
      description:
        'Download and print the prepaid return shipping label provided by our system.',
    },
    {
      icon: Package,
      title: 'Pack & Ship',
      description:
        'Securely package the items and attach the return label before dropping it off.',
    },
    {
      icon: Clock,
      title: 'Return Processing',
      description:
        'Once your package reaches our warehouse, it will be inspected within 3–5 business days.',
    },
    {
      icon: DollarSign,
      title: 'Receive Refund',
      description:
        'Approved refunds are sent back to your original payment method automatically.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcfbfe] support-page-light">
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Returns &{' '}
              <span className="gradient-text">
                Exchanges
              </span>
            </h1>

            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              We want you to love every purchase. If something isn't quite right,
              returning or exchanging your items is quick and hassle-free.
            </p>
          </motion.div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">

            <motion.div
              whileHover={{ y: -8 }}
              className="glass rounded-2xl p-8 text-center border border-white/10"
            >
              <RefreshCw className="w-12 h-12 mx-auto text-primary-400 mb-4" />
              <h3 className="font-semibold text-xl mb-2">
                30-Day Returns
              </h3>
              <p className="text-white/60">
                Return eligible products within 30 days of delivery.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -8 }}
              className="glass rounded-2xl p-8 text-center border border-white/10"
            >
              <DollarSign className="w-12 h-12 mx-auto text-primary-400 mb-4" />
              <h3 className="font-semibold text-xl mb-2">
                Free Returns
              </h3>
              <p className="text-white/60">
                Enjoy free return shipping on eligible purchases.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -8 }}
              className="glass rounded-2xl p-8 text-center border border-white/10"
            >
              <CheckCircle className="w-12 h-12 mx-auto text-primary-400 mb-4" />
              <h3 className="font-semibold text-xl mb-2">
                Easy Exchanges
              </h3>
              <p className="text-white/60">
                Swap for another size or color with ease.
              </p>
            </motion.div>

          </div>

          {/* Steps */}
          <div className="max-w-4xl mx-auto">

            <h2 className="text-3xl font-bold text-center mb-10">
              Return Process
            </h2>

            <div className="space-y-6">

              {returnSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="glass rounded-2xl border border-white/10 p-6 flex gap-5 items-start"
                  >
                    <div className="w-14 h-14 rounded-full bg-primary-500/20 flex items-center justify-center shrink-0">
                      <Icon className="w-7 h-7 text-primary-400" />
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {step.title}
                      </h3>

                      <p className="text-white/70 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}

            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default Returns;
