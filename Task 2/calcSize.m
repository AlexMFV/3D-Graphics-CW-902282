function size = calcSize(axis, carStats, defaults)

%---------- Size of Car ---------------
if(axis == "l")
    offset = defaults.screenY - (carStats.posY + (carStats.length/2));
else
    offset = defaults.screenX - carStats.cornerX;
end

degBottToMid = (offset * defaults.degPerPixel); %Total Degree bottom car to top Image
carBackAngle = 60 + degBottToMid;
carBackDistance = defaults.camHeight * tan(carBackAngle);

if(axis == "l")
    degTopToMid = ((defaults.screenY - carStats.cornerY) * defaults.degPerPixel); %Total Degree top car to top Image
else
    degTopToMid = (defaults.screenX - (carStats.cornerX + carStats.width)) * defaults.degPerPixel; %Total Degree right car to right Image
end 

carTopAngle = 60 + degTopToMid;
carTopDistance = defaults.camHeight * tan(carTopAngle);

size = (carTopDistance - carBackDistance) /10; %in meters

%---------- Width of Car ---------------
%offsetX = screenX - carCornerX;

%degLeftToMid = offsetX * degPerPixel; %Total Degree left car to right Image
%carLeftAngle = 60 + degLeftToMid;
%carLeftDistance = camHeight * tan(carLeftAngle);

%degRightToMid = (screenX - (carCornerX + pixelWidth)) * degPerPixel; %Total Degree right car to right Image
%carRightAngle = 60 + degRightToMid;
%carRightDistance = camHeight * tan(carRightAngle);

%carWidth = (carRightDistance - carLeftDistance)/10; %in meters