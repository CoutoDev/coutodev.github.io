import {  useRef, useState } from 'react';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import PreviewSlider from './PreviewSlider'
import FullscreenSlider from './FullscreenSlider'

interface Props {
  images: string[];
}

export default function ({ images }: Props) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const previewSwiperRef = useRef<HTMLDivElement>(null);
  const fullscreenSwiperRef = useRef<HTMLDivElement>(null);
  
  const [previewSwiper, setPreviewSwiper] = useState<Swiper | null>(null);
  const [fullscreenSwiper, setFullscreenSwiper] = useState<Swiper | null>(null);

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    if (previewSwiper && fullscreenSwiper) {
      previewSwiper.slideTo(fullscreenSwiper.realIndex);
    }

    setIsFullscreen(false);
  };

  return (
    <>
      <PreviewSlider
        images={images}
        setPreviewSwiper={setPreviewSwiper}
        handleOnFullscreenClick={openFullscreen}
        previewSwiperRef={previewSwiperRef}
      />

      <FullscreenSlider
        images={images}
        fullscreenSwiperRef={fullscreenSwiperRef}
        handleCloseFullscreen={closeFullscreen}
        isFullscreen={isFullscreen}
        previewSwiper={previewSwiper}
        setFullscreenSwiper={setFullscreenSwiper}
      />
    </>
  );
}