import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

/**
 * Reusable lazy-loading image component
 * 
 * Props:
 * - src: image URL or import
 * - alt: alternative text (required for SEO/accessibility)
 * - width / height: optional sizing
 * - className: additional Tailwind/CSS classes
 * - effect: blur, opacity, black-and-white, etc. (defaults to "blur")
 */

const LazyImage = ({
    src, 
    alt, 
    width, 
    height, 
    className = "",
    effect = "blur",
    objectFit="object-fill",
    ...rest
}) => {
  return (
    <LazyLoadImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        effect={effect}
        className={`${objectFit} ${className}`}
        {...rest}
    />
  )
}

export default LazyImage