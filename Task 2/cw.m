function cw(imageNum)
close all %closes all the opened windows

%--------- Glob Variables ----------
defaults.camHeight = 7;
defaults.degPerPixel = 0.042;
defaults.screenX = 480;
defaults.screenY = 640;
%-------- /Glob Variables -----------

%Gets the sizes and different images from processing the car
[image, computedImg, carStats] = getSizeAndColor(imageNum, defaults);

%Draws a crosshair at the center of the car
drawCrosshair(carStats.posX, carStats.posY);

%Creates a crop of the car only, to process the color
rect = [carStats.cornerX, carStats.cornerY, carStats.width , carStats.length];
croppedImg = imcrop(image, rect);

%Calculate the color of the car, based on ammount of pixels of that color
carStats.color = calcColor(croppedImg);

%------------- OUTPUT ------------------
disp("Car width: " + carStats.realWidth + " meters");
disp("Car length: " + carStats.realLength + " meters");
disp("Car width/length: 1:" + carStats.realLength/carStats.realWidth);
disp("Car colour: " + carStats.color);
disp("Car speed: " + "(Not Done Yet)" + " mph");
disp("Car is speeding (Y/N): (Not Done yet)");
disp("Car is oversized (Y/N): (Not Done yet)");
disp("Car is fire engine (Y/N): (Not Done yet)");