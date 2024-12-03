const readline = require('readline');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const leftList = [];
const rightList = [];

function fillLists(input) {
    const lineItems = input.trim().split('   ').map(Number);
    if (lineItems.length !== 2) {
        console.error(`number of given items (${lineItems.length}) is not expected number of arguments (2)`);
        process.exit(1);
    }

    leftList.push(lineItems[0]);
    rightList.push(lineItems[1]);
}

function calculateDistance() {
    const ascending = (a, b) => a - b;
    leftList.sort(ascending);
    rightList.sort(ascending);

    let absoluteDistance = 0;

    while(leftList.length) {
        absoluteDistance += Math.abs(leftList.shift() - rightList.shift());
    }

    return absoluteDistance;
}

rl.on('line', line => {
    if (line.trim() === '') {
        rl.write(`Absolute distance between lists: ${calculateDistance()}`)
        process.exit();
    }

    fillLists(line);
});
