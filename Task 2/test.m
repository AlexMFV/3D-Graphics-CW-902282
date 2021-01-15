clear
clc
close all

defaults = setGlobalVars();

disp("---- Main Function Output / 001 - 003 ----");
%Main function output (not speeding)
startApplication("001", "003");

%--------------------------------------------------------------------------

%Set car start position and end position (speeding)
carStart = getSizeAndColor("001", defaults);
carEnd = getSizeAndColor("006", defaults);

fprintf("\n");
disp("---- Test normal car / speeding ----");
carStart.speed = calcSpeed(carStart, carEnd, defaults); %update Speed

%Test for oversized car (with normal car)
disp("Is oversized?: " + isOversized(carStart.realWidth));
%Test speeding (car is speeding)
disp("Is speeding?: " + isSpeeding(carStart.speed));
%Test speeding (car is speeding)
disp("Is Fire Engine?: " + isFireEngine(carStart.color));

%--------------------------------------------------------------------------

%Set car start position and end position
carStart = getSizeAndColor("fire01", defaults);
carEnd = getSizeAndColor("fire02", defaults);

fprintf("\n");
disp("---- Test fire engine ----");
carStart.speed = calcSpeed(carStart, carEnd, defaults); %update Speed

%Test for oversized car (with normal car)
disp("Is oversized?: " + isOversized(carStart.realWidth));
%Test speeding (car is speeding)
disp("Is speeding?: " + isSpeeding(carStart.speed));
%Test speeding (car is speeding)
disp("Is Fire Engine?: " + isFireEngine(carStart.color));

%--------------------------------------------------------------------------

%Set car start position
carStart = getSizeAndColor("oversized", defaults);

fprintf("\n");
disp("---- Test oversized vehicle ----");

%Test for oversized car (with normal car)
disp("Is oversized?: " + isOversized(carStart.realWidth));
%Test fire engine (car is speeding)
disp("Is Fire Engine?: " + isFireEngine(carStart.color));

%--------------------------------------------------------------------------