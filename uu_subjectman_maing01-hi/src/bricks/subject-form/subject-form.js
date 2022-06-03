//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useLsiValues, useRef } from "uu5g04-hooks";
import Config from "../config/config";
import Lsi from "./subject-form.lsi";
import { getStringValueOrEmptyString } from "../form-helper";
//@@viewOff:imports

const ORGANIZATION = "Unicorn College";

const SubjectForm = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectForm",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    subject: UU5.PropTypes.shape({
      name: UU5.PropTypes.string,
      code: UU5.PropTypes.string,
      desc: UU5.PropTypes.string,
      credits: UU5.PropTypes.number,
      supervisor: UU5.PropTypes.string,
      goal: UU5.PropTypes.string,
      organization: UU5.PropTypes.string,
      topicIdList: UU5.PropTypes.array,
      materialIdList: UU5.PropTypes.array,
      language: UU5.PropTypes.string,
      degreeOfStudy: UU5.PropTypes.string,
      formOfStudy: UU5.PropTypes.string
    }),
    onSave: UU5.PropTypes.func,
    onCancel: UU5.PropTypes.func,
    isEdited: UU5.PropTypes.bool
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    subject: {},
    onSave: () => { },
    onCancel: () => { },
    isEdited: true
  },
  //@@viewOff:defaultProps

  render({ onSave, onCancel, subject, isEdited }) {
    //@@viewOn:hooks
    const lsi = useLsiValues(Lsi);
    const locationRef = useRef();
    //@@viewOn:hooks

    //@@viewOn:private
    const _onSave = ({ values }) => {
      locationRef.current.reset();
      onSave({ ...values, organization: ORGANIZATION });
    }
    //@@viewOff:private

    //@@viewOn:render

    return (
      <UU5.Forms.ContextSection
        level={4}
      >
        <UU5.Forms.ContextForm onSave={_onSave} onCancel={onCancel}>
          <UU5.Forms.Text readOnly={!isEdited} label={lsi.name} value={getStringValueOrEmptyString(subject.name)} name="name" inputAttrs={{ maxLength: 200 }} required />
          <UU5.Forms.Text readOnly={!isEdited} label={lsi.code} value={getStringValueOrEmptyString(subject.code)} name="code" inputAttrs={{ maxLength: 50 }} required />
          <UU5.Forms.Text readOnly={!isEdited} label={lsi.desc} value={getStringValueOrEmptyString(subject.desc)} name="desc" inputAttrs={{ maxLength: 500 }} />
          <UU5.Forms.Number label={lsi.credits} readOnly={!isEdited}
            value={getStringValueOrEmptyString(subject.credits)}
            min={0}
            name="credits" required />
          <UU5.Forms.Text readOnly={!isEdited} label={lsi.supervizor} value={getStringValueOrEmptyString(subject.supervisor)} name="supervisor" inputAttrs={{ maxLength: 200 }} required />
          <UU5.Forms.Text readOnly={!isEdited} label={lsi.goal} value={getStringValueOrEmptyString(subject.goal)} name="goal" inputAttrs={{ maxLength: 200 }} required />
          <UU5.Forms.Select readOnly={!isEdited}
            name="degreeOfStudy"
            value={subject.degreeOfStudy}
            label={lsi.degreeOfStudy}
            required
          >
            <UU5.Forms.Select.Option value="bc" content={lsi.bc} />
            <UU5.Forms.Select.Option value="mgr" content={lsi.mgr} />
            <UU5.Forms.Select.Option value="phd" content={lsi.phd} />
          </UU5.Forms.Select>

          <UU5.Forms.Select readOnly={!isEdited}
            ref_={locationRef}
            name="language"
            value={subject.language}
            label={lsi.language}
            required
          >
            <UU5.Forms.Select.Option value="CZ" content={lsi.cz} />
            <UU5.Forms.Select.Option value="EN" content={lsi.en} />
          </UU5.Forms.Select>

          <UU5.Forms.Select readOnly={!isEdited}

            name="formOfStudy"
            value={subject.formOfStudy}
            label={lsi.formOfStudy}
            required
          >
            <UU5.Forms.Select.Option value="obligatory" content={lsi.obligatory} />
            <UU5.Forms.Select.Option value="selective" content={lsi.selective} />
            <UU5.Forms.Select.Option value="obligatory-selective" content={lsi.obligatorySelective} />
          </UU5.Forms.Select>
          {isEdited && <UU5.Forms.ContextControls buttonSubmitProps={{ content: lsi.submitButtonText }} />}
        </UU5.Forms.ContextForm>
      </UU5.Forms.ContextSection>
    );
    //@@viewOff:render
  }
});

export default SubjectForm;
