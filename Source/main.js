var juniorMap = document.getElementById("junior-map")
var elementaryMap = document.getElementById("elementary-map")
var seniorMap = document.getElementById("senior-map")
var junior
/*
function juniorMapDisplay(){
    elementaryMap.style.display = "none"
    juniorMap.style.display = "block"
    seniorMap.style.display = "none"
    junior = true
}
function elementaryMapDisplay(){
    elementaryMap.style.display = "block"
    juniorMap.style.display = "none"
    seniorMap.style.display = "none"
    junior = false
}
function seniorMapDisplay(){
    elementaryMap.style.display = "none"
    juniorMap.style.display = "none"
    seniorMap.style.display = "block"
    junior = false
}
elementaryMapDisplay()*/

var mapSelect = document.getElementById("mapSelect")
var map = document.getElementsByClassName("map")

//map 顯示隱藏初始化
for(var i=1; i<map.length; i++){
    map[i].style.display = "none"
}

mapSelect.addEventListener('change', function() {


    //console.log("value:", mapSelect.value);
    //console.log(map.length)

    //隱藏map
    for(var i=0; i<map.length; i++){
        map[i].style.display = "none"
    }

    //顯示現在要顯示的map
    var mapNow = document.getElementById(mapSelect.value)
    mapNow.style.display = "block"
});


/*
var juniorBtn = document.getElementById("btn-junior")
var elementaryBtn = document.getElementById("btn-elementary")
var seniorBtn = document.getElementById("btn-senior")

//btn click
juniorBtn.addEventListener("click", function(event){
    juniorMapDisplay();
})
elementaryBtn.addEventListener("click", function(){
    elementaryMapDisplay()
})
seniorBtn.addEventListener("click", function(){
    seniorMapDisplay()
})*/

//canvas
var drawState = 0/*, enterState = 0*/
var mouseX, mouseY;
var startX, startY
var drawTime
var leftModeStart

var canvas = document.getElementById("canvas")
canvas.addEventListener("click", function(event){
    if(drawState == 0){
        //清空右鍵模式
        rightMode = false
        polygonPoints = []
        lineLengths = []
        currentStep = 0

        startX = mouseX
        startY = mouseY

        //drawTime = setInterval("draw()", 50)
        leftModeStart = true
        drawState = 1
    }
    else{
        //clearInterval(drawTime)
        //drawResult()
        leftModeStart = false
        draw()
        drawState = 0
    }
})
/*var robot_block = 0; //0消失 1出現
canvas.addEventListener("mousedown", function(event){
    if(event.button == 2){
        if(robot_block){

        }
    }
})*/
/*canvas.addEventListener("mouseenter", function(event){
    enterState = 1
})*/
/*canvas.addEventListener("mouseleave", function(){
    clearInterval(drawTime)
    if(drawState == 1){
        //有量出角度就不清除 沒量出角度再清
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
    
    drawState = 0

    //enterState = 0
})*/
canvas.addEventListener("mousemove", function(event){
    mouseX = event.offsetX
    mouseY = event.offsetY

    if(leftModeStart){
        draw();
    }
    
})
function draw(e){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //drawTargetLine(e.offsetX, e.offsetY)
    drawLine()

    drawDegree()
    drawResult()

    //console.log(startX, startY, mouseX, mouseY)
}
//畫對準線條
/*function drawTargetLine(x, y){
    slope = (x - startX) / (y- startY)
    
}*/
/*function drawResult(){
    var lineDist = ((mouseX - startX)**2 + (mouseY - startY)**2)**0.5
    var degree = Math.round((lineDist / canvas.height) * (144 * 14.4))

    ctx.font = "20px sans-serif"
    ctx.strokeStyle = "rgb(255, 0, 0)"
    ctx.fillStyle = "#FAFAFA"
    //ctx.lineWidth = 5

    var textX, textY
    if(mouseX > 0.5 * canvas.width){
        textX = mouseX - 50
    }
    else{
        textX = mouseX + 20
    }
    if(mouseY > 0.5 * canvas.height){
        textY = mouseY - 10
    }
    else{
        textY = mouseY + 50
    }

    ctx.strokeText(degree, textX, textY);
    ctx.fillText(degree, textX, textY);
    //console.log(degree)
}*/
function drawResult() {
    // 線段真實距離（mm）
    var realDistance = calculateRealDistance(startX, startY, mouseX, mouseY); // 原本 cm 轉 mm

    // 取得輪子直徑（mm）
    var wheelDiameterInput = document.getElementById("Wheel-Diameter");
    var wheelDiameter = parseFloat(wheelDiameterInput.value) || 1; // 防止輸入錯誤
    var wheelCircumference = Math.PI * wheelDiameter; // mm

    // 計算輪子轉動角度
    var wheelAngle = Math.round((realDistance / wheelCircumference) * 360);

    // canvas 中線段中央
    var midX = (startX + mouseX) / 2;
    var midY = (startY + mouseY) / 2;

    ctx.font = "20px sans-serif";

    // 顯示輪子角度（°）
    if (displayWheelAngle){
        ctx.strokeStyle = "rgb(255, 0, 0)";
        ctx.fillStyle = "#FAFAFA";
        ctx.strokeText(wheelAngle + "°", midX, midY - 10);
        ctx.fillText(wheelAngle + "°", midX, midY - 10);
    }

    // 顯示真實距離（mm）
    if (displayMM){
        ctx.strokeStyle = "rgb(255, 0, 0)";
        ctx.strokeText(`${realDistance} mm`, midX, midY + 15);
        ctx.fillText(`${realDistance} mm`, midX, midY + 15);
    }
}
function drawLine(){
    //blue line out side
    ctx.beginPath()
    ctx.strokeStyle = "rgb(255, 255, 255)"
    ctx.lineWidth = 7
    ctx.lineCap = "round"

    if(mouseX >= startX){
        ctx.moveTo(startX, startY)
        ctx.lineTo(startX + 30, startY)
    }
    else{
        ctx.moveTo(startX, startY)
        ctx.lineTo(startX - 30, startY)
    }
    ctx.stroke()
    ctx.closePath()

    //blue line
    ctx.beginPath()
    ctx.strokeStyle = "rgb(0, 0, 255)"
    ctx.lineWidth = 3
    ctx.lineCap = "round"

    if(mouseX >= startX){
        ctx.moveTo(startX, startY)
        ctx.lineTo(startX + 30, startY)
    }
    else{
        ctx.moveTo(startX, startY)
        ctx.lineTo(startX - 30, startY)
    }
    ctx.stroke()
    ctx.closePath()

    //紅色延伸線
    var slope = (mouseY - startY) / (mouseX - startX)
    //console.log(slope)
    var x_on_0 = (-1 * startY / slope) + startX
    var x_on_height = ((canvas.height - startY) / slope) + startX

    ctx.beginPath()
    for(var i=0; i<map.length; i++){
        if(map[i].style.display == "block" && map[i].id == "WRO2025_JuniorMap"){
            ctx.strokeStyle = "rgba(255, 255, 0, 1)"
            break;
        }
        else{
            ctx.strokeStyle = "rgba(255, 0, 0, 1)"
        }
    }
    /*if(map[0].style.display == "block"){
        ctx.strokeStyle = "rgba(255, 0, 0, 1)"
    }
    else{
        ctx.strokeStyle = "rgba(255, 255, 0, 1)"
    }*/
    ctx.lineWidth = 3
    ctx.lineCap = "round"

    ctx.moveTo(x_on_0, 0)
    ctx.lineTo(x_on_height, canvas.height)
    ctx.stroke()

    //red line outside
    ctx.beginPath()
    ctx.strokeStyle = "rgba(255, 255, 255, 1.0)"
    ctx.lineWidth = 7
    ctx.lineCap = "round"

    ctx.moveTo(startX, startY)
    ctx.lineTo(mouseX, mouseY)
    ctx.stroke()

    //red line
    ctx.beginPath()
    ctx.strokeStyle = "rgba(255, 0, 0, 1.0)"
    ctx.lineWidth = 3
    ctx.lineCap = "round"

    ctx.moveTo(startX, startY)
    ctx.lineTo(mouseX, mouseY)
    ctx.stroke()

    

    

}
function drawDegree(){
    

        var arctan = Math.round(Math.atan(Math.abs(mouseY - startY) / Math.abs(mouseX - startX)) * (180 / Math.PI))

        var textX, textY
        

        
        /*
        if(mouseX > 0.5 * canvas.width){
            textX = mouseX - 50
        }
        else{
            textX = mouseX + 20
        }
        if(mouseY > 0.5 * canvas.height){
            textY = mouseY - 10
        }
        else{
            textY = mouseY + 50
        }*/

        
        ctx.font = "20px sans-serif"
        ctx.strokeStyle = "rgb(0, 0, 255)"
        ctx.fillStyle = "#FAFAFA"

        if (displayCalAngle){
            ctx.strokeText(arctan + "°", startX, startY);
            ctx.fillText(arctan + "°", startX, startY);
        }

        //console.log(arctan)
    
    
}


function canvasResize(){
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
}
canvasResize()

window.addEventListener('resize', function(){
    canvasResize()
})

var ctx = canvas.getContext("2d")
ctx.strokeStyle = "rgba(255, 0, 0, 1.0)"
ctx.lineWidth = 5
ctx.lineCap = "round"


//cross
var crossX = document.getElementById("lineX")
var crossY = document.getElementById("lineY")
var firstmove = false

var header = document.getElementById("header")

canvas.addEventListener("mousemove", function(e){

    crossX.style.display = "block"
    crossY.style.display = "block"

    //map's border radius 10px
    var rect = canvas.getBoundingClientRect();
    var mouse_X = e.clientX - rect.left;
    var mouse_Y = e.clientY - rect.top;
    //console.log(mouse_X)
    //console.log(mouse_Y)


    //x**2 + y**2 = r**2
    //x**2 + y**2 = 100
    //y = (100 - x**2)**0.5
    //0.5y = 0.5*(100 - x**2)**0.5
/*
    //lineY 遇到圓角
    if(mouse_X <= 10){
        y = (100 - ((10 - mouse_X))**2)**0.5
        crossY.style.height = (parseInt(rect.height) - 2*(10-y)) + "px";
        crossY.style.top = rect.top + 10 - y + "px"
    }
    else if(mouse_X >= parseInt(rect.width) - 10){
        y = (100 - (10-(parseInt(rect.width) - mouse_X))**2)**0.5
        crossY.style.height = (parseInt(rect.height) - 2*(10-y)) + "px";
        crossY.style.top = rect.top + 10 - y + "px"
    }
    else{
        crossY.style.height = "81vh"
        crossY.style.top = rect.top + "px"
    }

    //lineX 遇到圓角
    if(mouse_Y <= 10){
        x = (100 - ((10 - mouse_Y))**2)**0.5
        crossX.style.width = (parseInt(rect.width) - 2*(10-x)) + "px";
        crossX.style.left = rect.left + 10 - x + "px"
    }
    else if(mouse_Y >= parseInt(rect.height) - 10){
        x = (100 - (10-(parseInt(rect.height) - mouse_Y))**2)**0.5
        crossX.style.width = (parseInt(rect.width) - 2*(10-x)) + "px";
        crossX.style.left = rect.left + 10 - x + "px"
    }
    else{
        crossX.style.width = "167.4vh"
        crossX.style.left = rect.left + "px"
    }


    //線有2px寬度 不要超出去map
    if(!(mouse_X <= 0 || parseInt(rect.width) - mouse_X <= 1)){
        crossY.style.left = e.pageX + "px"
    }
    if(!(mouse_Y <= 0 || parseInt(rect.height) - mouse_Y <= 1)){
        crossX.style.top = e.pageY + "px"
    }*/
    
    
        crossX.style.top = e.pageY + "px"
        crossY.style.left = e.pageX + "px"

    //robot
    robot.style.display = "flex"
    robot.style.top = (e.pageY - canvas.height * 0.109589) + "px"
    robot.style.left = (e.pageX - canvas.height * 0.109589) + "px"

    for (var i = 0; i < robotParts.length; i++) {
        robotParts[i].style.display = "flex";
    }

})
canvas.addEventListener("mouseout", function(e){
    robot.style.display = "none"
    for (var i = 0; i < robotParts.length; i++) {
        robotParts[i].style.display = "none";
    }
})

var robot = document.getElementById("robot")
//var robotWheel = document.getElementById("robot-wheel")
var robotParts = document.getElementsByClassName("robot-part")



//多邊形定位模式
//用於量測特殊夾角和距離


var polygonPoints = []; // 存儲多邊形的頂點
var currentStep = 0; // 當前步驟
var mouseX = 0, mouseY = 0; // 滑鼠當前座標
var rightMode = false;
var lineLengths = []; // 存儲每條線的長度

// Snap to 90 degrees function
function snapTo90Degrees(x1, y1, x2, y2) {
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
    const snapAngle = Math.round(angle / 90) * 90; // Round to nearest 90 degree increment
    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    
    const snappedX = x1 + distance * Math.cos(snapAngle * (Math.PI / 180));
    const snappedY = y1 + distance * Math.sin(snapAngle * (Math.PI / 180));
    
    return { x: snappedX, y: snappedY };
}

// Update measurement table
function updateMeasurementTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
    
    if (polygonPoints.length < 2) return;
    
    const wheelDiameterInput = document.getElementById('Wheel-Diameter');
    const wheelDiameter = parseFloat(wheelDiameterInput.value) || 1;
    const wheelCircumference = Math.PI * wheelDiameter;
    
    // Add rows for each edge
    for (let i = 0; i < polygonPoints.length - 1; i++) {
        const p1 = polygonPoints[i];
        const p2 = polygonPoints[i + 1];
        
        const realDistance = calculateRealDistance(p1.x, p1.y, p2.x, p2.y);
        const wheelAngle = Math.round((realDistance / wheelCircumference) * 360);
        
        const row = document.createElement('tr');
        row.innerHTML = `<td>${realDistance}</td><td>${wheelAngle}</td>`;
        tableBody.appendChild(row);
    }
}

// 清空畫布
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// 繪製點
function drawPoint(x, y) {
    ctx.beginPath()
    ctx.arc(x, y, 3.5, 0, Math.PI * 2); // 畫一個半徑為 7 的圓點
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath()

    ctx.beginPath()
    ctx.arc(x, y, 2.5, 0, Math.PI * 2); // 畫一個半徑為 5 的圓點
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath()
/*
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2); // 畫一個半徑為 5 的圓點
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();*/
}

// 繪製線條
function drawLineTriangle(x_1, y_1, x_2, y_2) {
    //red line outside
    ctx.beginPath()
    ctx.moveTo(x_1, y_1);
    ctx.lineTo(x_2, y_2);
    ctx.strokeStyle = "white"
    ctx.lineWidth = 7
    ctx.lineCap = "round"
    ctx.stroke();
    ctx.closePath();

    //red line
    ctx.beginPath()
    ctx.moveTo(x_1, y_1);
    ctx.lineTo(x_2, y_2);
    ctx.strokeStyle = "red"
    ctx.lineWidth = 3
    ctx.lineCap = "round"
    ctx.stroke();
    ctx.closePath();


/*
    ctx.beginPath();
    ctx.moveTo(x_1, y_1);
    ctx.lineTo(x_2, y_2);
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();*/
}

// 繪製動態線條（滑鼠移動時的預覽線）
function drawDynamicLine() {
    clearCanvas();

    // 繪製已經確定的點和線
    for (let i = 0; i < polygonPoints.length; i++) {
        drawPoint(polygonPoints[i].x, polygonPoints[i].y);
    }
    
    // 繪製已確定的邊
    for (let i = 0; i < polygonPoints.length - 1; i++) {
        drawLineTriangle(polygonPoints[i].x, polygonPoints[i].y, polygonPoints[i + 1].x, polygonPoints[i + 1].y);
        displayLineLength(polygonPoints[i].x, polygonPoints[i].y, polygonPoints[i + 1].x, polygonPoints[i + 1].y, lineLengths[i]);
    }

    // 繪製動態線條（預覽線）
    if (polygonPoints.length > 0) {
        let snapToggle = document.getElementById('snapToggle');
        let previewMouseX = mouseX;
        let previewMouseY = mouseY;

        // 如果啟用 snap，將滑鼠位置對齐到 90 度
        if (snapToggle && snapToggle.checked) {
            const snappedPos = snapTo90Degrees(polygonPoints[polygonPoints.length - 1].x, polygonPoints[polygonPoints.length - 1].y, mouseX, mouseY);
            previewMouseX = snappedPos.x;
            previewMouseY = snappedPos.y;
        }

        drawTargetLine(polygonPoints[0].x, polygonPoints[0].y, previewMouseX, previewMouseY);
        drawLineTriangle(polygonPoints[polygonPoints.length - 1].x, polygonPoints[polygonPoints.length - 1].y, previewMouseX, previewMouseY);
        const length = calculateLineLength(polygonPoints[polygonPoints.length - 1].x, polygonPoints[polygonPoints.length - 1].y, previewMouseX, previewMouseY);
        displayLineLength(polygonPoints[polygonPoints.length - 1].x, polygonPoints[polygonPoints.length - 1].y, previewMouseX, previewMouseY, length);

        // 如果至少有2個點，顯示到起點的夾角
        if (polygonPoints.length >= 2) {
            displayAngle(polygonPoints[polygonPoints.length - 1].x, polygonPoints[polygonPoints.length - 1].y, polygonPoints[0].x, polygonPoints[0].y, previewMouseX, previewMouseY);
        }
    }
}

function drawTargetLine(startX, startY, mouseX, mouseY){
    //延伸線
    var slope = (mouseY - startY) / (mouseX - startX)
    //console.log(slope)
    var x_on_0 = (-1 * startY / slope) + startX
    var x_on_height = ((canvas.height - startY) / slope) + startX

    ctx.beginPath()
    for(var i=0; i<map.length; i++){
        if(map[i].style.display == "block" && map[i].id == "WRO2025_JuniorMap"){
            ctx.strokeStyle = "rgba(255, 255, 0, 1)"
            break;
        }
        else{
            ctx.strokeStyle = "rgba(255, 0, 0, 1)"
        }
    }
    /*if(elementaryMap.style.display == "block"){
        ctx.strokeStyle = "rgba(255, 0, 0, 1)"
    }
    else{
        ctx.strokeStyle = "rgba(255, 255, 0, 1)"
    }*/
    ctx.lineWidth = 3
    ctx.lineCap = "round"

    ctx.moveTo(x_on_0, 0)
    ctx.lineTo(x_on_height, canvas.height)
    ctx.stroke()
}

// 計算線條長度
function calculateLineLength(x1, y1, x2, y2) {
    var lineDist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    var degree = Math.round((lineDist / canvas.height) * (144 * 14.4))
    return degree;
}

// 顯示線條長度
/*function displayLineLength(x1, y1, x2, y2, degree) {
    ctx.font = "20px sans-serif"
    ctx.strokeStyle = "rgb(255, 0, 0)"
    ctx.fillStyle = "#FAFAFA"

    //ctx.lineWidth = 2;
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    ctx.strokeText(degree, midX, midY);
    ctx.fillText(degree, midX, midY);
}*/
function displayLineLength(x1, y1, x2, y2, degree) {
    const realDistance = calculateRealDistance(x1, y1, x2, y2);

    ctx.font = "20px sans-serif";
    ctx.strokeStyle = "rgb(255, 0, 0)";
    ctx.fillStyle = "#FAFAFA";

    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;


     // 輪子直徑（mm）& 圓周
    const wheelDiameterInput = document.getElementById("Wheel-Diameter");
    const wheelDiameter = parseFloat(wheelDiameterInput.value) || 1; // mm
    const wheelCircumference = Math.PI * wheelDiameter; // mm

    // 計算輪子轉動角度
    const wheelAngle = Math.round((realDistance / wheelCircumference) * 360);

    // 顯示角度不動（你現有的 degree）
    if (displayWheelAngle){
        ctx.strokeText(wheelAngle + "°", midX, midY);
        ctx.fillText(wheelAngle + "°", midX, midY);
    }

    // 顯示真實距離
    if (displayMM){
        ctx.strokeText(`${realDistance} mm`, midX, midY + 25);
        ctx.fillText(`${realDistance} mm`, midX, midY + 25);
    }
    
}



// 計算並顯示夾角
function displayAngle(x1, y1, x2, y2, x3, y3) {
    const angle1 = Math.atan2(y2 - y1, x2 - x1);
    const angle2 = Math.atan2(y3 - y1, x3 - x1);
    let angle = Math.round(Math.abs((angle1 - angle2) * (180 / Math.PI)))
    /*let angle = Math.abs((angle1 - angle2) * (180 / Math.PI));*/
    angle = angle > 180 ? 360 - angle : angle; // 確保角度在 0~180 度之間

    ctx.font = "20px sans-serif"
    ctx.strokeStyle = "rgb(0, 0, 255)"
    ctx.fillStyle = "#FAFAFA"
    /*ctx.font = "16px sans-serif";
    ctx.fillStyle = "black";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;*/
    if (displayCalAngle){
        ctx.strokeText(`${angle}°`, x1, y1);
        ctx.fillText(`${angle}°`, x1, y1);
    }
}



// 滑鼠移動事件
canvas.addEventListener("mousemove", function (event) {
    if (rightMode){
        var rect = canvas.getBoundingClientRect();
        mouseX = event.clientX - rect.left;
        mouseY = event.clientY - rect.top;

        if (currentStep === 1) {
            drawDynamicLine(); // 繪製動態線條
        }
    }
    
});

// 滑鼠右鍵點擊事件
canvas.addEventListener("contextmenu", function (event) {
    event.preventDefault(); // 防止右鍵菜單彈出

    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    // 檢查是否要結束多邊形（在起點附近第二次點擊）
    if (polygonPoints.length >= 3) {
        const firstPoint = polygonPoints[0];
        const distance = Math.sqrt((x - firstPoint.x) ** 2 + (y - firstPoint.y) ** 2);
        if (distance < 10) { // 如果在起點 10px 內，結束多邊形
            // 繪製閉合邊
            drawLineTriangle(polygonPoints[polygonPoints.length - 1].x, polygonPoints[polygonPoints.length - 1].y, firstPoint.x, firstPoint.y);
            displayLineLength(polygonPoints[polygonPoints.length - 1].x, polygonPoints[polygonPoints.length - 1].y, firstPoint.x, firstPoint.y, calculateLineLength(polygonPoints[polygonPoints.length - 1].x, polygonPoints[polygonPoints.length - 1].y, firstPoint.x, firstPoint.y));
            
            rightMode = false;
            currentStep = 0;
            polygonPoints = [];
            lineLengths = [];
            return;
        }
    }

    // 添加新點
    let finalX = x;
    let finalY = y;

    // 如果啟用 snap 並且已有至少一個點，對齐到 90 度
    if (polygonPoints.length > 0) {
        let snapToggle = document.getElementById('snapToggle');
        if (snapToggle && snapToggle.checked) {
            const snappedPos = snapTo90Degrees(polygonPoints[polygonPoints.length - 1].x, polygonPoints[polygonPoints.length - 1].y, x, y);
            finalX = snappedPos.x;
            finalY = snappedPos.y;
        }
    }

    rightMode = true;
    polygonPoints.push({ x: finalX, y: finalY });
    
    // 如果不是第一個點，計算到前一個點的距離
    if (polygonPoints.length > 1) {
        const prevPoint = polygonPoints[polygonPoints.length - 2];
        lineLengths.push(calculateLineLength(prevPoint.x, prevPoint.y, finalX, finalY));
    }
    
    currentStep = 1;
    drawDynamicLine();
    updateMeasurementTable();
});

function calculateRealDistance(x1, y1, x2, y2) {
    // canvas 高度對應實際地圖高度 1143 mm
    var canvasHeight = canvas.height;
    var realHeight = 1143; // mm
    var pixelDistance = Math.sqrt((x2 - x1)**2 + (y2 - y1)**2);
    var realDistance = pixelDistance / canvasHeight * realHeight; // mm
    return realDistance.toFixed(0);
}

function clearAllMeasurement() {
    // --- Clear canvas ---
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // --- Reset left click state ---
    drawState = 0;
    leftModeStart = false;
    startX = undefined;
    startY = undefined;

    // --- Reset right click (polygon) state ---
    rightMode = false;
    polygonPoints = [];
    lineLengths = [];
    currentStep = 0;

    // --- Reset table ---
    updateMeasurementTable();
}

// Clear polygon button functionality
document.addEventListener('DOMContentLoaded', function() {
    const clearPolygonBtn = document.getElementById('clearPolygonBtn');
    if (clearPolygonBtn) {
        clearPolygonBtn.addEventListener('click', function() {
            rightMode = false;
            polygonPoints = [];
            lineLengths = [];
            currentStep = 0;
            clearCanvas();
            updateMeasurementTable();
        });
    }
});

// Escape key to clear polygon
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        // --- cancel left-click measuring state ---
        if (drawState === 1 || leftModeStart) {
            leftModeStart = false;
            drawState = 0;
            startX = undefined;
            startY = undefined;
        }

        // --- cancel right-click (polygon) state ---
        rightMode = false;
        polygonPoints = [];
        lineLengths = [];
        currentStep = 0;

        // --- clear drawing + table ---
        clearCanvas();
        updateMeasurementTable();
    }
});
// Save polygon calculation
document.addEventListener('DOMContentLoaded', function() {
    const saveBtn = document.getElementById('saveBtn');
    const uploadBtn = document.getElementById('uploadBtn');
    const fileInput = document.getElementById('fileInput');

    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            const wheelDiameter = document.getElementById('Wheel-Diameter').value;
            const snapToggle = document.getElementById('snapToggle').checked;
            const mapSelect = document.getElementById('mapSelect').value;
            
            const data = {
                polygonPoints: polygonPoints,
                wheelDiameter: wheelDiameter,
                snapEnabled: snapToggle,
                mapSelected: mapSelect,
                timestamp: new Date().toISOString()
            };

            const dataStr = JSON.stringify(data, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `polygon-calculation-${Date.now()}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        });
    }

    if (uploadBtn) {
        uploadBtn.addEventListener('click', function() {
            fileInput.click();
        });
    }

    if (fileInput) {
        fileInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    try {
                        const data = JSON.parse(e.target.result);
                        
                        // Load polygon points
                        polygonPoints = data.polygonPoints || [];
                        lineLengths = [];
                        
                        // Recalculate line lengths
                        for (let i = 0; i < polygonPoints.length - 1; i++) {
                            lineLengths.push(calculateLineLength(
                                polygonPoints[i].x,
                                polygonPoints[i].y,
                                polygonPoints[i + 1].x,
                                polygonPoints[i + 1].y
                            ));
                        }
                        
                        // Load settings
                        if (data.wheelDiameter) {
                            document.getElementById('Wheel-Diameter').value = data.wheelDiameter;
                        }
                        
                        if (data.snapEnabled !== undefined) {
                            document.getElementById('snapToggle').checked = data.snapEnabled;
                        }
                        
                        if (data.mapSelected) {
                            document.getElementById('mapSelect').value = data.mapSelected;
                            // Trigger map selection change
                            document.getElementById('mapSelect').dispatchEvent(new Event('change'));
                        }
                        
                        // Redraw polygon
                        if (polygonPoints.length > 0) {
                            rightMode = true;
                            currentStep = 1;
                            drawDynamicLine();
                            updateMeasurementTable();
                        }
                        
                        alert('Calculation loaded successfully!');
                    } catch (error) {
                        alert('Error loading file: ' + error.message);
                    }
                };
                reader.readAsText(file);
            }
            // Reset file input
            fileInput.value = '';
        });
    }
});



/*曲線*/
/*
const robot_circle = document.getElementById('robot-circle');
let ctrlPressed = false;

// 按下 Ctrl
document.addEventListener('keydown', (e) => {
    if (e.key === 'Control' && !ctrlPressed) {
        

        var wheelTrack = parseFloat(document.getElementById('Wheel-Track').value); // mm
        var canvasHeight = canvas.height;
        var realHeight = 1143; // mm
        var pixelDiameter = wheelTrack / realHeight * canvasHeight;
        robot_circle.style.width = `${pixelDiameter}px`;
        robot_circle.style.height = `${pixelDiameter}px`;

        ctrlPressed = true;
        robot_circle.style.display = 'block';
    }
});

// 放開 Ctrl
document.addEventListener('keyup', (e) => {
    if (e.key === 'Control') {
        ctrlPressed = false;
        robot_circle.style.display = 'none';
    }
});*/

let displayWheelAngle = true;

document.getElementById("wheelAngleToggle").addEventListener("change", function () {
  displayWheelAngle = this.checked;
});

let displayMM = true;

document.getElementById("mmToggle").addEventListener("change", function () {
  displayMM = this.checked;
});

let displayCalAngle = true;

document.getElementById("angleToggle").addEventListener("change", function () {
  displayCalAngle = this.checked;
});