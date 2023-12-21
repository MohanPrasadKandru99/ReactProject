import React, { useState, useEffect } from "react";
import { getPostsByUser, getUsers } from "./APIs/Fetch";
import UserDetails from "./Components/UserDirectory/UserDetails";
import UserCard from "./Components/UserDirectory/UserCard";
import "./Styles/ProjectStyles.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const userData = await getUsers();
      const usersWithPostsCount = await Promise.all(
        userData.map(async (user) => {
          const posts = await getPostsByUser(user.id);
          return { ...user, postsCount: posts.length };
        })
      );
      setUsers(usersWithPostsCount);
    };

    fetchUsers();
  }, []);

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
  };

  const handleBackToDirectory = () => {
    setSelectedUserId(null);
  };

  return (
    <div>
      {selectedUserId ? (
        <div className="container mt-5 app-container">
          <div className="directory-div">
            <UserDetails
              user={users.find((user) => user.id === selectedUserId)}
              onBack={handleBackToDirectory}
            />
          </div>
        </div>
      ) : (
        <div className="container mt-5">
          <div className="directory-div">
            <h1 className="text-center">Directory</h1>
            {users.map((user) => (
              <UserCard key={user.id} user={user} onClick={handleUserClick} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
