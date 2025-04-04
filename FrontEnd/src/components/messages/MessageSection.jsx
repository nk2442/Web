import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../App';
import NewMessage from './NewMessage';
import MessageList from './MessageList';

/**
 * Section principale d'affichage des messages
 */
function MessageSection({ searchQuery, dateFilter }) {
  const { user, t } = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Chargement initial des messages (simulé)
  useEffect(() => {
    setTimeout(() => {
      setMessages([
        {
          id: 1,
          user: 'Julie Martin',
          avatar: 'JM',
          text: "Salut tout le monde ! Qui est partant pour un café après la réunion d'équipe ce matin ? J'ai découvert une nouvelle pâtisserie juste à côté du bureau ! 🥐☕",
          timestamp: '2024-01-30T09:15:00',
          likes: 5,
          replies: [
            {
              id: 2,
              user: 'Thomas Dubois',
              avatar: 'TD',
              text: "Bonne idée Julie ! Je suis totalement partant. Il paraît qu'ils font des éclairs au chocolat incroyables !",
              timestamp: '2024-01-30T09:23:00',
              parentId: 1,
              replies: []
            },
            {
              id: 3,
              user: 'Sophie Leclerc',
              avatar: 'SL',
              text: "Je vous rejoins aussi ! D'ailleurs, quelqu'un a les derniers chiffres pour la présentation ?",
              timestamp: '2024-01-30T09:30:00',
              parentId: 1,
              replies: [
                {
                  id: 6,
                  user: 'Julie Martin',
                  avatar: 'JM',
                  text: "Je te les ai envoyés par mail à l'instant Sophie !",
                  timestamp: '2024-01-30T09:35:00',
                  parentId: 3,
                  replies: []
                }
              ]
            }
          ]
        },
        {
          id: 4,
          user: 'Pierre Moreau',
          avatar: 'PM',
          text: "Bonjour à tous ! Est-ce que quelqu'un pourrait me prêter son chargeur de MacBook aujourd'hui ? 😅",
          timestamp: '2024-01-30T08:47:00',
          likes: 2,
          replies: [
            {
              id: 5,
              user: 'Émilie Bernard',
              avatar: 'EB',
              text: "J'en ai un dans mon sac Pierre ! Passe à mon bureau quand tu veux.",
              timestamp: '2024-01-30T08:52:00',
              parentId: 4,
              replies: []
            }
          ]
        }
      ]);
      
      setLoading(false);
    }, 800);
  }, []);
  
  // Filtrage des messages
  const filteredMessages = messages.filter(message => {
    const matchesSearch = searchQuery 
      ? message.text.toLowerCase().includes(searchQuery.toLowerCase()) 
      : true;
      
    const messageDate = new Date(message.timestamp);
    const afterStartDate = dateFilter.start 
      ? messageDate >= new Date(dateFilter.start) 
      : true;
    const beforeEndDate = dateFilter.end 
      ? messageDate <= new Date(dateFilter.end) 
      : true;
      
    return matchesSearch && afterStartDate && beforeEndDate;
  });
  
  // Fonction pour ajouter une réponse à n'importe quel niveau
  const addReplyToMessage = (messagesList, messageId, newReply) => {
    return messagesList.map(message => {
      if (message.id === messageId) {
        return {
          ...message,
          replies: [...(message.replies || []), newReply]
        };
      }
      
      if (message.replies && message.replies.length > 0) {
        return {
          ...message,
          replies: addReplyToMessage(message.replies, messageId, newReply)
        };
      }
      
      return message;
    });
  };
  
  // Gestionnaire pour poster un nouveau message
  const handlePostMessage = (text) => {
    const newMessage = {
      id: Date.now(),
      user: user.firstName + ' ' + user.lastName,
      avatar: user.firstName.charAt(0) + user.lastName.charAt(0),
      text,
      timestamp: new Date().toISOString(),
      likes: 0,
      replies: []
    };
    
    setMessages([newMessage, ...messages]);
  };
  
  // Gestionnaire pour poster une réponse
  const handlePostReply = (text, parentId) => {
    const newReply = {
      id: Date.now(),
      user: user.firstName + ' ' + user.lastName,
      avatar: user.firstName.charAt(0) + user.lastName.charAt(0),
      text,
      timestamp: new Date().toISOString(),
      parentId,
      replies: []
    };
    
    setMessages(addReplyToMessage(messages, parentId, newReply));
  };
  
  return (
    <div className="messages-container">
      <h2 className="section-title">
        {t('newMessage')}
        <a href="#" className="section-title-action">🔄 {t('refresh')}</a>
      </h2>
      
      <NewMessage onPostMessage={handlePostMessage} />
      
      <h2 className="section-title">
        {t('messages')}
        {filteredMessages.length > 0 && <span>({filteredMessages.length})</span>}
      </h2>
      
      {loading ? (
        <div className="loading-messages">{t('loading')}</div>
      ) : filteredMessages.length === 0 ? (
        <div className="no-messages"><p>{t('noMessages')}</p></div>
      ) : (
        <MessageList messages={filteredMessages} onPostReply={handlePostReply} />
      )}
    </div>
  );
}

export default MessageSection;