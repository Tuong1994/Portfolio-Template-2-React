import React from "react";
import * as Components from "../../Components";
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
        <div className="content__detail">
          <h2 className="detail__title">
            {langs?.home.title} <strong>TƯỜNG</strong>
          </h2>
          <Components.TypingText
            textClass="detail__typing-text"
            textList={
              [langs?.typingText.text_1, langs?.typingText.text_2] as string[]
            }
          />
          <p className="detail__paragraph">{langs?.home.content}</p>
          <a
            href="/files/Nhâm Bổn Tường - Front End Web Developer ( English ).pdf"
            download="CV - Nhâm Bổn Tường"
            className="detail__download"
          >
            <span>{langs?.button.download} CV</span>
            <i className="fa-solid fa-cloud-arrow-down"></i>
          </a>
        </div>

        <div className="content__image">
          <img className="image" src="/images/avatar.jpg" alt="avatar" />
        </div>
      </div>
    </div>
  );
};

export default Intro;
