import { ELangs } from "../Langs";
import { langENG } from "../Langs/ENG";
import { langVN } from "../Langs/VN";

const utils = {
  changeLang: (langs: number) => {
    if (langs === ELangs.Eng) return langENG;
    else if (langs === ELangs.Vn) return langVN;
  },
};

export default utils;
