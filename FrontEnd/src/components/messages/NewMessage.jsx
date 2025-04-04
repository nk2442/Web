import { useState, useContext } from 'react';
import { AppContext } from '../../App';

// Formulaire pour créer un nouveau message avec design amélioré
function NewMessage({ onPostMessage }) {
  const { t } = useContext(AppContext);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Gestionnaire de soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation du contenu du message
    if (!message.trim()) {
      setError(t('messageEmptyError'));
      return;
    }
    
    // Envoi du message et réinitialisation du formulaire
    onPostMessage(message);
    setMessage('');
    setError('');
  };

  return (
    <section className="new-message">
      <form onSubmit={handleSubmit}>
        <div className="message-input">
          <textarea 
            placeholder={t('whatInMind')}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (error) setError('');
            }}
            aria-required="true"
            aria-invalid={error ? 'true' : 'false'}
          ></textarea>
          
          {error && <p className="error-message" role="alert">{error}</p>}
          
          <div className="message-input-actions">
            <div className="message-input-tools">
              <button type="button" className="tool-button" title={t('addImage')}>
                📷
              </button>
              <button type="button" className="tool-button" title={t('addLink')}>
                🔗
              </button>
              <button type="button" className="tool-button" title={t('addEmoji')}>
                😊
              </button>
            </div>
            
            <button type="submit">
              📤 <span>{t('send')}</span>
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default NewMessage;