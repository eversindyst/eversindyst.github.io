	var zoneDB = [
		"Tranquil Forest,1,zombie;lassanga,2,forest,,1,.1",
		"Dry Field,2,zombie,1,field,,1,.2",
		"Mountain Path,3,zombie,1,path,,1,.2",
		"Coastal Ledge,5,zombie,1,ledge,,1,.2",
		"Cliffs,7,zombie,1,edge,,1,.2",
		"Jungle,8,zombie,1,jungle,,2,.2",
		"City of Zaath,12,zombie,1,town,,1,.2"
	]
	function getZone(x){
		var s = zoneDB[x];
		var t = s.split(',');
		var i = new zone(t[0], t[1], t[2], t[3], t[4], t[5], t[6]);
		return i;
	}	