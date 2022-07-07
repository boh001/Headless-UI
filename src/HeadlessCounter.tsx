import * as React from 'react';
import { css } from '@emotion/css';

//--------------------------------------------
// useCounter
//--------------------------------------------
export function useCounter(initValue: number) {
  const [count, setCount] = React.useState(initValue);

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };

  return { count, increment, decrement };
}

//--------------------------------------------
// Context
//--------------------------------------------
interface ContextProps {
  count: number;
  increment: () => void;
  decrement: () => void;
}
const Context = React.createContext<ContextProps>({
  count: 0,
  increment: () => {},
  decrement: () => {},
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
`;

interface btnProps {
  children: React.ReactNode;
}

const IncrementBtn = ({ children }: btnProps) => {
  const { increment } = useContext();

  return (
    <button className={defaultBtnCss} onClick={increment}>
      {children}
    </button>
  );
};

const DecrementBtn = ({ children }: btnProps) => {
  const { decrement } = useContext();

  return (
    <button className={defaultBtnCss} onClick={decrement}>
      {children}
    </button>
  );
};

//--------------------------------------------
// Message
//--------------------------------------------
interface MessageProps {
  children: (count: number) => React.ReactNode;
}
const Message = ({ children }: MessageProps) => {
  const { count } = useContext();

  return <span>{children(count)}</span>;
};

//--------------------------------------------
// Container
//--------------------------------------------
interface Props {
  children: React.ReactNode | ((context: ContextProps) => React.ReactNode);
}
const Container = (props: Props & ContextProps) => {
  return (
    <Context.Provider value={props}>
      {typeof props.children === 'function'
        ? props.children(props)
        : props.children}
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
  Message,
};

export default Counter;
