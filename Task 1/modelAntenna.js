function setupAntennaBuffers(){
  pwgl.antennaVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.antennaVertexPositionBuffer);

  var cir_quality = 20; //Quality that the sphere is rendered/ Number of vertices per half sphere
  //var i, ai, si, ci;
  //var j, aj, sj, cj;
  //var p1, p2;
  var antennaVertexPosition = [];

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
      antennaVertexPosition.push(sine2 * sine);  // X
      antennaVertexPosition.push(cosine);       // Y
      antennaVertexPosition.push(cosine2 * sine);  // Z
    }
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(antennaVertexPosition), gl.STATIC_DRAW);

  pwgl.ANTENNA_VERTEX_POS_BUF_ITEM_SIZE = 3;
  pwgl.ANTENNA_VERTEX_POS_BUF_NUM_ITEMS = Math.pow(cir_quality, 2)*3;

  pwgl.antennaVertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pwgl.antennaVertexIndexBuffer);

  var antennaVertexIndices = [];
  for (j = 0; j < cir_quality; j++)
  {
    for (i = 0; i < cir_quality; i++)
    {
      v1 = j * (cir_quality+1) + i;
      v2 = v1 + (cir_quality+1);
      antennaVertexIndices.push(v1);
      antennaVertexIndices.push(v2);
      antennaVertexIndices.push(v1 + 1);
      antennaVertexIndices.push(v1 + 1);
      antennaVertexIndices.push(v2);
      antennaVertexIndices.push(v2 + 1);
    }
  }

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(antennaVertexIndices), gl.STATIC_DRAW);

  pwgl.ANTENNA_VERTEX_INDEX_BUF_ITEM_SIZE = 1;
  pwgl.ANTENNA_VERTEX_INDEX_BUF_NUM_ITEMS = Math.pow(cir_quality, 2)*6; //36;

  //Defining Normals
  pwgl.antennaVertexNormalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.antennaVertexNormalBuffer);

  var normalData = [
    
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalData), gl.STATIC_DRAW);
  pwgl.ANTENNA_VERTEX_NORMAL_BUF_ITEM_SIZE = 3;
  pwgl.ANTENNA_VERTEX_NORMAL_BUF_NUM_ITEMS = 24;
}

function drawAntenna(rgba){
  gl.disableVertexAttribArray(pwgl.vertexColorAttributeLoc);
  // Set color
  gl.vertexAttrib4f(pwgl.vertexColorAttributeLoc, rgba[0], rgba[1], rgba[2], rgba[3]);
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.antennaVertexPositionBuffer);
  gl.vertexAttribPointer(pwgl.vertexPositionAttributeLoc2, pwgl.ANTENNA_VERTEX_POS_BUF_ITEM_SIZE, gl.FLOAT, false, 0, 0);

  //Bind normals
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.earthVertexNormalBuffer);
  gl.vertexAttribPointer(pwgl.vertexNormalAttributeLoc2, pwgl.ANTENNA_VERTEX_NORMAL_BUF_ITEM_SIZE, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pwgl.antennaVertexIndexBuffer);
  gl.drawElements(gl.TRIANGLES, pwgl.ANTENNA_VERTEX_INDEX_BUF_NUM_ITEMS, gl.UNSIGNED_SHORT, 0);
}
