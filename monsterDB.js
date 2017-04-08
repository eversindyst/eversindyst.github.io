	var monsterDB = {
		zombie : "5,1,0,0,1,base,.3,1,.3,.3,.3,7,8,10,10,0:.1;1:.1;2:.1;3:.1,2"
	}
	function getMonster(x){
		var s = monsterDB[x];
		var t = s.split(',');
		var i = new monster(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9], t[10], t[11], t[12], t[13], t[14], t[15], t[16]);
		return i;
	}