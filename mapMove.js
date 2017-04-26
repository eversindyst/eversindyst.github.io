	function navigateMap(a){
		var maze = a.map;
		var posX = a.x;
		var posY = a.y;
		var x = maze.length;
		var y = maze[0].length;
		var moves = a.previous;
		var visited = a.visited;
		if(moves.length != 0){
			var validDir = "";
			if(posX+1 > 0 && posX + 1 < x - 1 && maze[posX+1][posY] == 0 && visited.indexOf(posY + (posX+1) * y) == -1){
				 validDir += "S";
			}
			if(posX-1 > 0 && posX - 1 < x - 1 && maze[posX-1][posY] == 0 && visited.indexOf(posY + (posX-1) * y) == -1){
				 validDir += "N";
			}
			if(posY-1 > 0 && posY - 1 < y - 1 && maze[posX][posY-1] == 0 && visited.indexOf((posY-1) + posX * y) == -1){
				 validDir += "W";
			}
			if(posY+1 > 0 && posY + 1 < y - 1 && maze[posX][posY+1] == 0 && visited.indexOf((posY+1) + posX * y) == -1){
				 validDir += "E";
			} 
			if(validDir.length > 0){
				var moveDir = Math.floor(Math.random()*(validDir.length));
				switch(validDir[moveDir]){
					case "N": 
						maze[posX][posY] = 0; 
						posX -= 1;
						maze[posX][posY] = 3;
						a.x = posX;
						break;
					case "S":
						maze[posX][posY] = 0; 
						posX += 1;
						maze[posX][posY] = 3;
						a.x = posX;
						break;
					case "W":
						maze[posX][posY] = 0;
						posY -= 1;
						maze[posX][posY] = 3;
						a.y = posY;
					   break;
					case "E":
						maze[posX][posY] = 0;
						posY += 1;
						maze[posX][posY] = 3;
						a.y = posY;
						break;
				}
				moves.push(posY + posX * y);
				visited.push(posY + posX * y);
				return (a);
			}
			else{ 
				var back = moves.pop();
				if(moves.length > 0 )
					back = moves.pop();
				maze[posX][posY] = 0;
				posX = Math.floor(back / y);
				posY = back % y;
				maze[posX][posY] = 3;
				a.y = posY;
				a.x = posX;
				if(moves.length > 1)
					moves.push(posY + posX * y);
				return (a);
			}	
		}
		else{
			completeZone(zoneHolder.id);
			unlockZone();
			newMap()
			return(zoneHolder.map);
		}
		
		
	/*	
		var validDir = "";
		if(posX+2 > 0 && posX + 2 < x - 1 && posY != 0 && posY != y && maze[posX+1][posY] == 0 && maze[posX + 2][posY] == 0){
			 validDir += "S";
		}
		if(posX-2 > 0 && posX - 2 < x - 1 && posY != 0 && posY != y && maze[posX-1][posY] == 0 && maze[posX - 2][posY] == 0){
			 validDir += "N";
		}
		if(posY-2 > 0 && posY - 2 < y - 1 && posX != 0 && posX != x && maze[posX][posY-1] == 0 && maze[posX][posY - 2] == 0){
			 validDir += "W";
		}
		if(posY+2 > 0 && posY + 2 < y - 1 && posX != 0 && posX != x && maze[posX][posY+1] == 0 && maze[posX][posY + 2] == 0){
			 validDir += "E";
		} 
		if(validDir.length > 0){
			var moveDir = Math.floor(Math.random()*(validDir.length));
			switch(validDir[moveDir]){
				case "N": 
				   maze[posX - 2][posY] = 3;
				   maze[posX][posY] = 0;
				   a.x = posX = posX-2;
				   break;
			  case "S":
				   maze[posX + 2][posY] = 3;
				   maze[posX][posY] = 0;
				   a.x = posX = posX+2;
				   break;
			  case "W":
				   maze[posX][posY - 2] = 3;
				   maze[posX][posY] = 0;
				   a.y = posY =  posY-2;
				   break;
			  case "E":
				   maze[posX][posY + 2]=3;
				   maze[posX][posY]=0;
				   a.y = posY = posY+2;
				   break;
			}
		}
		return (a); */
	}