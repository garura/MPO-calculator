/**
 * Calculates the MPO of a drug after the user enters values for all chemical values.
 * Based on Wager TT et al (2010), Moving beyond Rules: The Development of a Central Nervous System Multiparameter Optimization (CNS MPO) Approach To Enable Alignment of Druglike Properties. ACS Chem Neurosci 1:435–49.
 */

'use strict';

var drugName, clogP, clogD, mw, tpsa, hbd, pka;
var bErr_clogP = false, bErr_clogD = false, bErr_mw = false, bErr_tpsa = false, bErr_hbd = false, bErr_pka = false;
var clogPCalc = 0, clogDCalc= 0, mwCalc= 0, tpsaCalc= 0, hbdCalc= 0, pkaCalc= 0, mpo = 0;


function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function clogPCalculation (clogpTest) {
    if (clogpTest <= 3) {
        clogPCalc = 1;
    }
    else if (clogpTest <= 5) {
        clogPCalc = round(((5-clogpTest)/2), 2);
    }
    else {
        clogPCalc = 0;
    }
}

function clogDCalculation (clogdTest) {
    if (clogdTest <= 2) {
        clogDCalc = 1;
    }
    else if (clogdTest <= 4) {
        clogDCalc = round(((4-clogdTest)/2), 2);
    }
    else {
        clogDCalc = 0;
    }
}

function mwCalculation (mwTest) {
    if (mwTest <= 360) {
        mwCalc = 1;
    }
    else if (mwTest <= 500) {
        mwCalc = round(((500-mwTest)/140), 2);
    }
    else {
        mwCalc = 0;
    }
}

function tpsaCalculation (tpsaTest) {
    if (tpsaTest > 40 && tpsaTest <=90) {
        tpsaCalc = 1;
    }
    else if (tpsaTest <= 40 && tpsaTest >20) {
        tpsaCalc = round(((tpsa-20)/20), 2);
    }
    else if (tpsaTest > 90 && tpsaTest <=120) {
        tpsaCalc = round(((120 - tpsaTest)/30), 2);
    }
    else {
        tpsaCalc = 0;
    }
}

function hbdCalculation (hbdTest) {
    if (hbdTest <= 0.5) {
        hbdCalc = 1;
    }
    else if (hbdTest <= 3.5) {
        hbdCalc = round(((3.5-hbdTest)/3), 2);
    }
    else {
        hbdCalc = 0;
    }
}

function pkaCalculation (pkaTest) {
    if (pkaTest <= 8) {
        pkaCalc = 1;
    }
    else if (pkaTest <=10) {
        pkaCalc = round(((10-pkaTest)/2), 2);
    }
    else {
        pkaCalc = 0;
    }
}


/**
 * runs ranges function with user input from webpage, posts result to webpage
 */
function assignment () {
    drugName = document.getElementById('name').value;
    clogP = Number(document.getElementById('clogp').value);
    bErr_clogP = isNaN(clogP);
    if (document.getElementById('clogp').value === "") {
        bErr_clogP = true;
    }
    clogD = Number(document.getElementById('clogd').value);
    bErr_clogD = isNaN(clogD);
    if (document.getElementById('clogd').value === "") {
        bErr_clogD = true;
    }
    mw = Number(document.getElementById('mw').value);
    bErr_mw = isNaN(mw);
    if (document.getElementById('mw').value === "") {
        bErr_mw = true;
    }
    tpsa = Number(document.getElementById('tpsa').value);
    bErr_tpsa = isNaN(tpsa);
    if (document.getElementById('tpsa').value === "") {
        bErr_tpsa = true;
    }
    hbd = Number(document.getElementById('hbd').value);
    bErr_hbd = isNaN(hbd);
    if (document.getElementById('hbd').value === "") {
        bErr_hbd = true;
    }
    pka = Number(document.getElementById('pka').value);
    bErr_pka = isNaN(pka);
    if (document.getElementById('pka').value === "") {
        bErr_pka = true;
    }
    if (bErr_clogP) {
        document.getElementById('clogpc').textContent = "Error: Undefined Value";
    }
    else{
        clogPCalculation(clogP);
        document.getElementById('clogpc').textContent = clogPCalc;
    }
    if (bErr_clogD) {
        document.getElementById('clogdc').textContent = "Error: Undefined Value";
    }
    else {
        clogDCalculation(clogD);
        document.getElementById('clogdc').textContent = clogDCalc;
    }
    if (bErr_mw) {
        document.getElementById('mwc').textContent = "Error: Undefined Value";
    }
    else {
        mwCalculation(mw);
        document.getElementById('mwc').textContent = mwCalc;
    }
    if (bErr_tpsa) {
        document.getElementById('tpsac').textContent = "Error: Undefined Value";
    }
    else {
        tpsaCalculation(tpsa);
        document.getElementById('tpsac').textContent = tpsaCalc;
    }
    if (bErr_hbd) {
        document.getElementById('hbdc').textContent = "Error: Undefined Value";
    }
    else {
        hbdCalculation(hbd);
        document.getElementById('hbdc').textContent = hbdCalc;
    }
    if (bErr_pka) {
        document.getElementById('pkac').textContent = "Error: Undefined Value";
    }
    else {
        pkaCalculation(pka);
        document.getElementById('pkac').textContent = pkaCalc;
    }
    if (bErr_clogP || bErr_clogD || bErr_mw || bErr_tpsa || bErr_hbd || bErr_pka) {
        mpo = "Error";
    }
    else {
        mpo = round((clogPCalc + clogDCalc + mwCalc + tpsaCalc + hbdCalc + pkaCalc), 2);
    }
    document.getElementById('total').textContent = mpo;
}

function saveToHistory () {
    if (bErr_clogP || bErr_clogD || bErr_mw || bErr_tpsa || bErr_hbd || bErr_pka) {
        alert("Error calculating MPO");
        //document.getElementById('history').innerHTML += "Error: As noted above <br>";
    }
     else {
        document.getElementById('history').innerHTML +=drugName + " MPO: " + mpo + " (ClogP " + clogP + " = " +
        clogPCalc +", ClogD " + clogD + " = " + clogDCalc + ", MW " + mw + " = " + mwCalc + ", TPSA " + tpsa + " = "+ tpsaCalc + ", HBD " + hbd +" = " + hbdCalc + ", pKa " + pka + " = " + pkaCalc + ")" + "<br>";
     }
}



// each time you click the button, it will run assignment.
document.getElementById('calculate').addEventListener('click', assignment, false);
document.getElementById('save').addEventListener('click', saveToHistory, false);
