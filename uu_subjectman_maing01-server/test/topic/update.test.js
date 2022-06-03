const { TestHelper } = require("uu_appg01_server-test");
const { createNewTopic } = require("../test-helpers/create-entity");

beforeEach(async () => {
  await TestHelper.setup({ authEnabled: false, sysStatesEnabled: false });
});

afterEach(async () => {
  await TestHelper.teardown();
});

describe("topic/update uuCMD tests", () => {
  let dtoIn = {
    "name": "Biologie",
    "materialIdList": []
  };

  test("HDS", async () => {
    await TestHelper.login("ExecutiveUser");
    let created = await createNewTopic(TestHelper);
    let updated = await TestHelper.executePostCommand("topic/update", { ...dtoIn, id: created.id });
    expect(updated.data.name).toEqual("Biologie");
    expect(parseInt(Array.isArray(updated.data.materialIdList) && updated.data.materialIdList.length,10)).toEqual(0);
  });

  test("2. - Validation of dtoIn.", async () => {
    await TestHelper.login("ExecutiveUser");
    try {
      await TestHelper.executePostCommand("topic/update", {});
    } catch (e) {
      expect(typeof e.dtoOut.uuAppErrorMap["uu-subjectman-main/topic/update/invalidDtoIn"]).toEqual("object");
      expect(e.status).toEqual(400);
    }
  });

  test("2.2. - Checks that no keys beyond the dtoInType are entered in dtoIn.", async () => {
    await TestHelper.login("ExecutiveUser");
    let created = await createNewTopic(TestHelper);
    let updated = await TestHelper.executePostCommand("topic/update", {
      ...dtoIn,
      id: created.id,
      unSupported: 1,
    });
    
    expect(typeof updated.data.uuAppErrorMap["uu-subjectman-main/topic/update/unsupportedKeys"]).toEqual("object");
    expect(updated.data.name).toEqual("Biologie");
    expect(parseInt(Array.isArray(updated.data.materialIdList) && updated.data.materialIdList.length,10)).toEqual(0);
  });

  test("3. - Checks if topic ID exists.", async () => {
    try {
      await TestHelper.executePostCommand("topic/update", {...dtoIn, id: "61ce198df74a517d62617b5e"});
    } catch (e) {
      expect(e.status).toEqual(400);
      expect(typeof e.dtoOut.uuAppErrorMap["uu-subjectman-main/topic/update/topicDoesNotExist"]).toEqual("object");
    }
  });

  test("4. - Checks if all materials exist.", async () => {
    let created = await createNewTopic(TestHelper);
    try {
      await TestHelper.executePostCommand("topic/update", {
        ...dtoIn,
        id: created.id,
        materialIdList: ["61a7a052743eb3541f144f0e", "61a7a05a4e67ac25a0b35ef6", "61a7a05e1a105574fa6e4d7f"]
      });
    } catch (e) {
      expect(e.status).toEqual(400);
      expect(typeof e.dtoOut.uuAppErrorMap["uu-subjectman-main/topic/update/materialDoesNotExist"]).toEqual("object");
      expect(e.dtoOut.materialId).toEqual(["61a7a052743eb3541f144f0e", "61a7a05a4e67ac25a0b35ef6", "61a7a05e1a105574fa6e4d7f"]);
    }
  });
});
