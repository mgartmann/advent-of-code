/**
 * <TITLE>
 * @see https://adventofcode.com/2024/day/x
 */

const readline = require('readline');
const fs = require('fs');

const input = fs.createReadStream('input.txt', 'utf-8');

const rl = readline.createInterface({
  input: input,
  crlfDelay: Infinity,
});

function partOne(data) {
  
}

function parTwo(data) {

}

async function main() {
    let partOneAnswer = 0;
    let partTwoAnswer = 0;
  for await (const line of rl) {
    if (!line.trim()) {
      continue;
    }
    const data = line.trim().split(" ").map(Number);
    partOneAnswer = partOne(data);
    partTwoAnswer = partTwo(data);
  }

  console.log('Part one answer: ' + partOneAnswer);
  console.log('Part two answer: ' + partTwoAnswer);
}

main();
