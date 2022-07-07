import HeadlessCounter, { useCounter } from './HeadlessCounter';

export default () => {
  const { count, increment, decrement } = useCounter(0);

  return (
    <HeadlessCounter.Container
      count={count}
      increment={increment}
      decrement={decrement}
    >
      <HeadlessCounter.Message>{(count) => count}</HeadlessCounter.Message>
      <HeadlessCounter.IncrementBtn>plus</HeadlessCounter.IncrementBtn>
      <HeadlessCounter.DecrementBtn>minus</HeadlessCounter.DecrementBtn>
    </HeadlessCounter.Container>
  );
};
