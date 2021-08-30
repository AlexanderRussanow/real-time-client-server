import React from "react";

const WebSockets = () => {
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState("");
  const socket = React.useRef();
  const [connected, setConnected] = React.useState(false);
  const [userNameInput, setUsernameInput] = React.useState("");

  const connect = () => {
    socket.current = new WebSocket("ws://lockalhost:5000");
    socket.current.onopen = () => {
      setConnected(true);
      const message = {
        event: "connection",
        userNameInput,
        id: Date.now(),
      };
      socket.current.send(JSON.stringify(message));
    };
    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [message, ...prev]);
    };
    socket.current.onclose = () => {
      console.log("Socket close");
    };
    socket.current.onerror = () => {
      console.log("Socket error");
    };
  };

  const sendMessage = async () => {
    const message = {
      userNameInput,
      message: input,
      id: Date.now(),
      event: "message",
    };
    socket.current.send(JSON.stringify(message));
    setInput("");
  };

  if (!connected) {
    return (
      <div className="center">
        <div className="form">
          <input
            value={userNameInput}
            type="text"
            placeholder="your login..."
            onChange={(e) => setUsernameInput(e.currentTarget.value)}
          />
          <button onClick={connect}> Enter</button>
        </div>
      </div>
    );
  }

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

export default WebSockets;
