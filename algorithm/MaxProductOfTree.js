/**
 * Created by dohee.seong on 2018. 3. 15..
 *
 * https://app.codility.com/programmers/lessons/6-sorting/max_product_of_three/start/
 *
 * N 개의 정수로 구성된 배열 A가 주어진다.
 *
 * (P, Q, R)의 곱은 A[P] * A[Q] * A[R] (0 <= P < Q < R < N)과 동일하다.
 * 임의의 (P, Q, R) 최대 곱의 값을 리턴한다.
 *
 * 예를들어, A = [-3, 1, 2, -2, 5, 6]일 경우, 60을 반환한다 
 *
 */


function solution(A) {

    var N = A.length;
    A.sort((a, b) => a - b);

    var case1 = A[N-3] * A[N-2] * A[N-1];
    var case2 = A[0] * A[1] * A[N-1];

    return case1 > case2 ? case1 : case2;

}