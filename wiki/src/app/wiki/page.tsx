"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { FileText, Calendar } from "lucide-react";
import wikiData from "@/wdata/list";

export default function WikiHomePage() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Welcome to wiki!
        </h1>
        <p className="text-lg text-muted-foreground">
          Bilgi tabanımıza hoş geldiniz. Sol menüden kategorilere göz atabilir
          veya arama yaparak istediğiniz içeriği bulabilirsiniz.
        </p>
      </div>
    </div>
  );
}
