"use client";

import { WikiCategory } from "@/wdata/wiki";
import { HomeIcon, Settings } from "lucide-react";

const wikiData: WikiCategory[] = [
  {
    name: "General",
    pages: [
      {
        slug: "getting-started",
        title: "Başlangıç Rehberi",
        description: "Instafel Deneme doc page 1",
        writer: "mamiiblt",
        icon: Settings,
      },
      {
        slug: "selam-deneme",
        title: "Deneme Rehber 2",
        description: "Merhaba brom!",
        writer: "mamiiblt",
        icon: HomeIcon,
      },
    ],
  },
  {
    name: "Patcher",
    pages: [
      {
        slug: "getting-started",
        title: "Başlangıç Rehberi",
        description: "Instafel Deneme doc page 1",
        writer: "mamiiblt",
        icon: Settings,
      },
      {
        slug: "selam-deneme",
        title: "Deneme Rehber 2",
        description: "Merhaba brom!",
        writer: "mamiiblt",
        icon: HomeIcon,
      },
    ],
  },
];

export default wikiData;
