import assert from 'node:assert';
import { JPTEEngine } from '../src/index.js';

async function testInputVerification() {
  const engine = new JPTEEngine();

  console.log("--- Testing Basic Input ---");
  engine.newWord("あ");
  let res = engine.input("a");
  assert.strictEqual(res.type, "complete", "Typing 'a' should complete 'あ'");

  engine.newWord("きのう");
  res = engine.input("k");
  assert.strictEqual(res.type, "correct");
  assert.strictEqual(res.currentBuffer, "k");
  
  res = engine.input("x"); // Mistake
  assert.strictEqual(res.type, "mistake");
  assert.strictEqual(engine.stats.mistakeCount, 1);
  assert.strictEqual(engine.stats.currentCombo, 0);
  
  engine.input("i");
  assert.strictEqual(engine.stats.currentCombo, 1);
  
  engine.input("n");
  engine.input("o");
  res = engine.input("u");
  assert.strictEqual(res.type, "complete");
  
  console.log("--- Testing Sokuon Paths ---");
  // "いった" can be typed as "itta" or "ittu-ta" etc...
  engine.newWord("いった");
  engine.input("i");
  engine.input("t"); // Starts Sokuon
  engine.input("t"); // Resolves Sokuon + 't' of 'ta'
  res = engine.input("a");
  assert.strictEqual(res.type, "complete", "'itta' should complete 'いった'");

  engine.newWord("しんぶん");
  engine.input("s");
  engine.input("i");
  engine.input("n"); // Single n is valid here because next is 'b' (not vowel/y)
  engine.input("b"); // This should be correct
  engine.input("u");
  res = engine.input("n"); 
  if (engine.options.strictNn) {
     assert.strictEqual(res.type, "correct", "First n of nn at end should be correct");
     res = engine.input("n");
     assert.strictEqual(res.type, "complete", "Second n completes the word");
  } else {
     assert.strictEqual(res.type, "complete");
  }

  console.log("All input tests passed!");
}

testInputVerification().catch(err => {
  console.error(err);
  process.exit(1);
});
