"use client";

import { motion } from "framer-motion";
import { Calendar, Tag } from "lucide-react";
import { WikiPage } from "@/wdata/wiki";
import MarkdownRenderer from "@/components/MarkdownRenderer";

interface WikiContentProps {
  page: WikiPage;
  content: string;
}

export default function WikiContent({ page, content }: WikiContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 p-8 max-w-4xl mx-auto"
    >
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-bold mb-2"
        >
          {page.title}
        </motion.h1>

        {page.description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 text-muted-foreground mb-4"
          >
            {page.description}
          </motion.p>
        )}
      </div>

      <MarkdownRenderer content={content} />
    </motion.div>
  );
}
