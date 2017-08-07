//id, slot, name, stats, effect, lvlStats, upgrd Stats, upg name, upgEffects, xpMult, xpGain, is2h, isOh
	var itemDB = [
		"0,mainHand,Wooden Sword,BaseDamage:1,,Str:1,Str:5;BaseDamage:3,Broken Log,,.99,7,false,false",
		"1,body,Jacket,Armor:2,,Armor:1,Armor:8;Str:2,Heavy Jacket,,.99,7,false,false",
		"2,gloves,Plastic Gloves,Resist:1,,Resist:1,Armor:5;Resist:5,Doctor Gloves,,.99,9,false,false",
		"3,mainHand,Wooden Staff,SpellDamage:2,,SpellDamage:1,Int:2;SpellDamage:8,Trainee Staff,,.99,5,true,false",
		"4,mainHand,Sharp Stone,BaseDamage:1,,CritDmg:5,BaseDamage:2;CritChnc:1;CritDmg:30,Rusty Dagger,,.98,6,false,false",
		"5,offHand,Trash Can Lid,Armor:2,,Evasion:1,Armor:5;Evasion:5,Small Shield,,.98,6,false,false",
		"6,helmet,Colander,Armor:1,,Dex:1,Armor:4;CritChnc:2;End:3,Iron Colander,,.99,4,false,false",
		"7,body,Bed Sheets,Int:1,,Evasion:1;SpellDamage:1,Int:3;SpellDamage:3;Resist:5,Adept Robes,,.98,6,false,false",
		"8,amulet,Rock on String,Str:1;Int:1;Dex:1,,End:1;Wis:1;Agi:1,Str:5;Int:5;Dex:5,Rainbow Rock,,.97,5,false,false",
		"9,offHand,Book,SpellDamage:2,,SpellDamage:1,Int:3;SpellDamage:10,Mystic Book,Read!:statUpBonus:Int:10:33:6,.97,10,false,false",
		"10,trinket,Jar of Smoke,End:1;Wis:1;Agi:1,,,End:4;Wis:4;Agi:4,Jar of Purple Smoke,Unleash Smog:statUpBonus:Dex:30:25:4,.97,9,false,false",
		"11,shoulders,Plastic Shingles,Agi:2;Evasion:5,,Evasion:1;Agi:1,Agi:5;Dex:3;Evasion:20,Hard Plastic Shingles,,.98,9,false,false",
		"12,aura,Lightbulb,CritChnc:2;ShockDamage:5;CritDmg:5,,Evasion:2,Dex:7;ShockDamage:8;Evasion:13,Fluorescents,,.97,8,false,false",
		"13,boots,Flipflops,Int:2;FireDamage:2,,Resist:1,Int:4;FireDamage:8;Wis:5,Flaming Flipflops,,.97,8,false,false",
		"14,mainHand,Iron Sword,BaseDamage:3,,Str:1,BaseDamage:5;Str:5,Flaming Iron Sword,Firebrand:addedDamage:15:fire,.97,8,true,false",
		"15,pants,Linen Pants,Armor:1,,Armor:1,Armor:5;Resist:10,Patched Pants,,.97,10,false,false",
		"16,mainHand,Wooden Wand,SpellDamage:2;Int:1,,SpellDamage:1,Int:3;SpellDamage:5,Magic Wand,,.98,10,false,false",
		"17,body,Medium Leather,Dex:1;Evasion:3,,Evasion:1,Dex:3;Evasion:15,Light Leather,,.98,10,false,false",
		"18,boots,Leather Boots,Armor:1;Evasion:1,,Evasion:1;Armor:1,Str:3;Dex:5;Armor:7,Heavy Boots,,.98,10,false,false",
		"19,helmet,Bandana,Resist:2;Evasion:1,,Evasion:1;Resist:1,Agi:4;Evasion:10;Wis:4,Swift Bandana,,.98,9,false,false",
		"20,gloves,Worker Gloves,Armor:2;BaseDamage:1,,Armor:1,Str:2;Armor:8;BaseDamage:2,Combat Gloves,,.99,5,false,false",
		"21,amulet,Bronze Chain,Armor:2,,Armor:1,Armor:10;CritChnc:2,Hardened Bronze Chain,,.98,7,false,false",
		"22,amulet,Daisy Garland,Evasion:3;Resist:1,,Resist:1,Evasion:5;Wis:3;Resist:5,Daisy Chain,,.98,8,false,false",
		"23,aura,Firefly,End:2;Agi:2,,CritChnc:0.5,End:3;Agi:4;CritDmg:30,Swarm of Fireflies,,.97,7,false,false",
		"24,aura,Blessed Shroud,SpellDamage:4;CritChnc:2,,Armor:2,SpellDamage:6;CritChnc:3;Armor:15,Blessed Shroud of Protection,,.97,5,false,false",
		"25,pants,Linen Gown,Int:2;Evasion:2,,SpellDamage:1,Int:5;Evasion:10;Wis:4,Moonlight Gown,,.97,8,false,false",
		"26,helmet,Leather Cap,Evasion:5,,Dex:1,Evasion:10;CritChnc:1;CritDmg:22,Feathered Leather Cap,,.99,8,false,false",
		"27,aura,Cloud of Broken,Str:-999999999999;Int:-999999999999;Dex:-999999999999,,,,Cloud of Death,,.5,1,false,false",
		"28,mainHand,Ashkindor,Str:10;BaseDamage:5;CritChnc:3,,Str:2;BaseDamage:1;CritChnc:.5,Str:25;BaseDamage:15;CritChnc:10,Ashkindor The King Slayer,World Breaker:statUpMore:Dex:1.5:33:5,.96,5,true,false"
		];

	
	function getItem(x){
		var s = itemDB[x];
		var t = s.split(',');
		var i = new item(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9], t[10], t[11], t[12]);
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
				itemCounter++;
				handleItemDrop(i);
			}
		}
	}
	
	//Might:statUpBonus:Str:5:20:2
	//Firey Sword:addedDamage:15:fire