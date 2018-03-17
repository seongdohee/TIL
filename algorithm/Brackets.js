/**
 * Created by dohee.seong on 2018. 3. 17..
 *
 * https://app.codility.com/programmers/lessons/7-stacks_and_queues/brackets/start/
 *
 * N 개의 문자로 구성된 문자열 S가 주어지면 S가 제대로 중첩되면 1을, 그렇지 않으면 0을 반환합니다.
 * 예를 들어 S = " {[() ()]} "이면 함수는 1을 반환하고 S = " ([) ()]를 제공해야 함수는 위에서 설명한 것처럼 0을 반환해야합니다.
 *
 */

function solution(S) {

    var arr = S.replace(/[^\{,\[,\(,\],\},\)]/gi, '');
    var a = [], b = [], c = [];
    var result = 1;

    for (var i = 0; i < arr.length; ++i){

        var char = arr[i];

        if (char === '{') a.push(i);
        else if (char === '[') b.push(i);
        else if (char === '(') c.push(i);
        else if (char ==='}' ){
            if (a.length > 0 && arr[i-1] !== '[' && arr[i-1] !== '('){
                a.pop();
            }else{
                result = 0;
                break;
            }
        }
        else if (char ===']' ){
            if (b.length > 0 && arr[i-1] !== '{' && arr[i-1] !== '('){
                b.pop();
            }else{
                result = 0;
                break;
            }
        }
        else if (char ===')' ){
            if (c.length > 0 && arr[i-1] !== '[' && arr[i-1] !== '{'){
                c.pop();
            }else{
                result = 0;
                break;
            }
        }

    }

    return !(a.length || b.length || c.length) ? result : 0;

}