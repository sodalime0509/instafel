"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { flagAPIURL, flagCategories } from "@/wdata/flag_sdata";
import { FlagIcon, GalleryVerticalEnd } from "lucide-react";
import { LoadingBar } from "@/components/LoadingBars";
import FlagLibraryCategoryItem from "@/components/FlagLibraryCategoryItem";

export default function LibraryBackupPage() {
  const { t } = useTranslation(["library_flag", "fcategories"]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [data, setData] = useState<{
    total: number;
    categorized: Record<string, number>;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      var requestUrl = `${flagAPIURL}/content/sizes`;
      const res = await fetch(requestUrl);
      const result = await res.json();
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <AnimatePresence>
      {data ? (
        <div>
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
                  <motion.div
                    key={0}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.4 + 0 * 0.1,
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                  >
                    <FlagLibraryCategoryItem
                      idx={0}
                      cid={2589}
                      cif={"all"}
                      icon={<GalleryVerticalEnd />}
                      fsize={data.total}
                      hoveredId={hoveredId}
                      setHoveredId={setHoveredId}
                    />
                  </motion.div>
                  {Object.entries(data.categorized).map(([id, count], idx) => {
                    const category = flagCategories[id];
                    return (
                      <motion.div
                        key={id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.4 + (idx + 1) * 0.1,
                          duration: 0.8,
                          ease: "easeOut",
                        }}
                      >
                        <FlagLibraryCategoryItem
                          idx={idx + 1}
                          cid={id}
                          cif={category.cif}
                          icon={category.icon}
                          fsize={count}
                          hoveredId={hoveredId}
                          setHoveredId={setHoveredId}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      ) : (
        <>
          <Navbar />
          <LoadingBar />
          <Footer />
        </>
      )}
    </AnimatePresence>
  );
}
