"use client";

import type React from "react";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Calendar,
  Edit3,
  Eye,
  FileText,
  Flag,
  Info,
  Loader2,
  Lock,
  Shield,
  UploadIcon,
  User,
} from "lucide-react";
import { flagsRepoContentURL } from "@/wdata/flag_sdata";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import matter from "gray-matter";
import { Badge } from "@/components/ui/badge";
import TagInput from "@/components/TagInput";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import MarkdownRenderer from "@/components/MarkdownRenderer";

export default function UpdateFlagPage() {
  const [id, setId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [category, setCategory] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [addedIn, setAddedIn] = useState<string>("");
  const [adminUsername, setAdminUs] = useState<string>("");
  const [adminPassword, setAdminPass] = useState<string>("");
  const [removedIn, setRemovedIn] = useState<string>("");
  const [usedFlags, setUsedFlags] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("edit");
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const submitFlagID = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const response = await fetch(`${flagsRepoContentURL}/contents/${id}.md`);

      if (!response.ok) {
        if (response.status == 404) {
          toast("404", {
            description: "Flag not found in respository, please check the ID",
            action: {
              label: "Okay",
              onClick: () => {},
            },
          });
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } else {
        const { data: frontmatter, content } = matter(await response.text());
        setTitle(frontmatter.title);
        setAddedIn(frontmatter.added_in != null ? frontmatter.added_in : "");
        setAdminUs(frontmatter.admin_username);
        setAdminPass(frontmatter.admin_password);
        setRemovedIn(
          frontmatter.removed_in != null ? frontmatter.removed_in : ""
        );
        setUsedFlags(
          frontmatter.used_flags != null ? frontmatter.used_flags : []
        );
        setCategory(frontmatter.category);
        var ag = content.split("\n");
        ag.shift();
        setContent(ag.join("\n"));
        setHasSubmitted(true);
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
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const submitUpdateReq = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingForm(true);

    const payload = {
      id,
      title,
      adminUsername,
      addedIn,
      removedIn,
      usedFlags,
      content,
      category: category,
    };

    try {
      const res = await fetch(
        // "https://api.mamiiblt.me/ifl/admin/user/edit-flag",
        "https://expert-broccoli-9vj4wg5x4g5fwv7-3000.app.github.dev/ifl/admin/user/update-flag",
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
        toast("Flag Updated", {
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
    } catch (err) {
      toast("Error occurred", {
        description:
          "An error occurred while sending / response of flag\n" + err,
        action: {
          label: "Okay",
          onClick: () => {},
        },
      });
      console.error("Error:", err);
    } finally {
      setIsSubmittingForm(false);
    }
  };

  return (
    <>
      {!hasSubmitted ? (
        <>
          <Navbar />
          <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">
                  Update Flag
                </CardTitle>
                <CardDescription>
                  Enter Flag ID for update an existing flag
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <form onSubmit={submitFlagID} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      id="id"
                      type="text"
                      placeholder="Enter Flag ID"
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading || !id.trim()}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "Load Flag"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          <Footer />
        </>
      ) : (
        <>
          <Navbar />
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
                      Update Flag
                    </h1>
                  </div>
                </div>

                <form onSubmit={submitUpdateReq} className="space-y-6">
                  <Card className="shadow-lg border-0 bg-card">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-2">
                        <Info className="h-5 w-5 text-primary" />
                        <CardTitle className="text-xl">Informations</CardTitle>
                      </div>
                      <CardDescription>
                        If you want, you can edit metadatas about flag too.
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
                            placeholder="Enter feature title"
                            className="h-11"
                            required
                          />
                        </div>
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
                              onChange={(e) => setAddedIn(e.target.value)}
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
                              onChange={(e) => setRemovedIn(e.target.value)}
                              placeholder="e.g., 385.0.0.0.11"
                              className="h-10"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="usedFlags"
                          className="text-sm font-semibold flex items-center gap-2"
                        >
                          <Flag className="h-4 w-4" />
                          Used Flags{" "}
                          <Badge variant="destructive" className="text-xs">
                            Required
                          </Badge>
                        </label>
                        <TagInput
                          id="usedFlags"
                          tags={usedFlags}
                          setTags={setUsedFlags}
                          placeholder="Add flag name (e.g., panavision_nav3)"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0 bg-card">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-2">
                        <Edit3 className="h-5 w-5 text-primary" />
                        <CardTitle className="text-xl">
                          Content Editor
                        </CardTitle>
                      </div>
                      <CardDescription>
                        Write your feature documentation using Markdown format
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="w-full"
                      >
                        <TabsList className="grid w-full grid-cols-2 h-11">
                          <TabsTrigger
                            value="edit"
                            className="flex items-center gap-2"
                          >
                            <Edit3 className="h-4 w-4" />
                            <span className="hidden sm:inline">Edit</span>
                          </TabsTrigger>
                          <TabsTrigger
                            value="preview"
                            className="flex items-center gap-2"
                          >
                            <Eye className="h-4 w-4" />
                            <span className="hidden sm:inline">Preview</span>
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="edit" className="mt-4">
                          <Textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your markdown content here..."
                            className="min-h-[400px] sm:min-h-[500px] font-mono text-sm resize-none"
                          />
                        </TabsContent>
                        <TabsContent value="preview" className="mt-4">
                          <div className="border rounded-lg p-4 sm:p-6 min-h-[400px] sm:min-h-[500px] overflow-y-auto bg-card">
                            {content ? (
                              <MarkdownRenderer
                                content={content}
                                imgSrc="https://raw.githubusercontent.com/instafel/flags/refs/heads/main/imgs/"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full text-muted-foreground">
                                <div className="text-center space-y-2">
                                  <FileText className="h-12 w-12 mx-auto opacity-50" />
                                  <p>No content to preview</p>
                                  <p className="text-sm">
                                    Start writing in the Edit tab
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0 bg-card">
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        <CardTitle className="text-xl ">
                          Admin Authentication
                        </CardTitle>
                      </div>
                      <CardDescription>
                        Admin credentials required for flag creation
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label
                            htmlFor="adminUs"
                            className="text-sm font-semibold flex items-center gap-2"
                          >
                            <User className="h-4 w-4" />
                            Admin Username
                          </label>
                          <Input
                            id="adminUs"
                            value={adminUsername}
                            onChange={(e) => setAdminUs(e.target.value)}
                            placeholder="username"
                            className="h-11"
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="adminPass"
                            className="text-sm font-semibold flex items-center gap-2"
                          >
                            <Lock className="h-4 w-4" />
                            Admin Password
                          </label>
                          <Input
                            id="adminPass"
                            value={adminPassword}
                            type="password"
                            onChange={(e) => setAdminPass(e.target.value)}
                            placeholder="Enter your password"
                            className="h-11"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
                    <CardContent className="pt-6">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-center sm:text-left">
                          <p className="font-semibold">Ready to update flag?</p>
                          <p className="text-sm text-muted-foreground">
                            You should check telegram API logs after sending
                            request!
                          </p>
                        </div>
                        <Button
                          type="submit"
                          size="lg"
                          disabled={isSubmittingForm}
                          className="w-full sm:w-auto min-w-[140px] h-12"
                        >
                          {isSubmittingForm ? (
                            <div className="flex items-center gap-2">
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                              Updating...
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <UploadIcon className="h-4 w-4" />
                              Update Flag
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
          <Footer />
        </>
      )}
    </>
  );
}
