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

export const getArticles = async topic => {
  const URL = topic
    ? `${BASE_URL}/topics/${topic}/articles`
    : `${BASE_URL}/articles`;

  const { data } = await axios.get(URL);
  return data.articles;
};
export const getSortedArticles = async (sort_by, order, limit, p) => {
  const { data } = await axios.get(
    `${BASE_URL}/articles?sort_by=${sort_by}&order=${order}&limit=${limit}&p=${p}`
  );
  return data.articles;
};
export const getArticlesByArticleID = async article_id => {
  const { data } = await axios.get(`${BASE_URL}/articles/${article_id}`);
  return data.article;
};
export const removeArticleById = async article_id => {
  const data = await axios.delete(`${BASE_URL}/articles/${article_id}`);
  return data;
};
export const addCommentByArticleID = async (body, article_id, userObject) => {
  const { username } = userObject;
  const comment = await axios.post(
    `${BASE_URL}/articles/${article_id}/comments`,
    { body, username }
  );
  return { ...comment, author: comment.username };
};

export const deleteCommentByID = async ({ comment_id, article_id }) => {
  const data = await axios.delete(
    `${BASE_URL}/articles/${article_id}/comments/${comment_id}`
  );
  return data;
};
export const getCommentsByArticleID = async article_id => {
  const { data } = await axios.get(
    `${BASE_URL}/articles/${article_id}/comments`
  );
  return data.comments;
};
export const voteOnText = async (article_id, comment_id, direction) => {
  console.log(article_id, comment_id, direction);
  const URL = comment_id
    ? `${BASE_URL}/articles/${article_id}/comments/${comment_id}`
    : `${BASE_URL}/articles/${article_id}`;

  console.log(URL);
  const { data } = await axios.patch(URL, {
    inc_votes: direction
  });
  return data.article;
};
export const addNewTopic = async (slug, description) => {
  const { data } = await axios.post(`${BASE_URL}/topics/`, {
    slug,
    description
  });
  return data.topic;
};

export const addArticle = async (title, topic, body, author) => {
  console.log(title, topic, body, author);
  const res = await axios.post(`${BASE_URL}/topics/${topic}/articles`, {
    title,
    body,
    author
  });
  return res.data.article;
};
