import React, { ChangeEvent, KeyboardEvent } from "react";
import { SearchBarProps, SearchBarState } from "./models/search-bar.models";
import './SearchBar.css';

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);

    this.state = {
      query: props.initialQuery ?? '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.search = this.search.bind(this);
  }

  handleChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ query: e.target.value });
  }

  handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      this.search();
    }
  }

  search() {
    this.props.onSearch(this.state.query);
  }

  render() {
    return (
      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          value={this.state.query}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          placeholder="What do you want to watch?"
        />
        <button 
            className="search-button" 
            onClick={this.search}>
            Search
        </button>
      </div>
    );
  }
}

export default SearchBar;
