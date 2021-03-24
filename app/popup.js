import { convertToTerraform } from "./converter/converter.js";
import { updateStatusMessage, copyResultToClipboard } from "./utils/funcionality.js"

function onClick() {
  var resourceName = document.getElementById("resourceName").value;
  var datadogJson = document.getElementById("datadogJson").value;

  try {
    if (!resourceName) throw "No resource name given";
    if (!datadogJson) throw "No Datadog JSON given";

    var terraformCode = convertToTerraform(datadogJson, resourceName);

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
