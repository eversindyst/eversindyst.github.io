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
	
	function makeNewSpell(sn){
		var spellHolder;
		switch(sn){
			case("Fireball") : spellHolder = new spell("Fireball",3,3,0,7,1,40,2); break;
			case("Kick") : spellHolder = new spell("Kick",1,0,2,1,.8,10,2.75); break;
		}
		return spellHolder;
	}
	
	function spell(n,t,mc,sc,bd,e,c,cg){
		this.name = n;
		this.targets = t;
		this.mCost = mc;
		this.sCost = sc;
		this.level = 1;
		this.damage = bd;
		this.effectiveness = e;
		this.chnc = c;
		this.chncG = cg;
		this.mod1 = "Locked";
		this.mod2 = "Locked";
		this.mod3 = "Locked";
		this.mod4 = "Locked";
		this.multi = 1;
		
		this.levelUp = function(){
			if(this.level < 20){
				this.level += 1;
				this.chnc += this.chncG;
			}
		}
		this.cast = function(){
			return spellDB[this.name](this);
		}
	}
	
	function buildSpellMod(spell, spellNum){
		var name = spell.name;
		var m1 = spell.mod1;
		var m2 = spell.mod2;
		var m3 = spell.mod3;
		var m4 = spell.mod4;
		var m1List = modList1[name];
		var m2List = modList2[name];
		var m3List = modList3[name];
		var m4List = modList4[name];
		
		$('#modSpellName').html(name);
		$('#mod1Name').html(buildModNameTT(m1, 1, spellNum));
		$('#mod2Name').html(buildModNameTT(m2, 2, spellNum));
		$('#mod3Name').html(buildModNameTT(m3, 3, spellNum));
		$('#mod4Name').html(buildModNameTT(m4, 4, spellNum));
		
		$('#mod1List').html(buildModListTT(spell, m1, m1List, spellNum, 1));
		$('#mod2List').html(buildModListTT(spell, m2, m2List, spellNum, 2));
		$('#mod3List').html(buildModListTT(spell, m3, m3List, spellNum, 3));
		$('#mod4List').html(buildModListTT(spell, m4, m4List, spellNum, 4));
		
	}
	function buildModListTT(s, mn, ml, sn, y){
		var mods = ml.split(",");
		var ss = "";
		if(mn != "Locked"){
			var count = 0;
			for(x=0; x<mods.length; x++){
				if(!hasMod(mods[x], s)){
					count += 1;
					ss += "<span class='modLine' onClick='equipMod("+y+","+sn+", &quot;"+mods[x]+"&quot;)'>"+count+". "+mods[x]+"<span class='tooltip'>"+getModTT(mods[x])+"</span></span><br><br>";
				}
			}
		}
		return ss;
	}
	function hasMod(mod, s){
		var flag = false;
		if(s.mod1 == mod)
			flag = true;
		if(s.mod2 == mod)
			flag = true;
		if(s.mod3 == mod)
			flag = true;
		if(s.mod4 == mod)
			flag = true;
		return flag;
	}
	function buildModNameTT(m, x, sn){
		var ss = "";
		if(m == "Locked"){
			ss += "<span onClick='unlockMod("+x+","+sn+")'>"+m+"<span class='tooltip'>Cost: "+shortenLargeNumber(modCost(x))+" Platinum</span></span>";
		}
		else{
			ss += "<span onClick='removeMod("+x+","+sn+")'>"+m+"<span class='tooltip'>"+getModTT(m)+"</span>";
		}
		return ss;
	}
	function unlockMod(mx, sx){
		if(mc.gold >= modCost(mx)){
			mc.gold -= modCost(mx);
			var spellHolder;
			switch(sx){
				case(1): spellHolder = equipSpells["slot1"]; break;
				case(2): spellHolder = equipSpells["slot2"]; break;
				case(3): spellHolder = equipSpells["slot3"]; break;
			}
			switch(mx){
				case(1): spellHolder.mod1 = "Empty"; break;
				case(2): spellHolder.mod2 = "Empty"; break;
				case(3): spellHolder.mod3 = "Empty"; break;
				case(4): spellHolder.mod4 = "Empty"; break;
			}
			buildSpellMod(spellHolder, sx)
		}
	}
	function equipMod(mx, sx, m){
		var spellHolder;
		switch(sx){
			case(1): spellHolder = equipSpells["slot1"]; break;
			case(2): spellHolder = equipSpells["slot2"]; break;
			case(3): spellHolder = equipSpells["slot3"]; break;
		}
		switch(mx){
			case(1): spellHolder.mod1 = m; break;
			case(2): spellHolder.mod2 = m; break;
			case(3): spellHolder.mod3 = m; break;
			case(4): spellHolder.mod4 = m; break;
		}
		buildSpellMod(spellHolder, sx)
	}
	function removeMod(mx, sx){
		var spellHolder;
		switch(sx){
			case(1): spellHolder = equipSpells["slot1"]; break;
			case(2): spellHolder = equipSpells["slot2"]; break;
			case(3): spellHolder = equipSpells["slot3"]; break;
		}
		switch(mx){
			case(1): spellHolder.mod1 = "Empty"; break;
			case(2): spellHolder.mod2 = "Empty"; break;
			case(3): spellHolder.mod3 = "Empty"; break;
			case(4): spellHolder.mod4 = "Empty"; break;
		}
		buildSpellMod(spellHolder, sx)
	}
	function getModTT(m){
		return modDesc[m];
	}
	function modCost(x){
		switch(x){
			case(1): return 1000; break;
			case(2): return 5000; break;
			case(3): return 25000; break;
			case(4): return 50000; break;
		}
	}
	function modSkill(x){
		if(equipSpells["slot"+x] != null){
			$('#modPage').toggle();
			var spellHolder = equipSpells["slot"+x];
			buildSpellMod(spellHolder, x);
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
		for(var x=0; x< 3; x++){
			if(equipSpells["slot"+x] != null){
				spellHolder = equipSpells["slot"+x];
				ss = spellHolder.name+"<span class='tooltip'>"+spellDesc[spellHolder.name](spellHolder)+"</span>";
				$('#skill'+x).html(ss);
			}
			else{
				$('#skill'+x).html("");
			}
		}
		ss = "";
		for(var x=0; x < spellsHolder.length; x++){
			spellHolder = spellsHolder[x];
			ss += "<span class='spellSelectLine' onClick='equipSelectedSpell("+x+")'>"+(x+1)+". "+spellHolder.name+"<span class='tooltip'>"+spellDesc[spellHolder.name](spellHolder)+"</span></span><br>";
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
					spellsHolder.splice(x,1);
					slotFound = true;
				}
			}
		}
		buildSpellMenuList();
	}
	/*
	var fireball = new spell("Fireball",3,3,0,7,1,40,2);
	var kick = new spell("Kick",1,0,2,1,.8,10,2.75); 
	fireball.mod1 = "Split Fire";
	equipSpells["slot1"] = fireball;
	equipSpells["slot2"] = kick;
	buildSpellMod(fireball, 1); */
