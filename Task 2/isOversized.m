%Check if the car is oversized, by checking the width of the car
function result = isOversized(width)
    if(width > 2.5)
        result = "Y";
    else
        result = "N";
    end
end