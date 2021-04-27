class GameOfLife {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.makeBoard();
  }

  /**
   * Returns a 2D Array
   */

  makeBoard() {
    let rows = this.height;
    let columns = this.width;
    let largerArr = [];
    for(let i = 0; i<rows;i++){
      largerArr.push([]);
      for(let z = 0; z<columns; z++){
        largerArr[i][z] = Math.round(Math.random());
      }
    }
    return largerArr;
  }

  getCell(row, col){
    let arr = this.board;
    if(row >= 0 && col>=0){
      return arr[row][col];
    }
    else{
      return 'dead';
    }
  }

  setCell(value, row, col){
    let arr = this.board
    if(row >= 0 && col>=0 && value === 0 || value === 1){
      arr[row][col] = value;
    }
    else{
      return 'invalid';
    }
  }

  toggleCell(row, col){
    let arr = this.board;
    if(arr[row][col] === 0){
      arr[row][col] = 1;
    }
    else{
      arr[row][col] = 0;
    }
  }






  /**
   * Returns the amount of living neighbors around a given coordinate.
   */

  livingNeighbors(row, col) {
    let counter = 0;
    let board = this.board;
      if(board[row][col+1] === 1 && board[row][col-1] === 1){
        counter += 2;
      }
      else{
        if(board[row][col+1] === 1 || board[row][col-1] === 1){
          counter += 1;
        }
      }
      if(board[row-1] !== undefined){
        if(board[row-1][col] === 1){
          counter += 1;
        }
        if(board[row-1][col+1] === 1 && board[row-1][col-1] === 1){
          counter += 2;
        }
        else{
          if(board[row-1][col+1] === 1 || board[row-1][col-1] === 1){
            counter += 1;
          }
        }
      }
      if(board[row+1] !== undefined){
        if(board[row+1][col] === 1){
          counter += 1;
        }
        if(board[row+1][col+1] === 1 && board[row+1][col-1] === 1){
          counter += 2;
        }
        else{
          if(board[row+1][col+1] === 1 || board[row+1][col-1] === 1){
            counter += 1;
          }
        }
      };
    return counter;
  }


  /**
   * Apply rules to generate a new board
   */
  
  tick() {
    let newBoard = this.makeBoard();
    let oldBoard =  this.board;
    for(let z = 0; z<oldBoard.length; z++){
      let minArr = oldBoard[z];
      for(let x = 0; x<minArr.length; x++){
        if(this.livingNeighbors(z,x) < 2){
          newBoard[z][x] = 0;
        }
        else if(this.livingNeighbors(z,x) > 3){
          newBoard[z][x] = 0;
        }
        else if(oldBoard[z][x] === 0 && this.livingNeighbors(z,x) === 3){
          newBoard[z][x] = 1;
        } else {
          newBoard[z][x] = oldBoard[z][x]
        }
      }
    }
    this.board = newBoard;
  }


}
