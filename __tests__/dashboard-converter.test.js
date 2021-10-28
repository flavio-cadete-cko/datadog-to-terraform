import { generateDashboardTerraformCode } from "../app/dashboard-converter";
import dashboardv1 from "../examples/dashboard_v1.json";
import dashboardv2 from "../examples/dashboard_v2.json";
import dashboardv3 from "../examples/dashboard_v3.json";
import screenboardData from "../examples/screenboard.json";
import timeboardData from "../examples/timeboard.json";
import dashboardWithGroupData from "../examples/timeboard-with-group.json";
import badDashboardData from "../examples/bad-dashboard.json";

it("converts dashbboards correctly v1", () => {
  expect(generateDashboardTerraformCode("dashboard_1", dashboardv1)).toMatchSnapshot();
});

it("converts dashbboards correctly v2", () => {
  expect(generateDashboardTerraformCode("dashboard_2", dashboardv2)).toMatchSnapshot();
});

it("converts dashbboards correctly v3", () => {
  expect(generateDashboardTerraformCode("dashboard_dps", dashboardv3)).toMatchSnapshot();
});

it("converts screenboards correctly", () => {
  expect(generateDashboardTerraformCode("sb_1", screenboardData)).toMatchSnapshot();
});

it("converts timeboards correctly", () => {
  expect(generateDashboardTerraformCode("tb_1", timeboardData)).toMatchSnapshot();
});

it("converts timeboards with groups correctly", () => {
  expect(
    generateDashboardTerraformCode("group_db_1", dashboardWithGroupData)
  ).toMatchSnapshot();
});

it("throws an error if a key cannot be converted", () => {
  expect(() => {
    generateDashboardTerraformCode("bad_data", badDashboardData);
  }).toThrow("Can't convert key 'NOT_A_REAL_KEY'");
});
