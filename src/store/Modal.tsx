import { useApp } from "./AppContext";
import "../styles/Modal.css";

const Modal = () => {
  const ctx = useApp();

  const closeModal = () => {
    ctx.imageContext.setSelectedImage(null);
  };

  return ctx.imageContext.selectedImage ? (
    <div className="modal-overlay" onClick={closeModal}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="document"
      >
        <img
            src={ctx.imageContext.selectedImage.src}
            alt={ctx.imageContext.selectedImage.alt}
            className="modal-image"
          />
          <div className="image-details">
            <p>Downloads: {ctx.imageContext.selectedImage.downloads}</p>
            <p>Likes: {ctx.imageContext.selectedImage.likes}</p>
            <p>Views: {ctx.imageContext.selectedImage.views}</p>
          </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
