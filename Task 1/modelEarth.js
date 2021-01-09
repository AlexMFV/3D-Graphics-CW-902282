function setupEarthBuffers(){
  pwgl.earthVertexPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.earthVertexPositionBuffer);

  var sph_quality = 25; //Quality that the sphere is rendered/ Number of vertices per half sphere
  var earthVertexPosition = [];

  /*for (j = 0; j <= sph_quality; j++)
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
  }*/

  for (var i=0; i <= sph_quality; i++) {
    for (var j=0; j <= sph_quality; j++) {
      x = Math.sin(i*Math.PI/sph_quality) * Math.cos(2*j*Math.PI/sph_quality);
      y = Math.cos(i*Math.PI/sph_quality);
      z = Math.sin(i*Math.PI/sph_quality) * Math.sin(2*j*Math.PI/sph_quality);;
      earthVertexPosition.push(x);
      earthVertexPosition.push(y);
      earthVertexPosition.push(z);
    }
  }


  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(earthVertexPosition), gl.STATIC_DRAW);

  pwgl.EARTH_VERTEX_POS_BUF_ITEM_SIZE = 3;
  pwgl.EARTH_VERTEX_POS_BUF_NUM_ITEMS = Math.pow(sph_quality, 2)*3;

  pwgl.earthVertexIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pwgl.earthVertexIndexBuffer);

  var earthVertexIndices = [];
  /*for (j = 0; j < sph_quality; j++)
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
  }*/

  for (var i=0; i < sph_quality; i++) {
   for (var j=0; j < sph_quality; j++) {
		var v1 = i*(sph_quality+1) + j;//index of vi,j
		var v2 = v1 + sph_quality + 1; //index of vi+1,j
		var v3 = v1 + 1;     //index of vi,j+1
		var v4 = v2 + 1;     //index of vi+1,j+1
		// indices of first triangle
		earthVertexIndices.push(v1);
		earthVertexIndices.push(v2);
		earthVertexIndices.push(v3);
		// indices of second triangle
		earthVertexIndices.push(v3);
		earthVertexIndices.push(v2);
		earthVertexIndices.push(v4);
	}
}


  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(earthVertexIndices), gl.STATIC_DRAW);

  pwgl.EARTH_VERTEX_INDEX_BUF_ITEM_SIZE = 1;
  pwgl.EARTH_VERTEX_INDEX_BUF_NUM_ITEMS = Math.pow(sph_quality, 2)*6;

  pwgl.earthVertexTextureCoordinateBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.earthVertexTextureCoordinateBuffer);

  //Think about how the coordinates are assigned. Ref. vertex coords.
  var textureCoordinates = [];

  const aux = 1/(sph_quality-1);

  for (j = 0; j <= sph_quality; j++)
  {
    for (i = 0; i <= sph_quality; i++)
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

  //Defining Normals
  pwgl.earthVertexNormalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.earthVertexNormalBuffer);

  var normalData = [];
  for (var i=0; i <= sph_quality; i++) {
   for (var j=0; j <= sph_quality; j++) {
      //Calculate nx,ny,nz
      nx = Math.sin(i*Math.PI/sph_quality) * Math.cos(2*j*Math.PI/sph_quality);
      ny = Math.cos(i*Math.PI/sph_quality);
      nz = Math.sin(i*Math.PI/sph_quality) * Math.sin(2*j*Math.PI/sph_quality);

      normalData.push(nx);
      normalData.push(ny);
      normalData.push(nz);
   }
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalData), gl.STATIC_DRAW);
  pwgl.EARTH_VERTEX_NORMAL_BUF_ITEM_SIZE = 3;
  pwgl.EARTH_VERTEX_NORMAL_BUF_NUM_ITEMS = 24;
}

function drawEarth(rgba){
  // Disable vertex attrib array and use constant color for the earth.
  gl.enableVertexAttribArray(pwgl.vertexColorAttributeLoc);
  
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.earthVertexPositionBuffer);
  gl.vertexAttribPointer(pwgl.vertexPositionAttributeLoc, pwgl.EARTH_VERTEX_POS_BUF_ITEM_SIZE, gl.FLOAT, false, 0, 0);
  //gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, earthVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

  //Bind normals
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.earthVertexNormalBuffer);
  gl.vertexAttribPointer(pwgl.vertexNormalAttributeLoc, pwgl.EARTH_VERTEX_NORMAL_BUF_ITEM_SIZE, gl.FLOAT, false, 0, 0);

  //Bind Textures
  gl.bindBuffer(gl.ARRAY_BUFFER, pwgl.earthVertexTextureCoordinateBuffer);
  gl.vertexAttribPointer(pwgl.vertexTextureAttributeLoc,
  pwgl.EARTH_VERTEX_TEX_COORD_BUF_ITEM_SIZE, gl.FLOAT, false, 0, 0);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, pwgl.earthTexture);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, pwgl.earthVertexIndexBuffer);
  gl.drawElements(gl.TRIANGLES, pwgl.EARTH_VERTEX_INDEX_BUF_NUM_ITEMS, gl.UNSIGNED_SHORT, 0);
}
