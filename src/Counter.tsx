import * as React from 'react';
import {css} from "@emotion/css";

//--------------------------------------------
// useCounter
//--------------------------------------------
export function useCounter(initValue: number) {
  const [count, setCount] = React.useState(initValue)

  const increment = (value: number) => { setCount(count + value) }
  const decrement = (value: number) => { setCount(count - value) }

  return {count, increment, decrement}
}

//--------------------------------------------
// Context
//--------------------------------------------
interface ContextProps {
  count: number;
  value: number;
  increment: (value: number) => void;
  decrement: (value: number) => void;
}
const Context = React.createContext<ContextProps>({
  count: 0,
  value: 1,
  increment: (value: number) => {},
  decrement: (value: number) => {},
});

const useContext = () => {
  return React.useContext(Context);
};

//--------------------------------------------
// Button
//--------------------------------------------
const defaultBtnCss = css`
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
`

interface btnProps {
  children: React.ReactNode;
}

const IncrementBtn = ({ children }: btnProps) => {
  const { increment, value } = useContext();

  return <button className={defaultBtnCss} onClick={() => increment(value)}>{children}</button>;
};

const DecrementBtn = ({ children }: btnProps) => {
  const { decrement, value } = useContext();

  return <button className={defaultBtnCss} onClick={() => decrement(value)}>{children}</button>;
};

//--------------------------------------------
// Count
//--------------------------------------------
interface CountProps {
  children: (count: number) => React.ReactNode;
}
const Count = ({ children }: CountProps) => {
  const { count } = useContext();

  return <span>{children(count)}</span>;
};

//--------------------------------------------
// Container
//--------------------------------------------
interface Props {
  children: React.ReactNode | React.ReactNode[];
}
const Container = (props: Props & ContextProps) => {
  return (
    <Context.Provider
      value={{
        count: props.count,
        value: props.value,
        increment: props.increment,
        decrement: props.decrement,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

//--------------------------------------------
// Counter
//--------------------------------------------
const Counter = {
  Container,
  IncrementBtn,
  DecrementBtn,
  Count,
};

export default Counter;
