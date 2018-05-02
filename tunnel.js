function createTunnel(num_oct){
  var positions=[],r=0.8,obj={};
  var q=0;
  while(q<num_oct){
    var angle=22.5;
    var i=1;
    while(i<=8){
      var x=1.0-2*q;
      var Q=Math.PI/180.0;
        positions = positions.concat(
          r*Math.cos(angle*Q),
          r*Math.sin(angle*Q),
          x,

          r*Math.cos((angle-45)*Q),
          r*Math.sin((angle-45)*Q),
          x,

          r*Math.cos(angle*Q),
          r*Math.sin(angle*Q),
          x-2.0,

          r*Math.cos((angle-45)*Q),
          r*Math.sin((angle-45)*Q),
          x-2.0,
       );
       angle+=45.0;
       i++;
    }
    q++;
  }
var mm=[1.0, 1.0, 1.0, 1.0];
var mn=[1.0,  0.0,  0.0,  1.0];
var mmm=[0.0,  0.9,  0.8,  1.0];
var mmn=[0.1,  1.0,  0.4,  1.0]; 
  const faceColors = [
    mm,    
    mn,    
    [0.0,  1.0,  0.0,  1.0],    // Top face: green
    [0.0,  0.0,  1.0,  1.0],    // Bottom face: blue
    [1.0,  1.0,  0.0,  1.0],    
    [1.0,  0.0,  1.0,  1.0],    
    mmm,
    mmn
  ];

var t=[0.0, 0.0, 0.0, 1.0];
var v=[1.0, 1.0, 1.0, 1.0];
var tt=[0.0, 0.0, 0.0, 1.0];
var vv= [1.0, 1.0, 1.0, 1.0];
  const blackwhite = [
    t,
    v,
    [0.0, 0.0, 0.0, 1.0],
    [1.0, 1.0, 1.0, 1.0],
    [0.0, 0.0, 0.0, 1.0],
    [1.0, 1.0, 1.0, 1.0],
    tt,
    vv
  ];

var r=0;
var j=r;

  var k=0;

  var indices=[];
  
  while(k<num_oct){
    var i=0;
    while(i<8){
        var ind = indices.concat(j,j+1,j+2,j+1,j+2,j+3);
        indices=ind;
        j+=4;
        i++;
    }
    k++;
  }

  var textures = [
    // Front face
          0.0, 0.0,
          1.0, 0.0,
          1.0, 1.0,
          0.0, 1.0,

          // Back face
          1.0, 0.0,
          1.0, 1.0,
          0.0, 1.0,
          0.0, 0.0,

          // Top face
          0.0, 1.0,
          0.0, 0.0,
          1.0, 0.0,
          1.0, 1.0,

          // Bottom face
          1.0, 1.0,
          0.0, 1.0,
          0.0, 0.0,
          1.0, 0.0,

          // Right face
          1.0, 0.0,
          1.0, 1.0,
          0.0, 1.0,
          0.0, 0.0,

          // Left face
          0.0, 0.0,
          1.0, 0.0,
          1.0, 1.0,
          0.0, 1.0,

          0.0, 0.0,
          1.0, 0.0,
          1.0, 1.0,
          0.0, 1.0,

          0.0, 0.0,
          1.0, 0.0,
          1.0, 1.0,
          0.0, 1.0,
  ];
  var i=1;
  while(i<num_oct){
    var j=0;
      while(j<64){
          textures = textures.concat(textures[j]);
      j++;
      }
      i++;
  }
 var l =textures;
 var m=positions;
  obj.textures = l;
var m=positions;


  obj.positions = m;
  obj.num_oct = num_oct;
  var k= indices;
  obj.indices = k;
  obj.rotateX = 0;
  obj.faceColors = faceColors;
  obj.rotateY = 0;
  obj.rotateZ = 0;
  obj.positionY = 0.5;
  obj.positionZ = 0;


  obj.positionX = 0;

  obj.imgsrc = "brick.jpg";

  obj.blackwhite = blackwhite;

  return obj;
}
