/* eslint-disable */
const materialDeleteDtoInType = shape({
  id: id().isRequired()
});

const materialCreateDtoInType = shape({
  code: string().isRequired(),
  name: string(5, 25).isRequired(),
  description: string(4000),
  url: string(50),
  date: date()
});

const materialListDtoInType = shape({
  sortBy: array(oneOf(["name", "author"])),
  order: array(oneOf(["asc", "desc"])),
  groupByTopic: oneOf([false, true]),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer()
  })
});