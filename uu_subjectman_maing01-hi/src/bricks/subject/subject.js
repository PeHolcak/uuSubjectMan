//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useLsiValues } from "uu5g04-hooks";
import Calls from "calls";
import Config from "../config/config";
import subjectCss from "./subject.css";
import Lsi from "./subject.lsi";
//import Css from "./subject.css";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Subject",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const Subject = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    subject: UU5.PropTypes.shape({
      name: UU5.PropTypes.string.isRequired
    }),
    onDelete: UU5.PropTypes.func,
    onUpdate: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    subject: {},
    onDelete: () => {},
    onUpdate: () => {},
  },
  //@@viewOff:defaultProps

  render({ subject, onDelete, onUpdate }) {
    //@viewOn:hooks
    const lsi = useLsiValues(Lsi);
    //@viewOff:hooks

    //@@viewOn:private
    function handleDetail() {
      UU5.Environment.getRouter().setRoute("subject",{subjectId: subject.id});
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <UU5.Bricks.Card className={subjectCss.card(subject.degreeOfStudy)}>
        <UU5.Bricks.Row className={subjectCss.cardNavbar()}>
          <UU5.Bricks.Div className={subjectCss.degreeOfStudyWrapper()}>
            <UU5.Bricks.Text>{(subject.degreeOfStudy||"").toUpperCase()}</UU5.Bricks.Text>
          </UU5.Bricks.Div>
          <UU5.Bricks.Dropdown colorSchema="default" bgStyle="transparent" label="" size="l" iconClosed="mdi-dots-vertical" onClick={() => {}}>
              <UU5.Bricks.Dropdown.Item label={lsi.delete} value="delete" onClick={()=>onDelete(subject.id)} />
              <UU5.Bricks.Dropdown.Item label={lsi.update} value="update" onClick={()=>onUpdate(subject)} />
          </UU5.Bricks.Dropdown>
        </UU5.Bricks.Row>
        <UU5.Bricks.Row>
        <a onClick={handleDetail}>
        <UU5.Bricks.Header level="3" className={subjectCss.cardHeader()}>{subject.name}</UU5.Bricks.Header>
        <UU5.Bricks.Text>{subject.desc}</UU5.Bricks.Text>
        </a>
        </UU5.Bricks.Row>
      </UU5.Bricks.Card>
    );
    //@@viewOff:render
  },
});

export default Subject;
