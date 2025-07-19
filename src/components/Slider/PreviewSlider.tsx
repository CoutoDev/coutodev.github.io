import Swiper from 'swiper';

import { useEffect, useRef } from 'react';
import { Navigation, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

interface Props {
  images: string[],
  previewSwiperRef: React.RefObject<HTMLDivElement | null>,
  setPreviewSwiper: (swiper: Swiper) => void,
  handleOnFullscreenClick: () => void,
}

export default function PreviewSlider({ handleOnFullscreenClick, images, previewSwiperRef, setPreviewSwiper }: Props) {
  const nextButtonRef = useRef<HTMLDivElement>(null);
  const prevButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (previewSwiperRef.current) {
      const swiper = new Swiper(previewSwiperRef.current, {
        modules: [Navigation, A11y],
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
          nextEl: nextButtonRef.current,
          prevEl: prevButtonRef.current,
        },
        loop: true,
        a11y: {
          prevSlideMessage: 'Previous slide',
          nextSlideMessage: 'Next slide',
        },
      });
      setPreviewSwiper(swiper);
      return () => swiper.destroy();
    }
  }, []);

  return (
    <div className="relative mt-8">
      <button
        onClick={handleOnFullscreenClick}
        className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded text-sm flex items-center gap-1 z-10"
        aria-label="View in fullscreen"
      >
        Fullscreen
      </button>
      <div className="swiper" ref={previewSwiperRef}>
        <div className="swiper-wrapper">
          {images.map((image, index) => (
            <div key={`preview-${index}`} className="swiper-slide">
              <img 
                src={image} 
                alt={`Preview ${index + 1}`} 
                className="w-full h-auto object-contain rounded-lg cursor-zoom-in"
                loading="lazy"
                onClick={handleOnFullscreenClick}
              />
            </div>
          ))}
        </div>
        <div ref={prevButtonRef} className="swiper-button-prev"></div>
        <div ref={nextButtonRef} className="swiper-button-next"></div>
      </div>
    </div>
  )
}