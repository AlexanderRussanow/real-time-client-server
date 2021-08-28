import React from "react";
import axios from "axios";

const LongPulling = () => {
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState("");

  React.useEffect(() => {
    subscriber();
  }, []);

  const subscriber = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/get-messages");
      setMessages((prev) => [data, ...prev]);
      await subscriber();
    } catch (e) {
      setTimeout(() => {
        subscriber();
      }, 500);
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

export default LongPulling;
