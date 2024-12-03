/**
 * Mull It Over
 * @see https://adventofcode.com/2024/day/3
 */

const readline = require('readline');
const fs = require('fs');

const input = fs.createReadStream('input.txt', 'utf-8');

const rl = readline.createInterface({
  input: input,
  crlfDelay: Infinity,
});


function extractOperands(instruction) {
  return instruction.match(/\d+/g).map(Number);
}

function partOne(data) {
  const re = /mul\(\d{1,3},\d{1,3}\)/g;
  const realInstructions = data.match(re);
  let total = 0;
  for (instruction of realInstructions) {
    const operands = extractOperands(instruction);
    total += operands[0] * operands[1];
  }
  return total;
}

function partTwo(data) {
  // input is active until deactivated with `don't()`.
  // enrich input to allow for simpler regex.
  data = 'do()' + data + 'don\'t()';

  // match everything between a `do()` and the next `don't()`.
  // regex is non-greedy (thanks to `?`) so that match stops on next `don't()`.
  const re = /do\(\)(.*?)don't\(\)/g;

  let activeCodeParts = [];
  let match;
  while ((match = re.exec(data)) !== null) { 
    activeCodeParts.push(match[1]); 
  }
  let total = 0;
  for (let activeCodePart of activeCodeParts) {
    total += partOne(activeCodePart);
  }
  return total;
}

async function main() {
  let partOneAnswer = 0;
  let partTwoAnswer = 0;
  let data = '';
  for await (const line of rl) {
    if (!line.trim()) {
      continue;
    }
    data += line.trim();
  }
  partOneAnswer = partOne(data);
  partTwoAnswer = partTwo(data);

  console.log('Part one answer: ' + partOneAnswer);
  console.log('Part two answer: ' + partTwoAnswer);
}

main();
