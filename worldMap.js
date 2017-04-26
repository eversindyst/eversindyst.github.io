	function showWorldMap(){
		$('#worldMapContainer').toggle();
	}
	function changeZone(x){
		zoneHolder = getZone(x);
		currentMonsters = [];
		newMap();
		$('#worldMapContainer:visible').toggle();
		printMap(zoneHolder.map);
		displayEntireMap(zoneHolder.map);
	}
	function completeZone(x){
		$('#zone'+x).css("background-color", "green");
		mapCompletion[x] = true;
	}
	function unlockZone(){
		for(var i=0; i < mapUnlock.length; i++){
			if(!mapUnlock[i]){
				switch(i){
					case(0):unlock(i);break;
					case(1):
					if(mapCompletion[0])
						unlock(i);
					break;
				}
			}
		}
	}
	function unlock(x){
		$('#zone'+x+':hidden').toggle();
		mapUnlock[x] = true;
	}