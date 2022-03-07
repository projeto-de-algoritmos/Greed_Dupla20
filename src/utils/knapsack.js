function merge(left, right) {
    const arr = [];

    while (left.length && right.length) {
        if ((left[0].value / left[0].weight) < (right[0].value / right[0].weight)) {
            arr.push(right.shift());
        } else {
            arr.push(left.shift());
        }
    }

    return [...arr, ...left, ...right];
}

function mergeSort(array) {
    const half = array.length / 2;

    if (array.length < 2) {
        return array;
    }

    const left = array.splice(0, half);
    return merge(mergeSort(left), mergeSort(array));
}

function knapsack(totalSpace, stars) {
    const sortedStars = mergeSort([...stars]);
    let spaceSack = totalSpace;
    let i = 0;
    let score = 0;
    const bestStars = [];

    while (spaceSack > 0 && i < sortedStars.length) {
        if (spaceSack >= sortedStars[i].weight) {
            score += sortedStars[i].value;
            spaceSack -= sortedStars[i].weight;
            bestStars.push(sortedStars[i]);
        }
        i++;
    }

    return [score, bestStars];
}