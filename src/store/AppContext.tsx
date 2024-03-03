import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
} from "react";

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

const AppContext = createContext<
  | {
      imageContext: ImageContextProps;
    }
  | undefined
>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const imageContextValue = useMemo(
    () => ({ selectedImage, setSelectedImage }),
    [selectedImage, setSelectedImage]
  );

  const contextValue = useMemo(
    () => ({
      imageContext: imageContextValue,
    }),
    [imageContextValue]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
