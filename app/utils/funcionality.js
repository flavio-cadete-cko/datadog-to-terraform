'use strict';

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

export function createExportBtn(actionName, btnInnerText, onClick) {
    let dataDogExportBtn = $(`div > button[data-dd-action-name='${actionName}'`);

    if (dataDogExportBtn.length < 1) {
        console.error(`Failed to find button[data-dd-action-name='${actionName}']`);
        return;
    }

    let clonedBtn = dataDogExportBtn[0].cloneNode(true);
    clonedBtn.setAttribute("data-dd-action-name", btnInnerText);
    clonedBtn.setAttribute("aria-label", btnInnerText);
    clonedBtn.getElementsByTagName("span")[0].innerText = btnInnerText;
    clonedBtn.addEventListener("click", onClick);

    let div = document.createElement("div");
    div.append(clonedBtn);

    dataDogExportBtn.parent().append(div);
}
