function [origImg, computedImg, carStats] = getSizeAndColor(imageNum, defaults)

origImg = imread(strcat(imageNum,'.jpg'));

hsv = rgb2hsv(origImg); %Get image hsv values
blueOnly = hsv(:, :, 2); %Limit the blue values
foreground = blueOnly > 0.5; % Cut the foreground

labeledImage = bwlabel(foreground);
se = strel('square', 3); %Erode method

eroded = imerode(labeledImage, se);
se2 = strel('square', 50); %Close method

closed = imclose(eroded, se2); %Image with filled gaps
bw = imbinarize(closed, 0.2); %binarize Image
computedImg = bwareafilt(bw, 1); %Trasform the image to a "blob"
%imshow(final);

region = regionprops(computedImg, 'Boundingbox'); %Create bounding box for the car
imshow(computedImg); hold on

%Apply the bounding box to the image
for i=1:length(region)
     carSize=region(i).BoundingBox;
     rectangle('Position', [carSize(1),carSize(2),carSize(3),carSize(4)],'EdgeColor','green','LineWidth',1) ;
end

%Define Car Object Variables
carStats.cornerX = carSize(1);
carStats.cornerY = carSize(2);
carStats.width = carSize(3);
carStats.length = carSize(4);
carStats.posX = carStats.cornerX + (carStats.width/2);
carStats.posY = carStats.cornerY + (carStats.length/2);
carStats.realWidth = calcSize("w", carStats, defaults);
carStats.realLength = calcSize("l", carStats, defaults);