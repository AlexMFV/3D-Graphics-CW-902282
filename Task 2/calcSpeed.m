function speed = calcSpeed(car1, car2, defaults)
    %Changes between length and width
    diff_car1 = defaults.screenY/2 - car1.posY; %Calculate distances from middle of image
    diff_car2 = defaults.screenY/2 - car2.posY;    
    deg_car1 = 60 + (diff_car1 * defaults.degPerPixel); %calculate angle, from middle image to car
    deg_car2 = 60 + (diff_car2 * defaults.degPerPixel);    
    dist_car1 = defaults.degPerPixel * tand(deg_car1); %Calculate horizontal distance to both cars
    dist_car2 = defaults.degPerPixel * tand(deg_car2);    
    distance = (dist_car2 - dist_car1)*1000; %Subtract the later picture to the first one to get the distance travelled
    speed = distance * 2.23693629; %Convert distance to KMH then to speed in MPH
end