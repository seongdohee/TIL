/**
 * Created by dohee.seong on 2018. 3. 12..
 *
 * https://app.codility.com/programmers/lessons/4-counting_elements/missing_integer/start
 *
 * N 개의 정수 중 A 배열이 주어진다면, A에서 발생하지 않는 가장 작은 양의 정수 (0보다 큼)를 반환합니다.
 *
 * A = [1, 3, 6, 4, 1, 2] 이면 함수는 5를 반환해야합니다.
 * A = [1, 2, 3] 이면 함수는 4를 반환해야합니다.
 * A = [-1, -3]이면 함수는 1을 반환합니다.
 *
 * N은 [ 1 .. 100,000 ] 범위의 정수입니다 .
 * 배열 A의 각 요소는 [ -1,000,000 .. 1,000,000 ] 범위의 정수 입니다.
 *
 */

function solution(arr) {
    var desc = arr.sort((prev, curr) => prev - curr);
    var result =  desc.reduce((prev, curr) => {
        if (curr - prev === 1 || curr === prev){
            return curr;
        }
        else {
            return prev;
        }
    }, 0) + 1 ;

    return result <= 0 ? 1 : result;
}


