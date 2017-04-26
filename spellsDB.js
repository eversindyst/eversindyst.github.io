	var spellDB = {
		Fireball: function(s){
			var ss = "";
			var dmg = spellDMGDB[s.name](s);	
			mc.totFireDamage = dmg;
			return ss;
		},
		Kick: function(s){
			var ss = "";
			var dmg = spellDMGDB[s.name](s);
			mc.totBaseDamage = dmg;
			return ss;
		}
	};
	var spellDMGDB = {
		Fireball: function(s){
			var dmg = Math.floor((s.damage + ((s.level-1) * 5)) * Math.pow(1.11,s.level) * (1+mc.functionalSpellDamage/100) * (1+mc.functionalFireDamage/100) * s.multi);
			return dmg;
		},
		Kick: function(s){
			var dmg = Math.floor((s.damage * Math.pow(1.05,s.level) + (mc.functionalBaseDamage * 1.2)) * s.effectiveness * s.multi);
			return dmg;
		}
	};
	var spellDesc = {
		Fireball: function(s){
			var ss = "Hurls a fireball at the enemy dealing "+spellDMGDB["Fireball"](s)+" fire damage.<br>Costs "+s.mCost+" mana.<br>"+s.chnc+"% chance to cast.";
			return ss;
		},
		Kick: function(s){
			var ss = "Delivers a swift kick to the enemy dealing "+spellDMGDB["Kick"](s)+" physical damage.<br>Costs "+s.sCost+" stamina.<br>"+s.chnc+"% chance to activate.";
			return ss;
		}
	};
	var spellList = {
		Warrior : "1:Kick,2:Fireball",
		Mage : "1:Fireball",
		Rogue : "",
		Monk : ""
	};
	var modList1 = {
		Fireball: "Split Fire,Empower,Blaze",
		Kick: "Bladed Boot"
	};
	var modList2 = {
		Fireball: "Split Fire,Kindling,Wild Fire",
		Kick: "Curb Stomp"
	};
	var modList3 = {
		Fireball: "Soul Flame,Conflagration,Blaze",
		Kick: "Flutter Kick"
	};
	var modList4 = {
		Fireball: "Wild Fire,Ignite,Scorch",
		Kick: "Iron Boot"
	};
	var modDesc = {
		'Empty': "No Mod Selected",
		'Split Fire': "Fireball hits up to 3 targets but does 20% less damage",
		'Empower': "Fireball does 50% more damage but costs 50% more mana",
		'Blaze': "Fireball does 20% more base damage",
		'Kindling': "Fireball does 15% less damage but costs 30% less mana",
		'Wild Fire': "Fireball has a 40% chance to hit an additional target for full damage",
		'Soul Flame': "Fireball's mana cost is reduced by up to 50%",
		'Conflagration': "Fireball always activates",
		'Ignite': "Fireball has a 10% chance to ignite. Dealing double damage but burns you for 10% of your max HP",
		'Scorch': "Fireball mana cost is 0",
		'Bladed Boot': "Kick deals 20% more damage",
		'Curb Stomp': "Kick has a 30% chance to deal double damage",
		'Flutter Kick': "Kick can now hit up to 3 targets",
		'Iron Boot': "Kick's stamina cost is doubled but deals 50% more damage"
	};
