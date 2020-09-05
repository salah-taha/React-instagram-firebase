import React, { useEffect, useState } from "react";
import "./Post.css";
import { Avatar, Button } from "@material-ui/core";
import { db } from "./firebase";

const Post = ({ post, id, username }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (post) {
      db.collection("posts")
        .doc(id)
        .collection("comments")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs);
        });
    }
  }, [id]);

  const deletePost = () => {
    db.collection("posts").doc(id).delete();
  };

  const addComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(id).collection("comments").add({
      text: comment,
      username: username,
    });
    setComment("");
  };
  return (
    <div className="post">
      <div className="post__header">
        <div className="post__user">
          <Avatar
            className="post_avatar"
            alt="SalahTaha"
            src="/static/images/avatar/1.jpg"
          />
          <div className="post__userInfo">
            <h4>{post.username}</h4>
            <p>Egypt, Cairo</p>
          </div>
        </div>

        {username == post.username ? (
          <Button onClick={deletePost}>Delete</Button>
        ) : (
          <div></div>
        )}
      </div>
      <img
        className="post__image"
        src={post.imageUrl}
        alt={`${post.user}:post image`}
      />
      <h4 className="post__text">
        <strong>{post.username}: </strong>
        {post.caption}
      </h4>
      <div className="post__comments">
        {comments.map((comment) => (
          <div className="post__comments__singleComment">
            <p>
              <strong>{comment.data().username}:</strong> {comment.data().text}
            </p>
          </div>
        ))}
      </div>
      <form className="post__commentForm">
        {username ? (
          <input
            className="post__commentInput"
            placeholder="Enter a Comment"
            value={comment}
            onChange={(event) => {
              setComment(event.target.value);
            }}
          />
        ) : (
          <div>Log in to Add a comment</div>
        )}
        <button hidden="true" onClick={addComment}></button>
      </form>
    </div>
  );
};

export default Post;
