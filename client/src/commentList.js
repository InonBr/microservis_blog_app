import { useState, useEffect } from "react";
import axios from "axios";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(
      `http://localhost:5001/api/posts/${postId}/comments`
    );

    setComments(res.data);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.comment}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;