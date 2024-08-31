'use client'
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Custom404() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-[1240px] bg-[#131313] bg-opacity-80 mt-5 text-white">
            <motion.h1 
                className="text-6xl mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                404
            </motion.h1>
            <motion.p 
                className="text-2xl mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                Oops! La page n'existe pas.
            </motion.p>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
            >
                <Link href="/pages/" className="text-[#886acf] hover:text-[#5d3fa5]">
                    Go back to the homepage
                </Link>
            </motion.div>
        </div>
    );
}
