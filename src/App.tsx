import React, { useState} from "react";

const App = () => {
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");

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
  };

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
    </div>
  );
};

export default App;