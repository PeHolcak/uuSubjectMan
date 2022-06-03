import Config from "../config/config";

const cardHeader = () => Config.Css.css`
  padding: 0px;
  background-color: background-color:rgba(255,0,0,0);;
  margin: 0px;
`;

const card = (param) => Config.Css.css`
${console.log("param", param)}
  background-color: ${param === "bc" ? "#515FFF" : (param === "mgr") ? "#FFA161" : param === "phd" ? "#F5EA89" : "none"};
  padding: 10px;
  border-radius: 8px;
  border: 2px solid grey;
  transition-duration: 1s;
  cursor: pointer;
  &: hover{
    background-color: white;
  }
`;

const cardNavbar = () => Config.Css.css`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px dashed grey;
`;

const degreeOfStudyWrapper = () => Config.Css.css`
  flex-grow: 1;
  display: flex;
  align-items: center;
`;

export default {
  card,
  cardHeader,
  cardNavbar,
  degreeOfStudyWrapper
};
