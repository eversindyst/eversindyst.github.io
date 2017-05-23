	var spellDB = {
		Fireball: function(s){
			var ss = "";
			if(mc.mana >= s.mCost){
				mc.mana -= s.mCost;
				var dmg = spellDMGDB[s.name](s);	
				mc.totFireDamage = dmg;
			}
			else{
				ss = "<span style='color:#266A69'>FIZZZZ- You do not have enough mana to cast Fireball</span><br>";
			}
			
			return ss;
		},
		Kick: function(s){
			var ss = "";
			if(mc.stamina >= s.sCost){
				mc.stamina -= s.sCost;
				var dmg = spellDMGDB[s.name](s);
				mc.totBaseDamage = dmg;
				stun_g = .5;
				stunDur_g = 2;
				weak_g = .5;
				weakDur_g = 1;
				vuln_g = .5;
				vulnDur_g = 2;
			}
			else{
				ss = "<span style='color:#266A69'>You try but you do not have enough stamina to Kick</span><br>";
			}
			return ss;
		},
		Backstab: function(s){
			var ss = "";
			if(mc.stamina >= s.sCost){
				mc.stamina -= s.sCost;
				var dmg = spellDMGDB[s.name](s);
				mc.totBaseDamage = dmg;
			}
			else{
				ss = "<span style='color:#266A69'>You do not have enough stamina to attempt a Backstab</span><br>";
			}
			return ss;
		},
		Darkblade: function(s){
			var ss = "";
			if(mc.stamina >= s.sCost){
				mc.stamina -= s.sCost;
				var dmg = spellDMGDB[s.name](s);
				mc.totDarkDamage = dmg;
			}
			else{
				ss = "<span style='color:#266A69'>You do not have enough stamina to perform a Darkblade attack</span><br>";
			}
			return ss;
		},
		"Freezing Finish": function(s){
			var ss = "";
			if(mc.stamina >= s.sCost){
				mc.stamina -= s.sCost;
				var dmg = spellDMGDB[s.name+"1"](s);
				mc.totBaseDamage = dmg;
				var dmg = spellDMGDB[s.name+"2"](s);
				mc.totColdDamage = dmg;
			}
			else{
				ss = "<span style='color:#266A69'>You do not have enough stamina to attempt a Freezing Finish</span><br>";
			}
			return ss;
		},
		Shock: function(s){
			var ss = "";
			if(mc.mana >= s.mCost){
				mc.mana -= s.mCost;
				var dmg = spellDMGDB[s.name](s);	
				mc.totShockDamage = dmg;
			}
			else{
				ss = "<span style='color:#266A69'>FIZZZZ- You do not have enough mana to cast Shock</span><br>";
			}
			
			return ss;
		},
		Icebrand: function(s){
			var ss = "";
			if(mc.mana >= s.mCost){
				mc.mana -= s.mCost;
				var dmg = spellDMGDB[s.name](s);	
				mc.totColdDamage = dmg;
			}
			else{
				ss = "<span style='color:#266A69'>FIZZZZ- You do not have enough mana to cast Icebrand</span><br>";
			}
			
			return ss;
		},
		Mantra: function(s){
			var ss = "";
			if(mc.mana >= s.mCost){
				mc.mana -= s.mCost;
				statTimer("Resist", spellDMGDB[s.name+"1"](s), "bonus", spellDMGDB[s.name+"2"](s));
				mc.hp += (spellDMGDB[s.name+"1"](s)*2);
				ss = "<span style='color:#19FF80'>You chant 'Mantra' and a shimmering light of protection envelops you, healing you for "+(spellDMGDB[s.name+"1"](s)*2)+" hp</span><br>";
			}
			else{
				ss = "<span style='color:#266A69'>FIZZZZ- You do not have enough mana to cast Mantra</span><br>";
			}
			
			return ss;
		},
		Fury: function(s){
			var ss = "";
			if(mc.mana >= s.mCost){
				mc.mana -= s.mCost;
				statTimer("BaseDamage", (1+(spellDMGDB[s.name+"1"](s)/100)), "more", spellDMGDB[s.name+"2"](s));
				mc.totBaseDamage = mc.functionalBaseDamage;
				effectDB["addedDamage"]((spellDMGDB[s.name+"1"](s)*3),"fire");
				mc.totBaseDamage = 0;
				ss = "<span style='color:#19FF80'>You chant 'Fury' and you feel empowered</span><br>";
			}
			else{
				ss = "<span style='color:#266A69'>FIZZZZ- You do not have enough mana to cast Fury</span><br>";
			}
			
			return ss;
		}
		
	};
	var spellDMGDB = {
		Fireball: function(s){
			var dmg = Math.floor((s.damage + ((s.level-2) * 2)) * Math.pow(1.045,s.level) * ((1+mc.functionalSpellDamage/100) * (1+mc.functionalFireDamage/100) *s.effectiveness) * s.multi);
			return dmg;
		},
		Kick: function(s){
			var dmg = Math.floor((((s.damage*(s.level/2))+(mc.functionalBaseDamage * 1.25))/1.5) * Math.pow(1.04,s.level) * s.effectiveness * s.multi);
			return dmg;
		},
		Backstab: function(s){
			var dmg = Math.floor((((s.damage*s.level)+(mc.functionalBaseDamage * 1.25 * Math.pow(1.02,s.level)))) * s.effectiveness * s.multi);
			return dmg;
		},
		Darkblade: function(s){
			var dmg = Math.floor((s.damage + (mc.functionalBaseDamage*.7)) * (Math.pow(1.021,s.level)) * s.effectiveness * s.multi * (1+mc.functionalDarkDamage/100));
			return dmg;
		},
		"Freezing Finish1": function(s){
			var dmg = Math.floor((mc.functionalBaseDamage * .8 * Math.pow(1.02,s.level)) * s.effectiveness * s.multi);
			return dmg;
		},
		"Freezing Finish2": function(s){
			var dmg = Math.floor(((((mc.functionalBaseDamage * .02)+s.damage)*(s.level/2.3)) * Math.pow(1.022,s.level)) * s.effectiveness * s.multi * (1+mc.functionalColdDamage/100));
			return dmg;
		},
		Shock: function(s){
			var dmg = Math.floor(s.damage + (s.damage*.05*s.level) * Math.pow(1.07,s.level) * ((1+mc.functionalSpellDamage/100) * (1+mc.functionalShockDamage/100) * s.effectiveness) * s.multi);
			return dmg;
		},
		Icebrand: function(s){
			var dmg = Math.floor(((s.damage*.06*s.level) + (mc.functionalBaseDamage * Math.pow(1.03,s.level))) * ((1+mc.functionalSpellDamage/100) * (1+mc.functionalColdDamage/100) * s.effectiveness) * s.multi);
			return dmg;
		},
		Mantra1: function(s){
			var dmg = Math.floor(s.damage +(2.1*s.level*1.22)* (1+mc.functionalSpellDamage/100) * s.effectiveness * s.multi);
			return dmg;
		},
		Mantra2: function(s){
			var dmg = Math.floor(18);
			return dmg;
		},
		Fury1: function(s){
			var dmg = Math.floor(s.damage +(1.9*s.level*1.25)* (1+mc.functionalSpellDamage/100) * s.effectiveness * s.multi);
			return dmg;
		},
		Fury2: function(s){
			var dmg = Math.floor(8);
			return dmg;
		}
	};
	var spellDesc = {
		Fireball: function(s){
			var ss = "Hurls a fireball at the enemy dealing "+spellDMGDB["Fireball"](s)+" <span style='color:red'>fire</span> damage.<br>Costs "+s.mCost+" mana.<br>"+s.chnc+"% chance to cast.<br>Hits up to "+s.targets+" targets.";
			return ss;
		},
		Kick: function(s){
			var ss = "Delivers a swift kick to the enemy dealing "+spellDMGDB["Kick"](s)+" <span style='color:white'>physical</span> damage.<br>Costs "+s.sCost+" stamina.<br>"+s.chnc+"% chance to activate.<br>Hits up to "+s.targets+" targets.";
			return ss;
		},
		Backstab: function(s){
			var ss = "Stabs the enemy in the back dealing "+spellDMGDB["Backstab"](s)+" <span style='color:white'>physical</span> damage.<br>Costs "+s.sCost+" stamina.<br>"+s.chnc+"% chance to activate.<br>Hits up to "+s.targets+" targets.";
			return ss;
		},
		Darkblade: function(s){
			var ss = "Channels dark energy into your blade dealing "+spellDMGDB["Darkblade"](s)+" <span style='color:purple'>dark</span> damage.<br>Costs "+s.sCost+" stamina.<br>"+s.chnc+"% chance to activate.<br>Hits up to "+s.targets+" targets.";
			return ss;
		},
		"Freezing Finish": function(s){
			var ss = "A spinning attack of ice that deals "+spellDMGDB["Freezing Finish2"](s)+" <span style='color:cyan'>cold</span> and "+spellDMGDB["Freezing Finish1"](s)+" <span style='color:white'>physical</span> damage.<br>Costs "+s.sCost+" stamina.<br>"+s.chnc+"% chance to activate.<br>Hits up to "+s.targets+" targets.";
			return ss;
		},
		Shock: function(s){
			var ss = "Channels a beam of lightning that deals "+spellDMGDB["Shock"](s)+" <span style='color:yellow'>shock</span> damage.<br>Costs "+s.mCost+" mana.<br>"+s.chnc+"% chance to cast.<br>Hits up to "+s.targets+" targets.";
			return ss;
		},
		Icebrand: function(s){
			var ss = "Enchant your weapon with frost and attack dealing "+spellDMGDB["Icebrand"](s)+" <span style='color:cyan'>cold</span> damage.<br>Costs "+s.mCost+" mana.<br>"+s.chnc+"% chance to cast.<br>Hits up to "+s.targets+" targets.";
			return ss;
		},
		Mantra: function(s){
			var ss = "Encase yourself in a protective barrier increases your Resist by "+spellDMGDB["Mantra1"](s)+" and healing you for double that amount. Lasts for "+spellDMGDB["Mantra2"](s)+" seconds.<br>Costs "+s.mCost+" mana.<br>"+s.chnc+"% chance to cast.<br>";
			return ss;
		},
		Fury: function(s){
			var ss = "Channels your inner fury increasing your damage by "+spellDMGDB["Fury1"](s)+"% for "+spellDMGDB["Fury2"](s)+" seconds.  You then deal "+(spellDMGDB["Fury1"](s)*3)+"% of your Base Damage as <span style='color:red'>fire</span> once.<br>Costs "+s.mCost+" mana.<br>"+s.chnc+"% chance to cast.<br>";
			return ss;
		}
	};
	var spellList = {
		Warrior : "1:Kick,10:Darkblade",
		Mage : "1:Fireball,7:Shock,10:Icebrand",
		Rogue : "1:Backstab,5:Freezing Finish",
		Monk : "1:Mantra,5:Fury",
		Fencer : "1:Kick",
		Tactician : "1:Kick",
		Myrmidon : "1:Kick",
		Assassin : "1:Kick",
		Alchemist : "1:Kick",
		Shadow : "1:Kick",
		Illusionist : "1:Kick",
		Warlock : "1:Kick",
		Elementalist : "1:Kick",
		Berserker : "1:Kick",
		Shaman : "1:Kick",
		Psion : "1:Kick",
		Hero : "1:Kick,10:Darkblade",
		Ninja : "1:Kick",
		Sorcerer : "1:Fireball,7:Shock",
		Avatar : "1:Kick"
	};
	var modList1 = {
		Fireball: "Split Fire,Empower,Blaze",
		Kick: "Bladed Boot",
		Backstab: "Bladed Boot",
		Darkblade: "Bladed Boot",
		"Freezing Finish": "Bladed Boot",
		Shock: "Scorch",
		Icebrand: "Scorch",
		Mantra: "Scorch",
		Fury: "Scorch"
	};
	var modList2 = {
		Fireball: "Split Fire,Kindling,Wild Fire",
		Kick: "Curb Stomp",
		Backstab: "Curb Stomp",
		Darkblade: "Bladed Boot",
		"Freezing Finish": "Bladed Boot",
		Shock: "Scorch",
		Icebrand: "Scorch",
		Mantra: "Scorch",
		Fury: "Scorch"
	};
	var modList3 = {
		Fireball: "Soul Flame,Conflagration,Blaze",
		Kick: "Flutter Kick",
		Backstab: "Flutter Kick",
		Darkblade: "Bladed Boot",
		"Freezing Finish": "Bladed Boot",
		Shock: "Scorch",
		Icebrand: "Scorch",
		Mantra: "Scorch",
		Fury: "Scorch"
	};
	var modList4 = {
		Fireball: "Wild Fire,Ignite,Scorch",
		Kick: "Iron Boot",
		Backstab: "Iron Boot",
		Darkblade: "Bladed Boot",
		"Freezing Finish": "Bladed Boot",
		Shock: "Scorch",
		Icebrand: "Scorch",
		Mantra: "Scorch",
		Fury: "Scorch"
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
	function makeNewSpell(sn){
		var spellHolder;
		switch(sn){
		//Name,targets,manaCost,stamCost,Damage,effs,chnc,chnc_G,mana_g,stam_g
			case("Fireball") : spellHolder = new spell("Fireball",1,3,0,7,.9,40,2,1.2,0); break;
			case("Kick") : spellHolder = new spell("Kick",1,0,1,1,.9,20,2.63,0,0.3); break;
			case("Backstab") : spellHolder = new spell("Backstab",1,0,5,3,1.1,25,2.5,0,.58); break;
			case("Darkblade") : spellHolder = new spell("Darkblade",1,0,4,3,1,41,1,0,.4); break;
			case("Freezing Finish") : spellHolder = new spell("Freezing Finish",2,0,4,6,1.1,20,2.5,0,.4); break;
			case("Shock") : spellHolder = new spell("Shock",2,5,0,12,1.1,30,3,.9,0); break;
			case("Icebrand") : spellHolder = new spell("Icebrand",1,2,0,15,1,20,2,.6,0); break;
			case("Mantra") : spellHolder = new spell("Mantra",1,8,0,4,1,5,.8,.9,0); break;
			case("Fury") : spellHolder = new spell("Fury",1,5,0,3,1,20,2.2,.5,0); break;
		}
		return spellHolder;
	}