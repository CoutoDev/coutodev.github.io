import { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Navigation, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

interface Props {
  images: string[];
  isFullscreen: boolean;
  fullscreenSwiperRef: React.RefObject<HTMLDivElement | null>;
  previewSwiper: Swiper | null;
  handleCloseFullscreen: () => void;
  setFullscreenSwiper: (swiper: Swiper) => void;
}

export default function FullscreenSliderModal({ images, fullscreenSwiperRef, previewSwiper, handleCloseFullscreen, isFullscreen, setFullscreenSwiper }: Props) {
  const fullNextButtonRef = useRef<HTMLDivElement>(null);
  const fullPrevButtonRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isFullscreen && fullscreenSwiperRef.current) {
      const swiper = new Swiper(fullscreenSwiperRef.current, {
        modules: [Navigation, A11y],
        slidesPerView: 1,
        navigation: {
          nextEl: fullNextButtonRef.current,
          prevEl: fullPrevButtonRef.current,
        },
        loop: true,
        a11y: {
          prevSlideMessage: 'Previous slide',
          nextSlideMessage: 'Next slide',
        },
      });
      
      if (previewSwiper) {
        swiper.slideTo(previewSwiper.realIndex);
      }
      
      setFullscreenSwiper(swiper);
      document.body.style.overflow = 'hidden';
      
      return () => {
        swiper.destroy();
        document.body.style.overflow = 'auto';
      };
    }
  }, [isFullscreen, previewSwiper]);

  return (
    <>
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/70 z-50 p-4 w-full h-full">
          <button 
            className="absolute top-4 right-4 text-center text-white z-10 hover:cursor-pointer text-2xl rounded-full"
            onClick={handleCloseFullscreen}
            aria-label="Close fullscreen"
          >
            &times;
          </button>
          
          <div className="flex justify-center items-center swiper w-full h-full" ref={fullscreenSwiperRef}>
            <div className="swiper-wrapper" onClick={handleCloseFullscreen}>
              {images.map((image, index) => (
                <div key={`full-${index}`} className="swiper-slide">
                  <img 
                    src={image} 
                    alt={`Slide ${index + 1}`} 
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            <div ref={fullPrevButtonRef} className="swiper-button-prev text-white"></div>
            <div ref={fullNextButtonRef} className="swiper-button-next text-white"></div>
          </div>
        </div>
      )}
    </>
  );
}