//@@viewOn:imports
import UU5, { PropTypes } from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "../config/config";
import Css from "./route-wrapper.css.js";
//@@viewOff:imports

export default createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "RouteWrapper",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    // children: PropTypes.element
    children: PropTypes.any
  },
  //@@viewOff:propTypes

  render(props) {
    return (
      <UU5.Bricks.Container className={Css.container()}>
        {props.children}
      </UU5.Bricks.Container>
    );
    //@@viewOff:render
  }
});