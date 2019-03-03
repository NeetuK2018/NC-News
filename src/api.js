import axios from "axios";
const BASE_URL = "https://nc-news-neetu.herokuapp.com/api";

export const getUsers = async () => {
  const { data } = await axios.get(`${BASE_URL}/users`);

  return data.users;
};

export const getTopics = async () => {
  const { data } = await axios.get(`${BASE_URL}/topics`);

  return data.topics;
};

export const getUserByUsername = async username => {
  const { data } = await axios.get(`${BASE_URL}/users/${username}`);

  return data.user;
};

export const getArticlesByUsername = async username => {
  const { data } = await axios.get(`${BASE_URL}/users/${username}/articles`);

  return data.articles;
};
