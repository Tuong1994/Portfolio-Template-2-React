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

const widthSpan = 100;

interface HorizontalProps {
  children?: any;
  timer?: number;
  autoSlide?: boolean;
  infinite?: boolean;
  stopOnManual?: boolean;
  containerClass?: string;
  prevBtnClass?: string;
  nextBtnClass?: string;
  prevBtnContent?: React.ReactNode | string;
  nextBtnContent?: React.ReactNode | string;
  sliderClass?: string;
  dotsContainerClass?: string;
  dotsClass?: string;
}

const Horizontal: React.FC<HorizontalProps> = (props) => {
  const {
    children,
    timer,
    autoSlide,
    infinite,
    stopOnManual,
    containerClass,
    prevBtnClass,
    nextBtnClass,
    prevBtnContent,
    nextBtnContent,
    sliderClass,
    dotsContainerClass,
    dotsClass,
  } = props;

  let interval: any;

  const [sliderPos, setSliderPos] = React.useState<number>(0);

  const [touchPosStart, setTouchPosStart] = React.useState<number>(0);
  const [touchPosEnd, setTouchPosEnd] = React.useState<number>(0);
  const [isTouched, setIsTouched] = React.useState<boolean>(false);
  const [isTouchSwiped, setIsTouchSwiped] = React.useState<boolean>(false);

  const [mousePosStart, setMousePosStart] = React.useState<number>(0);
  const [mousePosEnd, setMousePosEnd] = React.useState<number>(0);
  const [isClicked, setIsClicked] = React.useState<boolean>(false);
  const [isMouseSwiped, setIsMouseSwiped] = React.useState<boolean>(false);

  const [auto, setAuto] = React.useState<boolean>(timer !== undefined);

  React.useEffect(() => {
    if (autoSlide) {
      if (auto || !isTouched || !isClicked) {
        interval = setInterval(() => {
          nextSlideHandler();
        }, timer || 3000);
      }
    }
    return () => clearInterval(interval);
  });

  const displayItem = () => {
    if (children) {
      return React.Children.map(children, (child, index) => {
        return (
          <div className="slider__item" id={`sliderItem-${index}`}>
            {child}
          </div>
        );
      });
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

  const displayDots = () => {
    if (children) {
      return React.Children.map(children, (child, index) => {
        return (
          <div
            className={`dots__item ${dotsClass ? dotsClass : ""} ${
              sliderPos === index ? "dots__item--active" : ""
            }`}
            onClick={() => jumpToSlide(index)}
          ></div>
        );
      });
    } else {
      return defaultItems.map((i, index) => (
        <div
          key={i.id}
          className={`dots__item ${dotsClass ? dotsClass : ""} ${
            sliderPos === index ? "dots__item--active" : ""
          }`}
          onClick={() => jumpToSlide(index)}
        ></div>
      ));
    }
  };

  const translateFullSlide = (newPos: number) => {
    const toTranslate = -widthSpan * newPos;
    if (children) {
      for (let i = 0; i < children.length; i++) {
        const el = document.getElementById(`sliderItem-${i}`);
        if (el) {
          el.style.transform = `translateX(${toTranslate}%)`;
        } else return;
      }
    } else {
      for (let i = 0; i < defaultItems.length; i++) {
        const el = document.getElementById(`sliderItem-${i}`);
        if (el) {
          el.style.transform = `translateX(${toTranslate}%)`;
        } else return;
      }
    }
  };

  const translatePortialSlide = (toTranslate: number) => {
    const currentTranslate = -sliderPos * widthSpan;
    const fullTranslate = currentTranslate + toTranslate;
    if (children) {
      for (let i = 0; i < children.length; i++) {
        const el = document.getElementById(`sliderItem-${i}`);
        if (el) {
          el.style.transform = `translateX(${fullTranslate}%)`;
        } else return;
      }
    } else {
      for (let i = 0; i < defaultItems.length; i++) {
        const el = document.getElementById(`sliderItem-${i}`);
        if (el) {
          el.style.transform = `translateX(${fullTranslate}%)`;
        } else return;
      }
    }
  };

  const prevSlideHandler = () => {
    let newPos = sliderPos;
    if (children) {
      if (newPos > 0) newPos = newPos - 1;
      else if (infinite) newPos = children.length - 1 || 0;
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

  const onPrev = () => {
    manageTimer();
    prevSlideHandler();
  };

  const onNext = () => {
    manageTimer();
    nextSlideHandler();
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

  const manageTimer = () => {
    clearInterval(interval);
    if (stopOnManual) {
      setAuto(false);
    }
  };

  const onTouchStart = (e: any) => {
    manageTimer();
    speedUpAnimation();
    setTouchPosEnd(e.targetTouches[0].clientX);
    setTouchPosStart(e.targetTouches[0].clientX);
    setIsTouched(true);
  };
  const onTouchMove = (e: any) => {
    setTouchPosEnd(e.targetTouches[0].clientX);
    const frameWidth = document.getElementById("containerSlider")?.offsetWidth;
    if (isTouched) {
      if (frameWidth) {
        const translateDist =
          ((touchPosEnd - touchPosStart) / frameWidth) * 100;
        translatePortialSlide(translateDist);
        setIsTouchSwiped(true);
      } else return;
    }
  };
  const onTouchEnd = (e: any) => {
    if (isTouchSwiped) {
      slowDownAnimation();
      if (touchPosEnd - touchPosStart > 75) {
        prevSlideHandler();
      } else if (touchPosEnd - touchPosStart < -75) {
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
    manageTimer();
    speedUpAnimation();
    setMousePosEnd(e.clientX);
    setMousePosStart(e.clientX);
    setIsClicked(true);
  };

  const onMouseMove = (e: any) => {
    e.preventDefault();
    const frameWidth = document.getElementById("containerSlider")?.offsetWidth;
    if (isClicked) {
      if (frameWidth) {
        setMousePosEnd(e.clientX);
        const translateDist =
          ((mousePosEnd - mousePosStart) / frameWidth) * 100;
        translatePortialSlide(translateDist);
        setIsMouseSwiped(true);
      } else return;
    }
  };

  const onMouseEnd = (e: any) => {
    if (isMouseSwiped) {
      slowDownAnimation();
      if (mousePosEnd - mousePosStart > 100) {
        prevSlideHandler();
      } else if (mousePosEnd - mousePosStart < -100) {
        nextSlideHandler();
      } else {
        jumpToSlide(sliderPos);
      }
    }
    setIsMouseSwiped(false);
    setIsClicked(false);
  };

  return (
    <div className={`horizontal ${containerClass ? containerClass : ""}`}>
      <div className="horizontal__container">
        <button
          type="button"
          className={`container__prev ${prevBtnClass ? prevBtnClass : ""}`}
          onClick={onPrev}
        >
          {(() => {
            if (prevBtnContent) return prevBtnContent;
            else return <i className="fa-solid fa-angle-left"></i>;
          })()}
        </button>

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
          {displayItem()}
        </div>

        <button
          type="button"
          className={`container__next ${nextBtnClass ? nextBtnClass : ""}`}
          onClick={onNext}
        >
          {(() => {
            if (nextBtnContent) return nextBtnContent;
            else return <i className="fa-solid fa-angle-right"></i>;
          })()}
        </button>
      </div>

      <div
        className={`horizontal__dots ${
          dotsContainerClass ? dotsContainerClass : ""
        }`}
      >
        {displayDots()}
      </div>
    </div>
  );
};

export default Horizontal;
