function MessageSection() {
  return (
    <div className="messages-container">
      <section className="new-message">
        <div className="message-input">
          <label htmlFor="add_msg">New message</label>
          <textarea 
            id="text_new_comment" 
            rows="2" 
            placeholder="What's on your mind?"
          ></textarea>
          <button type="submit">Send ➤</button>
        </div>
      </section>

      <section className="message-list">
        <ul>
          <li className="message-item">
            <div className="message-header">
              <span className="user">User 1</span>
              <time>30/01/2024 at 13:53</time>
            </div>
            <blockquote>
              What's this about?
              <button className="reply-btn">Reply</button>
            </blockquote>
          </li>
          <li className="message-item">
            <div className="message-header">
              <span className="user">max</span>
              <time>30/01/2024 at 13:51</time>
            </div>
            <blockquote>
              Amazing lol
              <button className="reply-btn">Reply</button>
              <div className="message-reply">
                <div className="message-header">
                  <span className="user">karl</span>
                  <time>30/01/2024 at 13:52</time>
                </div>
                <blockquote>
                  I know right! XDDDDD
                  <button className="reply-btn">Reply</button>
                </blockquote>
              </div>
            </blockquote>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default MessageSection;
