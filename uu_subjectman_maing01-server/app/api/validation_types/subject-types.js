/* eslint-disable */
const subjectCreateDtoInType = shape({
  code: string().isRequired(),
  name: string(200).isRequired(),
  desc: string(500),
  credits: number().isRequired(),
  supervisor: string(200).isRequired(),
  goal: string(200).isRequired(),
  organization: string(200),
  topicIdList: array(id()),
  materialIdList: array(id()),
  language: oneOf(["CZ", "EN"]).isRequired(),
  degreeOfStudy: oneOf(["bc", "mgr", "phd"]).isRequired(),
  formOfStudy: oneOf(["obligatory", "selective", "obligatory-selective"]).isRequired(),
});

const subjectDeleteDtoInType = shape({
  id: id().isRequired()
});

const subjectGetDtoInType = shape({
  id: id().isRequired()
});

const subjectUpdateDtoInType = shape({
  id: id().isRequired(),
  code: string(),
  name: string(200),
  desc: string(500),
  credits: number(),
  supervisor: string(200),
  goal: string(200),
  organization: string(200),
  topicIdList: array(id()),
  materialIdList: array(id()),
  language: oneOf(["CZ", "EN"]),
  degreeOfStudy: oneOf(["bc", "mgr", "phd"]),
  formOfStudy: oneOf(["obligatory", "selective", "obligatory-selective"])
});

const subjectListDtoInType = shape({
  sortBy: oneOf(["name", "code"]),
  order: oneOf(["asc", "desc"]),
  groupByStudyProgramme: string(5),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer(),
  })
});