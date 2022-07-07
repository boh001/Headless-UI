import HeadlessCounter, { useCounter } from './HeadlessCounter';

export default () => {
  const { count, increment, decrement } = useCounter(0);

  return (
    <HeadlessCounter.Container
      count={count}
      increment={increment}
      decrement={decrement}
    >
      {context => (
        <div>
          <span>{context.count}</span>
          <button onClick={context.increment}>plus</button>
          <button onClick={context.decrement}>minus</button>
        </div>
      )}
    </HeadlessCounter.Container>
  );
};
