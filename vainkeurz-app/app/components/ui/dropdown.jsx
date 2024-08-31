'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

export default function NavBarMenu({ menuName, pages }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    function generateOption(options) {
        return (
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className="mt-2 bg-transparent rounded-lg shadow-lg text-white overflow-hidden border-[#2d1c5a] border rounded-lg"
                    >
                        {options.map((page, index) => (
                            <motion.li
                                key={page.src}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.3 }}
                                className={`hover:bg-[#3d3355] transition duration-300 ${index !== 0 ? 'border-t-2 border-[#2d1c5a]' : ''}`}
                            >
                                <Link href={`/pages/${page.src}`} className="block p-2">{page.name}</Link>
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        );
    }

    return (
        <div className="dropdown w-full">
            <button
                onClick={toggleDropdown}
                className="flex justify-between items-center p-2 w-full text-left border-2 border-[#2d1c5a] rounded-lg text-lg bg-transparent text-white hover:bg-[#3d3355] transition duration-300"
            >
                <span className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faBars} /> {menuName}
                </span>
                <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} className='text-xl' />
            </button>
            {generateOption(pages)}
        </div>
    );
}
