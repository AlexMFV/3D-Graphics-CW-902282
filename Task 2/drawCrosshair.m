function drawCrosshair(posX, posY)
% draw an horizontal bar in the middle of the car
x = [posX-10,posX+10];
y = [posY,posY];
plot(x,y,'LineWidth', 1, 'Color',[0.0,0.0,0.0]); % drawing

% draw a vertical bar in the middle of the car
x = [posX,posX];
y = [posY-10,posY+10];
plot(x,y,'LineWidth', 1, 'Color',[0.0,0.0,0.0]);