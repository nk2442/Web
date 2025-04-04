import { useState, useContext } from 'react';
import { AppContext } from '../../App';
import Header from '../layout/Header';
import Sidebar from '../layout/Sidebar';
import MessageSection from '../messages/MessageSection';

// Page principale du tableau de bord
// Affiche l'en-tête, la barre latérale et la section des messages
function Dashboard() {
  const { user } = useContext(AppContext);
  
  // États pour la recherche et le filtrage des messages
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState({ start: '', end: '' });

  // Gestionnaire pour la recherche de messages
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Gestionnaire pour le filtrage par date
  const handleDateFilter = (filter) => {
    setDateFilter(filter);
  };

  return (
    <div className="dashboard">
      <Header 
        onSearch={handleSearch} 
        onDateFilter={handleDateFilter} 
        user={user}
      />
      <main className="dashboard-main">
        <Sidebar />
        <MessageSection 
          searchQuery={searchQuery} 
          dateFilter={dateFilter} 
        />
      </main>
    </div>
  );
}

export default Dashboard;