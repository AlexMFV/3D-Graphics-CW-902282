function setupEarthBuffers(){
  earthVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, earthVertexPositionBuffer);

  var earthVertexPosition = [
    1.0,  1.0,  1.0, //v0
    -1.0,  1.0,  1.0, //v1
    -1.0, -1.0,  1.0, //v2
    1.0, -1.0,  1.0, //v3
    1.0,  1.0, -1.0, //v4
    -1.0,  1.0, -1.0, //v5
    -1.0, -1.0, -1.0, //v6
    1.0, -1.0, -1.0, //v7
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(earthVertexPosition), gl.STATIC_DRAW);

  earthVertexPositionBuffer.itemSize = 3;
  earthVertexPositionBuffer.numberOfItems = 8;

  earthVertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, earthVertexIndexBuffer);

  var earthVertexIndices = [
    0, 1, 2,	0, 2, 3,  // Front face
    4, 6, 5,  4, 7, 6,  // Back face
    1, 5, 6, 	1, 6, 2,	//left
    0, 3, 7, 	0, 7, 4,	//right
    0, 5, 1, 	0, 4, 5,	//top
    3, 2, 6, 	3, 6, 7 	//bottom
  ];

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(earthVertexIndices), gl.STATIC_DRAW);
  earthVertexIndexBuffer.itemSize = 1;
  earthVertexIndexBuffer.numberOfItems = 36;
}

function drawEarth(rgba){
  // Disable vertex attrib array and use constant color for the earth.
  gl.disableVertexAttribArray(shaderProgram.vertexColorAttribute);
  // Set color
  gl.vertexAttrib4f(shaderProgram.vertexColorAttribute, rgba[0], rgba[1], rgba[2], rgba[3]);
  gl.bindBuffer(gl.ARRAY_BUFFER, earthVertexPositionBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, earthVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, earthVertexIndexBuffer);
  gl.drawElements(gl.TRIANGLES, earthVertexIndexBuffer.numberOfItems, gl.UNSIGNED_SHORT, 0);
}
