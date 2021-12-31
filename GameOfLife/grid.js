class grid {
   constructor(scale = 20) {
      this.scale = scale;
      this.cols = width / this.scale;
      this.rows = height / this.scale;
      this.cell = new Array(this.cols);
      for (let i=0; i<this.cols; i++) {
         this.cell[i] = new Array(this.rows); 
      }
   }
   
   init() {
      for (let i=0; i<this.cols; i++) {
         for (let j=0; j<this.rows; j++) {
            this.cell[i][j] = floor(random(2));
         }
      }
   }
   
   Clear() {
      for (let i=0; i<this.cols; i++) {
         for (let j=0; j<this.rows; j++) {
            this.cell[i][j] = 0;
         }
      }
   }
   
   Set(x, y) {      
      if (x<0 || x>width || y<0 || y>height) { return ; }
      for (let i=0; i<this.cols; i++) {
         for (let j=0; j<this.rows; j++) {
            if (x>=i*this.cols && x<=i*this.cols+this.scale && y>=j*this.rows && y<=j*this.rows+this.scale) {
               this.cell[i][j] = 1;
               this.show();
               return ;
            }
         }
      }
   }
   
   countNeighbors() {
      let arr = new Array(this.cols);
      for (let i=0; i<this.cols; i++) {
         arr[i] = new Array(this.rows); 
      }
      
      for (let i=0; i<this.cols; i++) {
         for (let j=0; j<this.rows; j++) {
            let sum = 0;
            for (let x=-1; x<2; x++) {
               for (let y=-1; y<2; y++) {
                  let m = (i + x + this.cols) % this.cols;
                  let n = (j + y + this.rows) % this.rows;
                  sum += this.cell[m][n];
               }
            }
            sum -= this.cell[i][j];
            arr[i][j] = sum;
         }
      }
      return arr;
   }
   
   checkRules(i, j, n) {
       if (n == 3)          { this.cell[i][j] = 1; }
       else if (n<2 || n>3) { this.cell[i][j] = 0; }
   }
   
   nextGen() {
      let neighbor = this.countNeighbors();
      for (let i=0; i<this.cols; i++) {
         for (let j=0; j<this.rows; j++) {
            this.checkRules(i, j, neighbor[i][j]);            
         }
      }
   }
   
   show() {
      for (let i=0; i<this.cols; i++) {
         for (let j=0; j<this.rows; j++) {
            if (this.cell[i][j] == 1) {
               stroke(0);
               fill(255);
               if (square == true)  { rect(i*this.scale, j*this.scale, this.scale, this.scale); }
               else                 { ellipse(i*this.scale+this.scale/2, j*this.scale+this.scale/2, this.scale); }
            }  
       }
      }
   }
}
