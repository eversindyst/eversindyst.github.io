	function showWorldMap(){
		$('#worldMapContainer').toggle();
	}
	function changeZone(x){
		zoneHolder = getZone(x);
		currentMonsters = [];
		newMap();
		$('#worldMapContainer:visible').toggle();
	}