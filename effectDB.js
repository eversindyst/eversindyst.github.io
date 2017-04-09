	var effectDB = {
		addedDamage : function(dmgPer, type){
			var dmg = dmgPer/100;
			switch(type){
				case("fire"): mc.totFireDamage += Math.floor(Number((mc.functionalBaseDamage * (1+mc.functionalFireDamage/100) * dmg))); break;
				case("cold"): mc.totColdDamage += Math.floor(Number((mc.functionalBaseDamage * (1+mc.functionalColdDamage/100) * dmg))); break;
				case("shock"): mc.totShockDamage += Math.floor(Number((mc.functionalBaseDamage * (1+mc.functionalShockDamage/100) * dmg))); break;
				case("dark"): mc.totDarkDamage += Math.floor(Number((mc.functionalBaseDamage * (1+mc.functionalDarkDamage/100) * dmg))); break;
			}
		},
		statUpBonus : function(stat, val, chnc, dur){
			if(Math.random()*100 <= chnc)
				statTimer(stat, val, "bonus", dur);
		},
		statUpMore : function(stat, val, chnc, dur){
			if(Math.random()*100 <= chnc)
				statTimer(stat, val, "more", dur);
		},
		consumDark : function(){
			mc.totDarkDamage += Math.floor((mc.totFireDamage + mc.totColdDamage + mc.totShockDamage + mc.totBaseDamage) * (1+mc.functionalDarkDamage/100) * .45);
		},
		fireAff : function(){
			mc.totFireDamage *= 2;
			mc.totColdDamage = 0;
			mc.totShockDamage = 0;
			mc.totBaseDamage = 0;
			mc.totDarkDamage = 0;
		},
		coldAff : function(){
			mc.totFireDamage = 0;
			mc.totColdDamage *= 2;
			mc.totShockDamage = 0;
			mc.totBaseDamage = 0;
			mc.totDarkDamage = 0;
		},
		shockAff : function(){
			mc.totFireDamage = 0;
			mc.totColdDamage = 0;
			mc.totShockDamage *= 2;
			mc.totBaseDamage = 0;
			mc.totDarkDamage = 0;
		},
		
		//all 3 are only found on gloves
		//vampirism - spend hp instead of mana and stamina for spells and skills
		//spiritual strikes - spend mana instead of stamina for skills
		//sharp wit - spend stamina instead of mana for spells
		
		//all 3 are only found on boots
		//arcane path - spend mana instead of stamina for movement
		//blood path - spend hp instead of stamina for movement
		//light footed - halves stamina consumption for moving 
		
		//body
		//mana shield - damage goes to mana before hp
		//high spirits - damage taken is halved if stamina is above 90%
		//
	}

	function statTimer(stat, val, MB, dur){
		var endTime = dur*1000;
		if(MB == "bonus"){
			bonus[stat] += Number(val);
		}
		else{
			more[stat] *= Number(val);
		}
		var interval = setTimeout(function() {
			if(MB == "bonus"){
				bonus[stat] -= Number(val);
			}
			else{
				more[stat] /= Number(val);
			}
		}, endTime);
	}