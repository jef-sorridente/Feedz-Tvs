import "./PhotoItem.css";

import { uploads } from "../utils/config";

import { Link } from "react-router-dom";

const PhotoItem = ({ photo }) => {
  return (
    <div className="photo-item">
      {photo.image && (
        <img src={`${uploads}/photos/${photo.image}`} alt={photo.title} />
      )}
    </div>
  );
};

export default PhotoItem;
