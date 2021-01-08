function setupEarthBuffers(){
  earthVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, earthVertexPositionBuffer);

  var sph_quality = 20; //Quality that the sphere is rendered/ Number of vertices per half sphere
  var i, ai, si, ci;
  var j, aj, sj, cj;
  var p1, p2;
  var earthVertexPosition = [];

  for (j = 0; j <= sph_quality; j++)
  {
    aj = j * Math.PI / sph_quality;
    sj = Math.sin(aj);
    cj = Math.cos(aj);
    for (i = 0; i <= sph_quality; i++)
    {
      ai = i * 2 * Math.PI / sph_quality;
      si = Math.sin(ai);
      ci = Math.cos(ai);
      earthVertexPosition.push(si * sj);  // X
      earthVertexPosition.push(cj);       // Y
      earthVertexPosition.push(ci * sj);  // Z
    }
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(earthVertexPosition), gl.STATIC_DRAW);

  earthVertexPositionBuffer.itemSize = 3;
  earthVertexPositionBuffer.numberOfItems = Math.pow(sph_quality, 2)*3;

  earthVertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, earthVertexIndexBuffer);

  var earthVertexIndices = [];
  for (j = 0; j < sph_quality; j++)
  {
    for (i = 0; i < sph_quality; i++)
    {
      p1 = j * (sph_quality+1) + i;
      p2 = p1 + (sph_quality+1);
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
  earthVertexIndexBuffer.numberOfItems = Math.pow(sph_quality, 2)*6; //36;
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
