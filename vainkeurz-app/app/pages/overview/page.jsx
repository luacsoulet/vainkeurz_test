'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DefaultCharts from '@/app/components/ui/charts';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Importer le style CSS de react-loading-skeleton
import HeroSection from '@/app/components/ui/heroSection';

// Fonction pour obtenir le numéro de la semaine pour une date donnée
function getWeekNumber(date) {
    const d = new Date(date);
    const oneJan = new Date(d.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((d - oneJan) / (24 * 60 * 60 * 1000));
    return Math.ceil((d.getDay() + 1 + numberOfDays) / 7);
}

function OverviewPage() {
    const [chartsData, setChartsData] = useState([]);
    const [currentMonthData, setCurrentMonthData] = useState([]);
    const [loading, setLoading] = useState(true); // État pour suivre le chargement

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.vainkeurz.com/vkrz/vainkeur-per-day');
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                const data = await response.json();

                // Regrouper les données par semaine
                const weeklyData = data.reduce((acc, current) => {
                    const weekNumber = getWeekNumber(current.date);
                    const year = current.date.slice(0, 4);
                    const weekKey = `${year}-S${weekNumber}`;
                    
                    if (!acc[weekKey]) {
                        acc[weekKey] = { week: weekKey, totalInscription: 0 };
                    }
                    acc[weekKey].totalInscription += current.totalInscription;
                    return acc;
                }, {});

                // Convertir l'objet regroupé en tableau
                const mergedData = Object.values(weeklyData);

                setChartsData(mergedData); // Stocker les données regroupées par semaine

                // Filtrer les données pour le mois actuel
                const currentMonth = new Date().getMonth() + 1; // Mois actuel (1-12)
                const currentYear = new Date().getFullYear(); // Année actuelle
                const currentMonthData = data.filter(item => {
                    const itemDate = new Date(item.date);
                    return (
                        itemDate.getMonth() + 1 === currentMonth &&
                        itemDate.getFullYear() === currentYear
                    );
                });

                // Regrouper les données par jour pour le mois actuel
                const dailyData = currentMonthData.map(item => ({
                    date: item.date,
                    totalInscription: item.totalInscription
                }));

                setCurrentMonthData(dailyData); // Stocker les données du mois actuel

            } catch (error) {
                console.error('Erreur :', error);
            } finally {
                setLoading(false); // Fin du chargement, peu importe le succès ou l'échec
            }
        };

        fetchData(); // Appeler la fonction pour récupérer les données
    }, []);

    return (
        <div className='flex flex-col mt-5 gap-10'>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <HeroSection title='Overview'/>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <div className='flex flex-col gap-10'>
                    {loading ? (
                        <SkeletonTheme baseColor="#131313" highlightColor="#231731">
                            <Skeleton height={600} width={1240} />
                            <Skeleton height={600} width={1240} />
                        </SkeletonTheme>
                    ) : (
                        <>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                className='flex flex-col border-[#1c172b] bg-[#131313] bg-opacity-70 backdrop-blur-sm p-5 text-xs rounded-lg w-[1240px] h-[600px]'
                            >
                                {chartsData.length > 0 ? (
                                    <DefaultCharts 
                                        title="Nombre d'inscriptions sur l'année:"
                                        datakey1="week"
                                        datakey2="totalInscription"
                                        chartsData={chartsData}
                                        dataMaxVector={0.08}
                                        color="#8884d8"
                                    />
                                ) : (
                                    <p>No data available.</p> // Afficher un message si aucune donnée n'est disponible
                                )}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.9 }}
                                className='border-[#1c172b] bg-[#131313] bg-opacity-70 backdrop-blur-sm p-5 text-xs rounded-lg w-[1240px] h-[600px]'
                            >
                                {currentMonthData.length > 0 ? (
                                    <DefaultCharts 
                                        title="Nombre d'inscriptions sur le mois en cours:"
                                        datakey1="date"
                                        datakey2="totalInscription"
                                        chartsData={currentMonthData}
                                        dataMaxVector={1}
                                        color="#9361a0"
                                    />
                                ) : (
                                    <p>No data available for the current month.</p> // Afficher un message si aucune donnée n'est disponible pour le mois actuel
                                )}
                            </motion.div>
                        </>
                    )}
                </div>
            </motion.div>
        </div>
    );
}

export default OverviewPage;
