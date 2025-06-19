import { LucideIcon } from "lucide-react";
import { JSX } from "react";

export interface WikiPage {
  slug: string;
  title: string;
  description: string;
  writer: string;
  icon: LucideIcon;
}

export interface WikiCategory {
  name: string;
  pages: WikiPage[];
}
