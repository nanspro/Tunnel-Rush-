function createObstacles(type){
  var obj={};
  var numfaces;
  var rotateX=0, rotateY=0, rotateZ=0;
   var positionX=0, positionY=0, positionZ=0;
   var faceColors=[], imgsrc, positions, textures;
  var p1=0.4*Math.cos(67.5 * Math.PI/180);
  var p2=0.8*Math.sin(67.5 * Math.PI/180);
   var p3=0.8*Math.cos(Math.PI/8);
    var p4=0.8*Math.cos(3*Math.PI/8);
          var p5=0.8*Math.sin(Math.PI/8);
    var p6=0.8*Math.sin(3*Math.PI/8);
 var m1=0.0;
 var m2=1.0;

  switch(type){
  case 1:

  textures = [
          m1, m1,
          m2, m1,
          m2, m2,
          m1, m2
      ];
      positions = [
          p1, p2, 0.0,
          p1, -p2, 0.0,
          -p1, p2, 0.0,
          -p1, -p2, 0.0,
      ];

      
      var str="obstacle1.jpg";
      imgsrc = str;
      numfaces = 1;
      numfaces++;
      vertexCount = 5;
      vertexCount++;

    break;

    case 2:
   
    

     

      textures = [
          m1, m1,
          m2, m1,
          0.5, m2,

          m1, m1,
          m2, m1,
          0.5, m2,
      ];


       positions = [
          p3, -p5, 0.0,
          p4, -p6, 0.0,
         -p3, -p5, 0.0,

         p4, -p6, 0.0,
        -p3, -p5, 0.0,
        -p4, -p6, 0.0,
      ];
      var g="obstacle2.jpg";
      imgsrc = g;
       numfaces = 1;
      numfaces++;
      vertexCount = 5;
      vertexCount++;
    break; 

    case 3:
     

      textures = [
          m1, m1,
          m2, m1,
          0.5, m2,

          m1, m1,
          m2, m1,
          0.5, m2,
      ];

       positions = [
        0.0, 0.0, 0.0,
        p4, p6, 0.0,
        -p4, p6, 0.0,

        0.0, 0.0, 0.0,
        p4, -p6, 0.0,
        -p4, -p6, 0.0,
      ];

      var str="obstacle3.jpg";
      imgsrc = str;
      numfaces = 1;
      numfaces++;
      vertexCount = 5;
      vertexCount++;
      break;

    case 4:
     
      textures = [
          m1, m1,
          m2, m1,
          0.5, m2,

          m1, m1,
          m2, m1,
          0.5, m2,

          0.0, 0.0,
          1.0, 0.0,
          0.5, 1.0,

          0.0, 0.0,
          1.0, 0.0,
          0.5, 1.0,
      ];


       positions = [
          p3, -p5, 0.0,
          p4 -p6, 0.0,
         -p3, -p5, 0.0,

         p4, -p6, 0.0,
        -p3, -p5, 0.0,
        -p4, -p6, 0.0,

        p3, p5, 0.0,
        p4, p6, 0.0,
       -p3, p5, 0.0,

       p4, p6, 0.0,
      -p3, p5, 0.0,
      -p4, p6, 0.0
      ];


       var str="obstacle4.jpg";
      imgsrc = str;
      numfaces = 3;
      numfaces++;
      vertexCount = 11;
      vertexCount++;

      break;
    }
var i=0;
    while(i<numfaces){
      faceColors.push([1.0, 0.0, 0.0, 1.0]);
      i++;
    }

    var indices=[];
    var j=0;
    if(type!=1){
      var i=0;
      while(i<numfaces){
          indices = indices.concat(j,j+1,j+2);
          j+=3;
          i++;
      }
    }
    else{
      var i=0;
      while(i<numfaces){
          indices = indices.concat(j,j+1,j+2,j+1,j+2,j+3);
          j+=4;
          i++;

      }
    }

var m=type;
    obj.type = m;
var l=positions;
    obj.positions = l;


    obj.positionX = positionX;
    obj.positionY = positionY;
    var t=textures;
    obj.textures = t;
    var z=positionZ;
    obj.positionZ = z;
    var co=vertexCount;
    var zz=rotateZ;
    obj.rotateZ = zz;
    var ii=imgsrc;
    obj.imgsrc = ii;
    obj.vertexCount = co;
    obj.indices = indices;
    var xx=rotateX;
    obj.rotateX = xx;
    obj.rotateY = rotateY;

var fc=faceColors;
    obj.faceColors = fc;


    return obj;
}
