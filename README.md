# Headless UI
## 개요
처음 컴포넌트를 만들면 굉장히 가볍고 간단한 컴포넌트가 만들어집니다. 그러다 시간이 지나고 다른 곳에서 비슷한 스타일과 기능을 필요로 하는 컴포넌트가 생기기 마련입니다.

넓이가 좀 더 길다, 배경색이 다르다, 원래 기능에 추가기능이 필요하다와 같은 요구사항을 만족시키기 위해서 보통 `props`를 추가하고 조건문을 통해서 해결하는 경우가 많습니다.

하지만 이런 방식은 컴포넌트의 코드를 크고 복잡하게 만들고 유지보수하기 힘들게 만듭니다. 

이러한 문제는 저희가 직접 컴포넌트를 만들 때 뿐만 아니라 누군가 NPM에 올린 UI 라이브러리를 사용할 때도 마찬가지로 발생합니다.

그래서 최근 UI library에서 이러한 문제점을 해결하기 위해서 Headless UI 방식의 UI 컴포넌트를 지원하고있습니다. Headless UI라는 것이 어떤 것이고 어떤식으로 문제를 해결하는지 알아보고자 합니다.

## 기존 방식
기존의 방식으로 만들어진 `Counter` 컴포넌트를 예시로 보겠습니다.

처음 이 컴포넌트가 만들어졌을 때는 기본적인 스타일과 1씩 증가시키는 간단한 기능을 갖고 있습니다.
```tsx
import React, { useState } from 'react'

function Counter(props: Props) {
  const [count, setCount] = useState(0)

  return (
    <div className={containerCls}>
      <span className={messageCls}>You clicked {count} times</span>
      <button className={btnCls} onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

시간이 지나서 `Counter` 컴포넌트를 여러군데에서 필요하게되었습니다.

스타일을 재조정하기 위해서는 별도의 `className`들을 `props`로 넘기거나 `CSS Override`를 사용해야합니다.

하지만 위와 같은 방식으로 스타일을 재조정하게 되면 아래와 같은 문제점들이 발생합니다.

- CSS 우선순위 때문에 내부적으로 overried가 불가능할 수 있다.
- CSS 우선순위를 무시하기 위해서 `!important` 구문을 사용하면 되지만 코드를 파악하는게 힘들어집니다.
- 스타일을 위한 `props`가 늘어나면서 코드가 복잡해지고 관리해야할 대상이 늘어납니다.

```tsx
import React, { useState } from 'react'

interface Props {
  containerCls: string;
  messageCls: string;
  btnCls: string
}
function Counter(props: Props) {
  const [count, setCount] = useState(0)

  return (
    <div className={containerCls}>
      <span className={messageCls}>You clicked {count} times</span>
      <button className={btnCls} onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}

// or

const appCss = css`
  color:red !important;
`
// App.tsx
function App() {
  return (
    <div className={appCss}>
      <Counter>
    </div>
  )
}
```

## Headless 방식
기본적으로 컴포넌트는 상태, 상태를 제어하는 행위 그리고 스타일로 이루어져있습니다. `Headless` 방식은 상태와 상태를 제어하는 행위에 대한 `interface`를 제공함으로써 추상화시키고 최소한의 구현체를 제공하기도합니다. 또한, [Composition Pattern](https://ko.reactjs.org/docs/composition-vs-inheritance.html)을 이용해서 스타일을 위임합니다.

마찬가지로 `Counter` 컴포넌트를 예시로 사용해보겠습니다. 

### 추상화
`Counter` 컴포넌트는 기본적으로 값이라는 상태와 그 값에 대해서 정해진 값만큼 증감하는 행위를 갖고 있습니다.
따라서 상태와 행위를 아래와 같은 interface로 추상화 시킬 수 있습니다.
```tsx
interface Counter {
  count: number;
  increment: (value: number) => void;
  decrement: (value: number) => void;
}
```

interface에 따라서 사용자가 구현하게 제공했지만 최소한의 동작을 하는 구현체를 custom hook으로 통해서 제공하는 것도 가능합니다.
```tsx
function useCounter(count: number) {
  const [count, setCount] = React.useState(count)

  return [count, (value: number) => { setCount(count + value) }, (value: number) => { setCount(count - value) }] 
}
```
### 합성
`Counter` 컴포넌트를 구성하는 하위 컴포넌트들을 합성을 통해서 제공함으로써 스타일을 사용자에게 위임할 수 있습니다.
이를 통해 쓸데없이 스타일 관련된 props를 넘겨받거나 무리한 CSS Override는 필요없어집니다.

```tsx
```

## 결론
이미 `NPM`에 좋은 `Headless Component` 라이브러리들이 많이 있기 때문에 사실상 `Headless Component`를 직접 구현할 일은 거의 없을겁니다. 하지만 `Headless Component`이 어떤 식으로 구현되고 왜 사용해야되는지를 이해하게 된다면 클린 코드에 가까운 컴포넌트를 쉽게 구현할 수 있을 것입니다.

## 참고 자료
- [국내 블로그](https://jbee.io/react/headless-concept/)
- [해외 블로그](https://www.joshbritz.co/posts/the-sexiness-of-headless-ui/)
- [Headless 라이브러리](https://headlessui.dev/)
- [Composition Pattern](https://ko.reactjs.org/docs/composition-vs-inheritance.html)