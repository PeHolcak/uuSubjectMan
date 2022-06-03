import Config from "../config/config";

const buttonRow = () => Config.Css.css`
  display: flex;
  justify-content: flex-end;
  > * {
      margin: 0px 5px;
  }
`;

export default {
    buttonRow
};
