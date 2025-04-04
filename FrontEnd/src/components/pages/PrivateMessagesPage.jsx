import { useContext } from 'react';
import { AppContext } from '../../App';
import PrivateMessages from '../private-messages/PrivateMessages';

// Page qui encapsule le composant PrivateMessages
// Ajoute un titre traduit à la section des messages privés
function PrivateMessagesPage() {
  const { t } = useContext(AppContext);
  
  return (
    <div className="page-container">
      <h1>{t('privateMessages')}</h1>
      <PrivateMessages />
    </div>
  );
}

export default PrivateMessagesPage;
