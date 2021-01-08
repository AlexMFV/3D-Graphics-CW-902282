//------------- SETUP BUFFERS --------------------
function setupSatelliteBodyBuffers(){
  satBodyVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, satBodyVertexPositionBuffer);

  var satBodyVertexPosition = [
    1.0,  1.0,  1.0, //v0
    -1.0,  1.0,  1.0, //v1
    -1.0, -1.0,  1.0, //v2
    1.0, -1.0,  1.0, //v3
    1.0,  1.0, -1.0, //v4
    -1.0,  1.0, -1.0, //v5
    -1.0, -1.0, -1.0, //v6
    1.0, -1.0, -1.0, //v7
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(satBodyVertexPosition), gl.STATIC_DRAW);

  satBodyVertexPositionBuffer.itemSize = 3;
  satBodyVertexPositionBuffer.numberOfItems = 8;

  satBodyVertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, satBodyVertexIndexBuffer);

  var satBodyVertexIndices = [
    0, 1, 2,	0, 2, 3,  // Front face
    4, 6, 5,  4, 7, 6,  // Back face
    1, 5, 6, 	1, 6, 2,	//left
    0, 3, 7, 	0, 7, 4,	//right
    0, 5, 1, 	0, 4, 5,	//top
    3, 2, 6, 	3, 6, 7 	//bottom
  ];

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(satBodyVertexIndices), gl.STATIC_DRAW);
  satBodyVertexIndexBuffer.itemSize = 1;
  satBodyVertexIndexBuffer.numberOfItems = 36;

  const colors = [
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    1.0,  1.0,  1.0,  1.0,    // white
    0.0,  0.0,  0.0,  1.0,    // black
    0.0,  0.0,  0.0,  1.0,    // black
    0.0,  0.0,  0.0,  1.0,    // black
    0.0,  0.0,  0.0,  1.0,    // black
  ];

  satBodyVertexColorBuffer = gl.createBuffer();
  satBodyVertexColorBuffer.colorSize = 4;
  gl.bindBuffer(gl.ARRAY_BUFFER, satBodyVertexColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
}

//------------- DRAW MODELS --------------------
function drawSatelliteBody(rgba){
  gl.bindBuffer(gl.ARRAY_BUFFER, satBodyVertexPositionBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, satBodyVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

  gl.bindBuffer(gl.ARRAY_BUFFER, satBodyVertexColorBuffer);
  gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
  gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, satBodyVertexColorBuffer.colorSize, gl.FLOAT, true, 0, 0);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, satBodyVertexIndexBuffer);
  gl.drawElements(gl.TRIANGLES, satBodyVertexIndexBuffer.numberOfItems, gl.UNSIGNED_SHORT, 0);
}
