import { useState } from 'react';

// Composant de filtre par date pour les messages
// Permet de sélectionner une plage de dates et de filtrer les messages en conséquence
function DateFilters({ onDateFilter }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Applique le filtre de date
  const handleApplyFilter = () => {
    onDateFilter({ start: startDate, end: endDate });
  };

  // Réinitialise le filtre de date
  const handleResetFilter = () => {
    setStartDate('');
    setEndDate('');
    onDateFilter({ start: '', end: '' });
  };

  return (
    <div className="date-filters">
      <div className="date-input">
        <label htmlFor="start-date">From:</label>
        <input
          id="start-date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      
      <div className="date-input">
        <label htmlFor="end-date">To:</label>
        <input
          id="end-date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      
      <button onClick={handleApplyFilter}>Apply</button>
      <button onClick={handleResetFilter}>Reset</button>
    </div>
  );
}

export default DateFilters;