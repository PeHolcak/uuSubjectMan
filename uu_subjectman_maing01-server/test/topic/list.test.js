const { TestHelper } = require("uu_appg01_server-test");
const { createNewTopic } = require("../test-helpers/create-entity");
const { isArraySortedAsc, isArraySortedDesc } = require("../test-helpers/is-array-sorted"); 

beforeEach(async () => {
  await TestHelper.setup({ authEnabled: false, sysStatesEnabled: false });
});

afterEach(async () => {
  await TestHelper.teardown();
});

describe("topic/list uuCMD tests", () => {
  const TEST_TOPIC_COUNT = 5;
  test("HDS", async () => {
    await TestHelper.login("ExecutiveUser");
    for (let i = 0; i < TEST_TOPIC_COUNT; i++) {
      await createNewTopic(TestHelper);
    }
    let dtoOut = await TestHelper.executeGetCommand("topic/list", {
      sortByName: false,
      order: "asc",
      pageInfo: {
        pageIndex: 0,
        pageSize: TEST_TOPIC_COUNT,
      },
    });
    expect(Object.keys(dtoOut.data.uuAppErrorMap).length).toEqual(0);
    expect(Array.isArray(dtoOut.data.topicList) && dtoOut.data.topicList.length===TEST_TOPIC_COUNT).toEqual(true);
  });

  test("2. - Validation of dtoIn.", async () => {
    await TestHelper.login("ExecutiveUser");
    try {
      await TestHelper.executeGetCommand("topic/list", {sortBy:1});
    } catch (e) {
      expect(typeof e.dtoOut.uuAppErrorMap["uu-subjectman-main/topic/list/invalidDtoIn"]).toEqual("object");
      expect(e.status).toEqual(400);
    }
  });

  test("2.2. - Checks that no keys beyond the dtoInType are entered in dtoIn.", async () => {
    await TestHelper.login("ExecutiveUser");
    await createNewTopic(TestHelper);
    const dtoOut = await TestHelper.executeGetCommand("topic/list", { unSupported: 1 });
    expect(typeof dtoOut.data.uuAppErrorMap["uu-subjectman-main/topic/list/unsupportedKeys"]).toEqual("object");
    expect(Array.isArray(dtoOut.data.topicList) && dtoOut.data.topicList.length===1).toEqual(true);
   });

   test("HDS - sorting with desc order", async () => {
    await TestHelper.login("ExecutiveUser");
    for (let i = 0; i < TEST_TOPIC_COUNT; i++) {
      await createNewTopic(TestHelper, undefined, {name: `test topic-${TEST_TOPIC_COUNT-i}`});
    }

    let dtoOut = await TestHelper.executeGetCommand("topic/list",  {sortByName: true, order: "desc"});
    expect(isArraySortedDesc(Array.isArray(dtoOut.topicList) && dtoOut.topicList.map(topicItem => topicItem.name))).toEqual(true);
  });
  
  test("HDS - sorting with asc order", async () => {
    await TestHelper.login("ExecutiveUser");
    for (let i = 0; i < TEST_TOPIC_COUNT; i++) {
      await createNewTopic(TestHelper, undefined, {name: `test topic-${i}`});
    }

    let dtoOut = await TestHelper.executeGetCommand("topic/list",  {sortBy: "name", order: "asc"});
    expect(isArraySortedAsc(Array.isArray(dtoOut.topicList) && dtoOut.topicList.map(topicItem => topicItem.name))).toEqual(true);
  });
});
