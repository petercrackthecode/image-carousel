import { useState, useEffect, FC } from "react";
import ImageCarousel from "./components/ImageCarousel";

const App: FC = () => {
  const [images, setImages] = useState<string[]>([]);
  useEffect(() => {
    for (let i = 0; i < 5; ++i)
      images.push(
        `https://picsum.photos/800/600?random=${Math.floor(
          Math.random() * 1000
        )}`
      );
  }, []);

  return (
    <div className="App">
      <ImageCarousel images={images} transitionTime={1000} interval={2000} />
    </div>
  );
};

export default App;
