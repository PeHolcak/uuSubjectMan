//@@viewOn:imports
import UU5, { PropTypes } from "uu5g04";
import { createVisualComponent, useLsiValues, useState } from "uu5g04-hooks";
import Config from "../config/config";
import Css from "./control-bar.css.js";
import Lsi from "./control-bar-lsi.js";
import SubjectForm from "../subject-form/subject-form";
//@@viewOff:imports

export default createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "ControlBar",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onGroupByStudyProgrammeChange: PropTypes.func,
    onSortByChange: PropTypes.func,
    onCreateSubject: PropTypes.func,
    modalRef: UU5.PropTypes.any
  },
  //@@viewOff:propTypes

  render({ onGroupByStudyProgrammeChange, onSortByChange, groupByStudyProgramme, onCreateSubject, modalRef }) {
    //@viewOn:hooks
    const lsi = useLsiValues(Lsi);
    //@viewOff:hooks

    //@@viewOn:private
    const openForm = () => {
      modalRef.current.open({
        header: lsi.creatingNewSubject,
        content: <SubjectForm onCancel={modalRef.current.close} onSave={onCreateSubject}/>,
      });
    };
    //@@viewOff:private
    return (
      <UU5.Bricks.Row className={Css.controlBarWrapper()}>
        <UU5.Bricks.Column className={Css.checkboxColumn()} colWidth="x-12 s-4">
          <UU5.Forms.Checkbox
            label={lsi.groupBy}
            labelPosition="right"
            value={groupByStudyProgramme}
            size="m"
            onChange={onGroupByStudyProgrammeChange}
            className={Css.controlBarCheckbox()}
          />
        </UU5.Bricks.Column>
        <UU5.Bricks.Column colWidth="x-12 s-4">
          <UU5.Bricks.Dropdown label={lsi.sortBy} size="l">
            <UU5.Bricks.Dropdown.Item label={lsi.sortByName} value="name" onClick={()=>onSortByChange("name")} />
            <UU5.Bricks.Dropdown.Item label={lsi.sortByCode} value="code" onClick={()=>onSortByChange("code")} />
          </UU5.Bricks.Dropdown>
        </UU5.Bricks.Column>
        <UU5.Bricks.Column colWidth="x-12 s-4" className={Css.menuColumn()}>
          <UU5.Bricks.Dropdown label="" size="l" iconClosed="mdi-dots-vertical">
            <UU5.Bricks.Dropdown.Item label={lsi.createSubject} value="createSubject" onClick={openForm} />
            <UU5.Bricks.Dropdown.Item label={lsi.createTopic} value="createTopic" onClick={() => console.log(1000)} />
          </UU5.Bricks.Dropdown>
        </UU5.Bricks.Column>
      </UU5.Bricks.Row>
    );
    //@@viewOff:render
  },
});
