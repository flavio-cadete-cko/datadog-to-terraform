import { generateDashboardTerraformCode } from "../converter/dashboard-converter.js";
import { alertMessage, copyTerraformCodeToClipboard } from "./utils/funcionality.js"

var dataDogCopyJsonBtn = $("button[data-dd-action-name='Copy dashboard JSON'"); 

if(dataDogCopyJsonBtn.length < 1){
    console.error("Failed to find button 'Copy dashboard JSON'");
    return;
}

var resultTextArea = document.createElement("textarea");
resultTextArea.id = "result";
resultTextArea.textContent = terraformAlarmCode;

var outputWrapperDiv = document.getElementById("outputWrapper");
outputWrapperDiv.appendChild(resultTextArea);
outputWrapperDiv.classList.add("active");

document.getElementById("convertDashboardToTerraformButton").addEventListener("click", onClick);

function onClick() {

    try {
    
        var datadogExportBtn = $("button[data-dd-action-name='Export'"); 

        if(datadogExportBtn.length < 1){
          throw "Failed to find button 'Export'";
        }

        dataDogCopyJsonBtn[0].click();

        var datadogJson = "";

        // setTimeout(async() => // some trigger delay so we can test on browser console
        navigator.permissions.query({ name: 'clipboard-read' }).then(result => {
            // If permission to read the clipboard is granted or if the user will
            // be prompted to allow it, we proceed.

            if (result.state === 'granted' || result.state === 'prompt') {
                navigator.clipboard.readText()
                    .then(datadogJson => {
                        //my code to handle paste
                        downloadTerraform(datadogJson)
                        
                    })
                    .catch(err => {
                        throw 'Failed to read clipboard contents: ' + err;
                    })
            }
        });
        // , 3000)

       
    }
    catch (e) {
        alertMessage(e);
    }
}

function downloadTerraform(datadogJson){
    var terraformCode;
    let parsedJson = JSON.parse(datadogJson);

    terraformCode = generateDashboardTerraformCode("your_datadog_identifier", parsedJson);

    copyTerraformCodeToClipboard();
    console.log("Copied to clipboard!")

    var blob = new Blob(terraformCode, {type: "text/plain"});
    var url = URL.createObjectURL(blob);
    chrome.downloads.download({
      url: url,
      filename: "your_terraform_monitor.tf"
    });
}
