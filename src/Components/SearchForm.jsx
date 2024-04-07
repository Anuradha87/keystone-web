import React, { Component } from "react";
import "./SearchForm.css";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      srchkwrd: ""
    };
    this.handleForm = this.handleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      srchkwrd: event.target.value
    });
  }

  handleForm(event) {
    event.preventDefault();
    this.props.onSearch(this.state.srchkwrd);
  }

  render() {
    return (
      <div className="search-form-container"> 
        <form onSubmit={this.handleForm}>
          <input
            type="search"
            value={this.state.srchkwrd}
            onChange={this.handleChange}
            placeholder="Keyword ex: IT, Business, etc."
            className="search-input" 
          />
          <button
            type="submit"
            className="search-button" 
          >
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default SearchForm;