export const validateCoordinates = (coordinates) => {
    const validCoordinates = [];
if(!coordinates) return validCoordinates
    coordinates.forEach((coordinate, index) => {
        // If it's the first coordinate, just add it to the valid coordinates list
        if (index === 0) {
            validCoordinates.push(coordinate);
        } else {
            const prevCoordinate = validCoordinates[validCoordinates.length - 1];

            // Check if the current coordinate is valid
            if (coordinate && typeof coordinate[0] === "number" && typeof coordinate[1] === "number" && typeof coordinate[2] === "number") {
                validCoordinates.push(coordinate);
            } else {
                // If not valid, take the previous coordinate and modify accordingly
                const newCoordinate = [
                    typeof coordinate[0] === "number" ? coordinate[0] : prevCoordinate[0], // Use previous value if invalid
                    typeof coordinate[1] === "number" ? coordinate[1] : prevCoordinate[1], // Use previous value if invalid
                    typeof coordinate[2] === "number" ? coordinate[2] : prevCoordinate[2]  // Use previous value if invalid
                ];

                validCoordinates.push(newCoordinate);
            }
        }
    });

    return validCoordinates;
};


export const coordHelper=(list)=>{
let finalList=[]
// console.log("list",list);
for(let i=0;i<list[0].length;i++)
{
    let tempList=[]
    for(let j=0;j<list.length;j++)
    {
        tempList.push(list[j][i])
    }
    finalList.push(tempList);   
}
return finalList;
}
// [[ balloon 1 set of coordinate at 1st hour, balloon 1 set of coordinate at 2nd hour...],[[ balloon 2 set of coordinate at 1st hour, balloon 2 set of coordinate at 2nd hour...]],],