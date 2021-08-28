import React from "react";
import axios from "axios";

const EventSourcing = () => {
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState("");

  React.useEffect(() => {
    subscriber();
  }, []);

  const subscriber = async () => {
    const eventSource = new EventSource('http://lockalhost:5000/connect')
    eventSource.onmessage = function (event) {
      const message = JSON.parse(event.data)
      setMessages(prev => [message, ...prev])
    }
  };

  const sendMessage = async () => {
    await axios.post("http://localhost:5000/new-messages", {
      message: input,
      id: Date.now(),
    });
  };

  return (
    <div className="center">
      <div>
        <div className="form">
          <input
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
        <div className="messages">
          {messages.map((m) => (
            <div key={m.id} className="message">
              {m.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventSourcing;









    

    