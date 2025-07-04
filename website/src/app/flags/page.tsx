"use client";

import { AnimatePresence, motion } from "framer-motion";
import type React from "react";
import { useEffect, useState } from "react";
import { LoadingBar } from "@/components/LoadingBars";
import Footer from "@/components/Footer";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useTranslation } from "react-i18next";
import { flagAPIURL, flagCategories } from "@/wdata/flag_sdata";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Trash } from "lucide-react";

interface RespTF {
  page: number;
  category_size: number;
  page_size: number;
  flags: {
    id: number;
    title: string;
    last_edit: string;
    added_by: string;
    removed_in: string;
  }[];
}

export default function FlagListPage() {
  const { t, i18n } = useTranslation(["flags", "fcategories"]);
  const [hoveredId] = useState<number | null>(null);

  const searchParams = useSearchParams();
  const categoryID = searchParams.get("category") ?? "0";
  const page = Number(searchParams.get("page")) ?? 1;
  const [data, setData] = useState<RespTF | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${flagAPIURL}/flag_list?category_id=${categoryID}&page=${page}`
        );
        const data: RespTF = await res.json();
        console.log(data);
        setData(data);
      } catch (e) {
        console.error("An error occured while sending / reading response:", e);
      }
    };
    fetchData();
  }, []);

  const categoryData = flagCategories[categoryID];
  return (
    <AnimatePresence>
      {data ? (
        <div className="bg-background text-foreground">
          <Navbar />
          <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  className="mb-6 flex justify-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-card border border/10 flex items-center justify-center backdrop-blur-sm">
                    {categoryData.icon}
                  </div>
                </motion.div>

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
                  {t(categoryData.cif, { ns: "fcategories" })}
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
                  <div className="h-[1px] w-5" />
                  <p className="text-lg">
                    {t("flag_found", {
                      fcount: data.category_size,
                    })}
                  </p>
                  <div className="h-[1px] w-5" />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8, ease: "easeInOut" }}
                className="grid gap-4 mb-6"
              >
                <div className="grid gap-4 mb-6">
                  {data.flags.map((flag, index) => (
                    <Link
                      key={index}
                      href={`/flag?id=${flag.id}`}
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
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-semibold text-foreground">
                                  {flag.title}
                                </h3>
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
                                  {t("added_by", { name: flag.added_by })}
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
                                    date_str: new Intl.DateTimeFormat(
                                      i18n.language,
                                      {
                                        dateStyle: "medium",
                                        timeStyle: "short",
                                      }
                                    ).format(new Date(flag.last_edit)),
                                  })}
                                </div>
                                {flag.removed_in != null && (
                                  <div className="flex items-center gap-2">
                                    <Trash className="w-4 h-4" />
                                    {t("removed_with", {
                                      version: flag.removed_in,
                                    })}
                                  </div>
                                )}
                              </div>
                            </div>
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

              <Pagination>
                <PaginationContent>
                  {page > 1 && (
                    <PaginationItem>
                      <PaginationPrevious
                        aria-disabled
                        href={`/flags?category=${categoryID}&page=${page - 1}`}
                      />
                    </PaginationItem>
                  )}
                  {Array.from({ length: data.page_size }).map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        href={`/flags?category=${categoryID}&page=${index + 1}`}
                        isActive={page === index + 1}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  {page != data.page_size && (
                    <PaginationItem>
                      <PaginationNext
                        href={`/flags?category=${categoryID}&page=${page + 1}`}
                      />
                    </PaginationItem>
                  )}
                  {/*<PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>*/}
                </PaginationContent>
              </Pagination>
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
