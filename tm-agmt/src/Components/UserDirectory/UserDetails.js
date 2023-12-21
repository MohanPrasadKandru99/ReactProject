import React, { useEffect, useState } from "react";
import { getPostsByUser } from "../../APIs/Fetch";
import ProfilePage from "../UserProfile/ProfilePage";

const UserDetails = ({ user, onBack }) => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getPostsByUser(user.id);
      setPosts(data);
    };

    fetchPosts();
  }, [user.id]);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  return (
    <div>
      <div className="container mt-2">
        <button onClick={onBack} className="back-button-div">
          Back
        </button>
        <ProfilePage />
      </div>

      <div className="container">
        <h2 className="text-center">{user.name}'s detail page</h2>
        <div className="container-fluid user-list-container row">
          <div className="col-6" style={{ textAlign: "start" }}>
            <div>{user.name}</div>
            <div>
              {user.username}&nbsp;|&nbsp;
              {user.company?.catchPhrase}
            </div>
          </div>
          <div className="col-6" style={{ textAlign: "end" }}>
            <div>{user.email}</div>
            <div>
              {user.address?.street}, {user.address?.suite},{" "}
              {user.address?.city}, {user.address?.zipcode}
            </div>
            <div>
              {user.email}&nbsp;|&nbsp;
              {user.phone}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="post-card-container">
          {posts.map((post, i) => (
            <div
              key={i}
              className="post-card"
              onClick={() => handlePostClick(post)}
            >
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedPost && (
        <div className="post-modal-overlay" onClick={handleCloseModal}>
          <div className="post-modal" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedPost.title}</h2>
            <p>{selectedPost.body}</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
