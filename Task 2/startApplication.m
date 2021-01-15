function startApplication(image1, image2)
close all %closes all the opened windows

defaults = setGlobalVars();

%Gets the sizes and different images from processing the car
[carStats, s1, s2, s3, s4, s5] = getSizeAndColor(image1, defaults);
carStats2 = getSizeAndColor(image2, defaults);

subplot(2,3,1), imshow(s1);
subplot(2,3,2), imshow(s2);
subplot(2,3,3), imshow(s3);
subplot(2,3,4), imshow(s4);
subplot(2,3,6), imshow(s5);

%Draws a crosshair at the center of the car
drawCrosshair(carStats.posX, carStats.posY);

carStats.speed = calcSpeed(carStats, carStats2, defaults);

%Output the lines regarding the car size, speed, color, etc
outputProgram(carStats);