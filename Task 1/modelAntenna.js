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
    point = (j-3) * Math.PI/2 / cir_quality;
    sine = Math.sin(point)*2;
    cosine = Math.cos(point)*2;
    for (i = 0; i <= cir_quality; i++)
    {
      point2 = i * 2 * Math.PI / cir_quality;
      sine2 = Math.sin(point2);
      cosine2 = Math.cos(point2);
      earthVertexPosition.push(sine2 * sine);  // X
      earthVertexPosition.push(cosine);       // Y
      earthVertexPosition.push(cosine2 * sine);  // Z
    }
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
      v1 = j * (cir_quality+1) + i;
      v2 = v1 + (cir_quality+1);
      earthVertexIndices.push(v1);
      earthVertexIndices.push(v2);
      earthVertexIndices.push(v1 + 1);
      earthVertexIndices.push(v1 + 1);
      earthVertexIndices.push(v2);
      earthVertexIndices.push(v2 + 1);
    }
  }

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(earthVertexIndices), gl.STATIC_DRAW);
  earthVertexIndexBuffer.itemSize = 1;
  earthVertexIndexBuffer.numberOfItems = Math.pow(cir_quality, 2)*6; //36;
}

function drawAntenna(rgba){
  gl.disableVertexAttribArray(shaderProgram.vertexColorAttribute);
  // Set color
  gl.vertexAttrib4f(shaderProgram.vertexColorAttribute, rgba[0], rgba[1], rgba[2], rgba[3]);
  gl.bindBuffer(gl.ARRAY_BUFFER, earthVertexPositionBuffer);
  gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, earthVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, earthVertexIndexBuffer);
  gl.drawElements(gl.TRIANGLES, earthVertexIndexBuffer.numberOfItems, gl.UNSIGNED_SHORT, 0);
}
