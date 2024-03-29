function outputProgram(carStats)
disp("Car width: " + carStats.realWidth + " meters");
disp("Car length: " + carStats.realLength + " meters");
disp("Car width/length ratio: 1:" + carStats.realLength/carStats.realWidth);
disp("Car colour: " + carStats.color);
disp("Car speed: " + carStats.speed + " mph");
disp("Car is speeding (Y/N): " + isSpeeding(carStats.speed));
disp("Car is oversized (Y/N): " + isOversized(carStats.realWidth));
disp("Car is fire engine (Y/N): " + isFireEngine(carStats.color));
end

%This function prints all the necessary information of the car, along with
%all the calculations made