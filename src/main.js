import React from 'react';
import { render as reactDomRender } from 'react-dom'; 
import superagent from 'superagent';
import './styles/main.scss';

const apiUrl = 'http://reddit.com/r/';

// App Component
// should contain all of the application state
// should contain methods for modifying the application state
// the state should have a topics array for holding the results of the search

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redditLookup: {},
    };
  }
  render() {
    return (
      <RedditSearchForm/>
    );
  }
}


// SearchForm Component
// onSubmit the form should make a request to reddit
// it should make a get request to http://reddit.com/r/${searchFormBoard}.json?limit=${searchFormLimit}
// on success it should pass the results to the application state
// on failure it should add a class to the form called error and turn the form's inputs borders red

class RedditSearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redditForum: '',
      redditForumLimit: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleForumChange = this.handleForumChange.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this);
  }

  handleForumChange(event) {
    this.setState({ redditForum: event.target.value }, () => {
      console.log(this.state);
    });
  }

  handleLimitChange(event) {
    this.setState({ redditForumLimit: event.target.value }, () => {
      console.log(this.state);
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    // this.props.redditForumSel(this.state.redditForum);
  }
  render() {
    return (
    <form onSubmit={this.handleSubmit}>
      <input 
        type='text'
        placeholder="Search for a Reddit forum"
        value={this.state.redditForum}
        onChange={this.handleForumChange}
      />
      <input 
        type='number'
        placeholder="How many forum boards would you like?"
        min='0'
        max='100'
        value={this.state.redditForumLimit}
        onChange={this.handleLimitChange}
      />
      <button onClick= { this.handleForumChange }>Click here</button>
    </form>
    );
  }
  redditSelect(name) {
    if (!this.state.redditLookup[name]) {
      this.setState({
        redditSelected: null,
        redditForumError: name,
      });
    } else {
      return superagent.get(this.state.redditLookup[name])
        .then((response) => {
          this.setState({
            redditSelected: response.body,
            redditForumError: null,
          });
        })
        .catch(console.error);
    }
    return undefined;
  }
}

// SearchResultList Component
// Should inherit all search results through props
// This component does not need to have its own state
// If there are topics in the application state it should display an unordered list
// Each list item in the unordered list should contain the following
// an anchor tag with a href to the topic.url
// inside the anchor a heading tag with the topic.title
// inside the anchor a p tag with the number of topic.ups

// class RedditSearchResultList extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       redditSearchResult: IDKMYBFFJILL,
//     };
//   }
// }





const container = document.createElement('div');
document.body.appendChild(container);

reactDomRender(<App />, container);
