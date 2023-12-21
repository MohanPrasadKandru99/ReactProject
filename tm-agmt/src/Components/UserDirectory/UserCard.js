import React from "react";

const UserCard = ({ user, onClick }) => {
  return (
    <div className="card-container" onClick={() => onClick(user.id)}>
      <div className='card-sub-container'>
        <div>{user.name}</div>
        <div>{`Posts: ${user.postsCount || 0}`}</div>
      </div>
    </div>
  );
};

export default UserCard;
