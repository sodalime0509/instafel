"use client";

import { WikiCategory } from "@/wdata/wiki";
import {
  FileCog2,
  FlagIcon,
  GitBranchIcon,
  InfoIcon,
  Languages,
  PackageSearch,
  TriangleAlert,
  Users,
  Wrench,
} from "lucide-react";

const wikiData: WikiCategory[] = [
  {
    name: "General",
    subs: [
      {
        name: "Basics",
        icon: InfoIcon,
        pages: [
          {
            slug: "what-is-instafel",
            title: "What is Instafel?",
            description: "An article for explaining the Instafel app.",
            writer: "buraakkcayir",
          },
          {
            slug: "what-is-instagram-alpha",
            title: "What is Instagram Alpha?",
            description:
              "An article for explaining the basic logic of Instafel and Instagram Alpha.",
            writer: "buraakkcayir",
          },
        ],
      },
      {
        name: "Flag Modifications",
        icon: FlagIcon,
        pages: [
          {
            slug: "developer-options",
            title: "Developer Options",
            description: "An article for explaining the Developer Options.",
            writer: "buraakkcayir",
          },
          {
            slug: "flags-and-backups",
            title: "Flags and Backups",
            description: "An article for explaining the Flags and Backups.",
            writer: "buraakkcayir",
          },
        ],
      },
      {
        name: "Releases & Updates",
        icon: PackageSearch,
        pages: [
          {
            slug: "unclone-and-clone-versions",
            title: "Unclone and Clone Versions",
            description:
              "An article for explaining the basic logic of the Unclone and Clone versions of Instafel.",
            writer: "buraakkcayir",
          },
          {
            slug: "ota-updates",
            title: "OTA Updates",
            description:
              "An article for explaining the basic logic of the in-app OTA updates.",
            writer: "buraakkcayir",
          },
          {
            slug: "instafel-updater",
            title: "Instafel Updater",
            description: "An article for explaining the Instafel Updater App.",
            writer: "buraakkcayir",
          },
        ],
      },
      {
        name: "Limitations & Risks",
        icon: TriangleAlert,
        pages: [
          {
            slug: "limitations-and-warnings",
            title: "Limitations and Warnings",
            description:
              "An article for explaining the limitations and warnings of Instafel.",
            writer: "buraakkcayir",
          },
          {
            slug: "crash-reporting-and-troubleshooting",
            title: "Crash Reporting and Troubleshooting",
            description:
              "An article for explaining how you can report the crashes about Instafel.",
            writer: "buraakkcayir",
          },
          {
            slug: "common-misconceptions-what-instafel-is-and-is-not",
            title: "Common Misconceptions: What Instafel Is and Is Not",
            description:
              "An article for explaining the common misconceptions of Instafel.",
            writer: "buraakkcayir",
          },
        ],
      },
      {
        name: "Community & Support",
        icon: Users,
        pages: [
          {
            slug: "official-platforms",
            title: "Official Platforms",
            description: "An article for listing the official platforms.",
            writer: "buraakkcayir",
          },
          {
            slug: "community-rules",
            title: "Community Rules",
            description: "An article for explaining the community rules.",
            writer: "buraakkcayir",
          },
          {
            slug: "disclaimer",
            title: "Disclaimer",
            description:
              "An article for explaining how to reporting issues and the disclaimer.",
            writer: "buraakkcayir",
          },
        ],
      },
      {
        name: "For Backup Creators",
        icon: FileCog2,
        pages: [
          {
            slug: "exporting-backups",
            title: "Exporting Backups",
            description: "An article for explaining how you can export your backups.",
            writer: "buraakkcayir",
          },
          {
            slug: "contributing",
            title: "Contributing",
            description: "An article for explaining how you can contribute to the Backup Library.",
            writer: "buraakkcayir",
          },
        ],
      },
    ],
  },
  {
    name: "Translation",
    subs: [
      {
        name: "Beginning",
        icon: GitBranchIcon,
        pages: [],
      },
    ],
  },
  {
    name: "Documentation",
    subs: [
      {
        name: "Beginning",
        icon: GitBranchIcon,
        pages: [],
      },
    ],
  },
];

export default wikiData;
