	function zone(name, level, monsterList, packSize, terrain, effects, size, density, pathType, layout, id){
		this.name = name;
		this.level = level;
		this.monsters = monsterList.split(";");
		this.packSize = packSize;
		this.terrain = terrain;
		this.effect = effects.split(";");
		this.size = size;
		this.density = density;
		this.pathType = pathType;
		this.layout = layout;
		this.mobCount = 0;
		this.id = id;
		
		this.rooms = [];
		
		this.generateZone = function(){
			var x;
			var y;
			switch(Number(this.size)){
				case(0):
					x = Math.floor((Math.random()*5)+5);
					if(x%2==0){
						x+=1;
					}
					y = Math.floor((Math.random()*10)+10);
					if(y%2==0){
						y+=1;
					}
					break;
				case(1): 
					x = Math.floor((Math.random()*10)+10);
					if(x%2==0){
						x+=1;
					}
					y = Math.floor((Math.random()*15)+15);
					if(y%2==0){
						y+=1;
					}
					break;
				case(2):
					x = Math.floor((Math.random()*15)+20);
					if(x%2==0){
						x+=1;
					}
					y = Math.floor((Math.random()*20)+25);
					if(y%2==0){
						y+=1;
					}
					break;
				case(3):
					x = Math.floor((Math.random()*20)+30);
					if(x%2==0){
						x+=1;
					}
					y = Math.floor((Math.random()*25)+35);
					if(y%2==0){
						y+=1;
					}
					break;
			}
			$('#zoneName').html(this.name);
			return generateMap(x, y, this.layout);
		}
		this.map = this.generateZone();
		fillRooms(this);
	} 
	function room(){
		this.monsters = [];
	}
	function fillRooms(zHolder){
		zHolder.rooms = [];
		var maxX = zHolder.map.map.length;
		var maxY = zHolder.map.map[0].length;
		var a = zHolder.map.map;
		var maxMobs = Math.floor((maxX-2) * (maxY-2) * zHolder.packSize);
		var mobCount = 0;
		for(var i=0; i<maxX; i++){
			zHolder.rooms[i] = [];
		}
		for(var i=0; i<maxX; i++){
			for(var j=0; j<maxY; j++){
				if(a[i][j] == 0){
					if(mobCount < maxMobs){
						if(Math.random() <= zHolder.density){
							var selector = Math.floor(Math.random()*(zHolder.monsters.length));
							var monsterHolder = zHolder.monsters[selector];
							zHolder.rooms[i][j] = new room();
							zHolder.rooms[i][j].monsters.push(monsterHolder);
							mobCount += 1;
							while(Math.random() <= (zHolder.density*.8)){
								var roomHolder = zHolder.rooms[i][j];
								selector = Math.floor(Math.random()*(zHolder.monsters.length));
								monsterHolder = zHolder.monsters[selector];
								roomHolder.monsters.push(monsterHolder);
								mobCount +=1;
							}
						}
					}
					if(mobCount == 0){
						var selector = Math.floor(Math.random()*(zHolder.monsters.length));
						var monsterHolder = zHolder.monsters[selector];
						zHolder.rooms[i][j] = new room();
						zHolder.rooms[i][j].monsters.push(monsterHolder);
						mobCount += 1;
					}
				}
			}
		}
		zHolder.mobCount = mobCount;
	}
	function checkRoom(zHolder){
		var rooms = zHolder.rooms;
		var locX = zHolder.map.x;
		var locY = zHolder.map.y;
		var hasMonster = [];
		if(rooms[locX][locY] != null){
			var monList = rooms[locX][locY].monsters;
			for(var j=0; j < monList.length; j++){
			var mon = getMonster(monList[j]);
				mon.levelUp(zHolder.level);
				hasMonster.push(mon);
			}
		}
		return hasMonster;
	}
	function newMap(){
		zoneHolder.map = zoneHolder.generateZone();
		fillRooms(zoneHolder);
	}
	