import { useState, useContext } from 'react';
import { AppContext } from '../../App';
import Reply from './Reply';

// Composant pour afficher un message individuel avec support pour réponses imbriquées
function MessageItem({ message, onPostReply, depth = 0 }) {
  const { t } = useContext(AppContext);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [liked, setLiked] = useState(false);
  
  // Maximum d'imbrication pour les réponses (pour éviter des imbrications trop profondes visuellement)
  const MAX_DEPTH = 3;
  
  // Formatage de la date du message
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('default', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Affiche/masque le formulaire de réponse
  const toggleReplyForm = () => {
    setShowReplyForm(!showReplyForm);
  };
  
  // Gestionnaire pour poster une réponse
  const handlePostReply = (text) => {
    onPostReply(text, message.id);
    setShowReplyForm(false);
  };

  // Gestionnaire pour le like
  const handleLike = () => {
    setLiked(!liked);
    // Dans une vraie application, vous enverriez cette action à l'API
  };

  // Ajout de classes conditionnelles pour l'affichage des réponses
  const messageClasses = `message-item ${depth > 0 ? 'message-reply' : ''}`;

  return (
    <li className={messageClasses}>
      <div className="message-header">
        <div className="message-author">
          <div className="avatar-small">
            {message.avatar || message.user.charAt(0)}
          </div>
          <div className="message-author-info">
            <div className="message-author-name">{message.user}</div>
          </div>
        </div>
        <time>{formatDate(message.timestamp)}</time>
      </div>
      
      <p className="message-content">{message.text}</p>
      
      <div className="message-actions">
        {/* N'afficher le bouton de réponse que si nous n'avons pas atteint la profondeur maximale */}
        {depth < MAX_DEPTH && (
          <button 
            className={`message-action-btn ${showReplyForm ? 'active' : ''}`} 
            onClick={toggleReplyForm}
          >
            💬
            <span>{t('reply')}</span>
            {message.replies && message.replies.length > 0 && (
              <span className="count">({message.replies.length})</span>
            )}
          </button>
        )}
        
        <button 
          className={`message-action-btn ${liked ? 'active' : ''}`}
          onClick={handleLike}
        >
          {liked ? '❤️' : '🤍'}
          <span>{t('like')}</span>
          {(message.likes > 0 || liked) && (
            <span className="count">({liked ? message.likes + 1 : message.likes})</span>
          )}
        </button>
        
        <button className="message-action-btn">
          🔄
          <span>{t('share')}</span>
        </button>
      </div>
      
      {/* Formulaire de réponse */}
      {showReplyForm && (
        <Reply onPostReply={handlePostReply} onCancel={() => setShowReplyForm(false)} />
      )}
      
      {/* Affichage récursif des réponses */}
      {message.replies && message.replies.length > 0 && (
        <ul className="nested-replies">
          {message.replies.map(reply => (
            <MessageItem 
              key={reply.id} 
              message={reply} 
              onPostReply={onPostReply}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default MessageItem;