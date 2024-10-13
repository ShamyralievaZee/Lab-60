import { useState} from "react";

const App = () => {
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="container">
      <form>
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
