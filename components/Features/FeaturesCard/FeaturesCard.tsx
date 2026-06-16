import React from "react";

interface FeatureCardProps {
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
}) => {
  return (
    <article className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 transition-shadow hover:shadow-md">
      <h3 className="mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </article>
  );
};
