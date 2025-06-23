"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import wikiData from "@/wdata/list";
import WikiContent from "@/components/wiki/WikiContent";
import { LoadingBar } from "@/components/ifl";

function getPageBySlug(slug: string) {
  var rPage = null;
  for (const category of wikiData) {
    category.subs.forEach((subCategory) => {
      for (const page of subCategory.pages) {
        if (page.slug == slug) {
          rPage = page;
        }
      }
    });
  }

  return rPage != null ? rPage : null;
}

function getPreviousAndNextPage(currentSlug: string) {
  var pagePrev = null;
  var pageNext = null;
  for (const category of wikiData) {
    category.subs.forEach((subcat) => {
      for (var i = 0; i < subcat.pages.length; i++) {
        const crPage = subcat.pages[i];
        if (crPage.slug == currentSlug) {
          if (subcat.pages[i - 1] != undefined) {
            pagePrev = subcat.pages[i - 1];
          }
          if (subcat.pages[i + 1] != undefined) {
            pageNext = subcat.pages[i + 1];
          }
        }
      }
    });
  }

  return {
    prev: pagePrev,
    next: pageNext,
  };
}

export default function WikiPage() {
  const { slug } = useParams() as { slug: string };
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const page = getPageBySlug(slug);
  const proviData = getPreviousAndNextPage(slug);

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

  return (
    <WikiContent
      page={page}
      content={content}
      proviData={getPreviousAndNextPage(slug)}
    />
  );
}
