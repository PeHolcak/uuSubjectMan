const { TestHelper } = require("uu_appg01_server-test");
const { createNewSubject } = require("../test-helpers/create-entity"); 

beforeEach(async () => {
  await TestHelper.setup({ authEnabled: false, sysStatesEnabled: false });
});

afterEach(async () => {
  await TestHelper.teardown();
});

describe("subject/get uuCMD tests", () => {
  test("HDS", async () => {
    await TestHelper.login("ExecutiveUser");
    const created = await createNewSubject(TestHelper);
    let dtoOut = await TestHelper.executeGetCommand("subject/get", { id: created.id });
    expect(Object.keys(dtoOut.data.uuAppErrorMap).length).toEqual(0);
    expect(dtoOut.data.code).toEqual("s1dad");
    expect(dtoOut.data.name).toEqual("Math");
    expect(dtoOut.data.desc).toEqual("A math subject");
    expect(dtoOut.data.credits).toEqual(9);
    expect(dtoOut.data.supervisor).toEqual("John Johnson");
    expect(dtoOut.data.goal).toEqual("Teach fundamentals of Math");
    expect(dtoOut.data.organization).toEqual("Unicorn College");
    expect(dtoOut.data.topicIdList).toEqual([]);
    expect(dtoOut.data.materialIdList).toEqual([]);
    expect(dtoOut.data.language).toEqual("EN");
    expect(dtoOut.data.degreeOfStudy).toEqual("bc");
    expect(dtoOut.data.formOfStudy).toEqual("obligatory");
  });

  test("2. - Validation of dtoIn.", async () => {
    await TestHelper.login("ExecutiveUser");
    try {
      await TestHelper.executeGetCommand("subject/get", {});
    } catch (e) {
      expect(typeof e.dtoOut.uuAppErrorMap["uu-subjectman-main/subject/get/invalidDtoIn"]).toEqual("object");
      expect(e.status).toEqual(400);
    }
  });

  test("2.2. - Checks that no keys beyond the dtoInType are entered in dtoIn.", async () => {
    await TestHelper.login("ExecutiveUser");
    const created = await createNewSubject(TestHelper);
    const dtoOut = await TestHelper.executeGetCommand("subject/get", { id: created.id, unSupported: 1 });
    expect(typeof dtoOut.data.uuAppErrorMap["uu-subjectman-main/subject/get/unsupportedKeys"]).toEqual("object");
    expect(dtoOut.data.code).toEqual("s1dad");
    expect(dtoOut.data.name).toEqual("Math");
    expect(dtoOut.data.desc).toEqual("A math subject");
    expect(dtoOut.data.credits).toEqual(9);
    expect(dtoOut.data.supervisor).toEqual("John Johnson");
    expect(dtoOut.data.goal).toEqual("Teach fundamentals of Math");
    expect(dtoOut.data.organization).toEqual("Unicorn College");
    expect(Array.isArray(dtoOut.data.topicIdList) && dtoOut.data.topicIdList.length).toEqual(0);
    expect(Array.isArray(dtoOut.data.topicIdList) && dtoOut.data.topicIdList.length).toEqual(0);
    expect(dtoOut.data.language).toEqual("EN");
    expect(dtoOut.data.degreeOfStudy).toEqual("bc");
    expect(dtoOut.data.formOfStudy).toEqual("obligatory");
  });

  test("3.2. - Subject does not exist.", async () => {
    try {
      await TestHelper.executeGetCommand("subject/get", { id: "61a3fb96f4553409c80aa931" });
    } catch (e) {
      expect(e.status).toEqual(400);
      expect(typeof e.dtoOut.uuAppErrorMap["uu-subjectman-main/subject/get/subjectDoesNotExist"]).toEqual("object");
    }
  });
});
