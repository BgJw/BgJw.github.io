import { memo } from "react";

interface ICarouselItem {
    carousel: { urls: { thumb: string }; alt_description: string };
    isActive: boolean;
    onClick: () => void;
  
}
const CarouselItem = memo(({ carousel, isActive, onClick }: ICarouselItem) => {

    return (
        <div className='modal__carousel__items'>
    <img
      className='modal__carousel__items-img lazy'
      src={carousel.urls.thumb}
      alt={carousel.alt_description}
      loading="lazy"
      onClick={onClick}
    />
    {isActive && <span className='modal__carousel__items-activeImg' />}
  </div>
    )
});
  
export default CarouselItem;
  