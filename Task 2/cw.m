function cw(imageNum)

%--------- Computer Vision --------------
close all
image = imread(strcat(imageNum,'.jpg'));
%imshow(image);

hsv = rgb2hsv(image); %Get image hsv values
blueOnly = hsv(:, :, 2); %Limit the blue values
foreground = blueOnly > 0.5; % Cut the foreground

labeledImage = bwlabel(foreground);
se = strel('square', 3); %Erode method

eroded = imerode(labeledImage, se);
se2 = strel('square', 50); %Close method

closed = imclose(eroded, se2); %Image with filled gaps
bw = imbinarize(closed, 0.2); %binarize Image
final = bwareafilt(bw, 1); %Trasform the image to a "blob"
%imshow(final);

region = regionprops(final, 'Boundingbox'); %Create bounding box for the car
imshow(final); hold on

%Apply the bounding box to the image
for i=1:length(region)
     carSize=region(i).BoundingBox;
     rectangle('Position', [carSize(1),carSize(2),carSize(3),carSize(4)],'EdgeColor','green','LineWidth',1) ;
end

%--------- Calculations -----------
carCornerX = carSize(1);
carCornerY = carSize(2);
pixelWidth = carSize(3); %Get car pixel width
pixelLength = carSize(4); %Get car pixel height

carX = carCornerX + (pixelWidth/2);
carY = carCornerY + (pixelLength/2);

% draw an horizontal bar in the middle of the car
x = [carX-10,carX+10];
y = [carY,carY];
plot(x,y,'LineWidth', 1, 'Color',[0.0,0.0,0.0]); % drawing

% draw a vertical bar in the middle of the car
x = [carX,carX];
y = [carY-10,carY+10];
plot(x,y,'LineWidth', 1, 'Color',[0.0,0.0,0.0]);

camHeight = 7;
degPerPixel = 0.048;
screenX = 480;
screenY = 640;

%---------- Length of Car ---------------

offsetY = screenY - (carY+(pixelLength/2));

degBottToMid = (offsetY * degPerPixel); %Total Degree bottom car to top Image
carBackAngle = 60 + degBottToMid;
carBackDistance = camHeight * tan(carBackAngle);

degTopToMid = ((screenY - carCornerY) * degPerPixel); %Total Degree top car to top Image
carTopAngle = 60 + degTopToMid;
carTopDistance = camHeight * tan(carTopAngle);

carLength = (carTopDistance - carBackDistance) / 10; %in meters

%---------- Width of Car ---------------

offsetX = screenX - carCornerX;

degLeftToMid = offsetX * degPerPixel; %Total Degree left car to right Image
carLeftAngle = 60 + degLeftToMid;
carLeftDistance = camHeight * tan(carLeftAngle);

degRightToMid = (screenX - (carCornerX + pixelWidth)) * degPerPixel; %Total Degree right car to right Image
carRightAngle = 60 + degRightToMid;
carRightDistance = camHeight * tan(carRightAngle);

carWidth = (carRightDistance - carLeftDistance) / 10; %in meters

%------------- OUTPUT ------------------

disp("Car width: " + carWidth);
disp("Car length: " + carLength);
disp("Car width/length: 1:" + carLength/carWidth);
disp("Car colour: (Not Done yet)");
disp("Car speed: (Not Done yet)");
disp("Car is speeding (Y/N): (Not Done yet)");
disp("Car is oversized (Y/N): (Not Done yet)");
disp("Car is fire engine (Y/N): (Not Done yet)");

%abs()
