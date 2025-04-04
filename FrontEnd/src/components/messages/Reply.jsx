import { useState, useContext } from 'react';
import { AppContext } from '../../App';

// Formulaire pour répondre à un message
function Reply({ onPostReply, onCancel }) {
  const { t } = useContext(AppContext);
  const [reply, setReply] = useState('');
  const [error, setError] = useState('');
  
  // Gestionnaire de soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation du contenu de la réponse
    if (!reply.trim()) {
      setError(t('messageEmptyError'));
      return;
    }
    
    // Envoi de la réponse et réinitialisation du formulaire
    onPostReply(reply);
    setReply('');
    setError('');
  };
  
  return (
    <form className="reply-form" onSubmit={handleSubmit}>
      <textarea
        value={reply}
        onChange={(e) => {
          setReply(e.target.value);
          if (error) setError('');
        }}
        placeholder={t('writeReply')}
        aria-label={t('replyText')}
        rows="2"
      ></textarea>
      {error && <p className="error-message">{error}</p>}
      <div className="button-group">
        <button type="submit">{t('submit')}</button>
        <button type="button" onClick={onCancel}>{t('cancel')}</button>
      </div>
    </form>
  );
}

export default Reply;