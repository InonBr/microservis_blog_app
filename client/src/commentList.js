const CommentList = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    let pendingOrRejected;

    if (comment.status === "pending") {
      pendingOrRejected = "This comment is in pending state";
    }

    if (comment.status === "rejected") {
      pendingOrRejected = "This comment is rejected";
    }

    return (
      <li key={comment.id}>
        {pendingOrRejected ? pendingOrRejected : comment.comment}
      </li>
    );
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
