import React from "react";
import SearchBar from "../search-bar/SearchBar";

class Search extends React.Component {
  handleSearch = (value: string) => {};

  render() {
    return (
        <SearchBar initialQuery="" onSearch={this.handleSearch} />
    );
  }
}

export default Search;
