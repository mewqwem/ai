// src/app/page.tsx
import React from "react";
import { Metadata } from "next";
import css from "./page.module.css";
import { HeroSection } from "@/components/HeroSection/HeroSection";

export const metadata: Metadata = {
  title: "AI Відео для Бізнесу | Швидкий продакшн",
  description:
    "Створення професійних AI-відео для вашого бізнесу за 48 годин. Збільшуйте продажі з унікальним контентом.",
  openGraph: {
    title: "AI Відео для Бізнесу",
    description:
      "Кінематографічна AI-реклама вдесятеро дешевше за традиційну зйомку",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
    </main>
  );
}
