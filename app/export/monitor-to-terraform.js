'use strict';

import { createExportBtn } from "../utils/funcionality.js"
import { convertToTerraform } from "../converter/converter.js";
import { exportFile } from "../utils/export.js"

let dataDogExportJsonAction = "Export";
let dataDogExportTerraformAction = "Export dashboard Terraform";
let fileName = "terraform_monitor";

function onClick() {
  try {
    $(`button[data-dd-action-name='${dataDogExportJsonAction}'`)[0].click();

    // TODO: wait to open popup
    // TODO: click copy btn

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