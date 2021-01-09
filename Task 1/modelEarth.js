function setupEarthBuffers(){
  pwgl.earthVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.earthVertexPositionBuffer);

  var sph_quality = 25; //Quality that the sphere is rendered/ Number of vertices per half sphere
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

  pwgl.EARTH_VERTEX_POS_BUF_ITEM_SIZE = 3;
  pwgl.EARTH_VERTEX_POS_BUF_NUM_ITEMS = Math.pow(sph_quality, 2)*3;

  pwgl.earthVertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pwgl.earthVertexIndexBuffer);

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

  pwgl.EARTH_VERTEX_INDEX_BUF_ITEM_SIZE = 1;
  pwgl.EARTH_VERTEX_INDEX_BUF_NUM_ITEMS = Math.pow(sph_quality, 2)*6;

  pwgl.earthVertexTextureCoordinateBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.earthVertexTextureCoordinateBuffer);

  //Think about how the coordinates are assigned. Ref. vertex coords.
  var textureCoordinates = [];

  const aux = 1.0/(sph_quality-1);

  for (j = 0; j < sph_quality; j++)
  {
    for (i = 0; i < sph_quality; i++)
    {
      var p1 = i*aux;
      var p2 = j*aux;
      textureCoordinates.push(p1);
      textureCoordinates.push(p2);
    }
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
  pwgl.EARTH_VERTEX_TEX_COORD_BUF_ITEM_SIZE = 2;
  pwgl.EARTH_VERTEX_TEX_COORD_BUF_NUM_ITEMS = Math.pow(sph_quality, 2)*2;
}

function drawEarth(rgba){
  // Disable vertex attrib array and use constant color for the earth.
  gl.disableVertexAttribArray(pwgl.vertexColorAttributeLoc);
  // Set color
  gl.vertexAttrib4f(pwgl.vertexColorAttributeLoc, rgba[0], rgba[1], rgba[2], rgba[3]);
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.earthVertexPositionBuffer);
  gl.vertexAttribPointer(pwgl.vertexPositionAttributeLoc, pwgl.EARTH_VERTEX_POS_BUF_ITEM_SIZE, gl.FLOAT, false, 0, 0);
  //gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, earthVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

  //Bind Textures
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.earthVertexTextureCoordinateBuffer);
  gl.vertexAttribPointer(pwgl.vertexTextureAttributeLoc, pwgl.EARTH_VERTEX_TEX_COORD_BUF_ITEM_SIZE, gl.FLOAT, false, 0, 0);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, pwgl.earthTexture);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pwgl.earthVertexIndexBuffer);
  gl.drawElements(gl.TRIANGLES, pwgl.EARTH_VERTEX_INDEX_BUF_NUM_ITEMS, gl.UNSIGNED_SHORT, 0);
}
