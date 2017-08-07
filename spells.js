	var equipSpells = {
		slot1: null,
		slot2: null,
		slot3: null
	};
	var spellsHolder = new Array();
	
	function getPlayerSpells(){
		var spellListHolder = spellList[mc.charClass].split(",");
		for(var x = 0; x < spellListHolder.length; x++){
			var spellInfo = spellListHolder[x].split(":");
			if(mc.level >= spellInfo[0]){
				var spellName = spellInfo[1];
				if(!hasSpellAlready(spellName)){
					var sHolder = makeNewSpell(spellName);
					spellsHolder.push(sHolder);
				}
			}
			else{
				x = spellListHolder.length;
			}
		}
	}
	function hasSpellAlready(sn){
		var flag = false;
		for(var key in equipSpells){
			if(equipSpells[key] != null){
				var spell = equipSpells[key];
				if(spell.name == sn)
					flag = true;
			}
		}
		for(var x=0; x < spellsHolder.length; x++){
			if(spellsHolder[x].name == sn)
				flag = true;
		}
		return flag;
	}

	function spellLevelUp(spell){
		if(spell.level < 20){
			spell.level += 1;
			updateSpellInfo(spell);
		}
	}
	function spellExpUp(spell){
		var expWorth = Math.floor(spell.level/4);
		spell.level = 1;
		spell.quality += expWorth;
		updateSpellInfo(spell);
	}
	
	function updateSpellInfo(spell){
		spell.chnc = Math.floor(spell.cBase + ((spell.level-1) * spell.chncG));
		spell.mCost = Math.floor(spell.mBase + ((spell.level-1) * spell.mCostg));
		spell.sCost = Math.floor(spell.sBase + ((spell.level-1) * spell.sCostg));
		spell.stunC = Math.round((spell.stunB + (spell.stunCG * spell.quality))*1000)/1000;
		if(spell.stunC >= .75)
			spell.stunC = .75;
		spell.weakC = Math.round((spell.weakB + (spell.weakCG * spell.quality))*1000)/1000;
		if(spell.weakC >= .75)
			spell.weakC = .75;
		spell.vulnC = Math.round((spell.vulnB + (spell.vulnCG * spell.quality))*1000)/1000;
		if(spell.vulnC >= .75)
			spell.vulnC = .75;
	}
	function castSelectedSpells(spell){
		stun_g = spell.stunC;
		stunDur_g = spell.stunDur;
		weak_g = spell.weakC;
		weakDur_g = spell.weakDur;
		vuln_g = spell.vulnC;
		vulnDur_g = spell.vulnDur;
		return spellDB[spell.name](spell);
	}
	
	function spell(n,t,mc,sc,bd,e,c,cg,mg,sg,st,stg,std,wk,wkg,wkd,vl,vlg,vld){
		this.name = n;
		this.targets = t;
		this.mCost = mc;
		this.mBase = mc;
		this.mCostg = mg;
		this.sCost = sc;
		this.sBase = sc;
		this.sCostg = sg;
		this.level = 1;
		this.damage = bd;
		this.effectiveness = e;
		this.chnc = c;
		this.cBase = c;
		this.chncG = cg;
		this.quality = 0;
		this.multi = 1;
		this.stunB = st;
		this.stunC = st;
		this.stunCG = stg;
		this.stunDur = std;
		this.weakB = wk;
		this.weakC = wk;
		this.weakCG = wkg;
		this.weakDur = wkd;
		this.vulnB = vl;
		this.vulnC = vl;
		this.vulnCG = vlg;
		this.vulnDur = vld;
	}
	function setSpellLvlTxt(spellHolder, x){
		var name = spellHolder.name;
		$('#modSpellName').html(name);
		$('#modSpellLvl').html(spellHolder.level);
		$('#modSpellExp').html(spellHolder.quality+"%");
		$('#modSpellSC').html((spellHolder.stunC*100)+"%");
		$('#modSpellSD').html(spellHolder.stunDur+" Seconds");
		$('#modSpellWC').html((spellHolder.weakC*100)+"%");
		$('#modSpellWD').html(spellHolder.weakDur+" Seconds");
		$('#modSpellVC').html((spellHolder.vulnC*100)+"%");
		$('#modSpellVD').html(spellHolder.vulnDur+" Seconds");
		$('#modSpellSt').html(spellHolder.sCost);
		$('#modSpellMn').html(spellHolder.mCost);
		$('#modSpellChnc').html(spellHolder.chnc+"%");
		$('#modSpellTarg').html(spellHolder.targets);
		
		if(spellHolder.level == 20){
			$('#modSpellLvlUp:visible').toggle();
		}
		else{
			$('#modSpellLvlUp:hidden').toggle();
			$('#modSpellLvlUp').unbind("click");
			$('#modSpellLvlUp').click(function(){
			buySpellLvlUp(x);
			});
			$('#modSpellLvlToolTip').html(buildSpellLvlTT(spellHolder.level));
		}
		$('#modSpellExpUp').unbind("click");
		$('#modSpellExpUp').click(function(){
		buyExpSpellUp(x);
		});
		$('#modSpellExpToolTip').html(buildSpellExpTT(spellHolder.level, spellHolder.quality));
	}
	function modSkill(x){
		if(equipSpells["slot"+x] != null){
			$('#modPage').toggle();
			var spellHolder = equipSpells["slot"+x];
			setSpellLvlTxt(spellHolder, x);
		}
	}
	
	function closeMod(){
		$('#modPage:visible').toggle();
	}
	function showSpells(){
		$('#skillPage').toggle();
	}
	function buildSpellMenuList(){
		var spellHolder;
		var ss = "";
		for(var x=0; x< 4; x++){
			if(equipSpells["slot"+x] != null){
				spellHolder = equipSpells["slot"+x];
				ss = spellHolder.name+"<br> Level "+spellHolder.level+"<span class='tooltip'>"+spellDesc[spellHolder.name](spellHolder)+"</span>";
				$('#skill'+x).html(ss);
			}
			else{
				$('#skill'+x).html("");
			}
		}
		ss = "";
		for(var x=0; x < spellsHolder.length; x++){
			spellHolder = spellsHolder[x];
			ss += "<span class='spellSelectLine' onClick='equipSelectedSpell("+x+")'>"+(x+1)+". "+spellHolder.name+", Level "+spellHolder.level+"<span class='tooltip'>"+spellDesc[spellHolder.name](spellHolder)+"</span></span><br>";
		}
		$('#avaliableSkills').html(ss);
	}
	function removeSpell(x){
		var spellHolder = equipSpells["slot"+x];
		equipSpells["slot"+x] = null;
		spellsHolder.push(spellHolder);
		closeMod();
		buildSpellMenuList();
	}
	function equipSelectedSpell(x){
		var slotFound = false;
		for(var j=0; j<3; j++){
			if(!slotFound){
				if(equipSpells["slot"+(j+1)] == null){
					var spellHolder = spellsHolder[x];
					equipSpells["slot"+(j+1)] = spellHolder;
					updateSpellInfo(spellHolder)
					spellsHolder.splice(x,1);
					slotFound = true;
				}
			}
		}
		buildSpellMenuList();
	}
	function buySpellLvlUp(x){
		var spell = equipSpells["slot"+x];
		var lvl = spell.level;
		if(mc.gold >= calcSpellLvlCost(lvl)){
			mc.gold -= calcSpellLvlCost(lvl);
			spellLevelUp(spell);
			setSpellLvlTxt(spell, x);
		}
	}
	function buyExpSpellUp(x){
		var spell = equipSpells["slot"+x];
		var lvl = spell.level;
		var exp = spell.quality;
		if(mc.gold >= calcSpellExpCost(lvl, exp)){
			mc.gold -= calcSpellExpCost(lvl, exp);
			spellExpUp(spell);
			setSpellLvlTxt(spell, x);
		}
	}
	function buildSpellLvlTT(lvl){
		var ss = "Leveling up this spell will cost ";
		var cost = calcSpellLvlCost(lvl);
		ss += shortenLargeNumber(cost)+" Platinum";
		return ss;
	}
	function buildSpellExpTT(lvl, exp){
		var ss = "Enhancing this ability will cost ";
		var cost = calcSpellExpCost(lvl, exp);
		ss += shortenLargeNumber(cost)+" Platinum and earn you ";
		var expGain =  Math.floor(lvl/4);
		ss += expGain+"% Expertise";
		return ss;
	}
	function calcSpellLvlCost(lvl){
		return Math.round(90+(2 * (Math.pow((lvl * 1.1), 4.1))));
	}
	function calcSpellExpCost(lvl, exp){
		return Math.round(140+(2.3 * (Math.pow((lvl * .97 + (exp * 1.22)), 3.55))));
	}
	/*
	var fireball = new spell("Fireball",3,3,0,7,1,40,2);
	var kick = new spell("Kick",1,0,2,1,.8,10,2.75); 
	fireball.mod1 = "Split Fire";
	equipSpells["slot1"] = fireball;
	equipSpells["slot2"] = kick;
	buildSpellMod(fireball, 1); */