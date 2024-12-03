  /**
   * This time, you'll need to figure out exactly how often each number from
   * the left list appears in the right list. Calculate a total similarity score
   * by adding up each number in the left list after multiplying it by the 
   * number of times that number appears in the right list.
   * 
   * Enter the lists in stdin, two coordinates per line, separates by three spaces ('   ').
   * E.g.: 
   * 40885   43247
   * 14780   86274
   * 35132   49508
   * 
   * Enter an empty line to calculate distance.
   *
   * @see https://adventofcode.com/2024/day/1#part2
   */

const readline = require('readline');

function fillLists(input) {
    const lineItems = input.trim().split('   ').map(Number);
    if (lineItems.length !== 2) {
        console.error(`number of given items (${lineItems.length}) is not expected number of arguments (2)`);
        process.exit(1);
    }

    leftList.push(lineItems[0]);
    rightList.push(lineItems[1]);
}

function calculateSimilarityScore() {
    let similarityScore = 0;

    while(leftList.length) {
        const left = leftList.shift();
        const occurences = rightList.filter(right => right === left);
        similarityScore += left * occurences.length;
    }

    return similarityScore;
}


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const leftList = [];
const rightList = [];

rl.on('line', line => {
    if (line.trim() === '') {
        rl.write(`Similarity score between lists: ${calculateSimilarityScore()}`)
        process.exit();
    }

    fillLists(line);
});
