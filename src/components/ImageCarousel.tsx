import React from "react";
import styles from "./ImageCarousel.module.css";
import ArrowBack from "../images/arrow_back.svg";
import ArrowForward from "../images/arrow_forward.svg";
import Play from "../images/play.svg";
import Pause from "../images/pause.svg";

interface Props {
  images: string[];
  interval?: number;
  transitionTime?: number;
}

const ImageCarousel = ({
  images,
  interval = 3000,
  transitionTime = 500,
}: Props) => {
  return (
    <div className={styles.carousel}>
      <img src={images[0]} data-testid="active-image" />
      <img src={Pause} data-testid="pause" />
      <img src={Play} data-testid="play" />
      <img src={ArrowForward} data-testid="arrow-forward" />
      <img src={ArrowBack} data-testid="arrow-back" />
    </div>
  );
};

export default ImageCarousel;
