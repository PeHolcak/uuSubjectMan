const { TestHelper } = require("uu_appg01_server-test");
beforeEach(async () => {
  await TestHelper.setup({ authEnabled: false, sysStatesEnabled: false });
});

afterEach(async () => {
  await TestHelper.teardown();
});

describe("subject/update uuCMD tests", () => {
  let dtoIn = {
    code: "s1dad",
    name: "Math",
    desc: "A math subject",
    credits: 9,
    supervisor: "John Johnson",
    goal: "Teach fundamentals of Math",
    organization: "Unicorn College",
    topicIdList: [],
    materialIdList: [],
    language: "EN",
    degreeOfStudy: "bc",
    formOfStudy: "obligatory"
  };

  test("HDS", async () => {
    await TestHelper.login("ExecutiveUser");
    let updatedDtoIn = {
      code: "s1dad-2",
      name: "Advanced math",
      desc: "A advanced math subject",
      credits: 12,
      supervisor: "Patrik Roberson",
      goal: "Teach advanced topics of Math",
      organization: "Unicorn College and University",
      topicIdList: [],
      materialIdList: [],
      language: "CZ",
      degreeOfStudy: "mgr",
      formOfStudy: "obligatory-selective"
    };
    let created = await TestHelper.executePostCommand("subject/create", dtoIn);
    let updated = await TestHelper.executePostCommand("subject/update", { ...updatedDtoIn, id: created.id });
    expect(updated.data.code).toEqual("s1dad-2");
    expect(updated.data.name).toEqual("Advanced math");
    expect(updated.data.desc).toEqual("A advanced math subject");
    expect(updated.data.credits).toEqual(12);
    expect(updated.data.supervisor).toEqual("Patrik Roberson");
    expect(updated.data.goal).toEqual("Teach advanced topics of Math");
    expect(updated.data.organization).toEqual("Unicorn College and University");
    expect(updated.data.topicIdList).toEqual([]);
    expect(updated.data.materialIdList).toEqual([]);
    expect(updated.data.language).toEqual("CZ");
    expect(updated.data.degreeOfStudy).toEqual("mgr");
    expect(updated.data.formOfStudy).toEqual("obligatory-selective");
  });

  test("2. - Validation of dtoIn.", async () => {
    await TestHelper.login("ExecutiveUser");
    try {
      await TestHelper.executePostCommand("subject/update", {});
    } catch (e) {
      expect(typeof e.dtoOut.uuAppErrorMap["uu-subjectman-main/subject/update/invalidDtoIn"]).toEqual("object");
      expect(e.status).toEqual(400);
    }
  });

  test("2.2. - Checks that no keys beyond the dtoInType are entered in dtoIn.", async () => {
    await TestHelper.login("ExecutiveUser");
    let updatedDtoIn = {
      code: "s1dad-2",
      name: "Advanced math",
      desc: "A advanced math subject",
      credits: 12,
      supervisor: "Patrik Roberson",
      goal: "Teach advanced topics of Math",
      organization: "Unicorn College and University",
      topicIdList: [],
      materialIdList: [],
      language: "CZ",
      degreeOfStudy: "mgr",
      formOfStudy: "obligatory-selective",
    };
    let created = await TestHelper.executePostCommand("subject/create", {...dtoIn, organization: "ČVUT"});
    let updated = await TestHelper.executePostCommand("subject/update", {
      ...updatedDtoIn,
      id: created.id,
      unSupported: 1,
    });
    expect(updated.data.code).toEqual("s1dad-2");
    expect(updated.data.name).toEqual("Advanced math");
    expect(updated.data.desc).toEqual("A advanced math subject");
    expect(updated.data.credits).toEqual(12);
    expect(updated.data.supervisor).toEqual("Patrik Roberson");
    expect(updated.data.goal).toEqual("Teach advanced topics of Math");
    expect(updated.data.organization).toEqual("Unicorn College and University");
    expect(updated.data.topicIdList).toEqual([]);
    expect(updated.data.materialIdList).toEqual([]);
    expect(updated.data.language).toEqual("CZ");
    expect(updated.data.degreeOfStudy).toEqual("mgr");
    expect(updated.data.formOfStudy).toEqual("obligatory-selective");
    });

  test("2.4. - Keys that are missing from dtoIn and require a default value (check the Default Values table), will be supplemented with the default value.", async () => {
    await TestHelper.login("ExecutiveUser");
    let updatedDtoIn = {
      code: "s1dad-2",
      name: "Advanced math",
      desc: "A advanced math subject",
      credits: 12,
      supervisor: "Patrik Roberson",
      goal: "Teach advanced topics of Math",
      topicIdList: [],
      materialIdList: [],
      language: "CZ",
      degreeOfStudy: "mgr",
      formOfStudy: "obligatory-selective"
    };
    let created = await TestHelper.executePostCommand("subject/create", dtoIn);
    let updated = await TestHelper.executePostCommand("subject/update", {
      ...updatedDtoIn,
      id: created.id
    });
    expect(updated.data.code).toEqual("s1dad-2");
    expect(updated.data.name).toEqual("Advanced math");
    expect(updated.data.desc).toEqual("A advanced math subject");
    expect(updated.data.credits).toEqual(12);
    expect(updated.data.supervisor).toEqual("Patrik Roberson");
    expect(updated.data.goal).toEqual("Teach advanced topics of Math");
    expect(updated.data.organization).toEqual("Unicorn College");
    expect(updated.data.topicIdList).toEqual([]);
    expect(updated.data.materialIdList).toEqual([]);
    expect(updated.data.language).toEqual("CZ");
    expect(updated.data.degreeOfStudy).toEqual("mgr");
    expect(updated.data.formOfStudy).toEqual("obligatory-selective");
    });

  test("3. - Checks if the subject with given Code doesn't exist.", async () => {
    try {
      await TestHelper.executePostCommand("subject/update", {...dtoIn, id: "61ce198df74a517d62617b5e"});
    } catch (e) {
      expect(e.status).toEqual(400);
      expect(typeof e.dtoOut.uuAppErrorMap["uu-subjectman-main/subject/update/subjectDoesExist"]).toEqual("object");
    }
  });

  test("4. - Checks if all topics exist.", async () => { 
    let updatedDtoIn = {
    code: "s1dad-2",
    name: "Advanced math",
    desc: "A advanced math subject",
    credits: 12,
    supervisor: "Patrik Roberson",
    goal: "Teach advanced topics of Math",
    organization: "Unicorn College and University",
    topicIdList: ["61cdb8bd034adea62542c3f9", "61cdb8c6fb534af06a755663"],
    materialIdList: [],
    language: "CZ",
    degreeOfStudy: "mgr",
    formOfStudy: "obligatory-selective",
  };
  let created = await TestHelper.executePostCommand("subject/create", dtoIn);
    try {
      await TestHelper.executePostCommand("subject/update", {
        ...updatedDtoIn,
        id: created.id
      });
    } catch (e) {
      expect(e.status).toEqual(400);
      expect(typeof e.dtoOut.uuAppErrorMap["uu-subjectman-main/subject/update/topicDoesNotExist"]).toEqual("object");
      expect(e.dtoOut.topicId).toEqual(["61cdb8bd034adea62542c3f9", "61cdb8c6fb534af06a755663"]);
    }
  });

  test("5. - Checks if all materials exist.", async () => {
    let updatedDtoIn = {
      code: "s1dad-2",
      name: "Advanced math",
      desc: "A advanced math subject",
      credits: 12,
      supervisor: "Patrik Roberson",
      goal: "Teach advanced topics of Math",
      organization: "Unicorn College and University",
      topicIdList: [],
      materialIdList: ["61cdb9eae0a3b49b23c3a3fc", "61cdb9f0262ec5dc0e4f9f10"],
      language: "CZ",
      degreeOfStudy: "mgr",
      formOfStudy: "obligatory-selective",
    };
    let created = await TestHelper.executePostCommand("subject/create", dtoIn);
    try {
      await TestHelper.executePostCommand("subject/update", {
        ...updatedDtoIn,
        id: created.id
      });
    } catch (e) {
      expect(e.status).toEqual(400);
      expect(typeof e.dtoOut.uuAppErrorMap["uu-subjectman-main/subject/update/materialDoesNotExist"]).toEqual("object");
      expect(e.dtoOut.materialId).toEqual(["61cdb9eae0a3b49b23c3a3fc", "61cdb9f0262ec5dc0e4f9f10"]);
    }
  });
});
