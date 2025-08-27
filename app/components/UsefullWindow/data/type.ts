interface Slide {
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
