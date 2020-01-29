# 브라우저 동작 원리
브라우저는 사용자가 선택한 자원을 서버에 요청하고, 브라우저에 표현한다. 자원은 보통 `HTML`문서이지만,  `PDF`나 이미지 형식일 수도 있다. 자원의 주소는 `URL`에 의해 결정된다.

![브라우저](https://poiemaweb.com/img/client-server.png)

## 렌더링 엔진
1. 불러오기
`http` 또는 파일 시스템으로 전달받은 **리소스 스트림**을 읽는 과정
2. HTML / CSS 파싱
 브라우저가 코드를 이해하고 사용할 수 있는 구조로 변환하는 것을 의미한다. 문서의 구문을 해석해서 `DOM Tree(parsing tree)` 트리를 생성한다. 
3. 렌더링 트리 생성
파싱 과정에서 생성된 `DOM Tree` 들(HTML, CSS)을 결합하여 렌더 트리를 생성한다.
4. 화면에 표시한다.

## 자바스크립트 엔진
1. 불러오기
HTML 파서는 script 태그를 만나면 자바스크립트 코드를 실행하기 위해 DOM 생성 프로세스를 중지하고 자바스크립트 엔진으로 제어 권한을 넘긴다.
2. 파싱
제어 권한을 넘겨 받은 자바스크립트 엔진은 script 태그 내의 자바스크립트 코드 또는 script 태그의 src attribute에 정의된 자바스크립트 파일을 로드하고 파싱하여 실행한다.
3. 자바스크립트의 실행이 완료되면 다시 HTML 파서로 제어 권한을 넘겨서 브라우저가 중지했던 시점부터 DOM 생성을 재개한다.

## Reflow와 Repaint
요소나 스타일의 변화로 인해 렌더 트리가 수정, 다시 렌더링 되는 과정에서 발생한다.

- reflow: 요소의 추가/삭제, 애니메이션이나 크기 변경등 레이아웃에 변화를 주는 행동에 의해 발생한다. reflow 가 발생하면, 문서의 일부, 혹은 전체를 다시 렌더링한다.
- repaint: 레이아웃에는 변화를 주지 않지만, 가시적인 변화에 의해 발생한다. (ex.  background-color, opacity…)

## 최적화
1. 클래스 변경을 통해 스타일을 변경할 경우, 최대한 근접한 요소의 클래스를 변경한다.
	- 최대한 근접한 요소를 변경함으로써, `reflow`의 영향을 최소화한다.
2. 인라인 스타일 속성을 사용하지 않는다.
	- 스타일 속성을 통해 스타일을 설정하면, 리플로우가 발생한다.
	- 요소의 클래스가 변경될 때, 요소는 하나의 `reflow`만 발생한다.
	- 인라인 스타일은 HTML 이 다운로드될 때, 레이아웃에 영향을 미치면서 추가 `reflow`를 발생시킨다.
3. 애니메이션이 적용된 요소는 `position: fixed`또는 `position: absolute` 로 지정한다.
	- `fiexd`나  `absolute`의 요소는 다른 요소의 레이아웃에 영향을 미치지 않는다.  (= `reflow`가 아닌 `repaint`가 발생하며, 이것은 훨씬 비용이 든다.)
4. 부드러운 애니메이션은 성능을 저하시킨다.
	- 한 프레임에서 최소한의 px만 이동시키면,  움직임이 자연스럽지만 그만큼 `reflow`를 자주 발생시키게 된다.
	- 	퀄리티와 퍼포먼스 사이에서 적당한 타협이 필요하다.
5. 레이아웃을 위한 `<table>`은 피한다.
	- `<table>` 은 하위 요소의 계산이 모든 끝난다음에 렌더링 된다. 작은 변경만으로 `<table>`의 다른 요소에 대한 `reflow`가 발생하게 된다.
	- `<table>`을 사용할때에는 `table-layout: fixed` 속성을  설정하는 것이 좋다. 열 너비가  머리글 행 기반으로 계산되기 때문이다.
6. CSS에서 Javascript 표현식을 계산하지 않는다. (IE, FireFox)
	- `reflow` 가 발생할때마다 표현식을 재실행 하게된다.
7.  CSS  하위 선택자를 최소화한다.
	- 선택자의 특별성이 확보되는 선에서, 사용하는 규칙이 적을수록 `repaint`  처리가 빠르다.
8. 토글되는 요소의 변경이 필요한 경우에는 숨겨진 상태에서 한다.
	- `display: none;` 설정으로 숨겨진 요소는 `repaint`, `reflow`가 발생하지 않는다. 따라서 토글되는 요소의 변경이 필요한 경우에는  `display: none;` 상태에서 실행한다.
9. 자바스크립트를 통해 스타일을 변경할 경우  `cssText`나 클래스를 이용한다
```javascript
var el = document.getElementById('reflow-test');

el.style.padding = '8px';
el.style.width = '320px';
el.style.height = '240px';
// 3 번의 리플로우 발생

/////////
var el = document.getElementById('reflow-test');

el.style.cssText = 'padding: 8px; width: 320px; height: 240px;';
/* or */
el.className = 'changed';
// 1 번의 리플로우 발생

/**
 * Style of `changed` class
 * .changed {
 *   padding: 8px;
 *   width: 320px;
 *   height: 240px;
 * }
 */
```
10. 자바스크립트에서 리스트 요소를 추가할 때,  `createDOMFragment` 로 추가한다.
```javascript
const frag = document.createDocumentFragment();
const ul = frag.appendChild(document.createElement('ul'));

for (let i = 1; i <= 3; i++) {
  li = ul.appendChild(document.createElement('li'));
  li.textContent = `item ${ i }`;
}

document.body.appendChild(frag);

```
11. 캐시 활용
	- 브라우저는 레이아웃 변경을 큐에 저장했다가 한번에 실행함으로써 `reflow`를 최소화 한다. `offset`, `scrollTop` 과 같은 계산된 스타일 정보를 요청할 때마다 정확한 정보를 제공하기 위해 큐를 비우고, 모든 변경을 다시 적용한다. 이를 최소화하기 위해 수치에 대한 스타일 정보를 변수에 저장하여 정보 요청 횟수를 줄임으로써 리플로우를 최소화한다.
```javascript
for (let i = 0; i < len; i++) {
  el.style.top = `${ el.offsetTop + 10 }px`;
  el.style.left = `${ el.offsetLeft + 10 }px`;
}
// Bad practice

let top = el.offsetTop, left = el.offsetLeft, elStyle = el.style;

for (let i = 0; i < len; i++) {
  top += 10;
  left += 10;
  elStyle.top = `${ top }px`;
  elStyle.left = `${ left }px`;
}
// Good practice
```
