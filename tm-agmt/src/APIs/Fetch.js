const BASE_URL = "https://jsonplaceholder.typicode.com";

export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`);
  const data = await response.json();
  return data;
};

export const getPostsByUser = async (userId) => {
  const response = await fetch(`${BASE_URL}/posts?userId=${userId}`);
  const data = await response.json();
  return data;
};
