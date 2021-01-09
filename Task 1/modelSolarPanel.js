//------------- SETUP BUFFERS --------------------
function setupSolarPanelBuffers(){
  pwgl.solarPanelVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.solarPanelVertexPositionBuffer);

  //1x2 Rectangle
  var solarPanelVertexPosition = [
    0.5,   0.05,  1.0, //v0
    -0.5,  0.05,  1.0, //v1
    -0.5, -0.05,  1.0, //v2
    0.5,  -0.05,  1.0, //v3
    0.5,   0.05, -1.0, //v4
    -0.5,  0.05, -1.0, //v5
    -0.5, -0.05, -1.0, //v6
    0.5,  -0.05, -1.0, //v7
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(solarPanelVertexPosition), gl.STATIC_DRAW);

  pwgl.SOLAR_VERTEX_POS_BUF_ITEM_SIZE = 3;
  pwgl.SOLAR_VERTEX_POS_BUF_NUM_ITEMS = 8;

  pwgl.solarPanelVertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pwgl.solarPanelVertexIndexBuffer);

  var solarPanelVertexIndices = [
    0, 1, 2,	0, 2, 3,  // Front face
    4, 6, 5,  4, 7, 6,  // Back face
    1, 5, 6, 	1, 6, 2,	//left
    0, 3, 7, 	0, 7, 4,	//right
    0, 5, 1, 	0, 4, 5,	//top
    3, 2, 6, 	3, 6, 7 	//bottom
  ];

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(solarPanelVertexIndices), gl.STATIC_DRAW);

  pwgl.SOLAR_VERTEX_INDEX_BUF_ITEM_SIZE = 1;
  pwgl.SOLAR_VERTEX_INDEX_BUF_NUM_ITEMS = 36;
}

function setupMainRodBuffers(){
  pwgl.rodVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.rodVertexPositionBuffer);

  //0.2x0.2x0.5 Rectangle
  var rodVertexPosition = [
    0.2,   0.2,  0.5, //v0
    -0.2,  0.2,  0.5, //v1
    -0.2, -0.2,  0.5, //v2
    0.2,  -0.2,  0.5, //v3
    0.2,   0.2, -0.5, //v4
    -0.2,  0.2, -0.5, //v5
    -0.2, -0.2, -0.5, //v6
    0.2,  -0.2, -0.5, //v7
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(rodVertexPosition), gl.STATIC_DRAW);

  pwgl.MAINROD_VERTEX_POS_BUF_ITEM_SIZE = 3;
  pwgl.MAINROD_VERTEX_POS_BUF_NUM_ITEMS = 8;

  pwgl.rodVertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pwgl.rodVertexIndexBuffer);

  var rodVertexIndices = [
    0, 1, 2,	0, 2, 3,  // Front face
    4, 6, 5,  4, 7, 6,  // Back face
    1, 5, 6, 	1, 6, 2,	//left
    0, 3, 7, 	0, 7, 4,	//right
    0, 5, 1, 	0, 4, 5,	//top
    3, 2, 6, 	3, 6, 7 	//bottom
  ];

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(rodVertexIndices), gl.STATIC_DRAW);

  pwgl.MAINROD_VERTEX_INDEX_BUF_ITEM_SIZE = 1;
  pwgl.MAINROD_VERTEX_INDEX_BUF_NUM_ITEMS = 36;
}

function setupAntennaRodBuffers(){
  pwgl.antennaRodVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.antennaRodVertexPositionBuffer);

  //0.2x0.2x0.5 Rectangle
  var antennaRodVertexPosition = [
    0.2,   0.2,  0.5, //v0
    -0.2,  0.2,  0.5, //v1
    -0.2, -0.2,  0.5, //v2
    0.2,  -0.2,  0.5, //v3
    0.2,   0.2, -0.5, //v4
    -0.2,  0.2, -0.5, //v5
    -0.2, -0.2, -0.5, //v6
    0.2,  -0.2, -0.5, //v7
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(antennaRodVertexPosition), gl.STATIC_DRAW);

  pwgl.ANTENNAROD_VERTEX_POS_BUF_ITEM_SIZE = 3;
  pwgl.ANTENNAROD_VERTEX_POS_BUF_NUM_ITEMS = 8;

  pwgl.antennaRodVertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pwgl.antennaRodVertexIndexBuffer);

  var antennaRodVertexIndices = [
    0, 1, 2,	0, 2, 3,  // Front face
    4, 6, 5,  4, 7, 6,  // Back face
    1, 5, 6, 	1, 6, 2,	//left
    0, 3, 7, 	0, 7, 4,	//right
    0, 5, 1, 	0, 4, 5,	//top
    3, 2, 6, 	3, 6, 7 	//bottom
  ];

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(antennaRodVertexIndices), gl.STATIC_DRAW);

  pwgl.ANTENNAROD_VERTEX_INDEX_BUF_ITEM_SIZE = 1;
  pwgl.ANTENNAROD_VERTEX_INDEX_BUF_NUM_ITEMS = 36;
}

//------------- DRAW MODELS --------------------
function drawSolarPanel(rgba){
  // Disable vertex attrib array and use constant color for the solarPanel.
  gl.disableVertexAttribArray(pwgl.vertexColorAttributeLoc);
  // Set color
  gl.vertexAttrib4f(pwgl.vertexColorAttributeLoc, rgba[0], rgba[1], rgba[2], rgba[3]);
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.solarPanelVertexPositionBuffer);
  gl.vertexAttribPointer(pwgl.vertexPositionAttributeLoc2, pwgl.SOLAR_VERTEX_POS_BUF_ITEM_SIZE, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pwgl.solarPanelVertexIndexBuffer);
  gl.drawElements(gl.TRIANGLES, pwgl.SOLAR_VERTEX_INDEX_BUF_NUM_ITEMS, gl.UNSIGNED_SHORT, 0);
}

function drawMainRod(rgba){
  // Disable vertex attrib array and use constant color for the rod.
  gl.disableVertexAttribArray(pwgl.vertexColorAttributeLoc);
  // Set color
  gl.vertexAttrib4f(pwgl.vertexColorAttributeLoc, rgba[0], rgba[1], rgba[2], rgba[3]);
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.rodVertexPositionBuffer);
  gl.vertexAttribPointer(pwgl.vertexPositionAttributeLoc2, pwgl.MAINROD_VERTEX_POS_BUF_ITEM_SIZE, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pwgl.rodVertexIndexBuffer);
  gl.drawElements(gl.TRIANGLES, pwgl.MAINROD_VERTEX_INDEX_BUF_NUM_ITEMS, gl.UNSIGNED_SHORT, 0);
}

function drawAntennaRod(rgba){
  // Disable vertex attrib array and use constant color for the rod.
  gl.disableVertexAttribArray(pwgl.vertexColorAttributeLoc);
  // Set color
  gl.vertexAttrib4f(pwgl.vertexColorAttributeLoc, rgba[0], rgba[1], rgba[2], rgba[3]);
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.antennaRodVertexPositionBuffer);
  gl.vertexAttribPointer(pwgl.vertexPositionAttributeLoc2, pwgl.ANTENNAROD_VERTEX_POS_BUF_ITEM_SIZE, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pwgl.antennaRodVertexIndexBuffer);
  gl.drawElements(gl.TRIANGLES, pwgl.ANTENNAROD_VERTEX_INDEX_BUF_NUM_ITEMS, gl.UNSIGNED_SHORT, 0);
}
