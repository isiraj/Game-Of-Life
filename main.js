const width = 25;
const height = 25; // width and height dimensions of the board

/**
 * Create a Game of Life instance
 */

const gol = new GameOfLife(width, height);
let playState = false

/**
 * create a table and append to the DOM
 */

// Actual table cells
const tds = [];
// <table> element
const table = document.createElement("tbody");
// build a table row <tr>
for (let h = 0; h < height; h++) {
  const tr = document.createElement("tr");
  tds.push([])
  // build a table column <td>
  for (let w = 0; w < width; w++) {
    const td = document.createElement("td");
    // We'll put the coordinates on the cell
    // Element itself (using dataset),
    // letting us fetch it in a click listener later.
    td.dataset.row = h;
    td.dataset.col = w;
    tds[h].push(td);
    tr.append(td);
  }
  table.append(tr);
}
console.log(tds)
document.getElementById("board").append(table);
  

/**
 * Draws every cell from the gol instance into an actual, visible DOM element
 */

const paint = () => {
  for(let i = 0; i<width; i++){
    for(let z = 0; z<height; z++){
      let elem = gol.board[i][z];
      let node = tds[i][z];
      if(elem === 1){
        node.classList.add('alive');
      }
      else{
        node.classList.remove('alive');
      }
    }
  }
}


/**
 * Event Listeners
 */

document.getElementById("board").addEventListener("click", event => {
  let cell = event.target;
  let row = cell.dataset.row;
  let col = cell.dataset.col;
  gol.toggleCell(row, col);
  paint();
});

document.getElementById("step_btn").addEventListener("click", event => {
  gol.tick();
  paint();
});

document.getElementById("play_btn").addEventListener("click", event => {
  var interval;
  console.log(playState)
  if (!playState) {
    playState = true
    interval = window.setInterval(function step() { gol.tick(); paint();} , 500);
  }

  document.getElementById("clear_btn").addEventListener("click", event => {
    gol.board.forEach((cell) => {
      cell.forEach((value) => {
        gol.setCell(0, gol.board.indexOf(cell), cell.indexOf(value));
      })
    })
    playState = false
    clearInterval(interval)
    paint();
  });
});

document.getElementById("random_btn").addEventListener("click", event => {
  gol.board.forEach((cell, ind) => {
    cell.forEach((value, ind2) => {
      gol.setCell(Math.round(Math.random()), ind, ind2);
    })
})
paint();
});


