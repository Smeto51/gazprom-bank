export interface Slide {
  iconBg: string;
  title: string;
  description?: string;
  linkText?: string;
}

export interface UseFulIItem {
  id: number;
  iconImg: string;
  iconText: string;
  slides: Slide[];
}

export interface UsefullWindowProps {
  onClose?: () => void;
  startActiveSliderIndex?: number;
  onSliderCompleted?: (sliderIndex: number) => void;
  completed?: boolean[];
  sliders?: number[];
}
