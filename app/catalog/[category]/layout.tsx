import React from "react";

export const metadata = { title: "Замовити AI-відео" };

export default function CategoryLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
