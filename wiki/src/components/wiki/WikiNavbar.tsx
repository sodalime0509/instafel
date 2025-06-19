"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavbarLoading } from "../loading";
import { NavigationItem } from "../NavigationItem";
import {
  BookOpenText,
  FileCog2Icon,
  LucideInstagram,
  RefreshCcwDot,
  Github,
  Menu,
  Download,
  GithubIcon,
  Box,
  Globe,
} from "lucide-react";
import ThemeSwitcher from "../ThemeSwitcher";
import { useSidebar } from "../ui/sidebar";

export default function WikiNavbar() {
  const [loading, setLoading] = React.useState(true);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar();

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

  React.useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <NavbarLoading />;
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-50 border-b border-border transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60"
          : "bg-background"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center space-x-2 transition-transform duration-200 hover:scale-105 hidden md:block"></div>
        <div className="flex items-center space-x-2 transition-transform duration-200 hover:scale-105 md:hidden">
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
            className="text-lg font-medium text-foreground"
          >
            Instafel Wiki
          </motion.span>
        </div>

        <div className="flex items-center gap-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <ThemeSwitcher />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Button
              asChild
              size="icon"
              variant="ghost"
              className="transition-transform hover:scale-105"
            >
              <a
                href="https://github.com/mamiiblt/instafel"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
              </a>
            </Button>
          </motion.div>

          <div className="md:hidden">
            <Button
              variant="outline"
              size="icon"
              className="relative transition-all duration-200 hover:bg-accent hover:scale-105"
              aria-label="Toggle Sidebar"
              onClick={toggleSidebar}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
