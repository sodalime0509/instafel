"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import {
  Camera,
  CircleFadingPlus,
  Ellipsis,
  FlagIcon,
  GalleryVerticalEnd,
  PhoneCall,
  Play,
  Send,
  Shapes,
  StickyNote,
  SwatchBook,
  Wallpaper,
  Wrench,
} from "lucide-react";
import { LoadingBar } from "@/components/LoadingBars";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";

interface ResponseScheme {
  manifest_version: number;
  status: string;
  flagSizes: {
    all: number;
    direct: number;
    reels: number;
    stories: number;
    feed: number;
    interface: number;
    notes: number;
    quality: number;
    camera: number;
    call: number;
    fixes: number;
    other: number;
  };
}

export default function LibraryBackupPage() {
  const { t } = useTranslation("library_flag");
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [data, setData] = useState<ResponseScheme | null>(null);

  const categories = [
    {
      id: 0,
      name: t("categories.all"),
      icon: <Shapes />,
      color: "blue",
    },
    {
      id: 1,
      name: t("categories.direct"),
      icon: <Send />,
      color: "violet",
    },
    {
      id: 2,
      name: t("categories.reels"),
      icon: <Play />,
      color: "emerald",
    },
    {
      id: 3,
      name: t("categories.stories"),
      icon: <CircleFadingPlus />,
      color: "orange",
    },
    {
      id: 4,
      name: t("categories.feed"),
      icon: <GalleryVerticalEnd />,
      color: "indigo",
    },
    {
      id: 5,
      name: t("categories.interface"),
      icon: <SwatchBook />,
      color: "rose",
    },
    {
      id: 6,
      name: t("categories.notes"),
      icon: <StickyNote />,
      color: "fuchsia",
    },
    {
      id: 7,
      name: t("categories.quality"),
      icon: <Wallpaper />,
      color: "amber",
    },
    {
      id: 8,
      name: t("categories.camera"),
      icon: <Camera />,
      color: "cyan",
    },
    {
      id: 9,
      name: t("categories.call"),
      icon: <PhoneCall />,
      color: "indigo",
    },
    {
      id: 10,
      name: t("categories.fixes"),
      icon: <Wrench />,
      color: "emerald",
    },
    {
      id: 11,
      name: t("categories.other"),
      icon: <Ellipsis />,
      color: "teal",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      var requestUrl = `https://flagapi.instafel.app/flag_sizes`;
      const res = await fetch(requestUrl);
      const result: ResponseScheme = await res.json();
      setData(result);
    };
    fetchData();
  }, []);

  const handleCategoryClick = (categoryId: number) => {
    router.push(`/flags?category=${categoryId}`);
  };

  const getColorClasses = (color: string, isHovered: boolean) => {
    const classes = {
      blue: {
        bgIsHovered: "bg-blue-500 dark:bg-blue-600",
        text: isHovered ? "text-white" : "text-blue-500 dark:text-blue-400",
        badge:
          "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300",
        shadow:
          "hover:shadow-lg hover:shadow-blue-100 dark:hover:shadow-blue-900/20",
      },
      emerald: {
        bgIsHovered: "bg-emerald-500 dark:bg-emerald-600",
        text: isHovered
          ? "text-white"
          : "text-emerald-500 dark:text-emerald-400",
        badge:
          "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300",
        shadow:
          "hover:shadow-lg hover:shadow-emerald-100 dark:hover:shadow-emerald-900/20",
      },
      violet: {
        bgIsHovered: "bg-violet-500 dark:bg-violet-600",
        text: isHovered ? "text-white" : "text-violet-500 dark:text-violet-400",
        badge:
          "bg-violet-50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-300",
        shadow:
          "hover:shadow-lg hover:shadow-violet-100 dark:hover:shadow-violet-900/20",
      },
      orange: {
        bgIsHovered: "bg-orange-500 dark:bg-orange-600",
        text: isHovered ? "text-white" : "text-orange-500 dark:text-orange-400",
        badge:
          "bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-300",
        shadow:
          "hover:shadow-lg hover:shadow-orange-100 dark:hover:shadow-orange-900/20",
      },
      rose: {
        bgIsHovered: "bg-rose-500 dark:bg-rose-600",
        text: isHovered ? "text-white" : "text-rose-500 dark:text-rose-400",
        badge:
          "bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-300",
        shadow:
          "hover:shadow-lg hover:shadow-rose-100 dark:hover:shadow-rose-900/20",
      },
      teal: {
        bgIsHovered: "bg-teal-500 dark:bg-teal-600",
        text: isHovered ? "text-white" : "text-teal-500 dark:text-teal-400",
        badge:
          "bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-300",
        shadow:
          "hover:shadow-lg hover:shadow-teal-100 dark:hover:shadow-teal-900/20",
      },
      cyan: {
        bgIsHovered: "bg-cyan-500 dark:bg-cyan-600",
        text: isHovered ? "text-white" : "text-cyan-500 dark:text-cyan-400",
        badge:
          "bg-cyan-50 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-300",
        shadow:
          "hover:shadow-lg hover:shadow-cyan-100 dark:hover:shadow-cyan-900/20",
      },
      indigo: {
        bgIsHovered: "bg-indigo-500 dark:bg-indigo-600",
        text: isHovered ? "text-white" : "text-indigo-500 dark:text-indigo-400",
        badge:
          "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300",
        shadow:
          "hover:shadow-lg hover:shadow-indigo-100 dark:hover:shadow-indigo-900/20",
      },
      fuchsia: {
        bgIsHovered: "bg-fuchsia-500 dark:bg-fuchsia-600",
        text: isHovered
          ? "text-white"
          : "text-fuchsia-500 dark:text-fuchsia-400",
        badge:
          "bg-fuchsia-50 text-fuchsia-600 dark:bg-fuchsia-900/30 dark:text-fuchsia-300",
        shadow:
          "hover:shadow-lg hover:shadow-fuchsia-100 dark:hover:shadow-fuchsia-900/20",
      },
      amber: {
        bgIsHovered: "bg-amber-500 dark:bg-amber-600",
        text: isHovered ? "text-white" : "text-amber-500 dark:text-amber-400",
        badge:
          "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300",
        shadow:
          "hover:shadow-lg hover:shadow-amber-100 dark:hover:shadow-amber-900/20",
      },
    };
    return classes[color as keyof typeof classes] || classes.blue;
  };

  return (
    <AnimatePresence>
      {data ? (
        <div>
          <Navbar />

          <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div
                      className="absolute inset-0 rounded-full bg-primary/20 animate-ping"
                      style={{ animationDuration: "3s" }}
                    ></div>
                    <div className="relative bg-primary/30 p-5 rounded-full">
                      <FlagIcon className="h-12 w-12 text-primary" />
                    </div>
                  </div>
                </div>
                <h1 className="text-4xl font-bold mb-4 text-foreground">
                  {t("title")}
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {t("desc")}
                </p>
              </motion.div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map((category) => {
                  const colorClasses = getColorClasses(
                    category.color,
                    hoveredId === category.id
                  );

                  return (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.4 + category.id * 0.15,
                        duration: 0.8,
                        ease: "easeOut",
                      }}
                    >
                      <div
                        onMouseEnter={() => setHoveredId(category.id)}
                        onMouseLeave={() => setHoveredId(null)}
                      >
                        <button
                          onClick={() => handleCategoryClick(category.id)}
                          className={`
                            w-full p-4 h-[160px]
                            flex flex-col items-center justify-center text-center
                            rounded-xl border transition-all duration-300
                            ${
                              hoveredId == category.id
                                ? colorClasses.bgIsHovered
                                : "bg-card"
                            } ${colorClasses.text}
                            ${colorClasses.shadow}
                          `}
                        >
                          <div
                            className={`
                              mb-3 transform transition-transform duration-300
                              ${hoveredId === category.id ? "scale-110" : ""}
                            `}
                          >
                            {category.icon}
                          </div>

                          <h3
                            className={`
                              font-medium mb-1 transition-colors duration-300
                              ${hoveredId === category.id ? "text-white" : ""}
                            `}
                          >
                            {category.name}
                          </h3>

                          <div className="mt-2 text-center">
                            <span
                              className={`
                                text-xs font-medium px-2 py-1 rounded-full
                                ${colorClasses.badge}
                              `}
                            >
                              {t("num_flag", {
                                fsize:
                                  data.flagSizes[
                                    category.name.toLowerCase() as keyof typeof data.flagSizes
                                  ],
                              })}
                            </span>
                          </div>
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <div>
          <Navbar />
          <LoadingBar />
          <Footer />
        </div>
      )}
    </AnimatePresence>
  );
}
