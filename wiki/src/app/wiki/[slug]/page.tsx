"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import wikiData from "@/wdata/list";
import WikiContent from "@/components/wiki/WikiContent";
import { LoadingBar } from "@/components/ifl";

function getPageBySlug(slug: string) {
  for (const category of wikiData) {
    for (const page of category.pages) {
      if (page.slug === slug) return page;
    }
  }
  return null;
}

export default function WikiPage() {
  const { slug } = useParams() as { slug: string };
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const page = getPageBySlug(slug);

  useEffect(() => {
    if (!slug) return;

    fetch(`/wiki/${slug}.md`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.text();
      })
      .then(setContent)
      .catch(() => setContent("## MD can't be loaded."))
      .finally(() => setLoading(false));
  }, [slug]);

  if (!page) return notFound();
  if (loading) return <LoadingBar />;
  if (!content) return <div className="p-6">Content not found.</div>;

  return <WikiContent page={page} content={content} />;
}
