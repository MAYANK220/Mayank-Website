'use client';

import { motion } from 'framer-motion';

const cards = [
  {
    title: "Personal Life",
    description: "A glimpse beyond the screen — mindset, habits, and what keeps me grounded.",
    quote: "I stay curious. Always.",
  },
  {
    title: "Professional Journey",
    description: "Built on learning, solving, and figuring things out — one system at a time.",
    quote: "I don't get lucky. I make my own luck.",
  },
  {
    title: "Gaming & Strategy",
    description: "Where decisions matter, patterns emerge, and thinking ahead is everything.",
    quote: "Every move is intentional.",
  },
];

export default function Projects() {
  return (
    <section className="relative w-full min-h-screen bg-[#0f0f0f] py-32 px-6 md:px-24 text-white flex flex-col justify-between">
      {/* Background soft glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto flex-grow w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-600">
            Inside My Head
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card glow-hover rounded-2xl p-10 flex flex-col justify-between h-full transition-all duration-300 group cursor-default relative overflow-hidden"
            >
              {/* Subtle hover gradient inside card */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 mb-8">
                <h3 className="text-2xl font-semibold mb-3 text-white">
                  {card.title}
                </h3>
                <p className="text-neutral-400 font-light leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="relative z-10 pt-6 border-t border-white/5 mt-auto">
                <p className="text-sm font-medium text-indigo-300/80 italic group-hover:text-indigo-300 transition-colors duration-300">
                  &quot;{card.quote}&quot;
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="w-full text-center mt-32 pb-8"
      >
        <p className="text-sm tracking-[0.3em] uppercase text-neutral-500 font-semibold">
          Still early. Still dangerous.
        </p>
      </motion.div>
    </section>
  );
}
