const { TestHelper } = require("uu_appg01_server-test");
const { createNewSubject } = require("../test-helpers/create-entity");
const { isArraySortedAsc, isArraySortedDesc } = require("../test-helpers/is-array-sorted"); 

beforeEach(async () => {
  await TestHelper.setup({ authEnabled: false, sysStatesEnabled: false });
});

afterEach(async () => {
  await TestHelper.teardown();
});

describe("subject/list uuCMD tests", () => {
  const TEST_SUBJECT_COUNT = 5;
  let dtoIn = {
    
  };
  
  test("HDS", async () => {
    await TestHelper.login("ExecutiveUser");
    for (let i = 0; i < TEST_SUBJECT_COUNT; i++) {
      await createNewSubject(TestHelper, undefined, {code: `test-${i}`});
    }
    let dtoOut = await TestHelper.executeGetCommand("subject/list", dtoIn);
    expect(Object.keys(dtoOut.data.uuAppErrorMap).length).toEqual(0);
    expect(Array.isArray(dtoOut.data.subjectList) && dtoOut.data.subjectList.length===TEST_SUBJECT_COUNT).toEqual(true);
  });

  test("2. - Validation of dtoIn.", async () => {
    await TestHelper.login("ExecutiveUser");
    try {
      await TestHelper.executeGetCommand("subject/list", {sortBy:1});
    } catch (e) {
      expect(typeof e.dtoOut.uuAppErrorMap["uu-subjectman-main/subject/list/invalidDtoIn"]).toEqual("object");
      expect(e.status).toEqual(400);
    }
  });

  test("2.2. - Checks that no keys beyond the dtoInType are entered in dtoIn.", async () => {
    await TestHelper.login("ExecutiveUser");
    await createNewSubject(TestHelper, undefined, {code: `test`});

    let dtoOut = await TestHelper.executeGetCommand("subject/list", {...dtoIn, unsupportedKey: true});
    expect(typeof dtoOut.data.uuAppErrorMap["uu-subjectman-main/subject/list/unsupportedKeys"]).toEqual("object");
    expect(Array.isArray(dtoOut.data.subjectList) && dtoOut.data.subjectList.length===1).toEqual(true);
  });

  test("HDS - sorting with asc order", async () => {
    await TestHelper.login("ExecutiveUser");
    for (let i = 0; i < TEST_SUBJECT_COUNT; i++) {
      await createNewSubject(TestHelper, undefined, {code: `test-${i}`, name: `Math-${i}`});
    }

    let dtoOut = await TestHelper.executeGetCommand("subject/list",  {sortBy: "name", order: "asc"});
    expect(isArraySortedAsc(Array.isArray(dtoOut.subjectList) && dtoOut.subjectList.map(subjectItem => subjectItem.name))).toEqual(true);
  });

  test("HDS - sorting with desc order", async () => {
    await TestHelper.login("ExecutiveUser");
    for (let i = 0; i < TEST_SUBJECT_COUNT; i++) {
      await createNewSubject(TestHelper, undefined, {code: `test-${i}`, name: `Math-${TEST_SUBJECT_COUNT-i}`});
    }

    let dtoOut = await TestHelper.executeGetCommand("subject/list",  {sortBy: "name", order: "desc"});
    expect(isArraySortedDesc(Array.isArray(dtoOut.subjectList) && dtoOut.subjectList.map(subjectItem => subjectItem.name))).toEqual(true);
  });
});
