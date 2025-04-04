import MessageItem from './MessageItem';

// Liste des messages
// Affiche une liste de messages passés en props avec support d'imbrication
function MessageList({ messages, onPostReply }) {
  return (
    <section className="message-list">
      <ul className="message-thread">
        {messages.map(message => (
          <MessageItem 
            key={message.id} 
            message={message} 
            onPostReply={onPostReply} 
          />
        ))}
      </ul>
    </section>
  );
}

export default MessageList;