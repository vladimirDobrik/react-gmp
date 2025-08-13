import React from 'react';
import { GenreListProps } from './models/genre-list.models';
import './GenreList.css';

class GenreList extends React.Component<GenreListProps> {
  constructor(props: GenreListProps) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(genre: string) {
    this.props.onSelect(genre);
  }

  render() {
    const { genres, selectedGenre } = this.props;

    return (
      <div className='list'>
        {genres.map((genre) => (
          <button
            key={genre}
            className={`button ${genre === selectedGenre && 'selected'}`}
            onClick={() => this.handleSelect(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
    );
  }
}

export default GenreList;
