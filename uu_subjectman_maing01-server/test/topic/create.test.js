const { TestHelper } = require("uu_appg01_server-test");
beforeEach(async () => {
    await TestHelper.setup({ authEnabled: false, sysStatesEnabled: false });
  });
  
  afterEach(async () => {
    await TestHelper.teardown();
  });
  
  describe("topic/create uuCMD tests", () => {
    let topicDtoIn = {
      "name": "Algebra",
      "materialIdList": []
  };

  let materialDtoIn = {
    "code": "",
    "name": "Finanční analýza",
    "description": "Učební pomůcka, která pomůže studentům se zorientovat v problematice finanční analýzy",
    "subjectIdList": []
  }

  test("HDS", async () => {
    await TestHelper.login("ExecutiveUser");

      //creating Topic without materialList
      let createdTestTopic = await TestHelper.executePostCommand("topic/create", topicDtoIn);
      expect(createdTestTopic.data.name).toEqual("Algebra");
      expect(parseInt(Array.isArray(createdTestTopic.data.materialIdList) && createdTestTopic.data.materialIdList.length,10)).toEqual(0);

      //creating Topic with materialList
      let createdTestMaterial1 = await TestHelper.executePostCommand("material/create", {...materialDtoIn, code: "test1"});
      let createdTestMaterial2 = await TestHelper.executePostCommand("material/create", {...materialDtoIn, code: "test2"});
      let createdTestTopic2 = await TestHelper.executePostCommand("topic/create", {...topicDtoIn, materialIdList: [createdTestMaterial1.id, createdTestMaterial2.id]});
      expect(createdTestTopic2.data.name).toEqual("Algebra");
      expect(parseInt(Array.isArray(createdTestTopic2.data.materialIdList) && createdTestTopic2.data.materialIdList.length,10)).toEqual(2);
  });


  test("2. - Validation of dtoIn.", async () => {
    await TestHelper.login("ExecutiveUser");
    try {
      await TestHelper.executePostCommand("topic/create", {...topicDtoIn, name: 123, materialIdList: 123});
    } catch (e)
    {
      expect(typeof e.dtoOut.uuAppErrorMap["uu-subjectman-main/topic/create/invalidDtoIn"]).toEqual("object");
      expect(e.status).toEqual(400);
    }
  });

    test("2.2. - Checks that no keys beyond the dtoInType are entered in dtoIn.", async () => {
      await TestHelper.login("ExecutiveUser");
        const created = await TestHelper.executePostCommand("topic/create", {...topicDtoIn, unSupported: 1});
        expect(created.data.name).toEqual("Algebra");
        expect(parseInt(Array.isArray(created.data.materialIdList) && created.data.materialIdList.length,10)).toEqual(0);  
        expect(typeof created.data.uuAppErrorMap["uu-subjectman-main/topic/create/unsupportedKeys"]).toEqual("object");
    });

    test("4. - Checks if the materials exist.", async () => {
      try {
        await TestHelper.executePostCommand("topic/create", {...topicDtoIn, materialIdList: ["61cdb8bd034adea62542c3f9", "61cdb8c6fb534af06a755663"]});
    } catch (e) {
      expect(e.status).toEqual(400);
      expect(typeof e.dtoOut.uuAppErrorMap["uu-subjectman-main/topic/create/materialDoesNotExist"]).toEqual("object");
      expect(e.dtoOut.materialId).toEqual(["61cdb8bd034adea62542c3f9", "61cdb8c6fb534af06a755663"]);
    }
    });
  });