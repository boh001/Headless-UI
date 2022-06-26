import * as React from 'react';
import Counter from './Counter';
import {css} from "@emotion/css";

const divCss = css`
  width: 100%;
  height: 100%;
  background-color: green;
`
const containerCss = css`
  display: flex;
  width: 200px;
  height: 200px;
`
const upBtnCss = css`
  background-color: red;
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
          <Counter.IncrementBtn><div className={upBtnCss}>+</div></Counter.IncrementBtn>
          <Counter.DecrementBtn>-</Counter.DecrementBtn>
        </div>
      </Counter.Container>
    </div>
  );
}

export default App;
