/**
 * Red-Nosed Reports
 * @see https://adventofcode.com/2024/day/2
 */

const readline = require('readline');
const fs = require('fs');

const input = fs.createReadStream('input.txt', 'utf-8');

const rl = readline.createInterface({
  input: input,
  crlfDelay: Infinity,
});


const increasing = (a, b) => a < b;
const decreasing = (a, b) => a > b;
const noBigLevelJump = (a, b) => Math.abs(a - b) <= 3;
const allSatisfy = (levels, condition) => levels.every((x, i) => i === 0 || condition(levels[i - 1], x));

function isSafe(report) {
  return (allSatisfy(report, increasing) || allSatisfy(report, decreasing)) && allSatisfy(report, noBigLevelJump);
}

function getViolatingIndexes(levels, condition) {
  const violatingIndexes = [];
  for (let i = 1; i < levels.length; i++) {
    if (!condition(levels[i - 1], levels[i])) {
      violatingIndexes.push(i);
    }
  }
  return violatingIndexes;
}

function isSafeWithRemoval(report) {
  // no need to test removal if already safe without removal
  if (isSafe(report)) return true;
  
  const uniqueViolatingIndexes = new Set();
  const a = getViolatingIndexes(report, noBigLevelJump);
  a.forEach(i => uniqueViolatingIndexes.add(i));

  const increaseViolations = getViolatingIndexes(report, increasing);
  const decreaseViolations = getViolatingIndexes(report, decreasing);
  const isLikelyIncreasing = increaseViolations.length < decreaseViolations.length;
  const orderViolations = isLikelyIncreasing ? increaseViolations : decreaseViolations;
  orderViolations.forEach(i => uniqueViolatingIndexes.add(i));

  
  for (let violatingIndex of uniqueViolatingIndexes) {
    let copy = [...report];
    copy.splice(violatingIndex, 1);
    let isNowSafe = isSafe(copy);
    if (isNowSafe) {
      return true;
    }
    if (violatingIndex <= 0) continue;
    // for big jumps, the problem could be solved when previous level is removed
    copy = [...report];
    copy.splice(violatingIndex - 1, 1);
    isNowSafe = isSafe(copy);
    if (isNowSafe) {
      return true;
    };
  }
  return false;
}

async function main() {
  let safeCount = 0;
  let safeCountPartTwo = 0;
  for await (const line of rl) {
    if (!line.trim()) {
      continue;
    }
    const report = line.trim().split(" ").map(Number);
    if (isSafe(report)) {
      safeCount++;
    }
    if (isSafeWithRemoval(report)) {
      safeCountPartTwo++;
    }
  }

  console.log('Part one answer: ' + safeCount);
  console.log('Part two answer: ' + safeCountPartTwo);
}

main();
