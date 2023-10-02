import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

const Slider = () => {
  const sliders = [
    {
      path_img: "/images/carlos-muza-hpjSkU2UYSU-unsplash.jpg",
    },
    {
      path_img: "/images/kelly-sikkema-xoU52jUVUXA-unsplash.jpg",
    },
    {
      path_img: "/images/scott-graham-5fNmWej4tAA-unsplash.jpg",
    },
  ];

  const [index, setIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = index === 0;
    const newIndex = isFirstSlide ? sliders.length - 1 : index - 1;
    setIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = index === sliders.length - 1;
    const newIndex = isLastSlide ? 0 : index + 1;
    setIndex(newIndex);
  };

  const gotoSlide = (slideIndex: number) => {
    setIndex(slideIndex);
  };

  return (
    <div className="w-[85%] bg-indigo-100 m-auto rounded-lg" >
      <div className="max-w-[1400px] h-[780px] w-full m-auto py-16 px-4 relative group">
        <div
          style={{
            backgroundImage: `url(${sliders[index].path_img})`, // Use url() here
            transition: "background-image 0.5s ease-in-out",
          }}
          className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
        ></div>
        <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hidden group-hover:block">
          <BsChevronCompactLeft onClick={prevSlide} size={30} />
        </div>
        <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hidden group-hover:block">
          <BsChevronCompactRight onClick={nextSlide} size={30} />
        </div>
        <div className="flex top-4 justify-center py-2">
          {sliders.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => gotoSlide(slideIndex)}
              className="text-2xl cursor-pointer"
            >
              <RxDotFilled></RxDotFilled>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
