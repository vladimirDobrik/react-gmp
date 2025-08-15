import React from 'react';
import './App.css';
import Search from './components/search/Search';
import Counter from './components/counter/Counter';
import Genres from './components/genres/Genres';

function App(): React.JSX.Element {
  return (
    <div className="App">
      <Counter initialValue={0} />
      <Search />
      <Genres/>
    </div>
  );
}

export default App;
