//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useState, useRef,useLsiValues  } from "uu5g04-hooks";
import SubjectProvider from "../bricks/subject/subject-provider.js";
import "uu_plus4u5g01-bricks";

import Config from "./config/config.js";
import RouteWrapper from "../bricks/route-wrapper/route-wrapper.js";
import ControlBar from "../bricks/control-bar/control-bar.js";
import SubjectList from "../bricks/subject/subject-list.js";
import homeLsi from "./home-lsi.js";
import ConfirmationModal from "../bricks/confirmation-modal/confirmation-modal.js";
import SubjectForm from "../bricks/subject-form/subject-form.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Home",
  //@@viewOff:statics
};

const TIMER_DURATION = 2000;

export const Home = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    //@viewOn:hooks
    const lsi = useLsiValues(homeLsi);
    const createSubjectRef = useRef();
    const updateSubjectRef = useRef();
    const deleteSubjectRef = useRef();
    const modalRef = useRef();
    const alertRef = useRef();
    const [groupByStudyProgramme, setGroupByStudyProgramme] = useState(false);
    const [sortBy, setSortBy] = useState("name");
    //@viewOff:hooks


    //@@viewOn:private
    const _onChangeGroupByStudyProgramme = ({ value }) => {
      setGroupByStudyProgramme(value);
    }
    const _onChangeSortBy = (value) => {
      setSortBy(value);
    }

    async function _handleCreateSubject(subject) {
      alertRef.current.setAlert({ content: <UU5.Bricks.Loading /> });
      modalRef.current.close();
      try {
        await createSubjectRef.current(subject);
        alertRef.current.setAlert({ content: lsi.createSubjectSuccessfullAlert, closeTimer: TIMER_DURATION });
      } catch (e) {
        console.log("error12",e, e&& e.data, e&&e.dtoOut);
        if(e && e.dtoOut && e.dtoOut && e.dtoOut.uuAppErrorMap["uu-subjectman-main/subject/create/subjectDoesExist"]){
          alertRef.current.setAlert({ content: lsi.createSubjectCodeExistsAlert, closeTimer: TIMER_DURATION });
        }else{
        alertRef.current.setAlert({ content: lsi.createSubjectUnsuccessfullAlert, closeTimer: TIMER_DURATION });
        }
      }
    }

    async function _onConfirmDelete(subjectId) {
      modalRef.current.open({
        header: lsi.deleteSubjectHeader,
        content: <ConfirmationModal onClose={modalRef.current.close} onSave={() => onDelete({id: subjectId})} text={lsi.deleteSubjectText}/>,
      });
    }


    const onDelete = async (dtoIn) => {
      alertRef.current.setAlert({ content: <UU5.Bricks.Loading /> });
      modalRef.current.close();
      try{
        await deleteSubjectRef.current(dtoIn);
        alertRef.current.setAlert({ content: lsi.removeSubjectSuccessfullAlert, closeTimer: TIMER_DURATION });
      }catch(e){
        alertRef.current.setAlert({ content: lsi.removeSubjectUnsuccessfullAlert, closeTimer: TIMER_DURATION});
      }
    };

    async function _handleUpdateSubject(subject) {
      alertRef.current.setAlert({ content: <UU5.Bricks.Loading /> });
      modalRef.current.close();
      try {
        await updateSubjectRef.current(subject);
        alertRef.current.setAlert({ content: lsi.updateSubjectHeader, closeTimer: TIMER_DURATION });
      } catch (e) {
        alertRef.current.setAlert({ content: lsi.updateSubjectHeader, closeTimer: TIMER_DURATION });
      }
    }

    async function _onUpdate(subject) {
      modalRef.current.open({
        header: lsi.updateSubjectHeader,
        content: <SubjectForm onCancel={modalRef.current.close} onSave={(updatedData)=>_handleUpdateSubject({...updatedData, id: subject.id})} subject={subject}/>,
      });
    }
    //@@viewOff:private

    //@@viewOn:render
    return (
      <RouteWrapper>
        <UU5.Bricks.AlertBus ref_={alertRef} />
        <UU5.Bricks.Modal ref_={modalRef} />
        <ControlBar onGroupByStudyProgrammeChange={_onChangeGroupByStudyProgramme} groupByStudyProgramme={groupByStudyProgramme} onSortByChange={_onChangeSortBy} onCreateSubject={_handleCreateSubject} modalRef={modalRef} />
        <SubjectProvider groupByStudyProgramme={groupByStudyProgramme} sortBy={sortBy}>
          {({ state, data, errorData, pendingData, handlerMap }) => {
            createSubjectRef.current = handlerMap.subjectCreate;
            deleteSubjectRef.current = handlerMap.subjectDelete;
            updateSubjectRef.current = handlerMap.subjectUpdate;
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
                return <SubjectList subjects={data} subjectDelete={handlerMap.subjectDelete} onUpdate={_onUpdate} modalRef={modalRef} onDelete={_onConfirmDelete} />
            }
          }}
        </SubjectProvider>
      </RouteWrapper>
    );
    //@@viewOff:render
  },
});

export default Home;
