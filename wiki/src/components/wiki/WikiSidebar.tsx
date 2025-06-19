"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
} from "../ui/sidebar";
import { motion } from "framer-motion";
import { WikiCategory } from "@/wdata/wiki";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { BookOpenText, ChevronDown, ChevronRight } from "lucide-react";
import React from "react";

interface WikiSidebarProps {
  categories: WikiCategory[];
  currentSlug?: string;
}

export default function WikiSidebar({
  categories,
  currentSlug,
}: WikiSidebarProps) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Sidebar>
      <div>
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`sticky  border-b border-border transition-all duration-300 ${
            scrolled
              ? "bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60"
              : "bg-background"
          }`}
        >
          <div className="container flex h-16 items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0, rotate: -10 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ rotate: -10 }}
            >
              <BookOpenText className="h-6 w-6" />
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="text-lg font-medium text-foreground ml-2 mr-2"
            >
              Instafel Wiki
            </motion.span>
          </div>
        </motion.header>
      </div>
      <SidebarContent>
        {categories.map((item, idx) => (
          <Collapsible defaultOpen className="group/collapsible" key={idx}>
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  {item.name}
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.pages?.map((item, idx) => {
                      const Icon = item.icon;

                      return (
                        <SidebarMenuItem key={idx}>
                          <SidebarMenuButton asChild>
                            <a href={`/wiki/${item.slug}`}>
                              <Icon />
                              <span>{item.title}</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
