import React from "react";
import { useSelector } from "react-redux";
import { ReducerState } from "../../Redux/store";
import utils from "../../Utils";

interface IntroProps {}

const Intro: React.FC<IntroProps> = (props) => {
  const lang = useSelector((state: ReducerState) => state.langs);

  const langs = utils.changeLang(lang);

  return (
    <div className="intro">
      <div className="intro__content">
        
      </div>
    </div>
  );
};

export default Intro;
