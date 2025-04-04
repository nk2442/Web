// Élément individuel d'une conversation dans la liste
// Affiche un aperçu de la conversation avec l'indicateur de messages non lus
function ConversationItem({ conversation, isSelected, onClick }) {
  return (
    <li 
      className={`conversation-item ${isSelected ? 'selected' : ''} ${conversation.unread > 0 ? 'unread' : ''}`}
      onClick={onClick}
    >
      <div className="conversation-avatar">
        {conversation.with.charAt(0)}
      </div>
      <div className="conversation-content">
        <div className="conversation-name">{conversation.with}</div>
        <div className="conversation-preview">{conversation.lastMessage}</div>
      </div>
      {conversation.unread > 0 && (
        <div className="unread-badge">{conversation.unread}</div>
      )}
    </li>
  );
}

export default ConversationItem;