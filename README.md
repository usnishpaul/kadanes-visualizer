# Kadane's Algorithm Visualizer 📊

A web-based visualization tool that animates the execution of **Kadane's Algorithm** for finding the contiguous subarray with the largest sum. 

This project was built to demonstrate the translation of algorithmic logic and dynamic programming concepts into an interactive, user-facing application using vanilla web technologies.

## 🚀 Live Demo
[Insert link to your GitHub Pages here once deployed, e.g., https://yourusername.github.io/kadanes-visualizer]

## ✨ Features
* **Step-by-Step Animation:** Visually tracks the `current_sum` and `global_max` pointers as they traverse the array.
* **Algorithmic Accuracy:** Accurately represents the $O(N)$ time complexity and $O(1)$ space complexity of the algorithm.
* **Dynamic Generation:** Users can generate randomized arrays with a mix of positive and negative integers to test edge cases (e.g., all negative numbers).
* **Responsive UI:** Clean, state-driven CSS that highlights the active pointer, the current contiguous block, and the final winning subarray.

## 🛠️ Tech Stack
* **HTML5:** Semantic structure.
* **CSS3:** State-based styling and transitions.
* **Vanilla JavaScript (ES6+):** DOM manipulation, asynchronous execution (`async/await` for sleep functions), and core algorithmic logic.

## 🧠 The Algorithm (C++ equivalent)
The visualizer is based on the following dynamic programming recurrence relation:
`current_max = max(arr[i], current_max + arr[i])`

```cpp
int maxSubArray(vector<int>& nums) {
    int maxSum = INT_MIN;
    int currentSum = 0;
    for(int i = 0; i < nums.size(); i++) {
        currentSum = max(nums[i], currentSum + nums[i]);
        maxSum = max(maxSum, currentSum);
    }
    return maxSum;
}