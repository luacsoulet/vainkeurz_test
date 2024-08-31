'use client';

import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="flex min-h-screen w-[1240px] flex-col items-center justify-center p-10 bg-gradient-to-br from-[#62198d] via-[#300d68] to-[#280463] text-white mt-5 rounded-lg">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        className="text-6xl font-bold mb-8"
      >
        Page d'accueil
      </motion.div>
      
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeInOut', delay: 0.5 }}
        className="text-lg text-center max-w-md"
      >
        Bienvenue sur la page d'accueil ! Utilisez le menu à gauche pour naviguer vers les autres pages.
      </motion.p>
    </main>
  );
}
