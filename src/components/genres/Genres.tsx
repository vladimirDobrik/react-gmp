import React from 'react';
import GenreList from '../genre-list/GenreList';

class Genres extends React.Component<
  {},
  { selectedGenre: string }
> {
  constructor(props: {}) {
    super(props);
    this.state = { selectedGenre: 'All' };
  }

  render() {
    const genres = ['All', 'Documentary', 'Comedy', 'Horror', 'Crime'];

    return (
        <GenreList
          genres={genres}
          selectedGenre={this.state.selectedGenre}
          onSelect={(genre) => this.setState({ selectedGenre: genre })}
        />
    );
  }
}

export default Genres;
