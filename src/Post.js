import React from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";

const Post = ({ post }) => {
  return (
    <div className="post">
      <div className="post__header">
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
      <img
        className="post__image"
        src={post.imageUrl}
        alt={`${post.user}:post image`}
      />
      <h4 className="post__text">
        <strong>{post.username}: </strong>
        {post.caption}
      </h4>
    </div>
  );
};

export default Post;
