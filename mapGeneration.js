	function mapItem(map, x, y, mc, t){
		this.map = map;
		this.x = x;
		this.y = y;
		this.previous = mc;
		this.terrain = t;
		this.visited = deepCopyArray(mc);
	}
	function generateMap(x, y, terrain){
		var moves = [];
		var maze = [];
		var mazeCopy = [];
		var startingX;
		var startingY;
		for(var i=0; i<x; i++){
			maze[i] = [];
			for(var j=0; j<y; j++){
				maze[i][j] = 1;
			}
		}
		maze = placeRandomRoom(maze, terrain);
		var posX = getRandomX(x);
		var posY = getRandomY(posX, x, y);
		startingX = posX;
		startingY = posY;
		maze[posX][posY] = 3;
		moves.push(posY+posX * y);
		mazeCopy.push(posY+posX * y);
		
		while(moves.length){
			var validDir = "";
			if(posX+2 > 0 && posX + 2 < x - 1 && posY != 0 && posY != y && (maze[posX + 2][posY] == 1 || maze[posX+2][posY] == 4)){
				 validDir += "S";
			}
			if(posX-2 > 0 && posX - 2 < x - 1 && posY != 0 && posY != y && (maze[posX - 2][posY] == 1 || maze[posX-2][posY] == 4)){
				 validDir += "N";
			}
			if(posY-2 > 0 && posY - 2 < y - 1 && posX != 0 && posX != x && (maze[posX][posY - 2] == 1 || maze[posX][posY-2] == 4)){
				 validDir += "W";
			}
			if(posY+2 > 0 && posY + 2 < y - 1 && posX != 0 && posX != x && (maze[posX][posY + 2] == 1 || maze[posX][posY+2] == 4)){
				 validDir += "E";
			} 
			if(validDir.length > 0){
				var moveDir = Math.floor(Math.random()*(validDir.length));
				switch(validDir[moveDir]){
					case "N": 
					   maze[posX - 2][posY] = 0;
					   maze[posX - 1][posY] = 0;
					   posX -= 2;
					   break;
				  case "S":
					   maze[posX + 2][posY] = 0;
					   maze[posX + 1][posY] = 0;
					   posX += 2;
					   break;
				  case "W":
					   maze[posX][posY - 2] = 0;
					   maze[posX][posY - 1] = 0;
					   posY -= 2;
					   break;
				  case "E":
					   maze[posX][posY + 2]=0;
					   maze[posX][posY + 1]=0;
					   posY += 2;
					   break;
				}
				moves.push(posY + posX * y);
			}
			else{ 
				var back = moves.pop();
				posX = Math.floor(back / y);
				posY = back % y;
			}	
		} 
		maze = removeOutliers(maze);
		maze = removeIslands(maze, startingX, startingY, 0, 0);
		maze = removeOutliers(maze);
		maze = preventSoloMap(maze, startingX, startingY);
	//	maze = removeCenters(maze);
	
		var m = new mapItem(maze, startingX, startingY, mazeCopy, terrain);
		return m;
		
	}
	function getRandomX(x){
		var returnVal = 1;
		if(Math.floor(Math.random()*2) == 1){
			returnVal = x-2;
		}
		return Number(returnVal);
	}
	function getRandomY(posX, x, y){
		var returnVal = 1;
		returnVal = Math.floor(Math.random()*(y-2)+1);
		if(returnVal %2 == 0)
			returnVal += 1;
		return Number(returnVal);
	}
	function placeRandomRoom(a, t){
		var freq;
		var sizeX;
		var sizeY;
		var maxX = a.length;
		var maxY = a[0].length;
		var attempts;
		var fieldType;
		var placeSecond = false;
		var freq2;
		var sizeX2;
		var sizeY2;
		var attempts2;
		var fieldType2;
		var border = false;
		var border2 = false;
		var noOverlap = false;
		var noOverlap2 = false;
		switch(t){
			case("forest"): 
				freq = .7;
				sizeX = 4;
				sizeY = 4;
				fieldType = 4;
				attempts = Math.floor((maxX*maxY)/(sizeX*sizeY) * .6); break;
			case("field"): 
				freq = 1;
				sizeX = maxX-2;
				sizeY = maxY-2;
				fieldType = 4;
				attempts = 1; 
				placeSecond = true;
				freq2 = .45;
				sizeX2 = 1;
				sizeY2 = 1;
				fieldType2 = 5;
				attempts2 = Math.floor((maxX*maxY)/(sizeX2*sizeY2) * .4); break;
			case("path"):
				freq = .7;
				sizeX = 1;
				sizeY = Math.floor(maxY/2);
				fieldType = 5;
				attempts = Math.floor((maxX*maxY)/(sizeX*sizeY) * .6); break;
			case("ledge"):
				freq = .55;
				sizeX = 1;
				sizeY = Math.floor(maxY-2);
				fieldType = 4;
				attempts = Math.floor((maxX*maxY)/(sizeX*sizeY) * .4); break;
			case("edge"):
				freq = 0;
				sizeX = 0;
				sizeY = 0;
				fieldType = 4;
				attempts = 0;
				placeSecond = true;
				freq2 = 1;
				sizeX2 = maxX-4;
				sizeY2 = maxY-4;
				fieldType2 = 5;
				attempts2 = 1; break;
			case("jungle"):
				freq = .7;
				sizeX = Math.floor(maxX/5);
				sizeY = Math.floor(maxY/5);
				border=true;
				fieldType = 4;
				attempts = Math.floor((maxX*maxY)/(sizeX*sizeY) * .65); break;
			case("town"):
				freq = 1;
				sizeX = maxX-2;
				sizeY = maxY-2;
				fieldType = 2;
				attempts = 1; 
				placeSecond = true;
				freq2 = .7;
				sizeX2 = 6;
				sizeY2 = 6;
				fieldType2 = 4;
				border2 = true;
				noOverlap2 = true;
				attempts2 = Math.floor((maxX*maxY)/(sizeX2*sizeY2) * 1.26); break;
				
		}
		for(var i=0; i<attempts; i++){
			var x = Math.floor((Math.random()*(maxX-(sizeX+1)))+1);
			var y = Math.floor((Math.random()*(maxY-(sizeY+1)))+1);
			var overlap = findOverlap(a, x, sizeX, y, sizeY);
			if(Math.random() <= freq){
				for(var j = x; j < x+sizeX; j++){
					for(var k = y; k < y+sizeY; k++){
						if(fieldType == 5){
							if(j != 1 && j !=maxX-2){
								if(a[j+1][k] != fieldType && a[j-1][k] != fieldType){
									a[j][k] = fieldType;
								}
							}
						}
						else{
							if(overlap && noOverlap){
							}
							else{
								if(border){
									a[j][k] = fieldType;
									if(j==x || j == (x+sizeX-1)){
										a[j][k] = 5;
									}
									else{
										if(k == y || k == (y+sizeY-1)){
											a[j][k] = 5;
										}
									}
								}
								else{
									a[j][k] = fieldType;
								}
							}
						}
					}
				}
			}
		}
		if(placeSecond){
			for(var i=0; i<attempts2; i++){
				var x = Math.floor((Math.random()*(maxX-(sizeX2+1)))+1);
				var y = Math.floor((Math.random()*(maxY-(sizeY2+1)))+1);
				var overlap = findOverlap(a, x, sizeX2, y, sizeY2);
				if(Math.random() <= freq2){
					for(var j = x; j < x+sizeX2; j++){
						for(var k = y; k < y+sizeY2; k++){
							if(overlap && noOverlap2){
							}
							else{
								if(border2){
									a[j][k] = fieldType2;
									if(j==x || j == (x+sizeX2-1)){
										a[j][k] = 5;
									}
									else{
										if(k == y || k == (y+sizeY2-1)){
											a[j][k] = 5;
										}
									}
								}
								else{
									a[j][k] = fieldType2;
								}
							}
						}
					}
				}
			}
		}
		return a;
	}
	function findOverlap(a, x, maxX, y, maxY){
		var OL = false;
			for(var j = x; j < x+maxX; j++){
				for(var k = y; k< y+maxY; k++){
					if(a[j][k] == 5 || a[j][k] == 4)
						OL = true;
				}
			}
		return OL;
	}
	function preventSoloMap(a,x,y){
		var holdY;
		if(a[x+1][y] == 1 && a[x-1][y] == 1 && a[x][y+1] == 1 && a[x][y-1] == 1){
			if(y-1 > 0){
			var i;
				for(i = y; i > 1; i--){
					a[x][i] = 0;
				}
				holdY = i;
			}		
			else{
			var i;
				for(i = 1; i < a[0].length-1; i++){
					a[x][i] = 0;
				}
				holdY = i-1;
			}
			if(x-1 > 0){
				for(var i = x; i > 0; i--){
					a[i][holdY] = 0;
				}
			}
			else{
				for(var i = 1; i < a.length-1; i++){
					a[i][holdY] = 0;
				}
			}
		}
		a[x][y] = 3;
		return a;
	}
	function removeIslands(a, startingX, startingY, lastX, lastY){
		var midX = startingX;
		var midY = startingY;
		a[midX][midY] = 0;
		a = floodFill(a,midX,midY);
		for(var i = lastX; i < a.length; i++){
			for(var j = lastY; j < a[0].length; j++){
				if(a[i][j] == 0){
					var x = i;
					var y = j;
					
					a[x][y] = 4;
					if(y > midY){
						y -= 1;
					}
					else{
						if(y < midY){
							y += 1;
						}
					}
					if(a[x][y]!=3)
						a[x][y] = 4;
					if(x > midX){
						x -= 1;
					}
					else{
						if(x < midX){
							x += 1;
						}
					}
					if(a[x][y]!=3)
						a[x][y] = 4;
						
					a = removeOutliers(a);
					a = removeIslands(a, midX, midY, x, y);
				}
			}
		}
		a[midX][midY] = 3;
		return a;
	}
	function floodFill(a, x, y){
		if(x < 0 || x > a.length-1 || y < 0 || y > a[0].length-1){
			return a;
		}
		if(a[x][y] != 0){
			return a;
		}
		a[x][y] = 4;
		floodFill(a, x+1, y);
		floodFill(a, x-1, y);
		floodFill(a, x, y+1);
		floodFill(a, x, y-1);
		return a;
	}
	function removeEvenOutliers(a){
		var maxX = a.length;
		var maxY = a[0].length;
		for(var i = 0; i < maxX; i++){
			for(var j = 0; j < maxY; j++){
				if(a[i][j] == 4){
					a[i][j] = 0;
				}
			}
		}
		return a;
	}
	function removeOutliers(a){
		var maxX = a.length;
		var maxY = a[0].length;
		for(var i = 0; i < maxX; i++){
			for(var j = 0; j < maxY; j++){
				if(a[i][j]%2 == 0){
					a[i][j] = 0;
				}
				if(a[i][j] == 5){
					a[i][j] = 1;
				}
			}
		}
		return a;
	}
	function removeCenters(a){
		var maxX = a.length;
		var maxY = a[0].length;
		var b = deepCopyArray(a);
		for(var i = 0; i < maxX; i++){
			for(var j = 0; j < maxY; j++){
				if(a[i][j] == 1){
					if(i != 0 && i != maxX-1 && j != 0 && j != maxY-1){
						if(a[i][j+1] == 1 && a[i][j-1] == 1 && a[i+1][j] == 1 && a[i-1][j] == 1){
							b[i][j] = -1;
						}
					}
				}
			}
		}
		a = deepCopyArray(b);
		return a;
		
	}
	function deepCopyArray(o){
		var output, v, key;
		output = Array.isArray(o) ? [] : {};
		for (key in o) {
			v = o[key];
			output[key] = (typeof v === "object") ? deepCopyArray(v) : v;
		}
		return output;
	}