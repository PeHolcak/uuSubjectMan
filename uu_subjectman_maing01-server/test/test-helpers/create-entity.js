const createNewSubject = async (TestHelper, customDtoIn, expandingDtoIn = {}) => {
    const createdDtoIn = {
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
      formOfStudy: "obligatory",
    };
  
    return await TestHelper.executePostCommand("subject/create",customDtoIn ? {...customDtoIn, ...expandingDtoIn} : {...createdDtoIn, ...expandingDtoIn});
  }

  const createNewTopic = async (TestHelper, customDtoIn, expandingDtoIn = {}) => {
    const createdDtoIn = {
      "name": "Algebra",
      "materialIdList": []
    };
    return await TestHelper.executePostCommand("topic/create", customDtoIn ? {...customDtoIn, ...expandingDtoIn} : {...createdDtoIn, ...expandingDtoIn});
  }

  module.exports = {createNewSubject, createNewTopic};