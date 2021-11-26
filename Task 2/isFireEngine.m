%Checks if it's a Fire Engine based on the gotten color
function result = isFireEngine(color)
    if(color == "red")
        result = "Y";
    else
        result = "N";
    end
end