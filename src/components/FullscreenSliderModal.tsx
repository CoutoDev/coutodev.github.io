import { useEffect, useRef, useState } from 'react';
import Swiper from 'swiper';
import { Navigation, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

interface Props {
  images: string[];
}

export default function FullscreenSliderModal({ images }: Props) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const previewSwiperRef = useRef<HTMLDivElement>(null);
  const fullscreenSwiperRef = useRef<HTMLDivElement>(null);
  const nextButtonRef = useRef<HTMLDivElement>(null);
  const prevButtonRef = useRef<HTMLDivElement>(null);
  const fullNextButtonRef = useRef<HTMLDivElement>(null);
  const fullPrevButtonRef = useRef<HTMLDivElement>(null);
  
  const [previewSwiper, setPreviewSwiper] = useState<Swiper | null>(null);
  const [fullscreenSwiper, setFullscreenSwiper] = useState<Swiper | null>(null);

  // Initialize preview slider
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

  // Initialize fullscreen slider when opened
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
      
      // Sync with preview slider if it exists
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

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    // Sync back to preview slider before closing
    if (previewSwiper && fullscreenSwiper) {
      previewSwiper.slideTo(fullscreenSwiper.realIndex);
    }
    setIsFullscreen(false);  };

  return (
    <>
      {/* Preview Slider */}
      <div className="relative mt-8">
      <button
          onClick={openFullscreen}
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
                  onClick={openFullscreen}
                />
              </div>
            ))}
          </div>
          <div ref={prevButtonRef} className="swiper-button-prev"></div>
          <div ref={nextButtonRef} className="swiper-button-next"></div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/70 z-50 p-4 w-full h-full">
          <button 
            className="absolute top-4 right-4 text-center text-white z-10 hover:cursor-pointer text-2xl rounded-full"
            onClick={closeFullscreen}
            aria-label="Close fullscreen"
          >
            &times;
          </button>
          
          <div className="flex justify-center items-center swiper w-full h-full" ref={fullscreenSwiperRef}>
            <div className="swiper-wrapper" onClick={closeFullscreen}>
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