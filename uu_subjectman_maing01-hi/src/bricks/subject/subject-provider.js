//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useEffect, useDataList } from "uu5g04-hooks";
import Calls from "calls";
import Config from "../config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectProvider",
  //@@viewOff:statics
};

export const SubjectProvider = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: { 
    groupByStudyProgramme: UU5.PropTypes.bool,
    sortBy: UU5.PropTypes.string
   },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: { },
  //@@viewOff:defaultProps

  render({ children, groupByStudyProgramme, sortBy }) {
    //@viewOn:hooks
    let listDataValues = useDataList({
      initialDtoIn: { groupByStudyProgramme, sortBy },
      pageSize: 50,
      handlerMap: {
        load: Calls.subjectList,
        subjectCreate: Calls.subjectCreate,
        subjectUpdate: Calls.subjectUpdate,
        subjectDelete: Calls.subjectDelete
      },
    });

    let { state, data, newData, pendingData, errorData, handlerMap } = listDataValues ;
    
    useEffect(() => {
      if (listDataValues.handlerMap.load) {
        listDataValues.handlerMap.load({ groupByStudyProgramme, sortBy });
      }
    }, [groupByStudyProgramme, sortBy]);
    
    //@viewOff:hooks

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return <>{children({
      state,
      data,
      newData,
      pendingData,
      errorData,
      handlerMap
    })}</>;
    //@@viewOff:render
  },
});

export default SubjectProvider;
