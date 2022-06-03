//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useEffect, useDataList } from "uu5g04-hooks";
import Calls from "calls";
import Config from "../config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectGetProvider",
  //@@viewOff:statics
};

export const SubjectGetProvider = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: { 
    subjectId: UU5.PropTypes.string
   },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: { },
  //@@viewOff:defaultProps

  render({ children, subjectId}) {
    //@viewOn:hooks
    let listDataValues = useDataList({
      initialDtoIn: {subjectId },
      handlerMap: {
        load: Calls.subjectGet
      },
    });

    let { state, data, newData, pendingData, errorData, handlerMap } = listDataValues ;
    
    
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

export default SubjectGetProvider;
