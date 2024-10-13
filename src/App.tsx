import React, { useState, useEffect, useCallback } from "react";

interface IMessage {
  id: string;
  message: string;
  author: string;
  datetime: string;
}

const App = () => {
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };

  const fetchMessages = async (since?: string) => {
    const url = `http://146.185.154.90:8000/messages${since ? `?datetime=${since}` : ""}`;
    const response = await fetch(url);
    const data: IMessage[] = await response.json();
    return data;
  };

  const fetchNewMessages = useCallback(async () => {
    const lastMessageDateTime = messages.length ? messages[messages.length - 1].datetime : undefined;
    const newMessages = await fetchMessages(lastMessageDateTime);
    if (newMessages.length > 0) {
      setMessages((prev) => [...prev, ...newMessages]);
    }
  }, [messages]);

  const sendMessage = async () => {
    const data = new URLSearchParams();
    data.set("author", author);
    data.set("message", message);

    await fetch("http://146.185.154.90:8000/messages", {
      method: "POST",
      body: data,
    });

    setAuthor("");
    setMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendMessage();
    await fetchNewMessages();
  };

  useEffect(() => {
    const intervalId = setInterval(fetchNewMessages, 3000);
    return () => clearInterval(intervalId);
  }, [fetchNewMessages]);

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3 w-10 m-4">
          <label htmlFor="author" className="form-label">Author:</label>
          <input
            type="text"
            className="form-control"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        <div className="form-floating m-4">
          <textarea
            className="form-control"
            placeholder="Leave a comment here"
            id="message"
            style={{ height: "100px" }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <label htmlFor="message">Message</label>
        </div>
        <button type="submit" className="btn btn-dark m-4 mt-0">Send</button>
      </form>

      <div id="receivedMessages">
        {messages.map((msg) => (
          <div key={msg.id} className="alert alert-primary m-4" role="alert">
            <p>{formatDate(msg.datetime)}</p>
            <p><strong>{msg.author}:</strong> {msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
