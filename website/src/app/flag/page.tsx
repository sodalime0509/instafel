"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LoadingBar } from "@/components/LoadingBars";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "next/navigation";
import { flagsRepoContentURL } from "@/wdata/flag_sdata";
import {
  CalendarIcon,
  Flag,
  FlagIcon,
  IdCardLanyardIcon,
  MinusIcon,
  PlusIcon,
  TagIcon,
  Text,
  UserIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

interface FlagData {
  id: number;
  last_edit: string;
  category: string;
  author: string;
  title: string;
  description: string;
  added_in?: string;
  removed_in?: string;
  used_flags: string[];
  screenshots: string[];
}

export default function FlagInfoPage() {
  const { t, i18n } = useTranslation(["flag", "fcategories"]);
  const searchParams = useSearchParams();
  const ID = searchParams.get("id") ?? "0";
  const [flagData, setFlagData] = useState<FlagData>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFlagData = async () => {
      try {
        const res = await fetch(`${flagsRepoContentURL}/contents/${ID}.json`);

        if (res.status != 404) {
          const data: FlagData = await res.json();
          setFlagData(data);
        }
      } catch (error) {
        console.error("Error loading flag data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadFlagData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };
  if (loading) {
    return <LoadingBar />;
  }

  if (!flagData) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="flex flex-col items-center justify-center p-8 text-center">
              <div className="mb-4 p-3 rounded-full bg-muted">
                <Flag className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">{t("not_found")}</h2>
              <p className="text-muted-foreground text-sm">
                {t("not_found_desc")}
              </p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background text-foreground">
        <motion.div
          className="container mx-auto p-6 max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Card className="mb-6 border-border bg-card">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.6,
                        ease: "easeOut",
                        delay: 0.2,
                      }}
                    >
                      <CardTitle className="text-2xl font-bold text-card-foreground">
                        {flagData.title}
                      </CardTitle>
                    </motion.div>

                    <motion.div
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.6,
                        ease: "easeOut",
                        delay: 0.3,
                      }}
                    >
                      <motion.div variants={badgeVariants}>
                        <Badge
                          variant={"default"}
                          className="bg-secondary text-secondary-foreground transition-colors hover:bg-secondary/80"
                        >
                          <TagIcon className="w-3 h-3 mr-1" />
                          {t(flagData.category, { ns: "fcategories" })}
                        </Badge>
                      </motion.div>

                      <motion.div variants={badgeVariants}>
                        <Badge
                          variant={"default"}
                          className="bg-secondary text-secondary-foreground transition-colors hover:bg-secondary/80"
                        >
                          <IdCardLanyardIcon className="w-3 h-3 mr-1" />
                          {flagData.id}
                        </Badge>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <>
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.7 }}
                  >
                    <Separator className="bg-border" />
                  </motion.div>

                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 }}
                  >
                    <div className="flex items-center gap-2">
                      <Text className="w-4 h-4" />
                      <p className="text-sm font-medium text-card-foreground">
                        {t("description")}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <p className="text-sm text-muted-foreground">
                        {flagData.description}
                      </p>
                    </div>
                  </motion.div>
                </>
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.5 }}
                >
                  <Separator className="bg-border" />
                </motion.div>

                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
                >
                  <motion.div
                    className="flex items-center gap-3"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <UserIcon className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-card-foreground">
                        {t("added_by")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {flagData.author}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-3"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-card-foreground">
                        {t("last_edit")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Intl.DateTimeFormat(i18n.language, {
                          dateStyle: "medium",
                          timeStyle: "short",
                        }).format(new Date(flagData.last_edit))}
                      </p>
                    </div>
                  </motion.div>

                  {flagData.added_in && (
                    <motion.div
                      className="flex items-center gap-3"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <PlusIcon className="w-4 h-4" />
                      <div>
                        <p className="text-sm font-medium text-card-foreground">
                          {t("added_in")}
                        </p>
                        <p className="text-sm text-muted-foreground font-mono">
                          {flagData.added_in}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {flagData.removed_in && (
                    <motion.div
                      className="flex items-center gap-3"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <MinusIcon className="w-4 h-4" />
                      <div>
                        <p className="text-sm font-medium text-card-foreground">
                          {t("removed_in")}
                        </p>
                        <p className="text-sm text-muted-foreground font-mono">
                          {flagData.removed_in}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>

                <>
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.7 }}
                  >
                    <Separator className="bg-border" />
                  </motion.div>
                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 }}
                  >
                    <div className="flex items-center gap-2">
                      <FlagIcon className="w-4 h-4" />
                      <p className="text-sm font-medium text-card-foreground">
                        {t("used_flags")}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {flagData.used_flags.map((flag, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.4,
                            ease: "easeOut",
                            delay: 0.9 + index * 0.1,
                          }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <Badge variant="outline" className="font-mono">
                            {flag}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}
