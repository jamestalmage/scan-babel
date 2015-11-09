'use strict';
import test from 'ava';
import '../lib/babel-register';
import DependencyGraph from '../lib/dependency-graph';

test.beforeEach(t => {
	t.context = new DependencyGraph();
	t.end();
});

test('a brand new dependency is not solvable', t => {
	const graph = t.context;

	const node = graph.node('a');

	t.notOk(node.trySolve());
	t.notOk(node.solved);

	t.end();
});

test('a dependency by itself is solved', t => {
	const graph = t.context;

	const node = graph.node('a');

	node.addDepList(['a']);

	t.ok(node.trySolve());
	t.ok(node.solved);

	t.end();
});

test('other nodes must solve before A can be', t => {
	const graph = t.context;
	const nodeA = graph.node('a').addDepList(['a', 'b']);
	const nodeB = graph.node('b');

	t.notOk(nodeB.trySolve());
	t.notOk(nodeA.trySolve());
	t.notOk(nodeA.solved);

	nodeB.addDepList(['b']);

	t.ok(nodeB.trySolve());
	t.ok(nodeB.solved);

	t.ok(nodeA.trySolve());
	t.ok(nodeA.solved);
	t.end();
});

test('other nodes must solve A can be (two dependencies)', t => {
	const graph = t.context;
	const nodeA = graph.node('a').addDepList(['a', 'b', 'c']);
	const nodeB = graph.node('b');

	t.notOk(nodeB.trySolve());
	t.notOk(nodeA.trySolve());
	t.notOk(nodeA.solved);

	nodeB.addDepList(['b']);

	t.ok(nodeB.trySolve());
	t.ok(nodeB.solved);

	t.notOk(nodeA.trySolve());
	t.notOk(nodeA.solved);

	graph.node('c').addDepList(['c']).trySolve();

	t.ok(nodeA.trySolve());
	t.ok(nodeA.solved);

	t.end();
});

test('finds shortest solution', t => {
	const graph = t.context;

	graph.addDependencyList(['a', 'b', 'c']);
	graph.addDependencyList(['a', 'b', 'd']);
	graph.addDependencyList(['a', 'b']);
	graph.addDependencyList(['b', 'c']);
	graph.addDependencyList(['c']);

	// graph.node('a').addDepList();

	t.end();
});
