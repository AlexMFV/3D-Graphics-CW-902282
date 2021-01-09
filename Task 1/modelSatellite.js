//------------- SETUP BUFFERS --------------------
function setupSatelliteBodyBuffers(){
  pwgl.satBodyVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.satBodyVertexPositionBuffer);

  var satBodyVertexPosition = [
  -1.0, -1.0,  1.0,
   1.0, -1.0,  1.0,
   1.0,  1.0,  1.0,
  -1.0,  1.0,  1.0,

  // Back face
  -1.0, -1.0, -1.0,
  -1.0,  1.0, -1.0,
   1.0,  1.0, -1.0,
   1.0, -1.0, -1.0,

  // Top face
  -1.0,  1.0, -1.0,
  -1.0,  1.0,  1.0,
   1.0,  1.0,  1.0,
   1.0,  1.0, -1.0,

  // Bottom face
  -1.0, -1.0, -1.0,
   1.0, -1.0, -1.0,
   1.0, -1.0,  1.0,
  -1.0, -1.0,  1.0,

  // Right face
   1.0, -1.0, -1.0,
   1.0,  1.0, -1.0,
   1.0,  1.0,  1.0,
   1.0, -1.0,  1.0,

  // Left face
  -1.0, -1.0, -1.0,
  -1.0, -1.0,  1.0,
  -1.0,  1.0,  1.0,
  -1.0,  1.0, -1.0,
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(satBodyVertexPosition), gl.STATIC_DRAW);

  pwgl.SATELLITE_VERTEX_POS_BUF_ITEM_SIZE = 3;
  pwgl.SATELLITE_VERTEX_POS_BUF_NUM_ITEMS = 8;

  pwgl.satBodyVertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pwgl.satBodyVertexIndexBuffer);

  var satBodyVertexIndices = [
    0,  1,  2,      0,  2,  3,    // front
   4,  5,  6,      4,  6,  7,    // back
   8,  9,  10,     8,  10, 11,   // top
   12, 13, 14,     12, 14, 15,   // bottom
   16, 17, 18,     16, 18, 19,   // right
   20, 21, 22,     20, 22, 23   // left
  ];

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(satBodyVertexIndices), gl.STATIC_DRAW);
  pwgl.SATELLITE_VERTEX_INDEX_BUF_ITEM_SIZE = 1;
  pwgl.SATELLITE_VERTEX_INDEX_BUF_NUM_ITEMS = 36;

  const faceColors = [
    [0.9,  0.9,  0.9,  1.0],    // Front face: white
    [0.0,  0.0,  0.0,  1.0],    // Back face: red
    [0.9,  0.9,  0.9,  1.0],    // Top face: green
    [0.9,  0.9,  0.9,  1.0],    // Bottom face: blue
    [0.9,  0.9,  0.9,  1.0],    // Right face: yellow
    [0.9,  0.9,  0.9,  1.0],    // Left Face:
  ];

  var colors = [];

  for (var j = 0; j < faceColors.length; ++j) {
    const c = faceColors[j];

    // Repeat each color four times for the four vertices of the face
    colors = colors.concat(c, c, c, c);
  }

  pwgl.satBodyVertexColorBuffer = gl.createBuffer();
  pwgl.SATELLITE_VERTEX_COLOR_BUF_COLOR_SIZE = 4;

  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.satBodyVertexColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  //Defining Normals
  pwgl.satBodyVertexNormalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.satBodyVertexNormalBuffer);

  var normalData = [
    // Front
     0.0,  0.0,  1.0,
     0.0,  0.0,  1.0,
     0.0,  0.0,  1.0,
     0.0,  0.0,  1.0,

    // Back
     0.0,  0.0, -1.0,
     0.0,  0.0, -1.0,
     0.0,  0.0, -1.0,
     0.0,  0.0, -1.0,

    // Top
     0.0,  1.0,  0.0,
     0.0,  1.0,  0.0,
     0.0,  1.0,  0.0,
     0.0,  1.0,  0.0,

    // Bottom
     0.0, -1.0,  0.0,
     0.0, -1.0,  0.0,
     0.0, -1.0,  0.0,
     0.0, -1.0,  0.0,

    // Right
     1.0,  0.0,  0.0,
     1.0,  0.0,  0.0,
     1.0,  0.0,  0.0,
     1.0,  0.0,  0.0,

    // Left
    -1.0,  0.0,  0.0,
    -1.0,  0.0,  0.0,
    -1.0,  0.0,  0.0,
    -1.0,  0.0,  0.0
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalData), gl.STATIC_DRAW);
  pwgl.SATELLITE_VERTEX_NORMAL_BUF_ITEM_SIZE = 3;
  pwgl.SATELLITE_VERTEX_NORMAL_BUF_NUM_ITEMS = 24;
}

//------------- DRAW MODELS --------------------
function drawSatelliteBody(rgba){
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.satBodyVertexPositionBuffer);
  gl.vertexAttribPointer(pwgl.vertexPositionAttributeLoc2, pwgl.SATELLITE_VERTEX_POS_BUF_ITEM_SIZE, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(pwgl.vertexPositionAttributeLoc2);

  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.satBodyVertexColorBuffer);
  gl.enableVertexAttribArray(pwgl.vertexColorAttributeLoc);
  gl.vertexAttribPointer(pwgl.vertexColorAttributeLoc, pwgl.SATELLITE_VERTEX_COLOR_BUF_COLOR_SIZE, gl.FLOAT, true, 0, 0);

  //Bind normals
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.satBodyVertexNormalBuffer);
  gl.vertexAttribPointer(pwgl.vertexNormalAttributeLoc2, pwgl.SATELLITE_VERTEX_NORMAL_BUF_ITEM_SIZE, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pwgl.satBodyVertexIndexBuffer);
  gl.drawElements(gl.TRIANGLES, pwgl.SATELLITE_VERTEX_INDEX_BUF_NUM_ITEMS, gl.UNSIGNED_SHORT, 0);
}
