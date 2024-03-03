import Card from "./components/Card";
import "./styles/Home.css";
import { useEffect, useMemo, useState } from "react";
import { searchEngine, fetchPopularImages } from "./store/FetchImages";
import { useApp } from "./store/AppContext";

type Image = {
  urls: {
    regular: string;
  };
  alt_description: string;
  id: string;
};

const Home = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [inputValue, setInputValue] = useState<string>("");
  const [typingTimeout, setTypingTimeout] = useState<number | null>(null);

  const ctx = useApp();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTotalPages(1);
    setInputValue(e.target.value);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const newTypingTimeout = setTimeout(() => {
      ctx.inputContext.setInputValue((prevInputValues) => [...prevInputValues, e.target.value]);
    }, 1000);

    setTypingTimeout(newTypingTimeout);
  };


  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setTotalPages((prevTotalPages) => prevTotalPages + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const memoizedSearchEngine = useMemo(() => searchEngine, []);
  const memoizedFetchPopularImages = useMemo(() => fetchPopularImages, []);

  useEffect(() => {
    const fetchData = async () => {
      const data =
        inputValue.trim() !== ""
          ? await memoizedSearchEngine(totalPages, inputValue)
          : await memoizedFetchPopularImages(
              `photos?page=${totalPages}&order_by=popular&per_page=20`
            );

      setImages((prev) => (totalPages === 1 ? data : [...prev, ...data]));
      const existingDataString = localStorage.getItem(inputValue);
      const existingData = existingDataString ? JSON.parse(existingDataString) : [];

      const newData = [...existingData, ...data];

      localStorage.setItem(inputValue, JSON.stringify(newData));
    };

    const timeoutId = setTimeout(fetchData, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [totalPages, inputValue]);

  return (
    <div className={`home-container`}>
      <input
        className="custom-input"
        onChange={handleInputChange}
        value={inputValue}
        type="text"
        placeholder="Type something..."
      />
      <div className="cards-wrapper">
        {images.map((img) => (
          <Card
            id={img.id}
            key={img.id}
            src={img.urls.regular}
            alt={img.alt_description}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
