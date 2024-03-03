import { useApp } from "../store/AppContext";

interface CardProps {
  id: string;
  src: string;
  alt: string;
}

const Card: React.FC<CardProps> = ({ id, src, alt }) => {
  const ctx = useApp();

  const handleClick = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/photos/${id}/statistics?client_id=${import.meta.env.VITE_CLIENT_ID}`);
      const data = await response.json();
      ctx.imageContext.setSelectedImage({ id, src, alt, downloads: data.downloads.total, views: data.views.total, likes: data.likes.total });
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  return (
    <div className="card" onClick={handleClick}>
      <img className="card-img" src={src} alt={alt} />
    </div>
  );
};

export default Card;