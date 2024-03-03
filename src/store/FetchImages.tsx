const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_CLIENT_ID;

export const fetchPopularImages = async (path: string) => {
  const API_URL = BASE_URL + path + "&client_id=" + API_KEY;

  try {
    const result = await fetch(API_URL);
    const data = await result.json();
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

export const searchEngine = async (totalPages: number, keyWord: string) => {
  const API_URL =
    BASE_URL +
    `search/photos?page=${totalPages}&per_page=20&query=${keyWord}` +
    "&client_id=" +
    API_KEY;

  try {
    const result = await fetch(API_URL);
    const data = await result.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};
