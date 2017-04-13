	var zoneDB = [
		"Tranquil Forest,1,0,.2,forest,none,1,.4,.8",
		"Dry Field,2,0,.13,field,none,1,.2,.8",
		"Mountain Path,3,0,.12,path,none,1,.2,2",
		"Coastal Ledge,5,0,.15,ledge,none,1,.2,1.1",
		"Cliffs,7,0,.1,edge,none,1,.2,1.5",
		"Jungle,8,0,.22,jungle,none,2,.35,2",
		"City of Zaath,12,0,.1,town,none,1,.1,.5"
	]
	function getZone(x){
		var s = zoneDB[x];
		var t = s.split(',');
		var i = new zone(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8]);
		return i;
	}	