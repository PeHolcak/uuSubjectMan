//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useState, useRef } from "uu5g04-hooks";
import SubjectGetProvider from "../bricks/subject/subject-get-provider.js";
import "uu_plus4u5g01-bricks";

import Config from "./config/config.js";
import RouteWrapper from "../bricks/route-wrapper/route-wrapper.js";
import SubjectForm from "../bricks/subject-form/subject-form.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Subject",
  //@@viewOff:statics
};

export const Subject = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    //@viewOn:hooks
    const createSubjectRef = useRef();
    const modalRef = useRef();
    const alertRef = useRef();
    //@viewOff:hooks

    //@@viewOff:private

    //@@viewOn:render
    return (
      <RouteWrapper>
        <UU5.Bricks.AlertBus ref_={alertRef} />
        <UU5.Bricks.Modal ref_={modalRef} />
        <UU5.Bricks.Header>Deatil předmětu</UU5.Bricks.Header>
        <SubjectGetProvider subjectId={props.params.subjectId}>
          {({ state, data, errorData, pendingData, handlerMap }) => {
            createSubjectRef.current = handlerMap.subjectCreate;
            switch (state) {
              case "pending":
              case "pendingNoData":
                return <UU5.Bricks.Loading />
              case "error":
              case "errorNoData":
                return <UU5.Bricks.Error error={errorData.error} errorData={errorData.data} />
              case "itemPending":
              case "ready":
              case "readyNoData":
              default:
                return <SubjectForm isEdited={false} subject={(Array.isArray(data) && data[0] && data[0].data) ? data[0].data : {}} />
            }
          }}
        </SubjectGetProvider>
      </RouteWrapper>
    );
    //@@viewOff:render
  },
});

export default Subject;
