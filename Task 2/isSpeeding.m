%Check if the car is speeding by checking the speed of the car
function result = isSpeeding(speed)
    if(speed > 30)
        result = "Y";
    else
        result = "N";
    end
end