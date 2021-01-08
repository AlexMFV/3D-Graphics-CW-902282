function setupAntennaBuffers(){
  earthVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, earthVertexPositionBuffer);

  var cir_quality = 20; //Quality that the sphere is rendered/ Number of vertices per half sphere
  var i, ai, si, ci;
  var j, aj, sj, cj;
  var p1, p2;
  var earthVertexPosition = [];

  for (j = 0; j <= cir_quality; j++)
  {
    point = j * 2 * Math.PI / cir_quality;
    sine = Math.sin(point)/2;
    cosine = Math.cos(point)/2;
    earthVertexPosition.push(sine);   // X
    earthVertexPosition.push(cosine); // Y
    earthVertexPosition.push(0);      // Z
  }

  for (j = 0; j <= cir_quality; j++)
  {
    point = j * 2 * Math.PI / cir_quality;
    sine = Math.sin(point)*2;
    cosine = Math.cos(point)*2;
    earthVertexPosition.push(sine);   // X
    earthVertexPosition.push(cosine); // Y
    earthVertexPosition.push(-0.5);      // Z
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(earthVertexPosition), gl.STATIC_DRAW);

  earthVertexPositionBuffer.itemSize = 3;
  earthVertexPositionBuffer.numberOfItems = Math.pow(cir_quality, 2)*3;

  earthVertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, earthVertexIndexBuffer);

  var earthVertexIndices = [];
  for (j = 0; j < cir_quality; j++)
  {
    for (i = 0; i < cir_quality; i++)
    {
      p1 = j * (cir_quality+1) + i;
      p2 = p1 + (cir_quality+1);
      earthVertexIndices.push(p1);
      earthVertexIndices.push(p2);
      earthVertexIndices.push(p1 + 1);
      earthVertexIndices.push(p1 + 1);
      earthVertexIndices.push(p2);
      earthVertexIndices.push(p2 + 1);
    }
  }

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(earthVertexIndices), gl.STATIC_DRAW);
  earthVertexIndexBuffer.itemSize = 1;
  earthVertexIndexBuffer.numberOfItems = Math.pow(cir_quality, 2)*6; //36;
}

function drawAntenna(rgba){
  // Disable vertex attrib array and use constant color for the earth.
  gl.disableVertexAttribArray(shaderProgram.vertexColorAttribute);
  // Set color
  gl.vertexAttrib4f(shaderProgram.vertexColorAttribute, rgba[0], rgba[1], rgba[2], rgba[3]);
  gl.bindBuffer(gl.ARRAY_BUFFER, earthVertexPositionBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, earthVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, earthVertexIndexBuffer);
  gl.drawElements(gl.TRIANGLES, earthVertexIndexBuffer.numberOfItems, gl.UNSIGNED_SHORT, 0);
}
