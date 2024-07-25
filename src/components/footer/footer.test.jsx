import { shallow, render, mount } from "enzyme";
import toJson from "enzyme-to-json";
import Footer from "./footer";

describe("footer", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<Footer />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
