import { useContext } from 'react';
import { AppContext } from '../../App';

// Composant pour changer la langue de l'application
// N'inclut que le français et l'anglais pour l'instant
function LanguageSwitcher() {
  const { language, changeLanguage, t } = useContext(AppContext);
  
  // Liste des langues disponibles dans l'application
  const languages = [
    { code: 'fr', name: 'Français' },
    { code: 'en', name: 'English' }
  ];
  
  return (
    <div className="language-switcher">
      <select 
        value={language} 
        onChange={(e) => changeLanguage(e.target.value)}
        aria-label={t('selectLanguage')}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageSwitcher;