import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ImageCarousel from "./ImageCarousel";

const images = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg"];

describe("ImageCarousel", () => {
  beforeEach(() => {
    jest.mock("./ImageCarousel.module.css", () => ({
      carousel: "carousel",
      image: "image",
      active: "active",
    }));
    jest.mock("../images/arrow_back.svg", () => "ArrowBack");
    jest.mock("../images/arrow_forward.svg", () => "ArrowForward");
    jest.mock("../images/play.svg", () => "Play");
    jest.mock("../images/pause.svg", () => "Pause");
  });
  it("should render the first image", () => {
    render(<ImageCarousel images={images} />);
    expect(screen.getByTestId("active-image")).toHaveAttribute(
      "src",
      images[0]
    );
  });

  it("should render the second image after 3 seconds", () => {
    jest.useFakeTimers();
    render(<ImageCarousel images={images} />);
    jest.advanceTimersByTime(3000);
    expect(screen.getByTestId("active-image")).toHaveAttribute(
      "src",
      images[1]
    );
  });

  it("should render the third image after 6 seconds", () => {
    jest.useFakeTimers();
    render(<ImageCarousel images={images} />);
    jest.advanceTimersByTime(6000);
    expect(screen.getByTestId("active-image")).toHaveAttribute(
      "src",
      images[2]
    );
  });

  it("should render the 4th image after 9 seconds", () => {
    jest.useFakeTimers();
    render(<ImageCarousel images={images} />);
    jest.advanceTimersByTime(9000);
    expect(screen.getByTestId("active-image")).toHaveAttribute(
      "src",
      images[3]
    );
  });

  it("should render the second image when the next arrow is clicked", () => {
    render(<ImageCarousel images={images} />);
    fireEvent.click(screen.getByTestId("arrow-forward"));
    expect(screen.getByTestId("active-image")).toHaveAttribute(
      "src",
      images[1]
    );
  });

  it("should render the third image when the next arrow is clicked twice", () => {
    render(<ImageCarousel images={images} />);
    fireEvent.click(screen.getByTestId("arrow-forward"));
    fireEvent.click(screen.getByTestId("arrow-forward"));
    expect(screen.getByTestId("active-image")).toHaveAttribute(
      "src",
      images[2]
    );
  });

  it("should render the last image when the previous arrow is clicked", () => {
    render(<ImageCarousel images={images} />);
    fireEvent.click(screen.getByTestId("arrow-back"));
    expect(screen.getByTestId("active-image")).toHaveAttribute(
      "src",
      images[images.length - 1]
    );
  });

  it("should render the first image when the previous arrow is clicked after the next arrow is clicked", () => {
    render(<ImageCarousel images={images} />);
    fireEvent.click(screen.getByTestId("arrow-forward"));
    fireEvent.click(screen.getByTestId("arrow-back"));
    expect(screen.getByTestId("active-image")).toHaveAttribute(
      "src",
      images[0]
    );
  });

  it("should stop the carousel when the pause button is clicked", () => {
    jest.useFakeTimers();
    render(<ImageCarousel images={images} />);
    fireEvent.click(screen.getByTestId("pause"));
    jest.advanceTimersByTime(3000);
    expect(screen.getByTestId("active-image")).toHaveAttribute(
      "src",
      images[0]
    );
  });

  it("should start the carousel when the play button is clicked", () => {
    jest.useFakeTimers();
    render(<ImageCarousel images={images} />);
    fireEvent.click(screen.getByTestId("pause"));
    fireEvent.click(screen.getByTestId("play"));
    jest.advanceTimersByTime(3000);
    expect(screen.getByTestId("active-image")).toHaveAttribute(
      "src",
      images[1]
    );
  });
});
