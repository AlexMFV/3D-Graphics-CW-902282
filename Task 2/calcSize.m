function size = calcSize(axis, carStats, defaults)

%Changes between length and width
if(axis == "l")
    offsetAngle = defaults.screenY - (carStats.cornerY + carStats.length);
else
    offsetAngle = defaults.screenX/2 - (carStats.cornerX + carStats.width/2);
end

angle = 60 + (offsetAngle * defaults.degPerPixel);
dist = defaults.camHeight * tand(angle);
fullDist = hypot(defaults.camHeight, dist);

if(axis == "l")
    finalDeg = carStats.length * defaults.degPerPixel;
else
    finalDeg = carStats.width/2 * defaults.degPerPixel;
end

size = (fullDist * tand(finalDeg)) * 2;

%---------- Failed Attempts ---------------
% if(axis == "l")
%     %offset = defaults.screenY/2 - (carStats.posY + (carStats.length/2));
%     offset = defaults.screenY
% else
%     offset = defaults.screenX/2 - (carStats.cornerX + (carStats.width/2));
% end
% 
% degBottToMid = (offset * defaults.degPerPixel); %Total Degree bottom car to top Image
% carBackAngle = 60 + degBottToMid;
% carBackDistance = defaults.camHeight * tand(carBackAngle);
% 
% if(axis == "l")
%     degTopToMid = ((defaults.screenY/2 - carStats.cornerY) * defaults.degPerPixel); %Total Degree top car to top Image
% else
%     degTopToMid = (defaults.screenX/2 - (carStats.cornerX + carStats.width)) * defaults.degPerPixel; %Total Degree right car to right Image
% end 
% 
% carTopAngle = 60 + degTopToMid;
% carTopDistance = defaults.camHeight * tand(carTopAngle);
% 
% size = (carTopDistance - carBackDistance); %in meters

%---------- Width of Car ---------------
%offsetX = screenX - carCornerX;

%degLeftToMid = offsetX * degPerPixel; %Total Degree left car to right Image
%carLeftAngle = 60 + degLeftToMid;
%carLeftDistance = camHeight * tan(carLeftAngle);

%degRightToMid = (screenX - (carCornerX + pixelWidth)) * degPerPixel; %Total Degree right car to right Image
%carRightAngle = 60 + degRightToMid;
%carRightDistance = camHeight * tan(carRightAngle);

%carWidth = (carRightDistance - carLeftDistance)/10; %in meters