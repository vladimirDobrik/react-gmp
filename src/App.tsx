import React from 'react';
import './App.css';
import Counter from './components/counter/Counter';


function App(): React.JSX.Element {
  return (
    <div className="App">
      <Counter initialValue={0} />
    </div>
  );
}

export default App;
