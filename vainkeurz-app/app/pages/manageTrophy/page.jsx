'use client';

import { useEffect, useState } from 'react';
import HeroSection from '@/app/components/ui/heroSection';
import { motion } from 'framer-motion';

function ManageTrophy() {
  const [users, setUsers] = useState([]);
  const [trophyArr, settrophyArr] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [query, setQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedPseudo, setSelectedPseudo] = useState(''); // Pour stocker le pseudo sélectionné
  const [popupMessage, setPopupMessage] = useState(''); // Pour stocker le message de la popup
  const [showPopup, setShowPopup] = useState(false); // Pour gérer la visibilité de la popup
  const [isSuccess, setIsSuccess] = useState(false); // Pour déterminer le type d'animation à afficher

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://apislim.vainkeurz.com/vkrz/user-list/get-all-pseudo-uuid-idvainkeur');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        const data = await response.json();
        setUsers(data); // Stocker les données des utilisateurs
      } catch (error) {
        console.error('Erreur :', error);
      }
    };

    fetchData(); // Appeler la fonction pour récupérer les données
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.vainkeurz.com/vkrz/trophy-list');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        const data = await response.json();
        settrophyArr(data.trophy_list); // Stocker les données dans l'état
      } catch (error) {
        console.error('Erreur :', error);
      }
    };

    fetchData(); // Appeler la fonction pour récupérer les données
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      const results = users.filter(user =>
        user.pseudo_user.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(results);
    } else {
      setFilteredUsers([]);
    }
  }, [query, users]);

  const handleSelectSuggestion = (pseudo) => {
    setQuery(pseudo);
    setSelectedPseudo(pseudo);
    setTimeout(() => {
      setFilteredUsers([]);
    }, 0);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedUser = users.find(user => user.pseudo_user === selectedPseudo);
    const id_vainkeur = selectedUser ? selectedUser.id_vainkeur : null;

    const selectedTrophy = trophyArr.find(trophy => trophy.name === selectedOption);
    const id_trophy = selectedTrophy ? selectedTrophy.id : null;
    
    if (!id_vainkeur || !id_trophy) {
      setPopupMessage('Erreur : Pseudo ou trophée non valide');
      setIsSuccess(false);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      return;
    }

    // Création du FormData
    const formData = new FormData();
    formData.append('id_vainkeur', id_vainkeur);
    formData.append('id_trophy', id_trophy);

    try {
      const response = await fetch('https://apislim.vainkeurz.com/vkrz/trophy-list/check', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi des données');
      }

      const result = await response.json();
      
      if (!result.win_trophy) {
        throw new Error('Erreur lors de l\'envoi des données');
      }

      setPopupMessage('Succès : Les données ont été envoyées avec succès');
      setIsSuccess(true);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      setSelectedOption('');
      setSelectedPseudo('');

    } catch (error) {
      setPopupMessage('Erreur lors de l\'ajout du trophée');
      setIsSuccess(false);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  };

  return (
    <div className='relative flex flex-col w-[1240px] min-h-[600px] h-fit rounded-lg mt-5 gap-5'>
        <HeroSection title='Utilisateurs: Trophée'/>

        {showPopup && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute z-25 top-[500px] left-[400px] h-[200px] bg-[#131313] text-white py-2 px-4 rounded-lg shadow-lg flex items-center justify-center"
          >
            <motion.svg
              initial={{ rotate: 0, scale: 1 }}
              animate={{ rotate: 360, scale: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <motion.circle
                cx="12"
                cy="12"
                r="10"
                stroke="gray"
                strokeWidth="2"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut", delay: 1 }}
              />
              {isSuccess ? (
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                  stroke="green"
                />
              ) : (
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                  stroke="red"
                />
              )}
            </motion.svg>
            <p className="ml-4">{popupMessage}</p>
          </motion.div>
        )}

      <motion.form 
        onSubmit={handleSubmit} 
        className='flex gap-8 justify-center items-center border-[#1c172b] bg-[#131313] bg-opacity-70 backdrop-blur-sm p-5'
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } }
        }}
      >
        <motion.div 
          className="relative mb-4 w-full max-w-xs"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          <label htmlFor="search-user" className="block text-white">Liste des utilisateurs:</label>
          <input
            id='search-user'
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un utilisateur..."
            className="p-2 border rounded w-full h-fit max-h-[40px] mt-[5px] bg-[#131313] backdrop-blur-sm text-white"
          />
          {filteredUsers.length > 0 && (
            <ul className="absolute z-10 w-full border mt-1 rounded bg-[#131313] backdrop-blur-sm text-white">
              {filteredUsers.map(user => (
                <li 
                  key={user.uuid_user} 
                  className="p-1 hover:bg-[#8884d8] cursor-pointer" 
                  onClick={() => handleSelectSuggestion(user.pseudo_user)}
                >
                  {user.pseudo_user}
                </li>
              ))}
            </ul>   
          )}
        </motion.div>
        
        <motion.div 
          className="mb-4 w-full max-w-xs"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          <label htmlFor="trophy-select" className="block text-white">Choisir un trophée:</label>
          <select 
            id="trophy-select" 
            value={selectedOption} 
            onChange={handleSelectChange}
            className="p-2 border rounded w-full h-full max-h-[40px] mt-[5px] bg-[#131313] backdrop-blur-sm text-white"
          >
            <option value=""></option>
            {trophyArr.map((option) => (
              <option key={option.id} value={option.name} className='hover:bg-[#8884d8]'>
                {option.name}
              </option>
            ))}
          </select>
        </motion.div>
        
        <motion.div 
          className='flex self-center'
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          <button 
            type="submit" 
            className="bg-[#503b85] hover:bg-[#4b1269] text-white py-2 px-4 rounded h-full max-h-[40px] w-fit mt-[11px]"
          >
            Valider
          </button>
        </motion.div>
      </motion.form>
    </div>
  );
}

export default ManageTrophy;
