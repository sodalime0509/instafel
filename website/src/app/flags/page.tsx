"use client";

import { AnimatePresence, motion } from "framer-motion";
import type React from "react";
import { useEffect, useState } from "react";
import { LoadingBar } from "@/components/LoadingBars";
import Footer from "@/components/Footer";
import { useSearchParams } from "next/navigation";
import { Search, Trash, User, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";

interface Info {
  page_size: number;
  fl_enabled: boolean;
  total_flag_size: number;
  filtered_flag_size: number;
  authors_of_all_flags: string[];
}

interface FlagData {
  id: number;
  name: string;
  author: string;
  category_id: number;
  fnames: string[];
  addate: string;
  rv: number;
  rv_at: string;
}

interface ResponseScheme {
  manifest_version: number;
  info: Info;
  flags: FlagData[];
}

export default function FlagListPage() {
  const { t } = useTranslation("flags");
  const [hoveredId] = useState<number | null>(null);

  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category") ?? "0";
  const [pageNumber, setPageNumber] = useState(1);
  const [refreshData, setRefreshData] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [recallAPI, setRecallAPI] = useState(false);
  const [data, setData] = useState<ResponseScheme | null>(null);

  const categories = [
    t("categories.0"),
    t("categories.1"),
    t("categories.2"),
    t("categories.3"),
    t("categories.4"),
    t("categories.5"),
    t("categories.6"),
    t("categories.7"),
    t("categories.8"),
    t("categories.9"),
    t("categories.10"),
    t("categories.11"),
  ];

  useEffect(() => {
    setRefreshData(true);
    const fetchData = async () => {
      try {
        let requestUrl = `https://flagapi.instafel.app/list?category=${categoryId}&page=${pageNumber}`;

        const res = await fetch(requestUrl);
        const result: ResponseScheme = await res.json();

        const sortedResult = result.flags.sort((a, b) => {
          const timeA = new Date(a.addate).getTime();
          const timeB = new Date(b.addate).getTime();
          return (isNaN(timeB) ? 0 : timeB) - (isNaN(timeA) ? 0 : timeA);
        });

        result.flags = sortedResult;
        setData(result);
      } catch (e) {
        console.error("An error occured while sending / reading response:", e);
      } finally {
        setRefreshData(false);
      }
    };
    fetchData();
  }, [recallAPI, categoryId, pageNumber]);

  useEffect(() => {
    if (refreshData == false) {
      setHasAnimated(true);
    }
  }, [refreshData]);

  useEffect(() => {
    if (pageNumber == 2589) {
      setPageNumber(1);
    } else {
      setRecallAPI((prevState) => !prevState);
    }
  }, [pageNumber]);

  const changePageNumberFromPagination = (newPageNum: number) => {
    setPageNumber(newPageNum);
  };

  const getTypeColor = (type: string) => {
    const colors = {
      c0: "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800",
      c1: "bg-violet-50 text-violet-600 border-violet-100 dark:bg-violet-950 dark:text-violet-400 dark:border-violet-800",
      c2: "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800",
      c3: "bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-950 dark:text-orange-400 dark:border-orange-800",
      c4: "bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-950 dark:text-indigo-400 dark:border-indigo-800",
      c5: "bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-950 dark:text-rose-400 dark:border-rose-800",
      c6: "bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100 dark:bg-fuchsia-950 dark:text-fuchsia-400 dark:border-fuchsia-800",
      c7: "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800",
      c8: "bg-cyan-50 text-cyan-600 border-cyan-100 dark:bg-cyan-950 dark:text-cyan-400 dark:border-cyan-800",
      c9: "bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-950 dark:text-indigo-400 dark:border-indigo-800",
      c10: "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800",
      c11: "bg-teal-50 text-teal-600 border-teal-100 dark:bg-teal-950 dark:text-teal-400 dark:border-teal-800",
    };
    return (
      colors[type as keyof typeof colors] ||
      "bg-card text-muted-foreground border-border"
    );
  };

  return (
    <AnimatePresence>
      {data ? (
        <div className="bg-background text-foreground">
          <Navbar />
          <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.2,
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                  className="text-5xl font-bold tracking-tight mb-4 text-foreground"
                >
                  {categories[categoryId]}
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                  className="flex items-center justify-center gap-3 text-muted-foreground"
                >
                  <div className="h-[1px] w-10 bg-border" />
                  {data.info.fl_enabled === true ? (
                    <div>
                      {Number.parseInt(categoryId) !== 0 ? (
                        <p className="text-lg">
                          {t("descs.fl_on.with_cat", {
                            fcount: data.info.filtered_flag_size,
                          })}
                        </p>
                      ) : (
                        <p className="text-lg">
                          {t("descs.fl_on.without_cat", {
                            fcount: data.info.filtered_flag_size,
                          })}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div>
                      {Number.parseInt(categoryId) !== 0 ? (
                        <p className="text-lg">
                          {t("descs.fl_off.with_cat", {
                            fcount: data.info.total_flag_size,
                          })}
                        </p>
                      ) : (
                        <p className="text-lg">
                          {t("descs.fl_off.without_cat", {
                            fcount: data.info.total_flag_size,
                          })}
                        </p>
                      )}
                    </div>
                  )}
                  <div className="h-[1px] w-10 bg-border" />
                </motion.div>
              </div>

              {refreshData === false ? (
                <motion.div
                  initial={{ opacity: 0, y: hasAnimated ? 0 : 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    hasAnimated
                      ? {}
                      : { delay: 0.6, duration: 0.8, ease: "easeInOut" }
                  }
                  className="grid gap-4 mb-6"
                >
                  <div className="grid gap-4 mb-6">
                    {data.flags.map((flag, index) => (
                      <Link
                        key={index}
                        href={"/flag?id=" + flag.id}
                        className="group relative"
                      >
                        <div
                          className={`
          relative overflow-hidden bg-card rounded-xl border border-border
          transition-all duration-300
          ${hoveredId === index ? "shadow-lg scale-[1.01]" : "hover:shadow-sm"}
        `}
                        >
                          <div className="p-4 sm:p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex-12">
                                <div className="flex items-center gap-3">
                                  <h3 className="text-lg font-semibold text-foreground">
                                    {flag.name}
                                  </h3>
                                </div>
                                <div className="mb-2">
                                  {flag.fnames.map((fname, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center gap-3"
                                    >
                                      <h3 className="text-sm font-regular text-foreground">
                                        {fname}
                                      </h3>
                                    </div>
                                  ))}
                                </div>

                                <div className="items-center gap-4 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-2">
                                    <svg
                                      className="w-4 h-4"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                      />
                                    </svg>
                                    {t("added_by", { name: flag.author })}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <svg
                                      className="w-4 h-4"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                      />
                                    </svg>
                                    {t("uploaded_at", {
                                      date_str: new Date(flag.addate)
                                        .toLocaleDateString("en-US")
                                        .toString(),
                                    })}
                                  </div>
                                  {flag.rv === 1 && (
                                    <div className="flex items-center gap-2">
                                      <Trash className="w-4 h-4" />
                                      {t("removed_with", {
                                        version: flag.rv_at,
                                      })}
                                    </div>
                                  )}
                                </div>
                              </div>

                              <button
                                className={`
                  p-2 rounded-lg text-muted-foreground
                  transition-all duration-300 ease-in-out
                  hover:text-foreground hover:bg-muted`}
                              >
                                {categoryId === "0" && (
                                  <span
                                    className={`
                            px-2.5 py-1 rounded-full text-xs font-medium border
                            ${getTypeColor("c" + flag.category_id)}
                          `}
                                  >
                                    {categories[flag.category_id]}
                                  </span>
                                )}
                              </button>
                            </div>
                          </div>

                          <div
                            className={`
              absolute inset-0
              bg-gradient-to-tr from-muted/0 via-muted/0 to-muted/50
              transition-opacity duration-300`}
                          />
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="grid gap-4 mb-6 min-h-[400px] relative">
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="relative">
                      <div className="h-24 w-24 rounded-full border-t-2 border-b-2 border-primary animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center"></div>
                    </div>
                    <p className="mt-4 text-muted-foreground font-medium">
                      {t("loading")}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-center border-t border-border pt-4">
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      changePageNumberFromPagination(pageNumber - 1)
                    }
                    disabled={pageNumber === 1}
                    className={`
                  p-2 rounded-lg border text-sm font-medium transition-colors
                  ${
                    pageNumber === 1
                      ? "bg-muted text-muted-foreground border-border cursor-not-allowed"
                      : "bg-background text-foreground border-border hover:bg-muted"
                  }
                `}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  {[...Array(data.info.page_size)].map((_, i) => (
                    <button
                      onClick={() => changePageNumberFromPagination(i + 1)}
                      key={i + 1}
                      className={`
                    w-10 h-10 rounded-lg border text-sm font-medium
                    transition-colors
                    ${
                      pageNumber === i + 1
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-foreground border-border hover:bg-muted"
                    }
                  `}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() =>
                      changePageNumberFromPagination(pageNumber + 1)
                    }
                    disabled={pageNumber === data.info.page_size}
                    className={`
                  p-2 rounded-lg border text-sm font-medium transition-colors
                  ${
                    pageNumber === data.info.page_size
                      ? "bg-muted text-muted-foreground border-border cursor-not-allowed"
                      : "bg-background text-foreground border-border hover:bg-muted"
                  }
                `}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <LoadingBar />
      )}
    </AnimatePresence>
  );
}
