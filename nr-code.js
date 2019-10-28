
// Part 1: Scrape data from Alert Details page

var TAObj = { "Date of Completion" : "", "Alert Number" : "", 
                "Originator" : "", "OC Country" : "", 
                "Originating Bank" : "", "OB Country" : "", 
                "Locations Differ" : "No", "Intermediary 1" : "NA", 
                "Int1 Country" : "NA", "Intermediary 2" : "NA", 
                "Int 2 Country" : "NA", "Beneficiary Bank" : "", 
                "BB Country" : "", "Beneficiary" : "", "BC Country" : "", 
                "Locations Differ 2" : "", "Santander Customer Involvement" : "", 
                "Outcome" : "Close", "Date SAR Submitted" : "NA", 
                "SAR Acknowledgement" : "NA", "Action Taken" : "NA", "Scenario" : ""
            }
          
var alertNumber = document.querySelector("#main-content").innerText.slice(38,53);

TAObj['Alert Number'] = alertNumber;

var scenario = document.querySelector("#AMLCB__SMAlertDetectionDetailsrow0 > td.cell_AMLCB__DetectionList_ScenarioName_RO").innerText; 

TAObj['Scenario'] = scenario;

window.name = JSON.stringify(TAObj);   

// Part 2: Scrape data from Transaction Summary page


var TAObj =  JSON.parse(window.name);

dataList = [];

var bicCodes = { "ADCBAEAAXXX" : ["ABU DHABI COMMERCIAL BANK", "UAE"], 
                "ABBYGB2L" : ["Santander UK PLC", "United Kingdom"], "ABBYGB2LXXX" : ["Santander UK PLC", "United Kingdom"], 
                "AKBKTRIS" : ["AKBANK T.A.S", "Turkey"], "LOYDGB21021" : ["LLOYDS BANK PLC", "United Kingdom"], 
                "LOYDGB2LCTY" : ["LLOYDS BANK PLC", "United Kingdom"], "POFICHBEXXX" : ["POSTFINANCE AG" , "Switzerland"], 
                "WBKPPLPPXXX" : ["SANTANDER BANK POLSKA S.A", "Poland"], "GDBKCN22XXX" : ["CHINA GUANGFA BANK CO., LTD", "China"], 
                "BARCAEADXXX" : ["BARCLAYS BANK PLC", "UAE"], "RBOSGB2L" : ["ROYAL BANK OF SCOTLAND PLC", "United Kingdom"], 
                "BUKBGB22" : ["BARCLAYS BANK PLC RE BUK", "UK"], "BSCHBRSPSPO" : ["BANCO SANTANDER (BRASIL) S.A.", "Brazil"], 
                "BARCGB71XXX" : ["BARCLAYS BANK PLC", "United Kingdom"], "BARCGB22XXX" : ["BARCLAYS BANK PLC", "United Kingdom"], 
                "MIDLGB2111F" : ["HSBC BANK PLC", "United Kingdom"], "HBUKGB4BXXX" : ["HSBC BANK PLC", "United Kingdom"],
                "NWBKGB2LXXX" : ["National Westminster Bank PLC", "UK"] }


var originator = document.querySelector("#STR_EIM__TransactionSummaryOriginator__EIM__Originator_Details_Static_1 > table > tbody > tr:nth-child(1) > td > span.pairRight.fieldspan_EIM__Originator_Name_1").innerText;

TAObj['Originator'] = originator;

var originatorCountry = document.querySelector("#STR_EIM__TransactionSummaryOriginator__EIM__Originator_Details_Static_1 > table > tbody > tr:nth-child(6) > td > span.pairRight.fieldspan_EIM__Originator_Country_1").innerText;

TAObj['OC Country'] = originatorCountry;

var originatingBank = document.querySelector("#STR_EIM__TransactionSummaryOriginator__EIM__Originator_AccountDetails_Static_1 > table > tbody > tr:nth-child(2) > td > span.pairRight.fieldspan_EIM__Originator_AccountBIC_1").innerText;

// Check if BIC code is in the bicCodes JS object
if (originatingBank in bicCodes){
        TAObj['Originating Bank'] = bicCodes[originatingBank][0];
        TAObj['OB Country'] = bicCodes[originatingBank][1];
        TAObj['OC Country'] = (originatorCountry === "" ? bicCodes[originatingBank][1] : "" );
    }else{
        TAObj['Originating Bank'] = originatingBank;
    };

// Select the Beneficiary Customer details tab and click the tab
var beneLink = document.querySelector("#STR_EIM__TransactionSummaryBeneficiarytab"); 

setTimeout(function(){
        beneLink.click();
    },500);


  setTimeout(function(){
        var beneficiary = document.querySelector("#STR_EIM__TransactionSummaryBeneficiary__EIM__Beneficiary_Details_Static_1 > table > tbody > tr:nth-child(1) > td > span.pairRight.fieldspan_EIM__Beneficiary_Name_1").innerText;

        TAObj['Beneficiary'] = beneficiary;

        var beneficiaryBank = document.querySelector("#STR_EIM__TransactionSummaryBeneficiary__EIM__Beneficiary_AccountDetails_Static_1 > table > tbody > tr:nth-child(2) > td > span.pairRight.fieldspan_EIM__Beneficiary_AccountBIC_1").innerText;
        
        var beneficiaryCountry = document.querySelector("#STR_EIM__TransactionSummaryBeneficiary__EIM__Beneficiary_Details_Static_1 > table > tbody > tr:nth-child(6) > td > span.pairRight.fieldspan_EIM__Beneficiary_Country_1").innerText;

        TAObj['BC Country'] = beneficiaryCountry;

        if (beneficiaryBank in bicCodes){
            TAObj['Beneficiary Bank'] = bicCodes[beneficiaryBank][0];
            TAObj['BB Country'] = bicCodes[beneficiaryBank][1];
            TAObj['BC Country'] = (beneficiaryCountry === "" ? bicCodes[beneficiaryBank][1] : "" );
        }else{
            TAObj['Beneficiary Bank'] = beneficiaryBank;
        };

        TAObj['Locations Differ'] = (TAObj['OC Country'] == TAObj['OB Country'] ? "No" : "Yes");

        TAObj['Locations Differ 2'] = (TAObj['BC Country'] == TAObj['BB Country'] ? "No" : "Yes");

        TAObj['Santander Customer Involvement'] = (TAObj['Originating Bank'] ==  "Santander UK PLC" ||  TAObj['Beneficiary Bank'] == "Santander UK PLC" ? "Yes" : "No");

        if (TAObj['Santander Customer Involvement'] == "No"){
            TAObj['Intermediary 1'] = "Santander UK PLC";
            TAObj['Int1 Country'] = "United Kingdom";
        }

        dataList.push (TAObj);
        },1000);

        with ({ copy }) { setTimeout(() => copy(dataList), 1500) };
        
        setTimeout(function(){
        console.log('Completed')
        },1500);



        