function init(){


	
	$('#effectDmgAdd:visible').toggle();
	$('#effectStatProc:visible').toggle();
	$('#effectStatProcM:visible').toggle();
	$('#iEffect').val("");
	
	$('#UeffectDmgAdd:visible').toggle();
	$('#UeffectStatProc:visible').toggle();
	$('#UeffectStatProcM:visible').toggle();
	$('#iUEffect').val("");
	
	$('#iStatList1').val("");
	$('#iStatList2').val("");
	$('#iStatList3').val("");
	
	$('#iLStatList1').val("");
	$('#iLStatList2').val("");
	$('#iLStatList3').val("");
	
	$('#iUStatList1').val("");
	$('#iUStatList2').val("");
	$('#iUStatList3').val("");
	
	$('#islot').val("mainHand");
	
	$('#is2H').removeAttr("disabled");
	$('#is2H').prop('checked', false);
	$('#isOH').attr("disabled", true);
	$('#isOH').prop('checked', false);
	
}

function proc(){
	var canProcess = true;
	var id = $('#iid').val();
	if(vv(id) && isNaN(id))
		canProcess = false;
	var name = $('#iname').val();
	if(vv(name))
		canProcess = false;
	var slot = $('#islot').val();
	var xpMult = $('#ixpmlt').val();
	if(vv(xpMult) && isNaN(xpMult))
		canProcess = false;
	var xpGain = $('#ixpgain').val();
	if(vv(xpGain) && isNaN(xpGain))
		canProcess = false;
	var is2h = $('#is2H').prop("checked");
	var isOh = $('#isOH').prop("checked");
	var uname = $('#iupgname').val();
	if(vv(uname))
		canProcess = false;
		
	var st1 = $('#iStatList1').val();
	var st1val = $('#iStat1Val').val();
	var st2 = $('#iStatList2').val();
	var st2val = $('#iStat2Val').val();
	var st3 = $('#iStatList3').val();
	var st3val = $('#iStat3Val').val();
	
	var lst1 = $('#iLStatList1').val();
	var lst1val = $('#iLStat1Val').val();
	var lst2 = $('#iLStatList2').val();
	var lst2val = $('#iLStat2Val').val();
	var lst3 = $('#iLStatList3').val();
	var lst3val = $('#iLStat3Val').val();
	
	var ust1 = $('#iUStatList1').val();
	var ust1val = $('#iUStat1Val').val();
	var ust2 = $('#iUStatList2').val();
	var ust2val = $('#iUStat2Val').val();
	var ust3 = $('#iUStatList3').val();
	var ust3val = $('#iUStat3Val').val();
	
	var effType = $('#iEffect').val();
	var effName = $('#ieffName').val();
	var effDmgType = $('#iEffDmgType').val();
	var effVal1;
	var effProcStat; 
	var effVal2;
	var effVal3;
	if(effType == "bonusDamage"){
		effVal1 = $('#iEffPerAdd').val();
	}
	if(effType == "statProc"){
		effVal1 = $('#iEffProcChn').val();
		effVal2 = $('#iEffProcVal').val();
		effVal3 = $('#iEffProcDur').val();
		effProcStat = $('#iEffProcStat').val();
	}
	if(effType == "statProcM"){
		effVal1 = $('#iEffProcChnM').val();
		effVal2 = $('#iEffProcValM').val();
		effVal3 = $('#iEffProcDurM').val();
		effProcStat = $('#iEffProcStatM').val();
	}
	
	var ueffType = $('#iUEffect').val();
	var ueffName = $('#iueffName').val();
	var ueffDmgType = $('#iUEffDmgType').val();
	var ueffVal1;
	var ueffProcStat; 
	var ueffVal2;
	var ueffVal3;
	if(ueffType == "bonusDamage"){
		ueffVal1 = $('#iUEffPerAdd').val();
	}
	if(ueffType == "statProc"){
		ueffVal1 = $('#iUEffProcChn').val();
		ueffVal2 = $('#iUEffProcVal').val();
		ueffVal3 = $('#iUEffProcDur').val();
		ueffProcStat = $('#iUEffProcStat').val();
	}
	if(ueffType == "statProcM"){
		ueffVal1 = $('#iUEffProcChnM').val();
		ueffVal2 = $('#iUEffProcValM').val();
		ueffVal3 = $('#iUEffProcDurM').val();
		ueffProcStat = $('#iUEffProcStatM').val();
	}
	
	var fullItem = "\""+id+","+slot+","+name+",";
	var statString = buildStatStr(st1, st1val, st2, st2val, st3, st3val);
	fullItem += statString+",";
	var effString = buildEffStr(effName, effType, effDmgType, effVal1, effVal2, effVal3, effProcStat);
	fullItem += effString+",";
	var statLString = buildStatStr(lst1, lst1val, lst2, lst2val, lst3, lst3val);
	fullItem += statLString+",";
	var statUString = buildStatStr(ust1, ust1val, ust2, ust2val, ust3, ust3val);
	fullItem += statUString+","+uname+",";
	var uEffString = buildEffStr(ueffName, ueffType, ueffDmgType, ueffVal1, ueffVal2, ueffVal3, ueffProcStat);
	fullItem += uEffString+","+xpMult+","+xpGain+","+is2h+","+isOh+"\",";
	
	
	if(canProcess){
		$('#outputItem').val(fullItem);
	//	alert(fullItem);
	}
	
	//id, slot, name, stats, effect, lvlStats, upgrd Stats, upg name, upgEffects, xpMult, xpGain, is2h, isOh
	//"0,helmet,Iron Helmet,BaseDamage:1,,BaseDamage:1;HP:1,BaseDamage:15;HP:10,Burning Helmet of Rage,,.95,5",
	//alert(isNaN(id));
}

function buildStatStr(s1, v1, s2, v2, s3, v3){
	var returnStr = "";
	if(!vv(s1) && !vv(v1) && !isNaN(v1))
		returnStr += s1+":"+v1;
	if(!vv(s2) && !vv(v2) && !isNaN(v2))
		returnStr += ";"+s2+":"+v2;
	if(!vv(s3) && !vv(v3) && !isNaN(v3))
		returnStr += ";"+s3+":"+v3;
	
	return returnStr;

}
function buildEffStr(name, type, dmgType, val1, val2, val3, proc){
	var returnStr = "";
	var validEff = true;
	if(vv(name) || vv(type))
		validEff = false;
		
	switch(type){
		case("bonusDamage"):
			type = "addedDamage";
			if(vv(dmgType))
				validEff = false;
			if(vv(val1) && isNaN(val1))
				validEff = false;
				returnStr = name+":"+type+":"+val1+":"+dmgType; break;
		case("statProc"): type = "statUpBonus";
		case("statProcM"):
			type = "statUpMore";
			if(vv(proc))
				validEff = false;
			if(vv(val1) && isNaN(val1) && vv(val2) && vv(val3) && isNaN(val2) && isNaN(val3))
				validEff = false;
				returnStr = name+":"+type+":"+proc+":"+val2+":"+val1+":"+val3;
	}
	if(!validEff){
		returnStr = "";
	}
	return returnStr;
}
function vv(x){
	return (x == "");
}

function slotChng(){
	var x = $('#islot').val();
	$('#isOH').attr("disabled", true);
	$('#is2H').prop('checked', false);
	$('#is2H').attr("disabled", true);
	$('#isOH').prop('checked', false);
	if(x == "mainHand"){
		$('#is2H').removeAttr("disabled");
		$('#isOH').attr("disabled", true);
	}
	if(x == "offHand"){
		$('#isOH').removeAttr("disabled");
		$('#is2H').attr("disabled", true);
	}
}

function effChange(){
	var x = $('#iEffect').val();
	switch(x){
		case("bonusDamage"): $('#effectDmgAdd:hidden').toggle(); $('#effectStatProc:visible').toggle(); $('#effectStatProcM:visible').toggle(); break;
		case("statProc"): $('#effectDmgAdd:visible').toggle(); $('#effectStatProc:hidden').toggle(); $('#effectStatProcM:visible').toggle(); break;
		case("statProcM"): $('#effectDmgAdd:visible').toggle(); $('#effectStatProc:visible').toggle(); $('#effectStatProcM:hidden').toggle(); break;
	}
}

function upgEffChange(){
	var x = $('#iUEffect').val();
	switch(x){
		case("bonusDamage"): $('#UeffectDmgAdd:hidden').toggle(); $('#UeffectStatProc:visible').toggle(); $('#UeffectStatProcM:visible').toggle(); break;
		case("statProc"): $('#UeffectDmgAdd:visible').toggle(); $('#UeffectStatProc:hidden').toggle(); $('#UeffectStatProcM:visible').toggle(); break;
		case("statProcM"): $('#UeffectDmgAdd:visible').toggle(); $('#UeffectStatProc:visible').toggle(); $('#UeffectStatProcM:hidden').toggle(); break;
	}
}

