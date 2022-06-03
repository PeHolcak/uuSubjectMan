import UU5 from "uu5g04";
import UuSubjectman from "uu_subjectman_maing01-hi";

const { shallow } = UU5.Test.Tools;

describe(`UuSubjectman.Routes.SubjectGet`, () => {
  it(`default props`, () => {
    const wrapper = shallow(<UuSubjectman.Routes.SubjectGet />);
    expect(wrapper).toMatchSnapshot();
  });
});
