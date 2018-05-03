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
    id: item[ 0 ] - 1,
    size: item[ 1 ],
    value: item[ 2 ],
    valuePerSize: item[ 2 ] / item[ 1 ]
  });
});

function fillKnapsack(items, knapsackSize) {
  function auditionItem(id, size) {
    if (id == 0) {
      return {
        value: 0,
        size: 0,
        chosen: []
      };
    } else if (items[ id ].size > size) {
      return auditionItem(id - 1, size);
    } else {
      let r0 = auditionItem(id - 1, size);
      let r1 = auditionItem(id - 1, size - items[ id ].size);
      r1.value += items[ id ].value;
      if (r0.value > r1.value) {
        return r0;
      } else {
        r1.size += items[ id ].size;
        r1.chosen = r1.chosen.concat(id);
        return r1;
      }
    }
  }

  return auditionItem(items.length - 1, knapsackSize);
}

const result = fillKnapsack(items, knapsackSize);

console.log(result);
