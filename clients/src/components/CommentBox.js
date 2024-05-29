import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CommentBox({ videoId }) {
  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      const response = await axios.get(`/api/comments/${videoId}`);
      setComments(response.data);
    };
    fetchComments();
  }, [videoId]);

  const addComment = async (e) => {
    e.preventDefault();
    const newComment = { username, comment, videoId };
    const response = await axios.post('/api/comments', newComment);
    setComments([...comments, response.data]);
    setUsername('');
    setComment('');
  };

  return (
    <div>
      <form onSubmit={addComment}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment"
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      <div className="comments-list">
        {comments.map((c) => (
          <div key={c._id} className="comment">
            <p><strong>{c.username}</strong></p>
            <p>{c.comment}</p>
            <p>{new Date(c.timestamp).toLocaleString()}</p>
            <button>Like ({c.likes})</button>
            <button>Dislike ({c.dislikes})</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentBox;
