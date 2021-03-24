'use strict';

import { createExportBtn } from "../utils/funcionality.js"
import { convertToTerraform } from "../converter/converter.js";
import { exportFile } from "../utils/export.js"

let dataDogCopyJsonAction = "Copy dashboard JSON";
let dataDogExportJsonAction = "Export dashboard JSON";
let dataDogExportTerraformAction = "Export dashboard Terraform";
let fileName = "terraform_dashboard";

function onClick() {
    try {
        $(`button[data-dd-action-name='${dataDogCopyJsonAction}'`)[0].click();

        navigator.permissions.query({ name: 'clipboard-read' }).then(result => {
            if (result.state === 'granted' || result.state === 'prompt') {
                navigator.clipboard.readText()
                    .then(datadogJson => {
                        var terraformCode = convertToTerraform(datadogJson)
                        exportFile(terraformCode, fileName)
                    })
                    .catch(err => {
                        throw 'Failed to read clipboard contents: ' + err;
                    })
            }
        });
    }
    catch (e) {
        alert(e);
    }
}

// Main entry execute
createExportBtn(dataDogExportJsonAction, dataDogExportTerraformAction, onClick)