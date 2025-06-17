
import ProtectedLinkPage from "@/component/securepage/Protected";
import React from "react";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function SecurePage({ params }: PageProps) {
  const { id } = await params;
  return <ProtectedLinkPage shortCode={id} />;
}