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
import Link from "next/link";

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
      cname: "all",
      icon: <Shapes />,
    },
    {
      id: 1,
      name: t("categories.direct"),
      cname: "direct",
      icon: <Send />,
    },
    {
      id: 2,
      name: t("categories.reels"),
      cname: "reels",
      icon: <Play />,
    },
    {
      id: 3,
      name: t("categories.stories"),
      cname: "stories",
      icon: <CircleFadingPlus />,
    },
    {
      id: 4,
      name: t("categories.feed"),
      cname: "feed",
      icon: <GalleryVerticalEnd />,
    },
    {
      id: 5,
      name: t("categories.interface"),
      cname: "interface",
      icon: <SwatchBook />,
    },
    {
      id: 6,
      name: t("categories.notes"),
      cname: "notes",
      icon: <StickyNote />,
    },
    {
      id: 7,
      name: t("categories.quality"),
      cname: "quality",
      icon: <Wallpaper />,
    },
    {
      id: 8,
      name: t("categories.camera"),
      cname: "camera",
      icon: <Camera />,
    },
    {
      id: 9,
      name: t("categories.call"),
      cname: "call",
      icon: <PhoneCall />,
    },
    {
      id: 10,
      name: t("categories.fixes"),
      cname: "fixes",
      icon: <Wrench />,
    },
    {
      id: 11,
      name: t("categories.other"),
      cname: "other",
      icon: <Ellipsis />,
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
                      <Link
                        href={`/flags?category=${category.id}`}
                        onMouseEnter={() => setHoveredId(category.id)}
                        onMouseLeave={() => setHoveredId(null)}
                      >
                        <button
                          className={`
                            w-full p-4 h-[160px]
                            flex flex-col items-center justify-center text-center
                            rounded-xl border border-border transition-all duration-300
                            bg-card text-foreground
                            hover:shadow-lg hover:scale-105
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

                          <h3 className="font-medium mb-1 transition-colors duration-300">
                            {category.name}
                          </h3>

                          <div className="mt-2 text-center">
                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground">
                              {t("num_flag", {
                                fsize:
                                  data.flagSizes[
                                    category.cname as keyof typeof data.flagSizes
                                  ],
                              })}
                            </span>
                          </div>
                        </button>
                      </Link>
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
