	var monsterDB = [
		"Zombie,30,6,5,3,3,1,1,1,1,2,base,3,.05,110,.01,0,.1,0,.1,0,.1,1,10,0,.6,0:.3;1:.3;2:.3,1,2,2.5"
	]
	function getMonster(x){
		var s = monsterDB[x];
		var i = new monster(s);
		return i;
	}