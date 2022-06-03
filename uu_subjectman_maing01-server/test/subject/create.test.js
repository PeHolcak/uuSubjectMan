const { TestHelper } = require("uu_appg01_server-test");
beforeEach(async () => {
    await TestHelper.setup({ authEnabled: false, sysStatesEnabled: false });
  });
  
  afterEach(async () => {
    await TestHelper.teardown();
  });
  
  describe("subject/create uuCMD tests", () => {
    let dtoIn = {
      "code": "s1dad",
      "name": "Math",
      "desc": "A math subject",
      "credits": 9,
      "supervisor": "John Johnson",
      "goal": "Teach fundamentals of Math",
      "organization": "Unicorn College",
      "topicIdList": [],
      "materialIdList": [],
      "language": "EN",
      "degreeOfStudy": "bc",
      "formOfStudy": "obligatory"
  };

  test("HDS", async () => {
    await TestHelper.login("ExecutiveUser");
      let created = await TestHelper.executePostCommand("subject/create", dtoIn);
      expect(created.data.code).toEqual("s1dad");
      expect(created.data.name).toEqual("Math");
      expect(created.data.desc).toEqual("A math subject");
      expect(created.data.credits).toEqual(9);
      expect(created.data.supervisor).toEqual("John Johnson");
      expect(created.data.goal).toEqual("Teach fundamentals of Math");
      expect(created.data.organization).toEqual("Unicorn College");
      expect(created.data.topicIdList).toEqual([]);
      expect(created.data.materialIdList).toEqual([]);
      expect(created.data.language).toEqual("EN");
      expect(created.data.degreeOfStudy).toEqual("bc");
      expect(created.data.formOfStudy).toEqual("obligatory");
  });


  test("2. - Validation of dtoIn.", async () => {
    await TestHelper.login("ExecutiveUser");
    try {
      await TestHelper.executePostCommand("subject/create", {});
    } catch (e)
    {
      expect(typeof e.dtoOut.uuAppErrorMap["uu-subjectman-main/subject/create/invalidDtoIn"]).toEqual("object");
      expect(e.status).toEqual(400);
    }
  });

    test("2.2. - Checks that no keys beyond the dtoInType are entered in dtoIn.", async () => {
      await TestHelper.login("ExecutiveUser");
        let created = await TestHelper.executePostCommand("subject/create", {...dtoIn, unSupported: 1});
        expect(typeof created.data.uuAppErrorMap["uu-subjectman-main/subject/create/unsupportedKeys"]).toEqual("object");
        expect(created.data.code).toEqual("s1dad");
        expect(created.data.name).toEqual("Math");
        expect(created.data.desc).toEqual("A math subject");
        expect(created.data.credits).toEqual(9);
        expect(created.data.supervisor).toEqual("John Johnson");
        expect(created.data.goal).toEqual("Teach fundamentals of Math");
        expect(created.data.organization).toEqual("Unicorn College");
        expect(created.data.topicIdList).toEqual([]);
        expect(created.data.materialIdList).toEqual([]);
        expect(created.data.language).toEqual("EN");
        expect(created.data.degreeOfStudy).toEqual("bc");
        expect(created.data.formOfStudy).toEqual("obligatory");
    });

    test("2.4. - Keys that are missing from dtoIn and require a default value (check the Default Values table), will be supplemented with the default value.",
     async () => {
      await TestHelper.login("ExecutiveUser");
        let dtoInWidtoutOrganizationAttr = {...dtoIn};
        delete dtoInWidtoutOrganizationAttr.organization;
        let created = await TestHelper.executePostCommand("subject/create", {...dtoInWidtoutOrganizationAttr});
        expect(created.data.code).toEqual("s1dad");
        expect(created.data.name).toEqual("Math");
        expect(created.data.desc).toEqual("A math subject");
        expect(created.data.credits).toEqual(9);
        expect(created.data.supervisor).toEqual("John Johnson");
        expect(created.data.goal).toEqual("Teach fundamentals of Math");
        expect(created.data.organization).toEqual("Unicorn College");
        expect(created.data.topicIdList).toEqual([]);
        expect(created.data.materialIdList).toEqual([]);
        expect(created.data.language).toEqual("EN");
        expect(created.data.degreeOfStudy).toEqual("bc");
        expect(created.data.formOfStudy).toEqual("obligatory");
    });

    test("3.2. - Subject does exist", async () => {
      try {
        await TestHelper.executePostCommand("subject/create", dtoIn);
        await TestHelper.executePostCommand("subject/create", dtoIn);
    } catch (e) {
      expect(e.status).toEqual(400);
      expect(typeof e.dtoOut.uuAppErrorMap["uu-subjectman-main/subject/create/subjectDoesExist"]).toEqual("object");
    }
    });

    test("4. - Checks if all topics exist.", async () => {
      try {
        await TestHelper.executePostCommand("subject/create", {...dtoIn, topicIdList: ["61cdb8bd034adea62542c3f9", "61cdb8c6fb534af06a755663"]});
    } catch (e) {
      expect(e.status).toEqual(400);
      expect(typeof e.dtoOut.uuAppErrorMap["uu-subjectman-main/subject/create/topicDoesNotExist"]).toEqual("object");
      expect(e.dtoOut.topicId).toEqual(["61cdb8bd034adea62542c3f9", "61cdb8c6fb534af06a755663"]);
    }
    });

    test("5. - Checks if all materials exist.", async () => {
      try {
        await TestHelper.executePostCommand("subject/create", {...dtoIn, materialIdList: ["61cdb9eae0a3b49b23c3a3fc", "61cdb9f0262ec5dc0e4f9f10"]});
    } catch (e) {
        expect(e.status).toEqual(400);
        expect(typeof e.dtoOut.uuAppErrorMap["uu-subjectman-main/subject/create/materialDoesNotExist"]).toEqual("object");
        expect(e.dtoOut.materialId).toEqual(["61cdb9eae0a3b49b23c3a3fc", "61cdb9f0262ec5dc0e4f9f10"]);
    }
    });
  });