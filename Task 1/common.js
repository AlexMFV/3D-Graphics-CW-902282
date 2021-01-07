//Method to convert degrees to radians
function toRadians(deg){
  return deg * Math.PI/180;
}

function drawFunction(method, vec3Translate, rgbs, opts){
  pushModelViewMatrix();
  mat4.translate(modelViewMatrix, vec3Translate, modelViewMatrix);
  if(opts[0])
    rotation(opts[1], opts[2]);
  uploadModelViewMatrixToShader();
  method(rgbs);
  popModelViewMatrix();
}

function rotation(degs, allAxis){
  for(let i = 0; i < degs.length; i++){
    switch(allAxis[i]){
      case axisType.x: mat4.rotate(modelViewMatrix, toRadians(degs[i]), [1.0, 0.0, 0.0]); break;
      case axisType.y: mat4.rotate(modelViewMatrix, toRadians(degs[i]), [0.0, 1.0, 0.0]); break;
      case axisType.z: mat4.rotate(modelViewMatrix, toRadians(degs[i]), [0.0, 0.0, 1.0]); break;
    }
  }
}

//rotate = rotate or not
function rotationC(rotate, degs, allAxis){
  if(rotate)
    return [true, degs, allAxis];
  return [false, [], []];
}

const axisType = {
  x:0,
  y:1,
  z:2
};
