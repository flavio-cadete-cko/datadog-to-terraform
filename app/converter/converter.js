'use strict';

import { generateDashboardTerraformCode } from "./dashboard-converter.js";
import { generateMonitorTerraformCode } from "./monitor-converter.js";

export function convertToTerraform(datadogJson, resourceName) {
    var terraformCode;
    let parsedJson = JSON.parse(datadogJson);

    if (parsedJson.hasOwnProperty("name")) {
        terraformCode = generateMonitorTerraformCode(resourceName, parsedJson);
    } else {
        terraformCode = generateDashboardTerraformCode(resourceName, parsedJson);
    }

    return terraformCode;
}