export function copyResultToClipboard() {
    var copyText = document.getElementById("result");
    copyText.select();
    document.execCommand("copy");
}
 
export function copyTerraformCodeToClipboard(terraformCode) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = terraformCode;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

export function updateStatusMessage(message, isError) {
    var newMessageText = isError ? "❗️" + message : "🎉" + message;
    var statusMessageElement = document.getElementById("statusMessage");
    statusMessageElement.textContent = newMessageText;
    document.getElementById("convertButton").style.marginBottom = "0";
    if (isError) {
        statusMessageElement.style.color = "red";
    }
}

export function alertMessage(message, isError) {
    var newMessageText = isError ? "Error❗️ " + message : "🎉" + message;
    alert(newMessageText);
}