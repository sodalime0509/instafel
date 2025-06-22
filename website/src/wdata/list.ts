"use client";

import { WikiCategory } from "@/wdata/wiki";
import {
  HomeIcon,
  InfoIcon,
  Languages,
  LucideMessageCircleQuestion,
  Settings,
  Wrench,
} from "lucide-react";

const wikiData: WikiCategory[] = [
  {
    name: "Guides",
    icon: InfoIcon,
    pages: [
      {
        slug: "what-is-instafel",
        title: "What is Instafel?",
        description: "An article for explaing Instafel and Instafel stuffs",
        writer: "mamiiblt",
      },
    ],
  },
  {
    name: "Translation",
    icon: Languages,
    pages: [],
  },
  {
    name: "Patcher",
    icon: Wrench,
    pages: [],
  },
];

export default wikiData;
