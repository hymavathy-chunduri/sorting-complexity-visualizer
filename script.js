function bubbleSort(arr) {
    const n = arr.length;
    const items = [...arr];
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (items[j] > items[j + 1]) {
                [items[j], items[j + 1]] = [items[j + 1], items[j]];
            }
        }
    }
    return items;
}
function insertionSort(arr) {
    const items = [...arr];
    const n = items.length;
    for (let i = 1; i < n; i++) {
        let key = items[i];
        let j = i - 1;
        while (j >= 0 && items[j] > key) {
            items[j + 1] = items[j];
            j = j - 1;
        }
        items[j + 1] = key;
    }
    return items;
}

function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
}

function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

function quickSort(arr) {
    if (arr.length <= 1) return arr;
    const items = [...arr];
    const pivot = items[Math.floor(items.length / 2)];
    const left = items.filter(x => x < pivot);
    const middle = items.filter(x => x === pivot);
    const right = items.filter(x => x > pivot);
    return [...quickSort(left), ...middle, ...quickSort(right)];
}

function heapSort(arr) {
    const items = [...arr];
    const n = items.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(items, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        [items[0], items[i]] = [items[i], items[0]];
        heapify(items, i, 0);
    }
    return items;
}

function heapify(arr, n, i) {
    let largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;

    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;

    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}
