import React, { useEffect, useState } from 'react';
import Card from './components/Card';
import './styles/History.css';

const History = () => {
  const [selectedKey, setSelectedKey] = useState('');
  const [shownImagesQuantity, setShownImagesQuantity] = useState<number>(20)
  const localStorageKeys = Object.keys(localStorage);
  

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setShownImagesQuantity((prevTotalPages) => prevTotalPages + 20);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, [handleScroll])


  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedKey(e.target.value);
    setShownImagesQuantity(20)
  };

  const handleRetrieveData = () => {
    const dataString = localStorage.getItem(selectedKey);
    const data = dataString ? JSON.parse(dataString) : [];
  
    const uniqueItemsSet = new Set<string>();
  
    return (
      <div className="cards-wrapper">
        {data.slice(0, shownImagesQuantity).map((item: any) => {
          const compositeKey = `${item.id}_${item.urls.regular}_${item.alt_description}`;
  
          if (!uniqueItemsSet.has(compositeKey)) {
            uniqueItemsSet.add(compositeKey);
  
            return (
              <Card
                key={compositeKey}
                id={item.id}
                src={item.urls.regular}
                alt={item.alt_description}
              />
            );
          }
  
          return null;
        })}
      </div>
    );
  };

  return (
    <div className="history-container">
      <select className="history-dropdown" onChange={handleSelectChange} value={selectedKey}>
        <option value="" disabled>
          Select a key
        </option>
        {localStorageKeys.map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
      {selectedKey && handleRetrieveData()}
    </div>
  );
};

export default History;