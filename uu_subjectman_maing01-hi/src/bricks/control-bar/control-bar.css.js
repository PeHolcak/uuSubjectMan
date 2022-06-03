import Config from "../config/config";

const menuColumn = () => Config.Css.css`
  display: flex;
  justify-content: flex-end;
`;

const controlBarCheckbox = () => Config.Css.css`
  margin: 0px !important;
`;

const checkboxColumn = () => Config.Css.css`
  display: flex;
  align-items: center;
`;

const controlBarWrapper = () => Config.Css.css`
  border-bottom: 2px solid grey;
  padding: 10px
`;

export default {
  menuColumn,
  controlBarCheckbox,
  checkboxColumn,
  controlBarWrapper
};
