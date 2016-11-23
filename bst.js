function Node(key, value) {
    this.key = key;
    this.value = value;
}

function BinarySearchTree() {
    this._root = new Node();
}

BinarySearchTree.prototype.root = function() {
    return this._root.value;
};

BinarySearchTree.prototype.insert = function(key, value) {
    if (!this._root.key && !this._root.value) {
        this._root.key = key;
        this._root.value = value;
    } else {
        this._insert(this._root, key, value);
    }

    return this;
};

BinarySearchTree.prototype.delete = function(key) {
    var node = this._search(key);

    this._delete(node);
};

BinarySearchTree.prototype.search = function(key) {
    var result = this._search(key);

    return result ? result.value : null;
};

BinarySearchTree.prototype.contains = function(value) {
    return this._contains(value);
};

BinarySearchTree.prototype.traverse = function(order) {
    var first = order ? 'left' : 'right';
    var second = order ? 'right' : 'left';
    var result = [];
    var stop;

    function step(node) {
        var next;

        if (node[first]) {
            step(node[first]);
        }

        if (node.value) {
            result.push(node.value);
        }

        if (node[second]) {
            step(node[second]);
        }
    }

    step(this._root);

    return result;
};

BinarySearchTree.prototype.verify = function() {

};

BinarySearchTree.prototype._insert = function(node, key, value) {
    var next;

    if (node.key <= key) {
        if (node.right) {
            next = node.right;
        } else {
            node.right = new Node(key, value);
            return;
        }
    } else {
        if (node.left) {
            next = node.left;
        } else {
            node.left = new Node(key, value);
            return;
        }
    }

    this._insert(next, key, value);
};

BinarySearchTree.prototype._search = function(key) {

    function comparator(nodeKey, nodeValue) {
        return nodeKey === key;
    }

    return this._traverse(true, comparator);
};

BinarySearchTree.prototype._contains = function(value) {

    function comparator(nodeKey, nodeValue) {
        return nodeValue === value;
    }

    return !!this._traverse(true, comparator);
};

BinarySearchTree.prototype._traverse = function(order, comparator) {
    var first = order ? 'left' : 'right';
    var second = order ? 'right' : 'left';
    var result;
    var stop;

    function step(node) {
        var next;

        if (typeof comparator === 'function' && comparator(node.key, node.value)) {
            result = node;
            stop = true;
            return;
        }

        if (stop) {
            return;
        }

        if (node[first]) {
            step(node[first]);
        }
        if (node[second]) {
            step(node[second]);
        }
    }

    step(this._root);

    return result;
};

BinarySearchTree.prototype._delete = function(node) {
    if (node.left) {
        node.value = node.left.value;
        this._delete(node.left);
    } else if (node.right) {
        node.value = node.left.velue;
        this._delete(node.right);
    } else {
        node.key = node.value = null;
    }
};










