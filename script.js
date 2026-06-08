/**
 * Sorting Algorithms & Dynamic Performance Benchmark
 */

const algorithms = [
    {
        name: 'Bubble Sort',
        best: 'O(n)',
        avg: 'O(n²)',
        worst: 'O(n²)',
        desc: 'Simple but inefficient. Compares adjacent elements and swaps them if they are in the wrong order.',
        fn: bubbleSort
    },
    {
        name: 'Insertion Sort',
        best: 'O(n)',
        avg: 'O(n²)',
        worst: 'O(n²)',
        desc: 'Builds the final sorted array one item at a time. Efficient for small or nearly sorted datasets.',
        fn: insertionSort
    },
    {
        name: 'Merge Sort',
        best: 'O(n log n)',
        avg: 'O(n log n)',
        worst: 'O(n log n)',
        desc: 'Divide and conquer algorithm. Divides the array into halves, sorts them, and then merges them back together.',
        fn: mergeSort
    },
    {
        name: 'Quick Sort',
        best: 'O(n log n)',
        avg: 'O(n log n)',
        worst: 'O(n²)',
        desc: 'Highly efficient divide and conquer algorithm. Picks a pivot and partitions the array around it.',
        fn: quickSort
    },
    {
        name: 'Heap Sort',
        best: 'O(n log n)',
        avg: 'O(n log n)',
        worst: 'O(n log n)',
        desc: 'Comparison-based sorting technique based on a Binary Heap data structure.',
        fn: heapSort
    }
];

// --- Custom JavaScript Sorting Algorithms ---

function bubbleSort(arr) {
    const items = [...arr];
    const n = items.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (items[j] > items[j + 1]) {
                const temp = items[j];
                items[j] = items[j + 1];
                items[j + 1] = temp;
            }
        }
    }
    return items;
}

function insertionSort(arr) {
    const items = [...arr];
    const n = items.length;
    for (let i = 1; i < n; i++) {
        const key = items[i];
        let j = i - 1;
        while (j >= 0 && items[j] > key) {
            items[j + 1] = items[j];
            j--;
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
    const result = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
}

function quickSort(arr) {
    if (arr.length <= 1) return arr;
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(x => x < pivot);
    const middle = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);
    return quickSort(left).concat(middle).concat(quickSort(right));
}

function heapSort(arr) {
    const items = [...arr];
    const n = items.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(items, n, i);
    }
    for (let i = n - 1; i > 0; i--) {
        const temp = items[0];
        items[0] = items[i];
        items[i] = temp;
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
        const swap = arr[i];
        arr[i] = arr[largest];
        arr[largest] = swap;
        heapify(arr, n, largest);
    }
}

// --- UI Logic ---

function init() {
    const compareBtn = document.getElementById('compareBtn');
    compareBtn.addEventListener('click', runComparison);

    // Populate Info Cards dynamically
    const infoGrid = document.getElementById('infoGrid');
    infoGrid.innerHTML = algorithms.map(algo => `
        <div class="info-card">
            <h3>${algo.name}</h3>
            <p><strong>Complexity:</strong> ${algo.avg}</p>
            <p>${algo.desc}</p>
        </div>
    `).join('');
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

    const results = [];
    let sortedData = [];

    algorithms.forEach(algo => {
        // Measure execution time with high precision performance.now()
        const t0 = performance.now();
        const sorted = algo.fn(data);
        const t1 = performance.now();
        
        // Capture sorted data from one of the algorithms (e.g. Quick Sort)
        if (algo.name === 'Quick Sort') {
            sortedData = sorted;
        }

        const elapsed = t1 - t0;
        const nanoseconds = Math.round(elapsed * 1000000);
        const timeStr = nanoseconds.toLocaleString() + " ns";

        results.push({
            name: algo.name,
            best: algo.best,
            time: timeStr
        });
    });

    updateTable(results);
    updateSortedDisplay(sortedData);
}

function updateSortedDisplay(data) {
    const display = document.getElementById('sortedDisplay');
    display.innerHTML = data.map(n => `<span class="number-chip">${n}</span>`).join('');
}

function updateTable(results) {
    const tbody = document.getElementById('resultsBody');
    tbody.innerHTML = results.map(res => `
        <tr>
            <td><strong>${res.name}</strong></td>
            <td><code>${res.best}</code></td>
            <td><span class="badge">${res.time}</span></td>
        </tr>
    `).join('');
}

document.addEventListener('DOMContentLoaded', init);
