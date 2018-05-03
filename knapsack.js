const fs = require('fs');
const args = process.argv;
const filePath = args[ 2 ];
const knapsackSize = Number(args[ 3 ]);

// Parse file
let file = fs
  .readFileSync(filePath, 'utf-8')
  .split('\n')
  .map(line => {
    line = line.split(' ');
    return line.map(el => Number(el));
  });
file.pop(); // Removes empty element at the end

const items = [];

file.forEach(item => {
  items.push({
    id: item[ 0 ],
    size: item[ 1 ],
    value: item[ 2 ],
    valuePerSize: item[ 2 ] / item[ 1 ]
  });
});

function fillKnapsack(items, knapsackSize) {
  function auditionItem(id, size) {
    if (id == 0 || size == 0) {
      return 0;
    } else if (items[ id - 1 ].size > size) {
      return auditionItem(id - 1, size);
    } else {
      return Math.max(
        auditionItem(id - 1, size),
        auditionItem(id - 1, size - items[ id - 1 ].size) + items[ id - 1 ].value
      );
    }
  }

  return auditionItem(items.length - 1, knapsackSize);
}

const result = fillKnapsack(items, knapsackSize);

console.log(result);
