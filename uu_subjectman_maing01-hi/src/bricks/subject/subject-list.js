//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, PagingAutoLoad } from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import Subject from "./subject";
import Config from "../config/config";
import Css from "./subject-list.css";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectList",
  //@@viewOff:statics
};

export const SubjectList = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    subjects: UU5.PropTypes.array.isRequired,
    onUpdate: UU5.PropTypes.func,
    onDelete: UU5.PropTypes.func,
    modalRef: UU5.PropTypes.any
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    subjects: [],
    onUpdate: () => {},
    onDelete: () => {},
  },
  //@@viewOff:defaultProps

  render({ subjects, onLoad, onDelete, onUpdate }) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    if (subjects.length === 0) {
      return <UU5.Common.Error content="No subjects!" />;
    }

    return (
      <UU5.Bricks.Div className={Css.div()}>
        <Uu5Tiles.Grid
          data={subjects}
          tileHeight="auto"
          tileMinWidth={200}
          tileMaxWidth={400}
          tileSpacing={8}
          rowSpacing={8}
        >
          {(subject) => {
          return <Subject key={subject.data.data.code} subject={subject.data.data} onDelete={onDelete} onUpdate={onUpdate} />}}
        </Uu5Tiles.Grid>
      </UU5.Bricks.Div>
    );
    //@@viewOff:render
  },
});

export default SubjectList;
