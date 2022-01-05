// build world
imgData = {
    anchorPoint : [12,14],
    height : null,
    width : null
}
function imgToArray(imgSrc){
    var img = new Image();
    img.src = imgSrc;
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.drawImage(img, 0, 0);
    output = [];
    for (var r = 0; r < img.height; r++) {
        output.push([]);
        for (var c = 0; c < img.width; c++) {
            output[r].push(context.getImageData(c, r, 1, 1).data[0]/255);
        }
    }
    imgData.height = img.height;
    imgData.width = img.width;
    return output;
}
function tileArray(array, rows, cols){
    aR = array.length;
    aC = array[0].length;
    newArray = []
    for (var r = 0; r < rows*aR; r++) {
        newArray.push([]);
        for (var c = 0; c < cols*aC; c++) {
            newArray[r].push(array[r%aR][c%aC]);
        }
    }
    return newArray;
}
function ArrayImgOverwrite(imgSrc,array,row,col){
    out = array;
    if (!Array.isArray(imgSrc)) {
        imgArr = imgToArray(imgSrc);
    } else {
        imgArr = imgSrc;
    }
    imgHeight = imgArr.length;
    imgWidth = imgArr[0].length;
    for (var r = 0; r < imgHeight; r++) {
        for (var c = 0; c < imgWidth; c++) {
            out[r+row][c+col] = imgArr[r][c];
        }
    }
    return out;
}

liveServer = false;
if (liveServer) {
    world = imgToArray("assets/pacman_tile_map.png");
    world = tileArray(world,2,5);
    world = ArrayImgOverwrite("assets/happy_birthday_art.png",world,imgData.anchorPoint[0],imgData.anchorPoint[1]);
    worldR = world.length;
    worldC = world[0].length;
    for (var c = 0; c < worldC; c++){
        world[0][c] = 0;
    }
    world.push(world[0]);
    for (var r = 0; r < worldR; r++){
        world[r][0] = 0;
        world[r].push(0);
    }
    // add some coins
    cointCount = 0;
    while (cointCount < 50){
        loc = [Math.round(Math.random()*worldR), Math.round(Math.random()*worldC)];
        if (loc[0]>imgData.anchorPoint[0] && loc[0]<imgData.anchorPoint[0]+imgData.height && loc[1]>imgData.anchorPoint[1] && loc[1]<imgData.anchorPoint[1]+imgData.width) {
            continue;
        }
        if (loc != [1,1] && world[loc[0]][loc[1]] == 1){
            world[loc[0]][loc[1]] = 2;
            cointCount++;
        }
    }
} else {
    world = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,2,1,1,1,1,1,1,1,0,2,1,2,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,2,1,0,1,1,1,2,1,1,1,1,0],[0,1,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,1,0,1,0,0,2,0,0,0,1,0],[0,1,1,1,0,1,1,1,1,1,1,1,0,1,0,2,1,1,0,1,1,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,0,1,1,1,0,2,1,1,1,1,2,1,0,1,0,1,1,1,0,1,1,1,0,1,2,1,2,1,1,1,0,1,0,1,1,1,0],[0,0,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,2,0,1,0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,0,0],[0,1,1,1,0,1,0,1,1,0,1,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,1,0,1,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,1,0,1,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,1,0,1,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,1,0,1,1,0,1,0,1,0,1,0],[0,0,0,1,1,1,0,0,1,0,1,0,0,1,1,1,0,1,0,0,0,1,1,1,0,0,1,0,1,0,0,1,1,1,0,1,0,0,0,1,1,1,0,0,1,0,1,0,0,1,1,1,0,1,0,0,0,1,1,1,0,0,1,0,1,0,0,1,1,1,0,1,0,0,0,1,1,1,0,0,1,0,1,0,0,1,1,1,0,1,0],[0,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,2,0,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,0,1,2,1,1,2,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,0],[0,1,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,1,0,1,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,1,0,1,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,1,0,1,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,1,0,1,0,1,0,0,1,0,0,1,0,0,1,0,0,2,0,1,0],[0,1,0,1,1,1,1,0,1,1,1,0,1,1,1,1,0,1,0,1,0,1,1,1,1,0,1,1,1,0,1,1,1,1,0,1,0,1,0,1,1,1,1,0,1,1,1,0,1,1,1,1,0,1,0,1,0,1,1,1,1,0,1,1,1,0,1,1,1,1,0,1,0,1,0,1,1,1,1,0,1,1,1,0,1,1,2,1,0,1,0],[0,1,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,1,0,1,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,1,0,1,0,0,1,0,1,0,0,0,0,0,2,0,1,0,0,1,0,1,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,1,0,1,0,0,2,0,1,0,0,0,0,0,1,0,1,0,0,1,0],[0,1,0,1,1,0,1,1,1,1,1,1,1,0,1,1,0,1,0,1,0,1,1,0,2,1,1,1,1,1,1,0,1,1,0,1,0,1,0,1,1,0,1,1,1,1,1,2,1,0,1,1,0,1,0,1,0,1,1,0,1,1,1,1,1,1,1,0,1,1,0,1,0,1,0,1,1,0,1,1,1,1,1,1,1,0,1,1,0,1,0],[0,1,0,1,0,0,1,0,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,0,1,0,1,0],[0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0],[0,0,0,0,1,0,0,0,1,0,1,0,0,1,1,1,0,1,1,0,1,1,0,0,1,1,0,0,0,1,1,0,0,0,1,1,0,1,0,1,1,1,1,0,0,0,1,1,0,1,0,0,0,1,1,0,0,0,1,0,1,1,0,1,0,0,0,1,1,1,0,0,1,1,0,1,0,1,1,1,1,0,1,0,0,1,0,0,0,1,0],[0,2,1,1,1,0,1,1,1,1,1,0,1,2,1,1,0,1,1,0,1,0,1,1,0,1,0,1,1,0,1,0,1,1,0,1,0,1,0,1,1,1,1,0,1,1,0,1,0,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,0,1,1,0,1,0,1,1,0,1,0,1,0,1,1,1,1,1,1,0,1,1,1,0,1,1,0],[0,1,0,1,1,1,1,0,1,0,1,0,1,0,1,1,0,0,0,0,1,0,0,0,0,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,1,1,0,0,0,1,1,0,1,0,0,0,1,1,1,0,1,1,0,0,0,0,1,0,1,1,0,1,0,0,0,0,1,0,0,0,1,1,1,1,0,1,0,1,0,1,1,1,0,0],[0,1,0,0,0,0,1,0,1,0,1,0,1,0,1,1,0,1,1,0,1,0,1,1,0,1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,0,1,0,1,0,1,1,1,0,1,1,0,1,1,0,1,0,1,1,0,1,0,1,1,0,1,1,0,1,1,1,1,1,0,1,0,1,0,0,0,1,0,0],[0,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,0,1,1,0,1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,0,0,0,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],[0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0],[0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,0,1,1,0,0,0,0,1,0,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0],[0,1,0,0,0,1,0,0,1,0,1,0,0,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,0,1,0,1,1,1,1,0,1,1,1,0,1,0,1,0,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,0,1,0,0,1,0,0,0,1,0],[0,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,1,0,1,0,1,1,0,1,0,0,0,1,1,0,1,1,1,0,1,0,1,0,1,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,0],[0,0,0,1,0,1,0,1,0,0,0,1,0,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,0,1,1,0,1,0,1,1,0,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,0,0,0,1,0,1,0,1,0,0,0],[0,1,1,1,0,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,0,0,1,1,0,0,0,0,1,0,0,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,0,1,0,1,0],[0,0,0,2,1,1,0,0,1,0,1,0,0,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,1,1,1,0,2,0],[0,1,2,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,0,1,1,1,0],[0,1,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,1,0,1,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,1,0,1,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,1,0,1,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,1,0,1,0,1,0,0,1,0,0,1,0,0,1,0,0,2,0,1,0],[0,1,0,1,1,1,1,0,1,1,1,0,1,1,1,1,0,1,0,1,0,1,1,1,1,0,1,1,1,0,1,1,1,1,0,1,0,1,0,1,1,1,1,0,1,1,1,0,1,1,1,1,0,1,0,1,0,1,1,1,1,0,1,1,1,0,1,1,1,1,0,1,0,1,0,1,1,2,1,0,1,1,1,0,1,1,1,1,0,1,0],[0,1,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,1,0,1,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,1,0,1,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,1,0,1,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,1,0,1,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,1,0],[0,1,0,1,1,0,1,1,1,1,1,1,1,0,1,1,0,1,0,1,0,1,1,0,1,1,1,1,1,1,1,0,1,1,0,1,0,1,0,1,1,0,1,1,1,1,1,1,1,0,1,1,0,1,0,1,0,1,1,0,1,1,1,1,1,1,1,0,1,1,0,1,0,1,0,1,1,0,1,1,1,1,1,1,1,0,1,1,0,1,0],[0,1,0,1,0,0,1,0,0,0,0,0,1,0,0,1,0,1,0,1,0,1,0,0,1,0,0,0,0,0,1,0,0,1,0,1,0,1,0,1,0,0,1,0,0,0,0,0,1,0,0,1,0,2,0,1,0,1,0,0,1,0,0,0,0,0,1,0,0,1,0,1,0,1,0,1,0,0,1,0,0,0,0,0,1,0,0,1,0,1,0],[0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,0,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0],[0,0,0,0,1,0,0,0,1,0,1,0,0,1,0,0,0,1,0,0,0,0,1,0,0,0,1,0,1,0,0,1,0,0,0,1,0,0,0,0,1,0,0,0,1,0,1,0,0,1,0,0,0,1,0,0,0,0,1,0,0,0,1,0,1,0,0,1,0,0,0,1,0,0,0,0,1,0,0,0,1,0,1,0,0,1,0,0,0,1,0],[0,1,1,1,1,0,1,2,1,1,1,0,1,1,1,0,1,1,1,2,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,1,1,1,2,2,1,0,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,2,0,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,0,2,1,2,1,1,0,1,1,1,0,1,1,0],[0,1,0,1,1,1,1,0,1,0,1,0,2,0,1,2,1,0,0,1,0,1,1,1,1,0,1,0,1,0,1,0,2,1,1,0,0,1,0,1,1,1,1,0,1,0,1,0,1,0,1,1,1,0,0,1,0,1,1,1,1,0,1,0,1,0,1,0,1,1,1,0,0,1,0,1,1,1,1,0,1,0,1,0,1,0,1,1,1,0,0],[0,1,0,0,0,0,1,0,1,0,1,0,1,0,0,0,2,0,0,1,0,0,0,0,1,0,1,0,1,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,1,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,1,0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,1,0,1,0,0,0,1,0,0],[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
}

printWorld = false;
if (printWorld) {
    worldR = world.length;
    worldC = world[0].length;
    var out = '[';
    for (var r = 0; r < worldR; r++) {
        out += '[';
        out += world[r].join();
        out += '],';
    }
    out = out.substring(0, out.length - 1);
    out += ']';
    stringWorld = out;
}

function displayWorld(){
    var output = '';
    for (var i=0; i<world.length; i++){
        output += "<div class='row'>"
        for (var j=0; j<world[i].length; j++){
            if (world[i][j]==0){
                output += "<div class='brick'></div>"
            }
            else if (world[i][j]==2){
                output += "<div class='coin'></div>"
            }
            else if (world[i][j]==1){
                output += "<div class='empty'></div>"
            }
        }
        output += "</div>"
    }
    document.getElementById("world").innerHTML = output;
}

function updateScore(){
    scoreElement.innerHTML = score;
}
displayWorld();

pacElement = document.getElementById('pacman');
pacPosition = [1,1]
pacman = {
    top: 20,
    left: 20,
    nextTop: 20,
    nextLeft: 20,
    moving: false
}

scoreContainerElement = document.getElementById('scoreContainer');
scoreContainerElement.style.left = 20*world[0].length+10 + "px"
score = 0;
scoreElement = document.getElementById('score');
timeContainerElement = document.getElementById('timeContainer');
timeContainerElement.style.left = 20*world[0].length+10 + "px"
timeElement = document.getElementById('time');

var arrows = {
    ArrowUp :    [-1, 0, 270],
    ArrowRight : [ 0, 1,   0],
    ArrowDown :  [ 1, 0,  90],
    ArrowLeft :  [ 0,-1, 180]
}
var v;
var currentArrow;
var proposedV;
var proposedArrow;

function movePacman() {
    pacman.moving = true;
    if (world[nextPacPosition[0]][nextPacPosition[1]] == 2){
        score += 10;
        updateScore();
    }
    world[nextPacPosition[0]][nextPacPosition[1]] = 1;
    pacman.top = 20*pacPosition[0];
    pacman.left = 20*pacPosition[1];
    pacman.nextTop = 20*nextPacPosition[0];
    pacman.nextLeft = 20*nextPacPosition[1];
    pacPosition = nextPacPosition;
    pacman.nextTop = 20*pacPosition[0];
    pacman.nextLeft = 20*pacPosition[1];
    pacElement.style.transform = 'rotate('+currentArrow[2]+'deg)';
    displayWorld();
}

function pacControl(){
    if (currentArrow == undefined){
        currentArrow = proposedArrow;
    }
    v = proposedArrow;
    proposedPacPosition = [pacPosition[0]+v[0],pacPosition[1]+v[1]];
    v = currentArrow;
    nextPacPosition = [pacPosition[0]+v[0],pacPosition[1]+v[1]];
    if (world[proposedPacPosition[0]][proposedPacPosition[1]] != 0){
        currentArrow = proposedArrow;
        nextPacPosition = proposedPacPosition;
        movePacman();
    } else if (world[nextPacPosition[0]][nextPacPosition[1]] != 0){
        movePacman();
    } else {
        pacman.moving = false;
    }
}

document.onkeydown = function(e){
    // e.preventDefault();
    proposedArrow = arrows[e.key];
}

// ------------------------ ghosts ------------------------
ghostRedElement = document.getElementById('ghost-red');
ghostRed = {
    prev1Loc : [],
    loc : [560/20, 1640/20],
    nextLoc : [560/20, 1640/20],
    top: 560,
    left: 1640,
    nextTop: 560,
    nextLeft: 1640,
    moving: false
}
function moveGhostRed() {
    ghostRed.moving = true;
    ghostRed.top = 20*ghostRed.loc[0];
    ghostRed.left = 20*ghostRed.loc[1];
    ghostRed.nextTop = 20*ghostRed.nextLoc[0];
    ghostRed.nextLeft = 20*ghostRed.nextLoc[1];
}
function findOpenSquares(r,c,universe){
    universe1 = universe || world;
    test = [[-1,0],[0,1],[1,0],[0,-1]];
    out = [];
    for (var i = 0; i<4; i++){
        v = test[i];
        if (universe1[r+v[0]][c+v[1]] != 0){
            out.push([r+v[0],c+v[1]])
        }
    }
    return out;
}
function selectRandom(array) {
    // randomly returns one element of an array
    var length = array.length;
    selection = Math.round((length-1)*Math.random());
    return array[selection];
}
function arrayMinIndex(array) {
    min = array.indexOf(Math.min.apply(null, array));
    return min;
}
function getOccurrence(array, value) {
    return array.filter((v) => (v === value)).length;
}
function ghostRedControl(){
    // save old loc and old nextLoc
    ghostRed.prev1Loc = ghostRed.loc;
    ghostRed.loc = ghostRed.nextLoc;
    openSquares = findOpenSquares(ghostRed.loc[0],ghostRed.loc[1]);
    // remove previous location in openSquares if present
    if (openSquares.length>1) {
        for (var i = 0; i < openSquares.length; i++) {
            if (openSquares[i][0]==ghostRed.prev1Loc[0] && openSquares[i][1]==ghostRed.prev1Loc[1]) {
                openSquares.splice(i,1);
                break;
            }
        }
    }
    distances = [] // distance between pacman and potential ghost moves
    for (var i=0; i<openSquares.length;i++){
        distances.push(Math.sqrt((openSquares[i][0]-pacPosition[0])**2+(openSquares[i][1]-pacPosition[1])**2));
    }
    if (Math.random()>0.1){
        ghostRed.nextLoc = openSquares[arrayMinIndex(distances)];
    } else {
        ghostRed.nextLoc = selectRandom(openSquares);
    }
    moveGhostRed();
}
function collision() {
    score = 0;
    updateScore();
    ghostRed.moving = false;
    pacman.moving = false;
    proposedArrow = undefined;
    setTimeout(function() {
        alert("The ghost has stolen all your coins!");
    },10)
}

updateInterval = 50; // time interval to update pacman animation (ms)
pacmanSpeed = 250;    // time interval for pacman to move one unit (ms)
collisionDistance = 20/pacmanSpeed*updateInterval+1;
function getSecondsSinceStartOfDay() {
    return new Date().getSeconds() + 
      new Date().getMinutes() * 60 + 
      new Date().getHours() * 3600;
}
var clockStart;
time = 0;
setInterval( function() {
    time += updateInterval
    if (pacman.moving == true){
        pacTop = pacman.top + Math.round((pacman.nextTop - pacman.top)*time/pacmanSpeed);
        pacLeft = pacman.left + Math.round((pacman.nextLeft - pacman.left)*time/pacmanSpeed);
        pacElement.style.top =  pacTop + "px";
        pacElement.style.left = pacLeft + "px";
    }
    if (ghostRed.moving == true){
        redTop = ghostRed.top + Math.round((ghostRed.nextTop - ghostRed.top)*time/pacmanSpeed);
        redLeft = ghostRed.left + Math.round((ghostRed.nextLeft - ghostRed.left)*time/pacmanSpeed);
        ghostRedElement.style.top = redTop + "px";
        ghostRedElement.style.left = redLeft + "px";
        // collision detection
        if (score > 0 && Math.sqrt((pacTop-redTop)**2 + (pacLeft-redLeft)**2) < collisionDistance) {
            collision();
        }
    }
    if (time >= pacmanSpeed && proposedArrow != undefined){
        time = 0;
        if (score > 0) {
            ghostRedControl();
        }
        pacControl();
        if (clockStart===undefined) {
            clockStart = getSecondsSinceStartOfDay();
        } else {
            timeElement.innerHTML = getSecondsSinceStartOfDay()-clockStart; 
        }
        if (score===500) {
            ghostRed.moving = false;
            pacman.moving = false;
            proposedArrow = undefined;
            setTimeout(function() {
                alert("Congratulations, you have successfully collected all the coins and avoided the ghost!");
            },10)
        }
    }
}, updateInterval);