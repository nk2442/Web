import { useContext } from 'react';
import { AppContext } from '../../App';
import SearchBar from '../common/SearchBar';
import DateFilters from '../common/DateFilters';

// En-tête du tableau de bord - simplifié
function Header({ onSearch, onDateFilter, user }) {
  const { t } = useContext(AppContext);
  const userName = user && user.firstName ? user.firstName : t('user');
  
  return (
    <header className="dashboard-header">
      <div className="logo">
        <h1>{t('dashboard')}</h1>
        <p>{t('welcome')}, {userName}!</p>
      </div>
      
      <div className="search-zone">
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder={t('search')}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        
        <div className="date-filters">
          <div className="date-input">
            <input type="date" id="start-date" aria-label={t('from')} />
          </div>
          
          <div className="date-input">
            <input type="date" id="end-date" aria-label={t('to')} />
          </div>
          
          <button className="apply" onClick={() => {
            const start = document.getElementById('start-date').value;
            const end = document.getElementById('end-date').value;
            onDateFilter({ start, end });
          }}>{t('apply')}</button>
          
          <button className="reset" onClick={() => {
            document.getElementById('start-date').value = '';
            document.getElementById('end-date').value = '';
            onDateFilter({ start: '', end: '' });
          }}>{t('cancel')}</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
