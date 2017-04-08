	function zone(name, level, monsterList, layout, terrain, effects, size, density){
		this.name = name;
		this.level = level;
		this.monsters = monsterList.split(";");
		this.layout = layout;
		this.terrain = terrain;
		this.effect = effects.split(";");
		this.size = size;
		this.density = density;
		
		var rooms = [];
		
		this.generateZone = function(){
			var x;
			var y;
			switch(Number(this.size)){
				case(1): 
					x = Math.floor((Math.random()*10)+13);
					if(x%2==0){
						x+=1;
					}
					y = Math.floor((Math.random()*20)+27);
					if(y%2==0){
						y+=1;
					}
					break;
				case(2):
					x = Math.floor((Math.random()*20)+20);
					if(x%2==0){
						x+=1;
					}
					y = Math.floor((Math.random()*50)+25);
					if(y%2==0){
						y+=1;
					}
					break;
				case(3):
					x = Math.floor((Math.random()*40)+30);
					if(x%2==0){
						x+=1;
					}
					y = Math.floor((Math.random()*80)+35);
					if(y%2==0){
						y+=1;
					}
					break;
			}
			$('#zoneName').html(this.name);
			return generateMap(x, y, this.terrain);
		}
		this.map = this.generateZone();
	} 
	function room(){
		this.monsters = monsters;
	}
	function newMap(){
		zoneHolder.map = zoneHolder.generateZone();
	}
	