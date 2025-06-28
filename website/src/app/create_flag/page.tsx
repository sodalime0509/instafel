"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TagInput from "@/components/TagInput";
import { flagCategories } from "@/wdata/flag_sdata";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import {
  FileText,
  Flag,
  Info,
  Calendar,
  Tag,
  Text,
  Image,
  Edit2Icon,
} from "lucide-react";
import AdminLoginProvider from "@/components/ui/AdminLoginProvider";
import Cookies from "js-cookie";
import { FlagCont } from "@/wdata/mconfig";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FlagDataEditor } from "@/components/FlagDataEditor";

export default function CreateContentPage() {
  const { t } = useTranslation("fcategories");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [addedIn, setAddedIn] = useState<string>("");
  const [removedIn, setRemovedIn] = useState<string>("");
  const [flags, setFlags] = useState<FlagCont[]>([]);
  const [screenshotList, setScreenshotList] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [adminUsername, setAdminUsername] = useState<string>("");
  const [adminPassword, setAdminPassword] = useState<string>("");

  useEffect(() => {
    setAdminUsername(Cookies.get("a_username"));
    setAdminPassword(Cookies.get("a_pass"));
  }, []);

  const handleVersionInput = (
    value: string,
    setter: (value: string) => void
  ) => {
    const regex = /^[0-9.]*$/;

    if (regex.test(value)) {
      setter(value);
    }
  };

  const checkFlagsValidity = (flags: FlagCont[]) => {
    var pass = true;
    if (flags.length == 0) {
      pass = false;
    }
    flags.forEach((flagItem) => {
      if (flagItem.name == "" || flagItem.properties.length == 0) {
        pass = false;
      }
      flagItem.properties.forEach((prop) => {
        if (prop.name == "") {
          pass = false;
        }
        if (prop.value_bool != undefined && prop.value_text == "") {
          pass = false;
        }
      });
    });
    return pass;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      title,
      description,
      author: adminUsername,
      category: selectedCategory,
      added_in: addedIn == "" ? null : addedIn,
      removed_in: removedIn == "" ? null : removedIn,
      flags,
      screenshots: screenshotList,
    };

    try {
      if (checkFlagsValidity(flags)) {
        const res = await fetch(
          "https://api.mamiiblt.me/ifl/admin/user/create-flag",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "ifl-admin-username": btoa(adminUsername),
              "ifl-admin-password": btoa(adminPassword),
            },
            body: JSON.stringify(payload),
          }
        );

        const data = await res.json();

        if (data.status == "SUCCESS") {
          toast("Flag Created", {
            description: data.extra.desc,
            action: {
              label: "Okay",
              onClick: () => {},
            },
          });
        } else if (data.status == "AUTHENTICATION_REJECTED") {
          toast("Authentication Rejected", {
            description: "Please write true admin login credentials",
            action: {
              label: "Okay",
              onClick: () => {},
            },
          });
        } else if (data.status == "FAILURE") {
          toast("Failure on API side", {
            description: data.extra.desc,
            action: {
              label: "Okay",
              onClick: () => {},
            },
          });
        } else {
          toast("Unknown Response", {
            description: JSON.stringify(data),
            action: {
              label: "Okay",
              onClick: () => {},
            },
          });
        }
      } else {
        toast("Flags are invalid", {
          description: "You has missing fields in flags editor",
          action: {
            label: "Okay",
            onClick: () => {},
          },
        });
      }
    } catch (err) {
      toast("Error occurred", {
        description:
          "An error occurred while sending / response of flag\n" + err,
        action: {
          label: "Okay",
          onClick: () => {},
        },
      });
      console.error("❌ Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <AdminLoginProvider>
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 lg:space-y-8"
            >
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                    Create New Flag
                  </h1>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <Card className="shadow-lg border-0 bg-card">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-2">
                      <Info className="h-5 w-5 text-primary" />
                      <CardTitle className="text-xl">Informations</CardTitle>
                    </div>
                    <CardDescription>
                      Essential details about new flag
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="title"
                          className="text-sm font-semibold flex items-center gap-2"
                        >
                          <FileText className="h-4 w-4" />
                          Title{" "}
                          <Badge variant="destructive" className="text-xs">
                            Required
                          </Badge>
                        </label>
                        <Input
                          id="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Write feature title"
                          className="h-11"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="category"
                          className="text-sm font-semibold flex items-center gap-2"
                        >
                          <Tag className="h-4 w-4" />
                          Category{" "}
                          <Badge variant="destructive" className="text-xs">
                            Required
                          </Badge>
                        </label>
                        <select
                          id="category"
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="flex h-11 w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          required
                        >
                          <option value="">Select a category</option>
                          {flagCategories.map((cat, idx) => (
                            <option key={idx} value={cat.cif}>
                              {t(cat.cif)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="description"
                        className="text-sm font-semibold flex items-center gap-2"
                      >
                        <Text className="h-4 w-4" />
                        Description{" "}
                        <Badge variant="destructive" className="text-xs">
                          Required
                        </Badge>
                      </label>
                      <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Write a description about flag (like what is that, what is the purpose etc. and more things about that)"
                        className="min-h-[400px] sm:min-h-[200px] text-sm resize-none"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="screenshotList"
                        className="text-sm font-semibold flex items-center gap-2"
                      >
                        <Image className="h-4 w-4" />
                        Screenshot Filenames{" "}
                        <Badge variant="destructive" className="text-xs">
                          Required
                        </Badge>
                      </label>
                      <TagInput
                        id="screenshotList"
                        tags={screenshotList}
                        setTags={setScreenshotList}
                        placeholder="(e.g. test_image.png, hello_world.jpg)"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <h3 className="font-semibold text-sm">
                          Version Information
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label
                            htmlFor="addedIn"
                            className="text-sm font-medium text-muted-foreground"
                          >
                            Added In Version
                          </label>
                          <Input
                            id="addedIn"
                            value={addedIn}
                            onChange={(e) =>
                              handleVersionInput(e.target.value, setAddedIn)
                            }
                            placeholder="e.g., 331.0.0.0.20"
                            className="h-10"
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="removedIn"
                            className="text-sm font-medium text-muted-foreground"
                          >
                            Removed In Version
                          </label>
                          <Input
                            id="removedIn"
                            value={removedIn}
                            onChange={(e) =>
                              handleVersionInput(e.target.value, setRemovedIn)
                            }
                            placeholder="e.g., 385.0.0.0.11"
                            className="h-10"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-card">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-2">
                      <Edit2Icon className="h-5 w-5 text-primary" />
                      <CardTitle className="text-xl">Flags Editor</CardTitle>
                    </div>
                    <CardDescription>
                      Add MetaConfig flag informations manually
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FlagDataEditor
                      initialFlags={flags}
                      onFlagsChange={(flags: FlagCont[]) => setFlags(flags)}
                    />
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
                  <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-center sm:text-left">
                        <p className="font-semibold">Send API Request</p>
                        <p className="text-sm text-muted-foreground ">
                          You should check API logs at Telegram after sending
                          request!
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Logged as <b>{adminUsername}</b>
                        </p>
                      </div>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto min-w-[140px] h-12"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            Creating...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Flag className="h-4 w-4" />
                            Create Flag
                          </div>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </form>
            </motion.div>
          </div>
        </div>
      </AdminLoginProvider>
      <Footer />
    </>
  );
}
