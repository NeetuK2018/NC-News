import React, { Component } from "react";
import * as api from "../api";

class Voter extends Component {
  state = {
    voteChange: 0
  };
  render() {
    const { votes } = this.props;

    const { voteChange } = this.state;
    return (
      <div>
        <button onClick={() => this.addVote(1)} disabled={voteChange === 1}>
          Vote up
        </button>
        <p>Votes:{votes + voteChange}</p>
        <button onClick={() => this.addVote(-1)} disabled={voteChange === -1}>
          Vote down
        </button>
      </div>
    );
  }
  addVote = direction => {
    const { article_id, comment_id } = this.props;
    console.log(this.props);
    if (comment_id) {
      api.voteOnText(article_id, comment_id, direction);
    } else api.voteOnText(article_id, comment_id, direction);
    this.setState(state => ({
      voteChange: state.voteChange + direction
    }));
  };
}

export default Voter;
