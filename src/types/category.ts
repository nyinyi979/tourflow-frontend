import { StaticImageData } from "next/image";

export interface Category {
  slug: string;
  label: string;
  image: StaticImageData;
};