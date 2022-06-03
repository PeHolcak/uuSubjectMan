const { TestHelper } = require("uu_appg01_server-test");
beforeEach(async () => {
    await TestHelper.setup({ authEnabled: false, sysStatesEnabled: false });
  });
  
  afterEach(async () => {
    await TestHelper.teardown();
  });
  
  describe("topic/delete uuCMD tests", () => {
    let topicDtoIn = {
      "name": "Algebra",
      "materialIdList": []
  };
  test("HDS", async () => {
    await TestHelper.login("ExecutiveUser");
    let created = await TestHelper.executePostCommand("topic/create", topicDtoIn);
    let dtoOut = await TestHelper.executePostCommand("topic/delete", {id: created.data.id});
    expect(Object.keys(dtoOut.data)[0]).toEqual("uuAppErrorMap");
    expect(Object.keys(dtoOut.data.uuAppErrorMap).length).toEqual(0);
  });


  test("2. - Validation of dtoIn.", async () => {
    await TestHelper.login("ExecutiveUser");
      try {
        await TestHelper.executePostCommand("topic/delete", {});
      } catch (e)
      {
        expect(typeof e.dtoOut.uuAppErrorMap["uu-subjectman-main/topic/delete/invalidState"]).toEqual("object");
        expect(e.status).toEqual(400);
      }
    });

    test("2.2. - Checks that no keys beyond the dtoInType are entered in dtoIn.", async () => {
      await TestHelper.login("ExecutiveUser");
      const created = await TestHelper.executePostCommand("topic/create", topicDtoIn);
      const dtoOut = await TestHelper.executePostCommand("topic/delete", {id: created.id, unSupported: 1});
      expect(typeof dtoOut.data.uuAppErrorMap["uu-subjectman-main/topic/delete/unsupportedKeys"]).toEqual("object");
    });

    test("3. - Checks if the topic exists.", async () => {
      try {
        await TestHelper.executePostCommand("topic/delete", {id: "61a3fb96f4553409c80aa931"});
      } catch (e) {
        expect(e.status).toEqual(400);
        expect(typeof e.dtoOut.uuAppErrorMap["uu-subjectman-main/topic/delete/topicDoesNotExist"]).toEqual("object");
      }
    });
  });