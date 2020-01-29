# CORS
Cross-Origin Resource Sharing ( [CORS](https://developer.mozilla.org/ko/docs/Glossary/CORS) )은 http 헤더를 사용하여 브라우저에게 한 출처에서 실행중인 웹의 다른 출처의 자원에 대한 접근 권한을 알려주는 것. 보안상의 이유로 브라우저들은 cross-origin HTTP 요청을 제한한다. 아래와 같은 예시는 동일출처정책에 의해 에러가 발생한다.

예:
`https://domain-a.com`에서 제공되는 클라이언트 javascript 코드가   `XMLHttpRequest`를 사용하여 `https://domain-b.com/data.json`을 요청

> **동일출처정책**
> 다른출처에서 가져온 자원과 상호작용하는 것을 제한하는 보안 방식

## CORS를 사용하는 요청들
1. 위 예시와 같이 `XMLHttpRequest`와 같은 호출일 때.
2. 웹 폰트 (CSS의 `@font-face`에서 cross-domain 폰트 사용 시)
3. WebGl, drawImage() 등등…

## 해결 방법
1. 서버와 클라이언트가 같은 도메인과 포트를 사용한다.
2. 서버에서 응답 헤더에 `Access-Control-Allow_origin` 헤더를 추가한다.
