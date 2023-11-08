import PathToNextTalent from "components/PathToNextTalent";
import TalentIcon from "components/TalentIcon";
import React, { useState } from "react";
import "./TalentCalculator.css";
import { talentSchema } from "./utils";

type LastSelected = {
  talentIndex: number;
  talentRowIndex: number;
};

const TalentCalculator = () => {
  const [lastSelected, setLastSelected] = useState<LastSelected[]>(talentSchema.map((t, i) => ({ talentIndex: -1, talentRowIndex: i })));
  const [talentPoints, setTalentPoints] = useState(0);

  const handleClick = (talentIndex: number, talentRowIndex: number) => {
    // we should avoid hijacking right-clicks as mobile devices don't have them
    const isNextTalent = talentIndex === lastSelected[talentRowIndex].talentIndex + 1;  
    if (lastSelected[talentRowIndex].talentIndex === talentIndex) {
      const tempLastSelected = [...lastSelected];
      tempLastSelected[talentRowIndex].talentIndex = lastSelected[talentRowIndex].talentIndex - 1;
      setLastSelected(tempLastSelected);
      setTalentPoints(talentPoints - 1);
    } else if (lastSelected[talentRowIndex].talentIndex < talentIndex && talentPoints < 6 && isNextTalent) {
      const tempLastSelected = [...lastSelected];
      tempLastSelected[talentRowIndex].talentIndex = lastSelected[talentRowIndex].talentIndex + 1;
      setLastSelected(tempLastSelected);
      setTalentPoints(talentPoints + 1);
    }
  };

  return (
    <div className='component-wrapper'>
      <header>
        <h1>TitanStar Legends - Rune Mastery Loadout Talent Calculator 9000</h1>
      </header>
      <main>
        <div className="talent-wrapper">
          <div className="talents">
            {talentSchema.map((talent, talentRowIndex) => (
              <div className="talent-path" key={talent.name}>
                <div className="talent-name">{talent.name.toLocaleUpperCase()}</div>
                <div className="talent-container">
                  {talent.talentIds.map((t, index) => (
                    <React.Fragment key={t}>
                      <TalentIcon
                        spriteColumn={t}
                        onClick={handleClick}
                        talentIndex={index}
                        talentRowIndex={talentRowIndex}
                        isActive={index <= lastSelected[talentRowIndex].talentIndex}
                        isEnabled={index === lastSelected[talentRowIndex].talentIndex + 1}
                        disabled={index > lastSelected[talentRowIndex].talentIndex + 1}
                      />
                      {index < talent.talentIds.length - 1 ? <PathToNextTalent isActive={index <= lastSelected[talentRowIndex].talentIndex} /> : null}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div data-testid="counter-container" className="counter-container">
            <div className="counter-talent-points">
              {talentPoints} / 6
            </div>
            <div className="counter-text">
              Points Spent
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TalentCalculator;