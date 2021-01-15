function startApplication(image1, image2)
close all %closes all the opened windows

%--------- Glob Variables ----------
defaults.camHeight = 7;
defaults.degPerPixel = 0.042;
defaults.screenX = 480;
defaults.screenY = 640;
%-------- /Glob Variables -----------

%Gets the sizes and different images from processing the car
carStats = getSizeAndColor(image1, defaults);
carStats2 = getSizeAndColor(image2, defaults);

%Draws a crosshair at the center of the car
drawCrosshair(carStats.posX, carStats.posY);

carStats.speed = calcSpeed(carStats, carStats2, defaults);

%Output the lines regarding the car size, speed, color, etc
outputProgram(carStats);