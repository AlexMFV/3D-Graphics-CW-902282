//------------- SETUP BUFFERS --------------------
function setupSolarPanelBuffers(){
  solarPanelVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, solarPanelVertexPositionBuffer);

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

  solarPanelVertexPositionBuffer.itemSize = 3;
  solarPanelVertexPositionBuffer.numberOfItems = 8;

  solarPanelVertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, solarPanelVertexIndexBuffer);

  var solarPanelVertexIndices = [
    0, 1, 2,	0, 2, 3,  // Front face
    4, 6, 5,  4, 7, 6,  // Back face
    1, 5, 6, 	1, 6, 2,	//left
    0, 3, 7, 	0, 7, 4,	//right
    0, 5, 1, 	0, 4, 5,	//top
    3, 2, 6, 	3, 6, 7 	//bottom
  ];

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(solarPanelVertexIndices), gl.STATIC_DRAW);
  solarPanelVertexIndexBuffer.itemSize = 1;
  solarPanelVertexIndexBuffer.numberOfItems = 36;
}

//------------- DRAW MODELS --------------------
function drawSolarPanel(rgba){
  // Disable vertex attrib array and use constant color for the solarPanel.
  gl.disableVertexAttribArray(shaderProgram.vertexColorAttribute);
  // Set color
  gl.vertexAttrib4f(shaderProgram.vertexColorAttribute, rgba[0], rgba[1], rgba[2], rgba[3]);
  gl.bindBuffer(gl.ARRAY_BUFFER, solarPanelVertexPositionBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, solarPanelVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, solarPanelVertexIndexBuffer);
  gl.drawElements(gl.TRIANGLES, solarPanelVertexIndexBuffer.numberOfItems, gl.UNSIGNED_SHORT, 0);
}
