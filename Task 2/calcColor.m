function color = calcColor(image)
% Extract the individual red, green, and blue color channels.
redChannel = image(:, :, 1) > 210;
blueChannel = image(:, :, 3) > 135;

totalRed = sum(redChannel(:) == 1);
totalBlue = sum(blueChannel(:) == 1);

if(totalRed > totalBlue)
    color = "red";
else
    color = "blue";
end