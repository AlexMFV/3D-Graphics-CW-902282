function color = calcColor(image)
% Extract the individual red and blue color channels.
redChannel = image(:, :, 1) > 210;
blueChannel = image(:, :, 3) > 135;

%Calculate the sum of the red and blue pixels
totalRed = sum(redChannel(:) == 1);
totalBlue = sum(blueChannel(:) == 1);

%If there are more Red pixels than Blue pixels then the color is Red
%otherwise the color is Blue
if(totalRed > totalBlue)
    color = "red";
else
    color = "blue";
end