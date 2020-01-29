# React Hook
Hook은 함수 컴포넌트에서 state와 생명주기를 연동할 수 있게 해주는 함수이다.
 React 에서는 아래와 같은 이유로  Class에서 함수형 컴포넌트로 변경하는 것을 권장하고 있다.

**컴포넌트 사이에서 상태와 관련된 코드를 재사용하기 어렵다.**  
기존 React는 파편화된 코드를 정리하기 위해 HOC나 render porps를 사용했다. 이러한 방법들은 컴포넌트를 랩핑하여 재구성함으로써 코드를 추적하기 어렵게 만든다. (Wrapper hell) `Hook`을 사용하면 컴포넌트로부터 상태 관련 로직을 추상화 할 수 있다.(서로 관련있는 로직을 묶어서 작성 가능) 즉, 독립적인 테스트와 재사용이 가능해진다. 

**복잡한 컴포넌트는 이해하기 어렵다**  
생명주기 메서드에는 자주 관련 없는 로직을 포함해야 할 때가 있다. 예를 들어 `componentDidMount` 에는 상태 로직과 관련없는 이벤트 리스너를 포함 하고,  `componentWillUnmount`에서 이벤트 리스너를 삭제해야 하는 경우가 있다. 이 때문에 컴포넌트를 작게 만들 수 없고, 테스트도 어렵게 만든다. `Hook`은 로직에 기반을 둔 작은 함수로 컴포넌트를 나눌 수 있다.

**Class 의 러닝커브와 최신 도구와의 부적합성**  
javascript의 특성으로 인해 `Class`의 `this`가 어떻게 작동하는지, 이벤트 핸들러가 어떻게 등록되는지 숙지해야만 한다.  러닝 커브의 문제를 제쳐두더라도, Class 컴포넌트는 AOT(Ahead of time. 컴파일 단계에서 수행되는 계산 코드가 제거되어 코드를 최적화한다.) 컴파일러의 최적화를 방해한다. 많은 도구에서 가능한 최적화 된 상태로 유지하고 싶다면 함수 형태의 컴포넌트를 작성하는것이 좋다.

**점진적으로 적용할 수 있다.**  
이미 개발된 코드를 함수 컴포넌트를 모두 바꿀 필요는 없다. Class 컴포넌트와 함수 컴포넌트를 함께 사용할 수 있으므로 새로 작성하는 컴포넌트는 함수 컴포넌트로 작성하면 된다.

## 사용 규칙
1. 최상위 scope에서만 hook을 호출해야 한다. 반복문, 조건문 중첩된 함수 내에서 hook을 실행하면 안된다.
2. React 함수 컴포넌트 내에서만 hook을 호출해야 한다.

## useState
`useState`는 현재의 state 값과 이 값을 업데이트하는 함수를 제공한다. `useState`에 초기값은 첫번째 렌더링 에서만 사용된다.
```javascript
import React, { useState } from 'react';

function Example() {
  // "count"라는 새 상태 변수를 선언합니다
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

```

## useEffect
`useEffect`는 컴포넌트 안에서 데이터를 가져오거나 구독하고, DOM을 조작하는 등의 작업을 수행하는 hook이다.  `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`의 기능을 하나로 통합한 API로 사용할 수 있다.
```javascript
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // componentDidMount, componentDidUpdate와 비슷합니다
  useEffect(() => {
    // 브라우저 API를 이용해 문서의 타이틀을 업데이트합니다
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

```

## Custom hook
Class 컴포넌트에서  HOC와 render props와 같이 코드 재사용을 효과적으로 할 수 있도록 Custom hook을 작성할 수 있다.

```javascript
import React, { useState, useEffect } from 'react';

function useCustomEffect(params) {
	// 여기에 공통되는 로직을 작성한다.
	useEffect(() => {

	});

	return /* do something */
}
```
```javascript
function component(props) {
	const params = useCustomEffect(props);
	// do something
}
```

## useContext
보편적으로 잘 사용되지는 않지만, 컴포넌트를 중첩하지 않고도 상태를 구독할 수 있게 해준다.
