const canvas = document.getElementById('canvas');
canvas.width = 500;
canvas.height = 650;
const ctx = canvas.getContext('2d');
const tickRate = 1000 / 60;

const game = {
  speed: 4,
  density: 4,
  canvasWidth: 500,
  canvasHeight: 650,
  startPoints: [12.5, 137.5, 262.5, 387.5],
  tiles: [],
  rowLocks: [false, false, false, false],

  generateTiles: function() {
    let isAvailable = true;
    game.tiles.forEach(tile => {
      if(tile.pozY <= 5){
        isAvailable = false;
      }
    });
    if(isAvailable){
      let row = Math.floor(Math.random() * 4) + 1;
      this.tiles.push(new Tile({row}));
    }
  },

  buildForeground: function (){
    ctx.fillStyle = "black";
    for(let i = 1; i <= 4; i++){
      ctx.fillRect(125 * i, 0, 1, 6500);
    }
    ctx.fillStyle = "orange";
    ctx.fillRect(0, 499, 500, 3);
    ctx.strokeWith = 3;
    ctx.strokeRect(0, 0, 500, 650);
  },
  clearCanvas: function (){
    ctx.clearRect(0, 0, game.canvasWidth, game.canvasHeight)
  }
}


class Tile {
  constructor({row, height}){
    this.width = 100;
    this.height = height? height : 150;
    this.pozX = game.startPoints[row - 1];
    this.pozY = -this.height + 1;
    this.row = row;
  }
  drawTile = () => {
    ctx.fillStyle = "gray";
    ctx.fillRect(this.pozX, this.pozY, this.width, this.height);
  }
  move = () => {
    this.pozY += game.speed;
  }
  delete = () => {
    //todo: add delete func
  }
}


function updateGameLogic() {
  game.generateTiles();

  game.clearCanvas();
  game.tiles.forEach(tile => {
    tile.drawTile();
    tile.move();
  });
  game.buildForeground();
}

window.addEventListener('keydown', (e) => {
  if(e.key == 'a'){
    let hit = false;
    let currentTile = null;
    game.tiles.forEach(tile => {
      if(tile.row == 1 && (tile.pozY > 500 - tile.height && tile.pozY < 500)){
        hit = true;
        currentTile = tile
      }
    });

    if(hit){
      currentTile.delete();
    }
  }
});

setInterval(updateGameLogic, tickRate);