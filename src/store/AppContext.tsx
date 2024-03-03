import React, { createContext, useContext, ReactNode, useState, useMemo } from "react";

type Image = {
  id: string;
  src: string;
  alt: string;
  downloads: number;
  likes: number;
  views: number;
};

type ImageContextProps = {
  selectedImage: Image | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<Image | null>>;
};

type InputContextProps = {
  inputValue: string[];
  setInputValue: React.Dispatch<React.SetStateAction<string[]>>;
};

const AppContext = createContext<{
  imageContext: ImageContextProps;
  inputContext: InputContextProps;
} | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [inputValue, setInputValue] = useState<string[]>([]);

  const imageContextValue = useMemo(() => ({ selectedImage, setSelectedImage }), [selectedImage, setSelectedImage]);
  const inputContextValue = useMemo(() => ({ inputValue, setInputValue }), [inputValue, setInputValue]);

  const contextValue = useMemo(() => ({ imageContext: imageContextValue, inputContext: inputContextValue }), [
    imageContextValue,
    inputContextValue,
  ]);

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};