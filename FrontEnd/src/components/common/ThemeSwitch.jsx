import { useContext } from 'react';
import { AppContext } from '../../App';

// Composant pour basculer entre les thèmes clair et sombre
// Utilise la fonction toggleTheme du contexte pour changer de thème
function ThemeSwitch() {
  const { theme, toggleTheme } = useContext(AppContext);
  
  return (
    <button 
      className="theme-switch" 
      onClick={toggleTheme} 
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}

export default ThemeSwitch;