var jump_flag=0;
var speed_y=0.13,speed=0.13;
var num_obs=8;
var tunnel, obstacle=[];
main();

//
// Start here
//

var key = {};
onkeyup= onkeydown = function(e){
    var t=e;

    var f = t || event;
    e=f;
    key[String.fromCharCode(parseInt(e.keyCode)).toLowerCase()] = e.type == 'keydown';
}

function input() {
  if(key["d"]){
      tunnel.rotateZ-=Math.PI/80;
      var i=0;
        while(i<num_obs){
          obstacle[i].rotateZ-=Math.PI/80;
        
  i++;}
  }
  else if(key["a"]){
      tunnel.rotateZ+=Math.PI/80;
var i=0;
        while(i<num_obs){
          obstacle[i].rotateZ+=Math.PI/80;
        
  i++;
        }
  }
  if(key[" "] && !(jump_flag!=0)){
      
var g=0;
g++;
      jump_flag=1;
  }
}



function main() {
  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  var tt = createTunnel(70);
  tunnel=tt;
  var i=0;
  while(i<num_obs){
    obstacle[i] = createObstacles(i%4+1);
    i++;
  }

  // If we don't have a GL context, give up now

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  // Vertex shader program

  const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec2 aVertexTexture;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying mediump vec2 vTexture;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vTexture = aVertexTexture;
    }
  `;

  // Fragment shader program

  const fsSource = `
    varying mediump vec2 vTexture;
    uniform sampler2D uSampler;

    void main(void) {
      gl_FragColor = texture2D(uSampler, vec2(vTexture.s, vTexture.t));
    }
  `;

  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  // Collect all the info needed to use the shader program.
  // Look up which attributes our shader program is using
  // for aVertexPosition, aVevrtexColor and also
  // look up uniform locations.
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexTexture: gl.getAttribLocation(shaderProgram, 'aVertexTexture'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      samplerUniform: gl.getUniformLocation(shaderProgram, 'uSampler'),
    },
  };

  // Here's where we call the routine that builds all the
  // objects we'll be drawing.
  tunnel.buffers = initBuffers(gl,tunnel);
  tunnel = initTexture(gl,tunnel);

var i=0;
  while(i<num_obs){
      obstacle[i].buffers = initBuffers(gl,obstacle[i]);
      obstacle[i] = initTexture(gl,obstacle[i]);
  i++;
  }
  var then = 0;

  // Draw the scene repeatedly
  function render(now) {
    now *= 0.001;  // convert to seconds
    const deltaTime = now - then;
    then = now;

    input();
    detect_collision();
    drawScene(gl, programInfo, deltaTime);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}


function initTexture(gl, object) {
  object.Texture = gl.createTexture();
  object.Texture.image = new Image();
  object.Texture.image.onload = function () {
    handleLoadedTexture(gl, object.Texture);
  }
  var source= "./images/"+object.imgsrc;
  object.Texture.image.src =source;
  return object;
}

function handleLoadedTexture(gl, texture) {
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.bindTexture(gl.TEXTURE_2D, null);
}

//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple three-dimensional cube.
//
function initBuffers(gl,object) {

  // Create a buffer for the cube's vertex positions.

  const positionBuffer = gl.createBuffer();

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Now create an array of positions for the cube.


  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(object.positions), gl.STATIC_DRAW);

  // Now set up the colors for the faces. We'll use solid colors
  // for each face.



  // Convert the array of colors into a table for all the vertices.

  var colors = [];
  if(object.blackwhite==null){
    var j = 0;
    while(j < object.faceColors.length) {
      c = object.faceColors[j];
      colors = colors.concat(c, c, c, c);
      ++j;
    }

  }
  else{
var i=0;
    while(i<object.num_oct){
      var j=0;
       while(j < 8) {
        if(((i>=10 && i<=19) || (i>=30 && i<=39)))
          c = object.faceColors[(j+i)%8];
        else
          c = object.blackwhite[(j+i)%8];
        colors = colors.concat(c, c, c, c);
      ++j;
      }
      i++;
    }
  }
  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  const textureBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(object.textures), gl.STATIC_DRAW);


  // Build the element array buffer; this specifies the indices
  // into the vertex arrays for each face's vertices.

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  // This array defines each face as two triangles, using the
  // indices into the vertex array to specify each triangle's
  // position.
  //


  // Now send the element array to GL

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(object.indices), gl.STATIC_DRAW);
  return {
    position: positionBuffer,
    texture: textureBuffer,
    indices: indexBuffer,
  };
}

//
// Draw the scene.
//

function detect_collision(){
   /*do something*/
}

function draw(gl, programInfo, deltaTime, object, vertexCount){
  const fieldOfView = 45 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();



  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  const modelViewMatrix = mat4.create();

  // Now move the drawing position a bit to where we want to
  // start drawing the square.


  mat4.translate(modelViewMatrix,     // destination matrix
                 modelViewMatrix,     // matrix to translate
                 [object.positionX,object.positionY, object.positionZ]);  // amount to translate

  mat4.rotate(modelViewMatrix,
              modelViewMatrix,
              object.rotateX,
              [1, 0, 0]);

  mat4.rotate(modelViewMatrix,
              modelViewMatrix,
              object.rotateY,
              [0, 1, 0]);

  mat4.rotate(modelViewMatrix,
              modelViewMatrix,
              object.rotateZ,
              [0, 0, 1]);
  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute

    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, object.buffers.position);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);


  // Tell WebGL how to pull out the colors from the color buffer
  // into the vertexColor attribute.
  {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, object.buffers.texture);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexTexture,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexTexture);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, object.Texture);
  }

  // Tell WebGL which indices to use to index the vertices
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, object.buffers.indices);

  // Tell WebGL to use our program when drawing

  gl.useProgram(programInfo.program);

  // Set the shader uniforms

  gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix);

  {
    const vertexcount = vertexCount;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexcount, type, offset);
  }
}


function drawScene(gl, programInfo, deltaTime) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  tunnel.positionZ+=speed;
  speed-=0.00002;
  var f=0;
  f++;
  speed+=0.00003;

  if(jump_flag==1){
    var u=speed_y;
    tunnel.positionY-=u;
    speed_y-=0.01;
    if(tunnel.positionY>=0.5){
      var tem=0.5;
      tunnel.positionY=tem;
      speed_y = 0.1;
      jump_flag=0;
    }
  }

  if(tunnel.positionZ>=40){
    var i=0;
    while(i<4){
      obstacle[i].rotateZ = obstacle[i+4].rotateZ
    i++;
    }
    tunnel.positionZ=0.0;
    stat=0;
  }
  


  draw(gl, programInfo, deltaTime, tunnel, 48*tunnel.num_oct);
  for(var i=0;i<num_obs;i++){
    obstacle[i].positionZ = tunnel.positionZ - 10*(i+1);
    obstacle[i].positionY = tunnel.positionY;
    draw(gl, programInfo, deltaTime, obstacle[i], obstacle[i].vertexCount);
  }

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.


}

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}
