	var skillsRemain = 0;
	var selectedSkills = "";
	var skillTree = {
		w1:"str:1:Strength,hp:5:Life,str:1:Strength,stam:5:Stamina,str:3:Might,end:1:Endurance,str:2:Strength,dmg:2:Damage,hp:5:Life,mend:3:Heavy Hide,dex:2:Dexterity,agi:2:Agility,stam:5:Stamina,hreg:5:Life Regen,hp:20:Vigor,stam:10:Stamina,str:2:Strength,end:2:Endurance,arm:10:Armor,mstam:6:Expanded Lungs,arm:5:Armor,wis:3:Wisdom,agi:3:Agility,dex:3:Dexterity,str:6:Crushing Force,cchnc:1:Crit Chance,cdmg:10:Crit Damage,intl:3:Intelligence,leech:2:Life Leech,mend:3:Golem Blood,str:3:Strength,intl:4:Intelligence,arm:10:Armor,intl:4:Intelligence,str:5:Brute Force,dex:2:Dexterity,str:2:Strength,wis:2:Wisdom,sreg:5:Stamina Regen,mdmg:3:Shattering Blow,dmg:2:Damage,end:2:Endurance,arm:5:Armor,eva:5:Evasion,res:10:Mental Fortress,agi:2:Agilty,dex:2:Dexterity,wis:3:Wisdom,end:3:Endurance,mstr:2:Weighted Training,mana:10:Mana,mana:10:Mana,hp:10:Life,res:5:Resist,arm:15:Plate Armor,eva:5:Evasion,leech:1:Life Leech,cdmg:10:Crit Damage,dex:2:Dexterity,w1m:0:Juggernaut,wis:2:Wisdom,intl:2:Intelligence,agi:3:Agility,dex:3:Dexterity,dmg:3:Sharpened Blade",
		w2:"end:1:Endurance,arm:5:Armor,hp:5:Life,hreg:5:Life Regen,end:3:Thick Skin,hp:5:Life,arm:5:Armor,end:1:Endurance,str:2:Strength,mend:3:Built by Bricks,str:2:Strength,hreg:5:Life Regen,eva:5:Evasion,arm:5:Armor,res:10:Barrier,hp:10:Life,stam:5:Stamina,sreg:5:Stamina Regen,hreg:5:Life Regen,mhp:6:Boon of Life,dmg:1:Damage,str:3:Strength,agi:2:Agility,wis:2:Wisdom,eva:15:Quick Step,arm:10:Armor,fres:3:Fire Resist,cres:3:Cold Resist,sres:3:Shock Resist,mend:4:Unstoppable,end:2:Endurance,dmg:2:Damage,dex:2:Dexterity,intl:2:Intelligence,end:5:Diamond Skin,hp:10:Life,stam:10:Stamina,sreg:5:Stamina Regen,hreg:5:Life Regen,mhp:4:Children of the Earth,arm:15:Armor,end:2:Endurance,leech:2:Life Leech,dmg:2:Damage,eva:25:Mirage,arm:10:Armor,res:10:Resist,end:3:Endurance,str:3:Strength,mstam:3:Second Wind,mana:10:Mana,hp:10:Life,stam:10:Stamina,arm:5:Armor,end:5:Healthy Body,arm:10:Armor,end:3:Endurance,wis:3:Wisdom,agi:3:Agility,w2m:0:Unscratched,hp:10:Life,end:3:Endurance,stam:10:Stamina,mana:10:Mana,hp:30:Lifes Embrace",
		w3:"dmg:1:Damage,cchnc:1:Crit Chance,cdmg:10:Crit Damage,dmg:1:Damage,str:4:Deadly Strikes,leech:1:Life Leech,str:2:Strength,end:1:Endurance,str:2:Strength,cchnc:3:Precision,str:2:Strength,leech:1:Life Leech,dmg:2:Damage,arm:5:Armor,cdmg:15:Piercing Blows,hp:5:Life,stam:5:Stamina,dmg:1:Damage,str:2:Strength,mstr:3:Brute,cchnc:1:Crit Chance,cdmg:10:Crit Damage,dmg:1:Damage,str:2:Strength,dex:4:Swift Strikes,end:2:Endurance,hp:10:Life,leech:1:Life Leech,dmg:2:Damage,mstr:4:Unending Strength,end:2:Endurance,dex:2:Dexterity,leech:1:Life Leech,dmg:2:Damage,cdmg:15:Heart-seeker,dex:3:Dexterity,agi:2:Agility,intl:2:Intelligence,wis:2:Wisdom,mstr:3:Rapid Gains,arm:5:Armor,dmg:2:Damage,end:2:Endurance,str:2:Strength,arm:10:Blood Covered Armor,cchnc:1:Crit Chance,dmg:1:Damage,str:2:Strength,cdmg:10:Crit Damage,mstam:5:Winded,mana:10:Mana,dex:2:Dexterity,stam:10:Stamina,cdmg:10:crit Damage,ddmg:10:Dark Blade,str:2:Strength,end:2:Endurance,dex:3:Dexterity,leech:2:Life Leech,w3m:0:Destructive Nature,dex:3:Dexterity,str:3:Strength,hp:10:Life,end:2:Endurance,cchnc:2:Opportunity",
		m1:"wis:1:Wisdom,mana:5:Mana,hp:5:Life,intl:1:Intelligence,wis:3:Experience,hp:5:Life,stam:5:Stamina,cchnc:1:Crit Chance,wis:2:Wisdom,mwis:3:Critical thinking,mana:5:Mana,cdmg:10:Crit Damage,agi:2:Agility,end:2:Endurance,res:10:Mental Barrier,hp:5:Life,mana:5:Mana,mreg:5:Mana Regen,intl:1:Intelligence,cchnc:3:Acuity,intl:1:Intelligence,arm:5:Armor,cchnc:1:Crit Chance,hp:5:Life,spdmg:5:Astral Power,fdmg:2:Fire Damage,cldmg:2:Cold Damage,sdmg:2:Shock Damage,ddmg:5:Dark Damage,mintl:3:Knowledge,wis:2:Wisdom,mana:5:Mana,intl:2:Intelligence,res:5:Resist,mreg:10:Deep Thought,wis:2:Wisdom,end:2:Endurance,hp:10:Life,mana:10:Mana,mmana:20:Knowledge Seeker,intl:2:Intelligence,wis:2:Wisdom,cchnc:1:Crit Chanc,cdmg:10:Crit Damage,dex:5:Deft Mind,spdmg:3:Spell Damage,cchnc:1:Crit Chance,wis:3:Wisdom,mana:15:Mana,mwis:6:Sage,cdmg:10:Crit Damage,cchnc:2:Crit Chance,dex:2:Dexterity,wis:2:Wisdom,mana:30:Meditation,intl:2:Intelligence,fres:2:Fire Resist,cres:2:Cold Resist,sres:2:Shock Resist,m1m:0:Clarity,wis:2:Wisdom,intl:2:Intelligence,cchnc:1:Crit Chance,dex:3:Dexterity,res:10:Resist",
		m2:"intl:1:Intelligence,hp:5:Life,intl:1:Intelligence,mana:5:Mana,intl:3:Savant,hp:10:Life,eva:5:Evasion,arm:5:Armor,intl:1:Intelligence,mintl:3:Understanding,mana:10:Mana,mreg:5:Mana Regen,cchnc:1:Crit Chance,cdmg:10:Crit Damage,intl:5:Astral Learning,end:2:Endurance,dex:2:Dexterity,mana:5:Mana,intl:2:Intelligence,mmana:10:Unlimited Power,cchnc:1:Crit Chance,intl:2:Intelligence,dex:2:Dexterity,cdmg:10:Crit Damage,wis:5:Proverbs,intl:2:Intelligence,cchnc:1:Crit Chance,hp:10:Life,mana:10:Mana,cdmg:30:Destructive Thoughts,intl:2:Intelligence,res:5:Resist,arm:5:Armor,eva:5:Evasion,spdmg:5:Brain Power,mana:5:Mana,wis:2:Wisdom,hp:5:Life,mreg:5:Mana Regen,mintl:3:Prodigy,spdmg:3:Spell Power,res:5:Resist,wis:2:Wisdom,end:3:Endurance,cchnc:2:Locate Weakness,cdmg:10:Crit Damage,intl:2:intelligence,wis:2:Wisdom,mana:10:Mana,mwis:4:Foresight,cdmg:10:Crit Damage,cchnc:1:Crit Chance,wis:2:Wisdom,mana:10:Mana,intl:5:Brilliance,end:2:Endurance,wis:2:Wisdom,res:5:Resist,cchnc:1:Crit Chance,m2m:0:Mind Bomb,intl:2:Intelligence,wis:2:Wisdom,cchnc:1:Crit Chance,dex:2:Dexterity,spdmg:5:Potent Thoughts",
		m3:"str:1:Strength,intl:1:Intelligence,hp:5:Life,mana:5:Mana,dmg:2:Heavy Hits,cchnc:1:Crit Chance,str:1:Strength,intl:1:Intelligence,cdmg:10:Crit Damage,mstr:3:Calculated Power,mana:10:Mana,hp:10:Life,mreg:5:Mana Regen,str:1:Strength,intl:3:Mind Shock,str:2:Strength,end:2:Endurance,wis:2:Wisdom,dex:2:Dexterity,mstr:4:Arcane Muscles,cchnc:1:Crit Chance,intl:2:Intelligence,str:2:Strength,dmg:1:Damage,str:4:Bruiser,intl:2:Intelligence,cchnc:1:Crit Chance,dex:2:Dexterity,wis:2:Wisdom,mintl:3:Expanded Learning,str:2:Strength,cdmg:10:Crit Damage,dmg:2:Damage,intl:2:Intelligence,res:15:Rear Guard,arm:10:Armor,hp:10:Life,mana:10:Mana,str:2:Strength,mintl:4:Open Mind,intl:2:Intelligence,str:2:Strength,dex:3:Dexterity,cchnc:1:Crit Chance,hp:30:Sturdy,mana:15:Mana,str:2:Strength,intl:2:Intelligence,wis:3:Wisdom,mdmg:4:Arcane Strength,intl:2:Intelligence,str:2:strength,wis:3:Wisdom,dex:3:Dexterity,end:5:Mental Fortress,hp:10:Life,mana:10:Mana,cchnc:1:Crit Chance,cdmg:10:Crit Damage,m3m:0:Mind and Muscle,str:2:Strength,intl:2:Intelligence,dmg:2:Damage,cchnc:1:Crit Chance,cdmg:20:Potent Power",
		r1:"agi:1:Agility,dex:1:Dexterity,eva:5:Evasion,hp:5:Life,agi:3:Quickening,end:1:Endurance,dex:1:Dexterity,dmg:1:Damage,eva:5:Evasion,mhp:5:Vital Lines,agi:1:Agility,eva:5:Evasion,stam:10:Stamina,dmg:1:Damage,str:3:Carnage,dex:1:Dexterity,agi:1:Agility,wis:2:Wisdom,end:2:Endurance,meva:4:Fleet Footed,dex:2:Dexterity,agi:2:Agility,hp:10:Life,stam:10:Stamina,dmg:2:Blunt Force,end:2:Endurance,arm:10:Armor,eva:10:Evasion,leech:1:Life Leech,magi:2:Evasive,fres:3:Fire Resist,cres:3:Cold Resist,sres:3:Shock Resist,res:10:Resist,end:4:Dwarven Blood,agi:2:Agility,eva:5:Evasion,arm:5:Armor,hp:20:Life,mhp:3:Dragons Boon,agi:2:Agility,sreg:10:Stamina Regen,str:2:Strength,wis:2:Wisdom,eva:20:Illusions,arm:10:Armor,res:10:Resist,wis:2:Wisdom,intl:2:Intelligence,mstam:5:Locomotion,mana:10:Mana,intl:3:Intelligence,leech:1:Life Leech,eva:5:Evasion,agi:5:Sleight of Hand,fres:3:Fire Resist,cres:3:Cold Resist,sres:3:Shock Resist,sreg:5:Stamina Regen,r1m:0:Shade Form,hp:10:Life,str:3:Strength,dex:3:Dexterity,hp:10:Life,stam:30:Stamina Training",
		r2:"str:1:Strength,dmg:1:Damage,dex:1:Dexterity,agi:2:Agility,hp:10:Healthy Soul,stam:5:Stamina,leech:1:Life Leech,end:1:Endurance,eva:5:Evasion,mstr:3:Decimation,agi:1:Agility,dex:1:Dexterity,hp:5:Life,dmg:1:Damage,dex:3:Steady Hands,stam:5:Stamina,dex:1:Dexterity,hp:10:Life,str:2:Strength,mhp:5:Dragon Heart,leech:1:Life Leech,str:1:Strength,dmg:1:Damage,stam:5:Stamina,eva:15:Flux,agi:2:Agility,str:2:Strength,wis:2:Wisdom,res:5:Resist,mdmg:4:Deadly Delivery,end:2:Endurance,dmg:1:Damage,stam:15:Stamina,dex:2:Dexterity,arm:20:Thick Hide,leech:1:Life Leech,dex:2:Dexterity,agi:2:Agilty,wis:2:Wisdom,mdmg:3:Deadly Destruction,dex:2:Dexterity,sreg:5:Stamina Regen,dmg:2:Damage,eva:5:Evasion,hp:25:Life Orb,arm:5:Armor,dex:2:Dexterity,agi:2:Agility,wis:2:Wisdom,mstr:3:Nanomachines,sreg:10:Stamina Regen,mana:10:Mana,intl:2:Intelligence,wis:2:Wisdom,leech:3:Vampirism,dmg:2:Damage,intl:2:Intelligence,mana:10:Mana,hp:15:Life,r2m:0:Soul of Steel,arm:5:Armor,eva:5:Evasion,dex:2:Dexterity,str:2:Strength,dmg:3:Rapid Strikes",
		r3:"cchnc:1:Crit Chance,cdmg:10:Crit Damage,agi:1:Agility,dex:1:Dexterity,stam:15:Energize,hp:5:Life,dex:1:Dexterity,stam:10:Stamina,agi:1:Agility,cdmg:25:Pressure Points,str:1:Strength,cchnc:1:Crit Chance,dex:1:Dexterity,agi:2:Agility,hp:20:Heart of Oak,sreg:5:Stamina Regen,cchnc:1:Crit Chance,dmg:1:Damage,agi:2:Agility,cchnc:3:Pinpoint,dex:2:Dexterity,agi:2:Agility,stam:15:Stamina,hp:10:Life,sreg:15:Rapid Recovery,eva:5:Evasion,str:2:Strength,agi:2:Agility,dmg:2:Damage,mstam:6:No Sleep,agi:2:Agility,dex:2:Dexterity,wis:2:Wisdom,eva:10:Evasion,intl:5:Sharp Mind,agi:2:Agility,end:2:Endurance,str:2:Strength,wis:2:Wisdom,mstam:5:Unbounded Energy,cchnc:1:Crit Chance,cdmg:10:Crit Damage,dex:2:Dexterity,intl:3:Intelligence,dex:5:Shimmer,agi:2:Agility,intl:2:Intelligence,wis:2:Wisdom,arm:5:Armor,cchnc:3:Puncture,cdmg:15:Crit Damage,intl:2:Intelligence,eva:10:Evasion,str:2:Strength,agi:5:Blur,dmg:1:Damage,intl:2:Intelligence,agi:2:Agility,dex:3:Dexterity,r3m:0:Devils Deal,intl:3:Intelligence,agi:2:Agility,str:2:Strength,eva:10:Evasion,cdmg:20:Expose Weakness",
		mk1:"end:1:Endurance,wis:1:Wisdom,agi:1:Agility,hp:10:Life,hreg:10:Recovery,dmg:2:Damage,arm:5:Armor,end:1:Endurance,mana:5:Mana,mend:4:The Wall,intl:1:Intelligence,wis:1:Wisdom,hp:5:Life,stam:5:Stamina,intl:3:Harmony,dex:2:Dexterity,wis:3:Wisdom,res:5:Resist,mreg:10:Mana Regen,mwis:5:Enlightenment,cchnc:1:Crit Chance,str:2:Strength,dmg:2:Damage,mana:5:Mana,dex:3:Aspect of the Wind,str:2:Strength,agi:2:Agility,eva:5:Evasion,sreg:5:Stamina Regen,magi:4:Ghost,hp:10:Life,end:2:Endurance,arm:15:Armor,eva:15:Evasion,res:25:Inner Peace,agi:3:Agility,str:2:Strength,dex:2:Dexterity,wis:3:Wisdom,mhp:15:Nurture,intl:2:Intelligence,end:2:Endurance,hp:10:Life,mana:15:Mana,dmg:3:Force,spdmg:5:Spell Power,fres:2:Fire Resist,cres:2:Cold Resist,sres:2:Shock Resist,hreg:20:Regeneration,wis:3:Wisdom,agi:3:Agility,eva:10:Evasion,dmg:2:Damage,hp:65:Rock Solid,hreg:5:Life Regen,mreg:10:Mana Regen,res:10:Resist,dmg:2:Damage,mk1m:0:Awakening,str:2:Strength,intl:2:Intelligence,dex:2:Dexterity,stam:10:Stamina,res:15:Purify",
		mk2:"str:1:Strength,dmg:1:Damage,hp:5:Life,arm:5:Armor,res:10:Resilience,str:1:Strength,end:1:Endurance,wis:1:Wisdom,eva:5:Evasion,mstr:3:Essence of Earth,str:1:Strength,intl:2:Intelligence,wis:1:Wisdom,end:1:Endurance,dmg:3:Essence of Pain,str:2:Strength,hreg:10:Life Regen,mreg:10:Mana Regen,mana:10:Mana,mstr:3:Sadism,str:2:Strength,intl:2:Intelligence,end:2:Endurance,cchnc:1:Crit Chance,cdmg:25:Inner Eye,dex:2:Dexterity,str:2:Strength,intl:2:Intelligence,wis:2:Wisdom,mdex:5:Aspect of Wind,dex:2:Dexterity,str:2:Strength,cchnc:1:Crit Chance,cdmg:10:Crit Damage,str:5:Oxen Might,end:2:Endurance,hp:10:Life,mana:10:Mana,mreg:10:Mana Regen,mwis:5:Spiritual Awakening,wis:3:Wisdom,res:5:Resist,str:2:Strength,dmg:2:Damage,leech:2:Soul Stealer,dex:2:Dexterity,cchnc:1:Crit Chance,str:2:Strength,dmg:2:Damage,mdmg:3:Recursive Attacks,leech:1:Life Leech,wis:2:Wisdom,agi:2:Agility,end:2:Endurance,dex:5:Swift Death,str:2:Strength,res:10:Resist,arm:10:Armor,hp:15:Life,mk2m:0:Serpent Spirit,str:2:Strength,hp:10:Life,res:10:Resist,mreg:10:Mana Regen,cchnc:3:Eagle Eye",
		mk3:""
	}
	function skillTreeDesc(c,x){
		var ss = "";
		switch(c){
			case("str"):ss ="Increases Strength by "+x; break;
			case("mstr"):ss ="Increases Strength by "+x+"%"; break;
			case("intl"):ss ="Increases Intelligence by "+x; break;
			case("mintl"):ss ="Increases Intelligence by "+x+"%"; break;
			case("dex"):ss ="Increases Dexterity by "+x; break;
			case("mdex"):ss ="Increases Dexterity by "+x+"%"; break;
			case("end"):ss ="Increases Endurance by "+x; break;
			case("mend"):ss ="Increases Endurance by "+x+"%"; break;
			case("wis"):ss ="Increases Wisdom by "+x; break;
			case("mwis"):ss ="Increases Wisdom by "+x+"%"; break;
			case("agi"):ss ="Increases Agility by "+x; break;
			case("magi"):ss ="Increases Agility by "+x+"%"; break;
			case("arm"):ss ="Increases Armor by "+x; break;
			case("eva"):ss ="Increases Evasion by "+x; break;
			case("res"):ss ="Increases Resist by "+x; break;
			case("fres"):ss ="Increases Fire Resist "+x; break;
			case("cres"):ss ="Increases Cold Resist by "+x; break;
			case("sres"):ss ="Increases Shock Resist by "+x; break;
			case("hp"):ss ="Increases maximum HP by "+x; break;
			case("mhp"):ss ="Increases maximum HP by "+x+"%"; break;
			case("mana"):ss ="Increases maximum Mana by "+x; break;
			case("mmana"):ss ="Increases maximum Mana by "+x+"%"; break;
			case("stam"):ss ="Increases maximum Stamina by "+x; break;
			case("mstam"):ss ="Increases maximum Stamina by "+x+"%"; break;
			case("dmg"):ss ="Increases Base Damage by "+x; break;
			case("mdmg"):ss ="Increases Base Damage by "+x+"%"; break;
			case("spdmg"):ss ="Increases Spell Damage by "+x+"%"; break;
			case("cchnc"):ss ="Increases Critical Strike Chance by "+x+"%"; break;
			case("cdmg"):ss ="Increases Critical Strike Damage by "+x+"%"; break;
			case("fdmg"):ss ="Increases Fire Damage by "+x+"%"; break;
			case("cldmg"):ss ="Increases Cold Damage by "+x+"%"; break;
			case("sdmg"):ss ="Increases Shock Damage by "+x+"%"; break;
			case("ddmg"):ss ="Increases Dark Damage by "+x+"%"; break;
			case("leech"):ss ="Increases Life Leech by "+x+"%"; break;
			case("hreg"):ss ="Increases Life Regen by "+x+"%"; break;
			case("mreg"):ss ="Increases Mana Regen by "+x+"%"; break;
			case("sreg"):ss ="Increases Stamina Regen by "+x+"%"; break;
			case("w1m"):ss = "Increases Strength and Endurance by 5%"; break;
			case("w2m"):ss = "Increases Armor by 15%"; break;
			case("w3m"):ss = "Increases Base Damage by 10%"; break;
			case("m1m"):ss = "Increases Mana and Mana regen by 15%"; break;
			case("m2m"):ss = "Increases Intelligence by 4% and Crit Damage by 20%"; break;
			case("m3m"):ss = "Increases Intelligence and Strength by 3%"; break;
			case("r1m"):ss = "Increases Evasion by 15%"; break;
			case("r2m"):ss = "Increases Dexterity and Strength by 3%"; break;
			case("r3m"):ss = "Increases Dark Damage by 20%"; break;
			case("mk1m"):ss = "Increases Armor, Evasion, and Resist by 10%"; break;
			case("mk2m"):ss = "Increases Damage by 6% and Life Leech by 4%"; break;
		}
		return ss;
	}
	function skillTreeEffect(c,x){
		switch(c){
			case("str"): cBonus["Str"] += x; break;
			case("mstr"): cMore["Str"] *= (1+(x/100)); break;
			case("intl"): cBonus["Int"] += x; break;
			case("mintl"): cMore["Int"] *= (1+(x/100)); break;
			case("dex"): cBonus["Dex"] += x; break;
			case("mdex"): cMore["Dex"] *= (1+(x/100)); break;
			case("end"): cBonus["End"] += x; break;
			case("mend"): cMore["End"] *= (1+(x/100)); break;
			case("wis"): cBonus["Wis"] += x; break;
			case("mwis"): cMore["Wis"] *= (1+(x/100)); break;
			case("agi"): cBonus["Agi"] += x; break;
			case("magi"): cMore["Agi"] *= (1+(x/100)); break;
			case("arm"): cBonus["Armor"] += x; break;
			case("eva"): cBonus["Evasion"] += x; break;
			case("res"): cBonus["Resist"] += x; break;
			case("fres"): cBonus["FireResist"] += x; break;
			case("cres"): cBonus["ColdResist"] += x; break;
			case("sres"): cBonus["ShockResist"] += x; break;
			case("hp"): cBonus["HP"] += x; break;
			case("mhp"): cMore["HP"] *= (1+(x/100)); break;
			case("mana"): cBonus["Mana"] += x; break;
			case("mmana"): cMore["Mana"] *= (1+(x/100)); break;
			case("stam"): cBonus["Stamina"] += x; break;
			case("mstam"): cMore["Stamina"] *= (1+(x/100)); break;
			case("dmg"): cBonus["BaseDamage"] += x; break;
			case("mdmg"): cMore["BaseDamage"] *= (1+(x/100)); break;
			case("spdmg"): cBonus["SpellDamage"] += x; break;
			case("cchnc"): cBonus["CritChnc"] += x; break;
			case("cdmg"): cBonus["CritDmg"] += x; break;
			case("fdmg"): cBonus["FireDamage"] += x; break;
			case("cldmg"): cBonus["ColdDamage"] += x; break;
			case("sdmg"): cBonus["ShockDamage"] += x; break;
			case("ddmg"): cBonus["DarkDamage"] += x; break;
			case("leech"): cBonus["Leech"] += x; break;
			case("hreg"): cMore["HReg"] *= (1+(x/100)); break;
			case("mreg"): cMore["MReg"] *= (1+(x/100)); break;
			case("sreg"): cMore["SReg"] *= (1+(x/100)); break;
			case("w1m"): cMore["Str"] *= 1.05; cMore["End"] *= 1.05; break;
			case("w2m"): cMore["Armor"] *= 1.15; break;
			case("w2m"): cMore["BaseDamage"] *= 1.1; break;
			case("m1m"): cMore["Mana"] *= 1.15; cMore["MReg"] *= 1.15; break;
			case("m2m"): cMore["Int"] *= 1.04; cBonus["CritDmg"] += 20; break;
			case("m3m"): cMore["Int"] *= 1.03; cMore["Str"] *= 1.03; break;
			case("r1m"): cMore["Evasion"] *=1.15; break;
			case("r2m"): cMore["Str"] *= 1.03; cMore["Dex"] *= 1.03; break;
			case("r3m"): cBonus["DarkDamage"] += 20; break;
			case("mk1m"): cMore["Evasion"] *=1.1; cMore["Armor"] *= 1.1; cMore["Resist"] *= 1.1; break;
			case("mk2m"): cMore["BaseDamage"] *= 1.06; cBonus["Leech"] += 4; break;
		}
	}

	var currTree1, currTree2, currTree3;
	var t1Max = false;
	var t2Max = false;
	var t3Max = false;
	
	function buildSkillTree(){
		var classChar;
		var choiceHolder;
		var choice1 = null;
		var choice2 = null;
		var choice3 = null;
		switch(mc.baseClassNum){
			case(0): classChar = "w"; break;
			case(1): classChar = "m"; break;
			case(2): classChar = "r"; break;
			case(3): classChar = "mk"; break;
		}
		if(!t1Max && currTree1 == null){
			currTree1 = skillTree[classChar+"1"];
		}
		if(!t2Max && currTree2 == null){
			currTree2 = skillTree[classChar+"2"];
		}
		if(!t3Max && currTree3 == null){
			currTree3 = skillTree[classChar+"3"];
		}
		if(currTree1 != null){
			choiceHolder = currTree1.split(",");
			choice1 = choiceHolder[0];
		}
		if(currTree2 != null){
			choiceHolder = currTree2.split(",");
			choice2 = choiceHolder[0];
		}
		if(currTree3 != null){
			choiceHolder = currTree3.split(",");
			choice3 = choiceHolder[0];
		}
		
		buildSkillSelectionPage(choice1, choice2, choice3);
	}
	function skillTreeSelected(x, cv){
		var strHolder = cv.split(":");
		var c = strHolder[0];
		var v = Number(strHolder[1]);
		selectedSkills += cv+";";
		if(x==1){
			var index = currTree1.indexOf(",");
			if(index != -1){
				currTree1 = currTree1.slice((index+1));
			}
			else{
				t1Max = true;
				currTree1 = null;
			}
		}
		if(x==2){
			var index = currTree2.indexOf(",");
			if(index != -1){
				currTree2 = currTree2.slice((index+1));
			}
			else{
				t2Max = true;
				currTree2 = null;
			}
		}
		if(x==3){
			var index = currTree3.indexOf(",");
			if(index != -1){
				currTree3 = currTree3.slice((index+1));
			}
			else{
				t3Max = true;
				currTree3 = null;
			}
		}
		mc.skillsRemain -= 1;
		skillTreeEffect(c, v);
		if(mc.skillsRemain <= 0){
			showSkillTreeMenu();
			handleSkillBtn();
		}
		else{
			buildSkillTree();
		}
	}
	function handleSkillBtn(){
		hideSkillTreeBtn();
		if(mc.skillsRemain > 0 )
			showSkillTreeBtn();
	}
	function hideSkillTreeBtn(){
		$('#skillBtn:visible').toggle();
	}
	function showSkillTreeBtn(){
		$('#skillBtn:hidden').toggle();
	}
	function showSkillTreeMenu(){
		$('#skillTHolder').toggle();
		if($('#skillTHolder').is(":visible")){
			$('#skillTreePage:hidden').toggle();
			buildSkillTree();
		}
	}
	function buildSkillSelectionPage(cf1,cf2,cf3){
		var ss = "";
		var c1 = null;
		var x1;
		var c2 = null;
		var x2;
		var c3 = null;
		var x3;
		var n1 = "";
		var n2 = "";
		var n3 = "";
		if(cf1 != null){
			c1 = cf1.split(":");
			x1 = c1[1];
			n1 = c1[2];
			c1 = c1[0];
		}
		if(cf2 != null){
			c2 = cf2.split(":");
			x2 = c2[1];
			n2 = c2[2];
			c2 = c2[0];
		}
		if(cf3 != null){
			c3 = cf3.split(":");
			x3 = c3[1];
			n3 = c3[2];
			c3 = c3[0];
		}
		
		ss = "<div class='skillLineHolder'>You have leveled up! Please select a trait.<br><br>";
		if(c1 != null)
			ss += "<div style='color:green' class='skillTreeList' onclick='skillTreeSelected(1,\""+cf1+"\")'>"+n1+"<span class='tooltip'>"+skillTreeDesc(c1,x1)+"</span></div>";
		if(c2 != null)
			ss += "<div style='color:green' class='skillTreeList' onclick='skillTreeSelected(2,\""+cf2+"\")'>"+n2+"<span class='tooltip'>"+skillTreeDesc(c2,x2)+"</span></div>";
		if(c3 != null)
			ss += "<div style='color:green' class='skillTreeList' onclick='skillTreeSelected(3,\""+cf3+"\")'>"+n3+"<span class='tooltip'>"+skillTreeDesc(c3,x3)+"</span></div>";
		ss += "</div>";
		$('#skillTreePage').html(ss);
	}
	
	function loadSavedSkills(){
		if(selectedSkills.length > 0){
			var ss = selectedSkills.split(";");
			var classChar;
			switch(mc.baseClassNum){
				case(0): classChar = "w"; break;
				case(1): classChar = "m"; break;
				case(2): classChar = "r"; break;
				case(3): classChar = "mk"; break;
			} 
			currTree1 = skillTree[classChar+"1"]; 
			currTree2 = skillTree[classChar+"2"]; 
			currTree3 = skillTree[classChar+"3"]; 
			for(var x = 0; x < ss.length; x++){
				var sArea = ss[x];
				if(sArea != ""){
					var whichTree = 0;
					var index;
					if(currTree1 != null){
						index = currTree1.indexOf(sArea);
						if(index == 0){
							freeSkillTree(1, sArea);
						}
					}
					if(currTree2 != null){
						index = currTree2.indexOf(sArea);
						if(index == 0){
							freeSkillTree(2, sArea);
						}
					}
					if(currTree3 != null){
						index = currTree3.indexOf(sArea);
						if(index == 0){
							freeSkillTree(3, sArea);
						}
					}
				}
			}
		}
	}
	function freeSkillTree(x, cv){
		var strHolder = cv.split(":");
		var c = strHolder[0];
		var v = Number(strHolder[1]);
		if(x==1){
			var index = currTree1.indexOf(",");
			if(index != -1){
				currTree1 = currTree1.slice((index+1));
			}
			else{
				t1Max = true;
				currTree1 = null;
			}
		}
		if(x==2){
			var index = currTree2.indexOf(",");
			if(index != -1){
				currTree2 = currTree2.slice((index+1));
			}
			else{
				t2Max = true;
				currTree2 = null;
			}
		}
		if(x==3){
			var index = currTree3.indexOf(",");
			if(index != -1){
				currTree3 = currTree3.slice((index+1));
			}
			else{
				t3Max = true;
				currTree3 = null;
			}
		}
		skillTreeEffect(c, v);
		handleSkillBtn();
	}