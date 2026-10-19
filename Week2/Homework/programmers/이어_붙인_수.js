function solution(num_list) {
    var answer = 0;
    let odd = '';
    let even = '';

    for (const num of num_list) {
        if (num % 2 === 1) {
            odd += num;
        } else {
            even += num;
        }
    }

    answer = Number(odd) + Number(even);
    return answer;
}
