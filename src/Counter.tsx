import * as React from 'react';
import {css} from "@emotion/css";
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
`

interface btnProps {
  children: React.ReactNode;
}

const IncrementBtn = ({ children }: btnProps) => {
  const { increment } = useContext();

  return <button className={defaultBtnCss} onClick={increment}>{children}</button>;
};

const DecrementBtn = ({ children }: btnProps) => {
  const { decrement } = useContext();

  return <button className={defaultBtnCss} onClick={decrement}>{children}</button>;
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
