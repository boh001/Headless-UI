# Headless UI
## 개요
최근에 UI 라이브러리들이 기존의 방식의 UI 컴포넌트 뿐만 아니라 Headless 방식의 UI 컴포넌트를 지원하는 것이 대세가 되었습니다. Headless UI라는 것이 어떤 것이 왜 사용되는지 알아보고자 합니다.

## 기존 방식
기존의 방식으로 만들어진 `Counter` 컴포넌트를 예시로 보겠습니다.
이 컴포넌트를 여러군데에서 가져다 쓰기 위해서는 스타일을 재조정할 필요가 있습니다.

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
기본적으로 컴포넌트는 상태, 상태를 제어하는 행위 그리고 스타일로 이루어져있습니다. 
### 추상화
### 합성

## 결론
이미 `NPM`에 좋은 `Headless Component` 라이브러리들이 많이 있기 때문에 사실상 `Headless Component`를 직접 구현할 일은 거의 없을겁니다. 하지만 `Headless Component`이 어떤 식으로 구현되고 왜 사용해야되는지를 이해하게 된다면 클린 코드에 가까운 컴포넌트를 쉽게 구현할 수 있을 것입니다.

## 참고 자료
- [국내 블로그](https://jbee.io/react/headless-concept/)
- [해외 블로그](https://www.joshbritz.co/posts/the-sexiness-of-headless-ui/)
- [Headless 라이브러리](https://headlessui.dev/)
- [합성 패턴 공식 문서](https://ko.reactjs.org/docs/composition-vs-inheritance.html)