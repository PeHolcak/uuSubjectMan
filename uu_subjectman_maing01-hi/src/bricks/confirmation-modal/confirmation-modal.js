//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useLsiValues } from "uu5g04-hooks";
import Config from "../config/config.js";
import Lsi from "./confirmation-modal.lsi";
import Css from "./confirmation-modal.css";
//@@viewOff:imports

const STATICS = {
    //@@viewOn:statics
    displayName: Config.TAG + "ConfirmationModal",
    //@@viewOff:statics
};

export const ConfirmationModal = createVisualComponent({
    ...STATICS,

    //@@viewOn:propTypes
    propTypes: {
        text: UU5.PropTypes.string,
        onClose: UU5.PropTypes.func,
        onSave: UU5.PropTypes.func
    },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {
        text: "",
        onClose: ()=>{},
        onSave: () => {}
    },
    //@@viewOff:defaultProps

    render(props) {
            //@viewOn:hooks
    const lsi = useLsiValues(Lsi);
    //@viewOff:hooks 

        //@@viewOn:private
        let { icon, textPadding, children } = props;
        //@@viewOff:private

        //@@viewOn:interface
        //@@viewOff:interface

        //@@viewOn:render
        return (
            <UU5.Bricks.Div>
                <UU5.Bricks.Row>
                    <UU5.Bricks.Text>
                        {props.text}
                    </UU5.Bricks.Text>
                </UU5.Bricks.Row>
                <UU5.Bricks.Row className={Css.buttonRow()}>
                    <UU5.Bricks.Button onClick={props.onSave}>
                        {lsi.confirmButtonText}
                    </UU5.Bricks.Button>
                    <UU5.Bricks.Button onClick={props.onClose}>
                        {lsi.stornoButtonText}
                    </UU5.Bricks.Button>
                </UU5.Bricks.Row>
            </UU5.Bricks.Div>
        );
        //@@viewOff:render
    },
});

export default ConfirmationModal;
