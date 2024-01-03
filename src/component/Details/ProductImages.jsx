
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
const ProductImages = (props) => {
    return (
        <>
             <ImageGallery autoPlay={true} items={props.images} />
        </>
    );
};

export default ProductImages;