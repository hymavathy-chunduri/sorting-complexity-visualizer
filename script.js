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

const algorithms = [
    {
        name: 'Bubble Sort',
        best: 'O(n)',
        avg: 'O(n²)',
        worst: 'O(n²)',
        preferable: 'Small datasets for learning purposes.',
        desc: 'Simple but inefficient. Compares adjacent elements and swaps them if they are in the wrong order.'
    },
    {
        name: 'Insertion Sort',
        best: 'O(n)',
        avg: 'O(n²)',
        worst: 'O(n²)',
        preferable: 'Small or nearly sorted datasets.',
        desc: 'Builds the final sorted array one item at a time. Efficient for small datasets or nearly sorted data.'
    },
    {
        name: 'Merge Sort',
        best: 'O(n log n)',
        avg: 'O(n log n)',
        worst: 'O(n log n)',
        preferable: 'Stable sorting of very large datasets.',
        desc: 'Divide and conquer algorithm. Divides the array into halves, sorts them, and then merges them back together.'
    },
    {
        name: 'Quick Sort',
        best: 'O(n log n)',
        avg: 'O(n log n)',
        worst: 'O(n²)',
        preferable: 'General-purpose large datasets (very fast).',
        desc: 'Highly efficient divide and conquer algorithm. Picks a pivot and partitions the array around it.'
    },
    {
        name: 'Heap Sort',
        best: 'O(n log n)',
        avg: 'O(n log n)',
        worst: 'O(n log n)',
        preferable: 'Memory-limited sets needing O(n log n) guarantee.',
        desc: 'Comparison-based sorting technique based on a Binary Heap data structure.'
    }
];

function init() {

    const compareBtn = document.getElementById('compareBtn');
    const numberInput = document.getElementById('numberInput');

    compareBtn.addEventListener('click', runComparison);

    // Populate Info Cards
    const infoGrid = document.getElementById('infoGrid');
    infoGrid.innerHTML = algorithms.map(algo => `
        <div class="info-card">
            <h3>${algo.name}</h3>
            <p><strong>Complexity:</strong> ${algo.avg}</p>
            <p>${algo.desc}</p>
        </div>
    `).join('');
}


function analyzeData(arr) {
    const n = arr.length;
    if (n <= 1) return 'trivial';

    let isSorted = true;
    let isReverseSorted = true;
    let inversions = 0;

    for (let i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            isSorted = false;
            inversions++;
        }
        if (arr[i] < arr[i + 1]) {
            isReverseSorted = false;
        }
    }

    if (isSorted) return 'sorted';
    if (isReverseSorted) return 'reverse';
    if (inversions <= n / 4) return 'nearly_sorted';
    return 'random';
}

function getSuitability(algoName, n, dataType) {
    if (n <= 1) return "Trivially Preferable (Array too small)";

    switch (algoName) {
        case 'Bubble Sort':
            if (dataType === 'sorted') {
                return "Highly Preferable (Already sorted)";
            }
            if (n < 20) {
                return "Moderately Preferable (Small array)";
            }
            return "Not Preferable (O(n²) for this data)";

        case 'Insertion Sort':
            if (dataType === 'sorted' || dataType === 'nearly_sorted') {
                return "Highly Preferable (Data is nearly sorted)";
            }
            if (n < 20) return "Highly Preferable (Small array)";
            {
                return "Not Preferable (O(n²) for this data)";
            }

        case 'Merge Sort':
            if (n < 20) return "Less Preferable (Overkill for small array)";
            {
                return "Highly Preferable (Guarantees O(n log n))";
            }

        case 'Quick Sort':
            if (n < 20) return "Moderately Preferable (Good, but insertion might be faster)";
            {
                return "Highly Preferable (Fastest average case)";
            }

        case 'Heap Sort':
            if (n < 20) return "Less Preferable (Overkill for small array)";
            {
                return "Highly Preferable (O(n log n) with O(1) space)";
            }
    }
    return "Neutral";
}

function runComparison() {
    const input = document.getElementById('numberInput').value;
    if (!input.trim()) {
        alert("Please enter some numbers!");
        return;
    }

    const data = input.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    if (data.length === 0) {
        alert("Invalid input. Please provide numbers separated by commas.");
        return;
    }

    const dataType = analyzeData(data);
    const n = data.length;
    const results = [];

    algorithms.forEach(algo => {

        results.push({
            name: algo.name,
            avg: algo.avg,
            preferable: getSuitability(algo.name, n, dataType)
        });
    });

    updateTable(results);
    updateSortedDisplay(data);
}

function updateSortedDisplay(data) {
    const sortedData = [...data].sort((a, b) => a - b);
    const display = document.getElementById('sortedDisplay');
    display.innerHTML = sortedData.map(n => `<span class="number-chip">${n}</span>`).join('');
}

function updateTable(results) {
    const tbody = document.getElementById('resultsBody');
    tbody.innerHTML = results.map(res => `
        <tr>
            <td><strong>${res.name}</strong></td>
            <td><code>${res.avg}</code></td>
            <td><span class="badge">${res.preferable}</span></td>
        </tr>
    `).join('');
}

document.addEventListener('DOMContentLoaded', init);
