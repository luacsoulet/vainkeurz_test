'use client'

import Image from 'next/image';
import { motion } from 'framer-motion';
import NavBarMenu from '@/app/components/ui/dropdown.jsx';
import VainkeurzLogo from '../../../public/images/logo-vkrz.png';

function NavBar() {

    return (
        <motion.aside
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-lg border-2 border-[#1c172b] bg-[#131313] bg-opacity-80 backdrop-blur-lg w-[240px] h-screen m-4 shadow-lg"
        >
            <nav className="flex flex-col p-5 justify-start items-center gap-[120px] h-full">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Image
                        src={VainkeurzLogo}
                        alt="Vainkeurz Logo"
                        width={150}
                        height={50}
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col w-full gap-4"
                >
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="dropdown w-full"
                    >
                        <NavBarMenu
                            menuName='Questions'
                            pages={[{name: 'Mes réponses', src: 'answers'}]}
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="dropdown w-full"
                    >
                        <NavBarMenu
                            menuName='Data'
                            pages={[{name: 'Overview', src: 'overview'}, {name: 'Inscriptions', src:'inscriptions'}]}
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="dropdown w-full"
                    >
                        <NavBarMenu
                            menuName='Users'
                            pages={[{name: 'Attribution des trophées', src: 'manageTrophy'}, {name: 'Gestion des rôles', src:'manageRole'}]}
                        />
                    </motion.div>
                </motion.div>
            </nav>
        </motion.aside>
    );
}

export default NavBar;
