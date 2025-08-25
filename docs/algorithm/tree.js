class TreeNode {
    constructor(val,left,right) {
        this.val = (val === undefined ? 0 : val);
        this.left = (left === undefined ? null : val);
        this.right = (right === undefined ? null : val);
    }
}
//创建一颗简单的二叉树
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);



const bianli = (root) => { 
    const  res = []
    const traverse = (node) => { 
        if(node === null) return
        traverse(node.left)
        res.push(node.val)
        traverse(node.right)
    }
    traverse(root)
    return res
}
bianli(root)