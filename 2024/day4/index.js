/**
 * Ceres Search
 * @see https://adventofcode.com/2024/day/4
 * @summary not the most elegant solution, but it was almost midnight :) 
 */

const readline = require('readline');
const fs = require('fs');

const input = fs.createReadStream('input.txt', 'utf-8');

const rl = readline.createInterface({
  input: input,
  crlfDelay: Infinity,
});

const moveUpLeft = (line, column) =>  [--line, --column];
const moveUp = (line, column) =>  [--line, column];
const moveUpRight = (line, column) =>  [--line, ++column];
const moveDownLeft = (line, column) =>  [++line, --column];
const moveDown = (line, column) =>  [++line, column];
const moveDownRight = (line, column) =>  [++line, ++column];

const searchString = 'XMAS';

function search(x, y, data, moveFn) {
  let line = x;
  let column = y;
  const searchSubstring = searchString.substring(1);
  for (let char of [...searchSubstring]) {
    [line, column] = moveFn(line, column);
    if (char !== data[line][column]) return 0;
  }
  return 1;
}

function partOne(data) {
  const lineWidth = data[0].length;
  let numberOfMatches = 0;
  for(let i = 0; i < data.length; i++) {
    // ?= for lookahead which does not consume chars and allows overlapping matches
    const horizontalMatches = data[i].match(/(?=(XMAS|SAMX))/g); 
    numberOfMatches += horizontalMatches ? horizontalMatches.length : 0;
    for(let j = 0; j < lineWidth; j++) {
      if (data[i][j] === searchString.charAt(0)) {
        if (i - 3 >= 0) {
          numberOfMatches += search(i, j, data, moveUpLeft);
          numberOfMatches += search(i, j, data, moveUp);
          numberOfMatches += search(i, j, data, moveUpRight);
        }
        if (i + 3 < data.length) {
          numberOfMatches += search(i, j, data, moveDownLeft);
          numberOfMatches += search(i, j, data, moveDown);
          numberOfMatches += search(i, j, data, moveDownRight);
        }
      }
    }
  }
  return numberOfMatches;
}

function isCross(line, column, data) {
  if (line - 1 < 0 || line + 1 >= data.length || column - 1 < 0 || column + 1 >= data[0].length) {
    return false;
  }
  const possibleCrossParts = ['MAS', 'SAM'];
  return possibleCrossParts.includes(data[line-1][column-1] + 'A' + data[line+1][column+1])
    && possibleCrossParts.includes(data[line-1][column+1] + 'A' + data[line+1][column-1]);
}

function partTwo(data) {
  const lineWidth = data[0].length;
  let numberOfMatches = 0;
  for(let i = 0; i < data.length; i++) {
    for(let j = 0; j < lineWidth; j++) {
      if (data[i][j] === 'A' && isCross(i, j, data)) {
        numberOfMatches++; 
      }
    }
  }
  return numberOfMatches;
}

async function main() {
  const lines = [];
  for await (const line of rl) {
    if (!line.trim()) {
      continue;
    }
    const data = line.trim();
    lines.push(data);
  }

  const partOneAnswer = partOne(lines);
  const partTwoAnswer = partTwo(lines);

  console.log('Part one answer: ' + partOneAnswer);
  console.log('Part two answer: ' + partTwoAnswer);
}

main();
