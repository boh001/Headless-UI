import * as React from 'react';
import Counter from './Counter';
import {css} from "@emotion/css";

const divCss = css`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: green;
`
const containerCss = css`
  width: 200px;
  height: 200px;
  background-color: red;
`
const upBtnCss = css`
  height: 100%;
`
function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div className="App">
      <Counter.Container
        count={count}
        increment={() => {
          setCount(count + 1);
        }}
        decrement={() => {
          setCount(count - 1);
        }}
      >
        <div className={containerCss}>
          <Counter.Count>{(count) => <div className={divCss}>{count}</div>}</Counter.Count>
          <Counter.IncrementBtn><span className={upBtnCss}>+</span></Counter.IncrementBtn>
          <Counter.DecrementBtn>-</Counter.DecrementBtn>
        </div>
      </Counter.Container>
    </div>
  );
}

export default App;
