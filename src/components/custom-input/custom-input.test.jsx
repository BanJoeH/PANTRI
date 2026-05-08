import { render } from "@testing-library/react";
import CustomInput from "./custom-input.component";

describe("customInput", () => {
  it("renders without crashing", () => {
    render(<CustomInput />);
  });
});
