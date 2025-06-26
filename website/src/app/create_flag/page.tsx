"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TagInput from "@/components/TagInput";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { flagCategories } from "@/wdata/flag_sdata";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

type Category = {
  id: string;
  name: string;
  icon: React.ReactNode;
};

export default function CreateContentPage() {
  const { t } = useTranslation("fcategories");
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [addedIn, setAddedIn] = useState<string>("");
  const [adminUsername, setAdminUs] = useState<string>("");
  const [adminPassword, setAdminPass] = useState<string>("");
  const [removedIn, setRemovedIn] = useState<string>("");
  const [usedFlags, setUsedFlags] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("edit");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      adminUsername,
      addedIn,
      removedIn,
      usedFlags,
      content,
      category: selectedCategory,
    };

    try {
      const res = await fetch(
        "https://expert-broccoli-9vj4wg5x4g5fwv7-3000.app.github.dev/ifl/admin/user/create-flag",
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
        toast("Request Sent Succesfully", {
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
      toast("Error occured", {
        description: "An error occured while sending / respose of flag\n" + err,
        action: {
          label: "Okay",
          onClick: () => {},
        },
      });
      console.error("❌ Error:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container py-8 max-w-5xl"
        >
          <form onSubmit={handleSubmit}>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Create New Flag in Flag Library</CardTitle>
                <CardDescription>
                  Fill in the metadata of your new content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">
                      Title (*)
                    </label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter feature title"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="description"
                      className="text-sm font-medium"
                    >
                      Description (*)
                    </label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter a brief description of feature"
                      rows={1}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="category" className="text-sm font-medium">
                      Flag Category (*)
                    </label>
                    <select
                      id="category"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="addedIn" className="text-sm font-medium">
                      Added In
                    </label>
                    <Input
                      id="addedIn"
                      value={addedIn}
                      onChange={(e) => setAddedIn(e.target.value)}
                      placeholder="Version in added (like '331.0.0.0.20')"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="removedIn" className="text-sm font-medium">
                      Removed In
                    </label>
                    <Input
                      id="removedIn"
                      value={removedIn}
                      onChange={(e) => setRemovedIn(e.target.value)}
                      placeholder="Version in removed (like '385.0.0.0.11')"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="usedFlags" className="text-sm font-medium">
                    Used Flags (*)
                  </label>
                  <TagInput
                    id="usedFlags"
                    tags={usedFlags}
                    setTags={setUsedFlags}
                    placeholder="Add flag name (like panavision_nav3)"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content</CardTitle>
                <CardDescription>
                  Write your feature content, it needs be written with Markdown
                  format
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="edit">Edit</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                  </TabsList>
                  <TabsContent value="edit" className="mt-4">
                    <Textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Write your markdown content here..."
                      className="min-h-[400px] font-mono"
                      rows={15}
                    />
                  </TabsContent>
                  <TabsContent value="preview" className="mt-4">
                    <div className="border rounded-lg p-4 min-h-[400px] overflow-y-auto">
                      <MarkdownRenderer
                        content={content}
                        imgSrc={
                          "https://raw.githubusercontent.com/instafel/flags/refs/heads/main/imgs/"
                        }
                      />
                    </div>
                  </TabsContent>
                </Tabs>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <label htmlFor="addedIn" className="text-sm font-medium">
                      Admin Username
                    </label>
                    <Input
                      id="adminUs"
                      value={adminUsername}
                      onChange={(e) => setAdminUs(e.target.value)}
                      placeholder="@xxxxx"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="removedIn" className="text-sm font-medium">
                      Admin Password
                    </label>
                    <Input
                      id="adminPass"
                      value={adminPassword}
                      type="password"
                      onChange={(e) => setAdminPass(e.target.value)}
                      placeholder="Super uber duber secret password"
                    />
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <div className="flex justify-end space-x-2">
                  <Button type="submit">Create Flag</Button>
                </div>
              </CardFooter>
              <p className="text-muted-foreground mr-6 mb-6 ml-6">
                You can read TG Admin group logs for follow status
              </p>
            </Card>
          </form>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}
