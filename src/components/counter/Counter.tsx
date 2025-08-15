import React from 'react';
import { CounterProps, CounterState } from './models/counter.models';

class Counter extends React.Component<CounterProps, CounterState> {
  constructor(props: CounterProps) {
    super(props);

    this.state = {
      value: props.initialValue ?? 0,
    };

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment() {
    this.setState(prevState => ({ value: prevState.value + 1 }));
  }

  decrement() {
    this.setState(prevState => ({ value: prevState.value > 0 ? prevState.value - 1 : 0 }));
  }

  render() {
    return React.createElement(
      'div',
      { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
      React.createElement(
        'button',
        { onClick: this.decrement },
        '-'
      ),
      React.createElement(
        'span',
        null,
        this.state.value
      ),
      React.createElement(
        'button',
        { onClick: this.increment },
        '+'
      )
    );
  }
}

export default Counter;
