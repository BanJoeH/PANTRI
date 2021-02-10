import { useState, useEffect } from "react";
import Button from "../../elements/Button/Button";

const OddBits = () => {
  const [oddBits, setOddBits] = useState([]);
  const [oddBit, setOddBit] = useState("");

  const addToOddBits = (event) => {
    event.preventDefault();
    debugger;
    setOddBits([oddBit, ...oddBits]);
    setOddBit("");
  };

  const addOddBitOnEnter = (event) => {
    if (event.key === "Enter") {
      setOddBits([oddBit, ...oddBits]);
      setOddBit("");
    }
  };

  const removeOddBit = (event) => {
    event.preventDefault();
    let tempOddBits = oddBits.filter((item) => {
      if (item !== event.target.value) {
        return item;
      }
    });
    setOddBits(tempOddBits);
  };
  return (
    <article className="center mw6 br3 hidden ba b--black-10 mv4 ">
      <div className="bg-dark-gray w-100 ph3 pv1 flex justify-between items-center">
        <h2 className="white dib mr3">Odd Bits</h2>
      </div>
      <div className="pa3 bt b--black-10 flex">
        <form className="bn ph1 center w-80 ">
          <div className="center">
            <input
              name="oddBit"
              placeholder="Add your odd bits here"
              className={` ma1 pa1 input-reset center ba bg-transparent br2 hover-bg-light-gray w-50-ns w-100 `}
              onChange={(e) => setOddBit(e.target.value)}
              value={oddBit}
              //   onKeyDown={(e) => addOddBitOnEnter(e)}
            />
            <Button
              className="w-50-ns center w-100 "
              value="AddOddBit"
              inner="+"
              button={addToOddBits}
            />
          </div>
          {oddBits.map((oddBit) => {
            return (
              <div
                className="items-center mb1 bb b--light-silver flex justify-between"
                key={oddBit}
              >
                <div className="lh-copy">{oddBit}</div>
                <button
                  className="mr2 ba ph1  b--moon-gray gray br2  tc bg-white hover-bg-near-white pointer"
                  onClick={removeOddBit}
                  name={oddBit}
                  value={oddBit}
                >
                  X
                </button>
              </div>
            );
          })}
        </form>
      </div>
    </article>
  );
};

export default OddBits;
