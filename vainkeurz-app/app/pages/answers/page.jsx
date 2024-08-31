'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from "@/app/components/ui/heroSection";

export default function Answers() {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const questions = [
        {
            question: "Combien de KEURZ ont été générés sur VAINKEURZ ?",
            answer: "Je pense qu'environ 3 500 000 000 KEURZ ont été générés sans compter les KEURZ générés par la création de topList et parrainage.",
        },
        {
            question: "Cite un défaut du site actuel ?",
            answer: "Le fait comme vous l'avez dit que le site est un assemblage de codes de différents langages et CMS peut et va le rendre de plus en plus complexe et moins maintenable pour de futures nouvelles fonctionnalités.",
        },
        {
            question: "Cite une fonctionnalité inédite qui serait cool pour VAINKEURZ",
            answer: "Une fonctionnalité qui serait cool serait de pouvoir trouver des amis en fonction des données des choix qu'on a pu réaliser lors de nos topLists pour avoir des gens avec qui on a plus ou moins les mêmes avis. Ou même de pouvoir voir en temps réel combien de personnes ont réalisé le même vote que nous.",
        },
        {
            question: "Comment visualises-tu VAINKEURZ dans 3 ans ?",
            answer: "Dans 3 ans je le vois comme un site ne proposant plus uniquement que des TopLists mais aussi comme un site où nous pourrons créer des liens avec d'autres personnes à travers d'autres activités faisables sur le site.",
        },
        {
            question: "Pourquoi souhaites-tu rejoindre l’équipe de VAINKEURZ ?",
            answer: "Je souhaite rejoindre l'équipe de VAINKEURZ car je sais qu'elle est remplie de personnes passionnées et animées par le même projet. Mais qui sont aussi très créatives et avides de défis techniques. Et qui ont qu'un objectif en tête, c'est d'améliorer le site et de le rendre beaucoup plus populaire.",
        },
    ];

    const generateRandomMovement = () => ({
        x: Math.random() * 500 - 250, // Mouvement horizontal aléatoire
        y: Math.random() * 500 - 250, // Mouvement vertical aléatoire
        transition: {
            duration: Math.random() * 10 + 10, // Durée aléatoire entre 10 et 20 secondes
            ease: "easeInOut",
            repeat: Infinity, // Mouvement répété infiniment
            repeatType: "mirror", // Rebondit lorsqu'il atteint les bords
        },
    });

    return (
        <div className="flex flex-col w-[1240px] h-[600px] mt-5 gap-5">
            <HeroSection title='Questions réponses' />
            <div className="space-y-4">
                {questions.map((item, index) => (
                    <motion.div 
                        key={index} 
                        className="border-[#1c172b] bg-[#3d3355] bg-opacity-90 backdrop-blur-sm p-5 rounded-lg cursor-pointer"
                        onClick={() => handleToggle(index)}
                        drag
                        dragConstraints={{ left: -250, right: 250, top: -250, bottom: 250 }}
                        dragElastic={0.7}
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        whileTap={{ scale: 0.95 }}
                        animate={generateRandomMovement()} // Mouvement autonome
                    >
                        <h1 className="cursor-pointer">
                            {item.question}
                        </h1>
                        <AnimatePresence initial={false}>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                                    className="flex overflow-hidden content-center"
                                >
                                    <motion.p
                                        key="answer"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                                        className="mt-4 bg-[#131313] bg-opacity-70 backdrop-blur-sm rounded-lg p-4"
                                    >
                                        {item.answer}
                                    </motion.p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}