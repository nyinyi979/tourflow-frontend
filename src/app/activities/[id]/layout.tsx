import { ReactNode } from "react";
import { Metadata } from "next";
import Tour from "./page";

export const metadata: Metadata = {
  title: "Wayfare Tours",
  description:
    "Editorial small-group tours and single-day activities in places worth the long way in.",
  openGraph: {
    title: "Wayfare — Small-group tours and slow travel",
    description:
      "Editorial small-group tours and single-day activities in places worth the long way in.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

interface LayoutProps {
  children: ReactNode;
  params: Promise<{
    id: string;
  }>;
}

export default async function ActivityDetailLayout({ params }: LayoutProps) {
  const { id } = await params;

  return <Tour id={id} />;
}
