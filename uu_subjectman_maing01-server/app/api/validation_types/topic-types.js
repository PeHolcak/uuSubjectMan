/* eslint-disable */
const topicCreateDtoInType = shape({
    name: string(200),
    materialIdList: array(id())
  });

  const topicDeleteDtoInType = shape({
    id: id().isRequired()
  });

  const topicGetDtoInType = shape({
    id: id().isRequired()
  });

  const topicListDtoInType = shape({
    sortByName: boolean(),
    order: oneOf(["asc", "desc"]),
    pageInfo: shape({
      pageIndex: integer(),
      pageSize: integer()
    })
  });

  const topicUpdateDtoInType = shape({
    id: id().isRequired(),
    name: string(200),
    materialIdList: array(id())
  });