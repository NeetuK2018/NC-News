import React, { Component } from "react";
import * as api from "../api.js";
import Moment from "moment";
import AddComment from "./Addcomment";
import Voter from "./Voter";

class Comments extends Component {
  state = {
    comments: [],
    isLoading: false
  };
  render() {
    const { user, article_id, newComment } = this.props;
    const { comments } = this.state;

    return (
      <div className="comments">
        <h3>
          <a href="#bottom">Click Here to Add a Comment</a>
        </h3>
        <h4>Comments:</h4>
        {comments.map(comment => (
          <div key={comment.comment_id}>
            <p>Comment:</p>
            {comment.body}
            <p>by</p>
            {comment.username}
            {comment.username === user.username ? (
              <p>Votes:{comment.votes}</p>
            ) : (
              <Voter
                votes={comment.votes}
                comment_id={comment.comment_id}
                article_id={comment.article_id}
              />
            )}
            <p>Date added:</p>
            {Moment(comment.created_at, "YYYY-MM-DD-Thh:mm:ss").fromNow()}
            {user.username === comment.username && (
              <button onClick={() => this.handleDelete(comment)}>delete</button>
            )}
          </div>
        ))}
        <span id="bottom">
          <AddComment
            user={user}
            article_id={article_id}
            addComment={this.addComment}
          />
        </span>
        {newComment}
      </div>
    );
  }
  componentDidMount() {
    this.fetchComments();
  }

  fetchComments = () => {
    const { article_id } = this.props;

    api
      .getCommentsByArticleID(article_id)
      .then(comments => {
        this.setState({ comments, isLoading: false });
      })
      .catch(err => {
        this.setState({ errorStatus: err.response.status });
      });
  };

  addComment = commentToAdd => {
    this.setState(prevState => {
      return { comments: [commentToAdd, ...prevState.comments] };
    });
  };

  handleDelete = commentToDelete => {
    const { article_id, comment_id } = commentToDelete;

    const currentComms = this.state.comments;

    const restOfComms = currentComms.filter(
      comment => comment.comment_id !== commentToDelete.comment_id
    );
    api
      .deleteCommentByID(comment_id, article_id)
      .then(data => {
        this.setState(prevState => ({
          comments: (prevState.comments = restOfComms)
        }));
      })
      .catch(err => {
        this.setState({ errorStatus: err.response.status });
      });
  };
}
export default Comments;
//this.props.navigate('/', {state:{commentDeleted:true}})
