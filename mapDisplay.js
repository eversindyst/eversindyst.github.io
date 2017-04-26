	var debugStats;
	function printMap(m){ // 13x27 total display. center is 6x13
		var a = m.map;
		var x = m.x;
		var y = m.y;
		var terrain = zoneHolder.terrain;
		var displayString = terrainDB[terrain].split("!");
		var ss = "";
		var maxX = a.length;
		var maxY = a[0].length;
		var underX = x - 6;
		var underY = y - 13; 
		var overY = y +14 - maxY;
		var overX = x + 7 - maxX;
		var midLines = 14;
		var innerSpace = 27;
		var startingLine = (x-6);
		var startingLineY = (y-13);
		var unMove = displayString[0];
		var moveable = displayString[1];
		var unMoveColor = displayString[2];
		var moveableColor = displayString[3];
		
		if(underX < 0){
			midLines += underX;
		}
		if(overX >= 0){
			midLines -= overX;
			midLines -= 1;
			startingLine = (x - (maxX-x+overX)+1);
		}
		if(underY < 0){
			innerSpace += underY;
		}
		if(overY > 0){
			innerSpace -= (overY);
			startingLineY = (y - (maxY-y+overY) +1);
		}
		if(startingLine < 0){
			startingLine = 0;
		}
		if(startingLineY < 0){
			startingLineY = 0;
		}
		debugStats = "x: "+x+" y: "+y+" underX: "+underX+" overX: "+overX+" overY: "+overY+" underY: "+underY+" midLines: "+midLines+" innerSpace: "+innerSpace+" starting: "+startingLine+" startingY: "+startingLineY;
		for(var i=0; i< (0-underX); i++){
			ss += "                           <br>";
		}
		for(var i=Number(startingLine); i < Number(startingLine + midLines); i++){
			for(var j=0; j < (0-underY); j++){
				ss += " ";
			}
			for(var j=Number(startingLineY); j < Number(startingLineY + innerSpace); j++){
				if(a[i][j] == 1){
					ss += "<span style='color:"+unMoveColor+"'>"+unMove+"</span>";
				}
				if(a[i][j] == 0){
					ss += "<span style='color:"+moveableColor+"'>"+moveable+"</span>";
				}
				if(a[i][j] == 3){
					ss += "<span style='color:#1CFF0C'>*</span>";
				}
				if(a[i][j] == -1){
					ss += " ";
				}
			}
			for(var j=0; j < overY; j++){
				ss += " ";
			}
			ss+="<br>";
		}
		for(var i=0; i< overX; i++){
			ss += "                           <br>";
		}
		$('#counter').html(ss);
	}
	function displayEntireMap(m){
		var a = m.map;
		var maxX = a.length;
		var maxY = a[0].length;
		var terrain = zoneHolder.terrain;
		var displayString = terrainDB[terrain].split("!");
		var unMove = displayString[0];
		var moveable = displayString[1];
		var unMoveColor = displayString[2];
		var moveableColor = displayString[3];
		var ss = "";
		for(var i=0; i < maxX; i++){
			for(var j=0; j < maxY; j++){
				if(a[i][j] == 1){
					ss += "<span style='color:"+unMoveColor+"'>"+unMove+"</span>";
				}
				if(a[i][j] == 0){
					ss += "<span style='color:"+moveableColor+"'>"+moveable+"</span>";
				}
				if(a[i][j] == 3){
					ss += "<span style='color:#1CFF0C'>*</span>";
				}
				if(a[i][j] == -1){
					ss += " ";
				}
			}
			ss += "<br>";
		}
		$('#mapOverlay').html(ss);
	}
	function showMapOverlay(){
		$('#mapContainer').toggle();
	}