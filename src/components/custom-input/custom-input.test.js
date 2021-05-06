import { shallow } from "enzyme";
import CustomInput from "./custom-input.component";

describe("customInput", () => {
  it("renders without crashing", () => {
    shallow(<CustomInput />);
  });

  // it("renders CustomInput with label", () => {
  //   const wrapper = shallow(<CustomInput />);
  //   const customInput = (
  //     <div className="group">
  //       <input onChange={handleChange} {...otherProps} className="form-input" />
  //       {label ? (
  //         <label
  //           className={`${
  //             otherProps.value.length ? "shrink" : ""
  //           } form-input-label`}
  //         >
  //           {label}
  //         </label>
  //       ) : null}
  //     </div>
  //   );

  //   expect(wrapper.contains(customInput)).toEqual(true);
  // });
});
