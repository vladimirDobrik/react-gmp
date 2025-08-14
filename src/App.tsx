import React from 'react';
import './App.css';
import Search from './components/search/Search';
import Counter from './components/counter/Counter';


function App(): React.JSX.Element {
  return (
    <div className="App">
      <Counter initialValue={0} />
      <Search />
    </div>
  );
}

export default App;
