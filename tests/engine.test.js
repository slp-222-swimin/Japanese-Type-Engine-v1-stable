import assert from 'node:assert';
import { JPTEEngine } from '../src/index.js';
import { ROMAN_MAP } from '../src/romanMap.js';

// Helper to stringify graph structure for easy debugging
function printGraph(graph) {
  // A graph is a list of segments, each segment is an array of possible paths
  // Path objects could have { romaji: 'toukyou', nextSegmentIndex: ... }
  console.log(JSON.stringify(graph, null, 2));
}

async function testGraphGeneration() {
  const engine = new JPTEEngine();

  console.log("--- Testing Basic Generation ---");
  engine.newWord("あ");
  // Expected graph for "あ": array with 1 edge path "a"
  assert.ok(engine.graph);
  assert.strictEqual(engine.graph.length, 1);
  assert.strictEqual(engine.graph[0].romaji, "a");
  assert.strictEqual(engine.graph[0].next.length, 1); // the end node

  engine.newWord("し");
  // Expected for "し": "si" or "shi"
  const shiPaths = engine.graph.map(p => p.romaji);
  assert.ok(shiPaths.includes("si"));
  assert.ok(shiPaths.includes("shi"));

  console.log("--- Testing Sokuon (っ) ---");
  engine.newWord("いった");
  // The graph should have paths for "i", then next nodes for "っ" logic.
  let pathsAfterI = engine.graph.find(p => p.romaji === 'i').next;
  let ittaPath = pathsAfterI.find(p => p.romaji === 'tta');
  assert.ok(ittaPath, "Should dynamically generate 'tt' for 'っ' + 'た'");

  console.log("--- Testing Nn (ん) ---");
  engine.newWord("しんぶん");
  // paths from 'si' -> 'ん'
  let pathsAfterSi = engine.graph.find(p => p.romaji === 'si').next;
  let pathsNn = pathsAfterSi.find(p => p.romaji === 'nn');
  let pathsN = pathsAfterSi.find(p => p.romaji === 'n');
  assert.ok(pathsNn, "Should have regular 'nn' path");
  assert.ok(pathsN, "Should have single 'n' path before 'bu'");

  console.log("All graph generation tests passed (so far)!");
}

testGraphGeneration().catch(err => {
  console.error(err);
  process.exit(1);
});
