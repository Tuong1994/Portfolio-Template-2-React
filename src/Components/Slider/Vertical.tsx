import React from "react";

const defaultItems = [
  {
    id: 1,
    name: "Slide 1",
    background: "#ed3777",
  },
  {
    id: 2,
    name: "Slide 2",
    background: "#df4c2f",
  },
  {
    id: 3,
    name: "Slide 3",
    background: "#c233ed",
  },
];

const heightSpan = 100;

interface VerticalProps {
  children?: any;
  infinite?: boolean;
  containerClass?: string;
  prevBtnClass?: string;
  nextBtnClass?: string;
  prevBtnContent?: React.ReactNode | string;
  nextBtnContent?: React.ReactNode | string;
  sliderClass?: string;
  menuContainerClass?: string;
  menuClass?: string;
}

const Vertical: React.FC<VerticalProps> = (props) => {
  const {
    children,
    infinite,
    containerClass,
    prevBtnClass,
    nextBtnClass,
    prevBtnContent,
    nextBtnContent,
    sliderClass,
    menuContainerClass,
    menuClass,
  } = props;

  const [sliderPos, setSliderPos] = React.useState<number>(0);

  const [touchStartPos, setTouchStartPos] = React.useState<number>(0);
  const [touchEndPos, setTouchEndPos] = React.useState<number>(0);
  const [isTouched, setIsTouched] = React.useState<boolean>(false);
  const [isTouchSwiped, setIsTouchSwiped] = React.useState<boolean>(false);

  const [mouseStartPos, setMouseStartPos] = React.useState<number>(0);
  const [mouseEndPos, setMouseEndPos] = React.useState<number>(0);
  const [isClicked, setIsClicked] = React.useState<boolean>(false);
  const [isMouseSwiped, setIsMouseSwiped] = React.useState<boolean>(false);

  const displayItems = () => {
    if (children) {
      return React.Children.map(children, (child, index) => (
        <div className="slider__item" id={`sliderItem-${index}`}>
          {child}
        </div>
      ));
    } else {
      return defaultItems.map((i, index) => (
        <div
          key={i.id}
          className="slider__item"
          id={`sliderItem-${index}`}
          style={{ background: i.background }}
        >
          <p>{i.name}</p>
        </div>
      ));
    }
  };

  const displayMenu = () => {
    if (children) {
      return React.Children.map(children, (child, index) => (
        <div
          className={`menu__item ${menuClass ? menuClass : ""} ${
            sliderPos === index ? "menu__item--active" : ""
          }`}
          onClick={() => jumpToSlide(index)}
        ></div>
      ));
    } else {
      return defaultItems.map((i, index) => (
        <div
          key={i.id}
          className={`menu__item ${menuClass ? menuClass : ""} ${
            sliderPos === index ? "menu__item--active" : ""
          }`}
          onClick={() => jumpToSlide(index)}
        ></div>
      ));
    }
  };

  const translateFullSlide = (newPos: number) => {
    const toTranslate = -heightSpan * newPos;
    if (children) {
      for (let i = 0; i < children.length; i++) {
        const el = document.getElementById(`sliderItem-${i}`);
        if (el) {
          el.style.transform = `translateY(${toTranslate}%)`;
        } else return;
      }
    } else {
      for (let i = 0; i < defaultItems.length; i++) {
        const el = document.getElementById(`sliderItem-${i}`);
        if (el) {
          el.style.transform = `translateY(${toTranslate}%)`;
        } else return;
      }
    }
  };

  const translatePortialSlide = (toTranslate: number) => {
    const currentTranslate = -sliderPos * heightSpan;
    const fullTranslate = currentTranslate + toTranslate;
    if (children) {
      for (let i = 0; i < children.length; i++) {
        const el = document.getElementById(`sliderItem-${i}`);
        if (el) {
          el.style.transform = `translateY(${fullTranslate}%)`;
        } else return;
      }
    } else {
      for (let i = 0; i < defaultItems.length; i++) {
        const el = document.getElementById(`sliderItem-${i}`);
        if (el) {
          el.style.transform = `translateY(${fullTranslate}%)`;
        } else return;
      }
    }
  };

  const prevSlideHandler = () => {
    let newPos = sliderPos;
    if (children) {
      if (newPos > 0) newPos = newPos - 1;
      else if (infinite) newPos = children.length - 1;
    } else {
      if (newPos > 0) newPos = newPos - 1;
      else if (infinite) newPos = defaultItems.length - 1;
    }
    translateFullSlide(newPos);
    setSliderPos(newPos);
  };

  const nextSlideHandler = () => {
    let newPos = sliderPos;
    if (children) {
      if (newPos < children.length - 1) newPos = newPos + 1;
      else if (infinite) newPos = 0;
    } else {
      if (newPos < defaultItems.length - 1) newPos = newPos + 1;
      else if (infinite) newPos = 0;
    }
    translateFullSlide(newPos);
    setSliderPos(newPos);
  };

  const jumpToSlide = (pos: number) => {
    translateFullSlide(pos);
    setSliderPos(pos);
  };

  const speedUpAnimation = () => {
    if (children) {
      for (
        let i = Math.max(0, sliderPos - 2);
        i < Math.min(children.length, sliderPos + 3);
        i++
      ) {
        const el = document.getElementById(`sliderItem-${i}`);
        if (el) {
          el.classList.add("slider__item--fast");
        } else return;
      }
    } else {
      for (
        let i = Math.max(0, sliderPos - 2);
        i < Math.min(defaultItems.length, sliderPos + 3);
        i++
      ) {
        const el = document.getElementById(`sliderItem-${i}`);
        if (el) {
          el.classList.add("slider__item--fast");
        } else return;
      }
    }
  };

  const slowDownAnimation = () => {
    if (children) {
      for (
        let i = Math.max(0, sliderPos - 2);
        i < Math.min(children.length, sliderPos + 3);
        i++
      ) {
        const el = document.getElementById(`sliderItem-${i}`);
        if (el) {
          el.classList.remove("slider__item--fast");
        } else return;
      }
    } else {
      for (
        let i = Math.max(0, sliderPos - 2);
        i < Math.min(defaultItems.length, sliderPos + 3);
        i++
      ) {
        const el = document.getElementById(`sliderItem-${i}`);
        if (el) {
          el.classList.remove("slider__item--fast");
        } else return;
      }
    }
  };

  const onPrev = () => {
    prevSlideHandler();
  };

  const onNext = () => {
    nextSlideHandler();
  };

  const onTouchStart = (e: any) => {
    speedUpAnimation();
    setTouchEndPos(e.targetTouches[0].clientY);
    setTouchStartPos(e.targetTouches[0].clientY);
    setIsTouched(true);
  };

  const onTouchMove = (e: any) => {
    setTouchEndPos(e.targetTouches[0].clientY);
    const frameHeight =
      document.getElementById("containerSlider")?.offsetHeight;
    if (isTouched) {
      if (frameHeight) {
        const translateDist =
          ((touchEndPos - touchStartPos) / frameHeight) * 100;
        translatePortialSlide(translateDist);
        setIsTouchSwiped(true);
      } else return;
    }
  };

  const onTouchEnd = (e: any) => {
    if (isTouchSwiped) {
      slowDownAnimation();
      if (touchEndPos - touchStartPos > 75) {
        prevSlideHandler();
      } else if (touchEndPos - touchStartPos < -75) {
        nextSlideHandler();
      } else {
        jumpToSlide(sliderPos);
      }
    }
    setIsTouchSwiped(false);
    setIsTouched(false);
  };

  const onMouseStart = (e: any) => {
    e.preventDefault();
    speedUpAnimation();
    setMouseEndPos(e.clientY);
    setMouseStartPos(e.clientY);
    setIsClicked(true);
  };

  const onMouseMove = (e: any) => {
    e.preventDefault();
    const frameHeight =
      document.getElementById("containerSlider")?.offsetHeight;
    if (isClicked) {
      if (frameHeight) {
        setMouseEndPos(e.clientY);
        const translateDist =
          ((mouseEndPos - mouseStartPos) / frameHeight) * 100;
        translatePortialSlide(translateDist);
        setIsMouseSwiped(true);
      }
    }
  };

  const onMouseEnd = (e: any) => {
    if (isMouseSwiped) {
      slowDownAnimation();
      if (mouseEndPos - mouseStartPos > 100) {
        prevSlideHandler();
      } else if (mouseEndPos - mouseStartPos < -100) {
        nextSlideHandler();
      } else {
        jumpToSlide(sliderPos);
      }
    }
    setIsMouseSwiped(false);
    setIsClicked(false);
  };

  return (
    <div className={`vertical ${containerClass ? containerClass : ""}`}>
      <div className="vertical__container">
        <div
          className={`container__menu ${
            menuContainerClass ? menuContainerClass : ""
          }`}
        >
          {displayMenu()}
        </div>

        <div
          id="containerSlider"
          className={`container__slider ${sliderClass ? sliderClass : ""}`}
          onTouchStart={(e) => onTouchStart(e)}
          onTouchMove={(e) => onTouchMove(e)}
          onTouchEnd={(e) => onTouchEnd(e)}
          onMouseDown={(e) => onMouseStart(e)}
          onMouseMove={(e) => onMouseMove(e)}
          onMouseUp={(e) => onMouseEnd(e)}
          onMouseLeave={(e) => onMouseEnd(e)}
        >
          {displayItems()}
        </div>

        <div className="container__navigation">
          <button
            className={`navigation__prev ${prevBtnClass ? prevBtnClass : ""}`}
            onClick={onPrev}
          >
            {(() => {
              if (prevBtnContent) return prevBtnContent;
              else return <i className="fa-solid fa-angle-up"></i>;
            })()}
          </button>
          <button
            className={`navigation__next ${nextBtnClass ? nextBtnClass : ""}`}
            onClick={onNext}
          >
            {(() => {
              if (nextBtnContent) return nextBtnContent;
              else return <i className="fa-solid fa-angle-down"></i>;
            })()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Vertical;
