const root = {
    val: 5,
    left: {
        val: 4,
        left: {
            val: 11,
            left: { val: 7, left: null, right: null },
            right: { val: 2, left: null, right: null }
        },
        right: null
    },
    right: {
        val: 8,
        left: { val: 13, left: null, right: null },
        right: {
            val: 4,
            left: null,
            right: { val: 1, left: null, right: null }
        }
    }
};



const targetSum = 22;



var hasPathSum = function(root, targetSum) {
    if (!root) return false; // If the tree is empty, return false

    // If the current node is a leaf, check if the targetSum equals its value
    if (!root.left && !root.right) {
        return targetSum === root.val;
    }

    // Recursively check the left and right subtrees with the updated targetSum
    return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val);
};



/// Iterative Solution

var hasPathSum2 = function(root, targetSum) {
    if (!root) {
        return false;
    }

    let stack = [[root, 0]];
    while (stack.length) {
        let [node, curr] = stack.pop();
        // if both children are null, then the node is a leaf
        if (!node.left && !node.right) {
            if (curr + node.val == targetSum) {
                return true;
            }
        }

        curr += node.val;
        if (node.left) {
            stack.push([node.left, curr]);
        }
        if (node.right) {
            stack.push([node.right, curr]);
        }
    }

    return false;
};


console.log(hasPathSum(root, targetSum)); // Output: true
