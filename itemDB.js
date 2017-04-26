	var itemDB = [
		"0,helmet,Iron Helmet,BaseDamage:1,,BaseDamage:1;HP:1,BaseDamage:15;HP:10,Burning Helmet of Rage,,.95,5",
		"1,body,Iron Breastplate,Armor:2,,HP:1;Armor:1,BaseDamage:15;HP:10,Burning Helmet of Rage,,.95,5",
		"2,gloves,Iron Gloves,Armor:1,,BaseDamage:1,BaseDamage:15;HP:10,Burning Helmet of Rage,,.95,5",
		"3,gloves,Steel Gloves,Armor:2;BaseDamage:2,,BaseDamage:1;Armor:1,BaseDamage:15;HP:10,Burning Helmet of Rage,,.95,5",
		"4,mainHand,Longsword,BaseDamage:3;Str:3,Might:statUpBonus:Str:5:20:4,BaseDamage:1;HP:1,BaseDamage:10;Str:5;HP:10,Grand Longsword,,.95,5,true"
	];

	function getItem(x){
		var s = itemDB[x];
		var t = s.split(',');
		var i = new item(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9], t[10], t[11]);
		return i;
	}
	function itemDrop(dropChnc, itemList, maxLoot){
		var s = [];
		for(var x=0; x<maxLoot; x++){
			if(Math.random() <= dropChnc){
				var dropFlag = false;
				var items = itemList.split(";");
				while(!dropFlag){
					for(var j=0; j<items.length; j++){
						var t = items[j].split(":");
						if(Math.random() >= t[1]){
							s.push(t[0]);
							dropFlag = true;
						}
					}
				}
				var id = s[Math.floor(Math.random()*s.length)];
				var i = getItem(id);
				handleItemDrop(i);
			}
		}
	}
	
	//Might:statUpBonus:Str:5:20:2
	//Firey Sword:addedDamage:15:fire