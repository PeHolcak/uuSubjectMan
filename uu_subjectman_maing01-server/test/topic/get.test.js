const { TestHelper } = require("uu_appg01_server-test");
const { createNewTopic } = require("../test-helpers/create-entity"); 

beforeEach(async () => {
  await TestHelper.setup({ authEnabled: false, sysStatesEnabled: false });
});

afterEach(async () => {
  await TestHelper.teardown();
});

describe("topic/get uuCMD tests", () => {
  test("HDS", async () => {
    await TestHelper.login("ExecutiveUser");
    const created = await createNewTopic(TestHelper);
    let dtoOut = await TestHelper.executeGetCommand("topic/get", { id: created.id });
    expect(Object.keys(dtoOut.data.uuAppErrorMap).length).toEqual(0);
    expect(parseInt(Array.isArray(dtoOut.data.materialIdList) && dtoOut.data.materialIdList.length,10)).toEqual(0);
    expect(dtoOut.data.name).toEqual("Algebra");
  });

  test("2. - Validation of dtoIn.", async () => {
    await TestHelper.login("ExecutiveUser");
    try {
      await TestHelper.executeGetCommand("topic/get", {});
    } catch (e) {
      expect(typeof e.dtoOut.uuAppErrorMap["uu-subjectman-main/topic/get/invalidDtoIn"]).toEqual("object");
      expect(e.status).toEqual(400);
    }
  });

  test("2.2. - Checks that no keys beyond the dtoInType are entered in dtoIn.", async () => {
    await TestHelper.login("ExecutiveUser");
    const created = await createNewTopic(TestHelper);
    const dtoOut = await TestHelper.executeGetCommand("topic/get", { id: created.id, unSupported: 1 });
    expect(typeof dtoOut.data.uuAppErrorMap["uu-subjectman-main/topic/get/unsupportedKeys"]).toEqual("object");
    expect(parseInt(Array.isArray(dtoOut.data.materialIdList) && dtoOut.data.materialIdList.length,10)).toEqual(0);
    expect(dtoOut.data.name).toEqual("Algebra");
  });

  test("3.2. - Topic does not exist.", async () => {
    try {
      await TestHelper.executeGetCommand("topic/get", { id: "61a3fb96f4553409c80aa931" });
    } catch (e) {
      expect(e.status).toEqual(400);
      expect(typeof e.dtoOut.uuAppErrorMap["uu-subjectman-main/topic/get/topicDoesNotExist"]).toEqual("object");
    }
  });
});
