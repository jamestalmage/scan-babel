import assert from 'assert';

export default class DependencyGraph {
	constructor() {
		this.nodes = {};
	}

	node(key) {
		assert.equal(typeof key, 'string', 'key must be a string');
		let dependency = this.nodes[key];
		if (!dependency) {
			dependency = this.nodes[key] = new DependencyNode(this, key); // eslint-disable-line no-use-before-define
		}
		return dependency;
	}

	addDependencyList(list) {
		list.forEach(key => this.node(key).addDepList(list));
	}

	solve() {
		const solutionOrder = [];

		function visitNode(node) {
			if (node.trySolve()) {
				solutionOrder.push(node);
				return true;
			}
			return false;
		}

		while (this.nodes.some(visitNode)) {
			// no-op
		}

		return this.nodes.every(node => node.solved);
	}
}

class DependencyNode {
	constructor(graph, key) {
		assert(graph instanceof DependencyGraph, 'graph must be a DependencyGraph');
		assert.equal(typeof key, 'string', 'key must be a string');
		this.key = key;
		this.graph = graph;
		this.depLists = [];
		this.solved = false;
	}

	addDepList(list) {
		assert(Array.isArray(list), 'list must be an array');
		this.depLists.push(list.map(key => this.graph.node(key)));
		return this;
	}

	trySolve() {
		//	if (this.solved) {
		//	return false;
		// }
		const solutions = this.depLists.filter(list => list.every(dep => dep === this || dep.solved));
		if (solutions.length) {
			this.solutions = solutions.sort((a, b) => a.length - b.length);
			this.solved = true;
		}
		return this.solved;
	}
}
