import { generateMonitorTerraformCode } from "./converter/monitor-converter.js";
import { generateDashboardTerraformCode } from "./converter/dashboard-converter.js";
import { updateStatusMessage, copyResultToClipboard } from "./utils/funcionality.js"

function onClick() {
  var resourceName = document.getElementById("resourceName").value;
  var datadogJson = document.getElementById("datadogJson").value;

  try {
    if (!resourceName) throw "No resource name given";
    if (!datadogJson) throw "No Datadog JSON given";

    var terraformCode;
    let parsedJson = JSON.parse(datadogJson);
    if (parsedJson.hasOwnProperty("name")) {
      terraformCode = generateMonitorTerraformCode(resourceName, parsedJson);
    } else {
      terraformCode = generateDashboardTerraformCode(resourceName, parsedJson);
    }

    addDomElementsForResult(terraformCode);
    copyResultToClipboard();
    updateStatusMessage("Copied to clipboard!", false);
  } catch (e) {
    updateStatusMessage(e, true);
  }
}

function addDomElementsForResult(terraformAlarmCode) {
  var resultTextArea = document.createElement("textarea");
  resultTextArea.id = "result";
  resultTextArea.textContent = terraformAlarmCode;

  var outputWrapperDiv = document.getElementById("outputWrapper");
  outputWrapperDiv.appendChild(resultTextArea);
  outputWrapperDiv.classList.add("active");
}

document.getElementById("convertButton").addEventListener("click", onClick);
