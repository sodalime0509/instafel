import {
  Bot,
  BriefcaseBusiness,
  Camera,
  CircleFadingPlus,
  Ellipsis,
  GalleryVerticalEnd,
  MessageCircleMore,
  PhoneCall,
  Play,
  Send,
  StickyNote,
  SwatchBook,
  TvMinimalPlay,
  UserCircle,
  Wallpaper,
  Wrench,
} from "lucide-react";

const flagCategories = [
  {
    cif: "direct",
    icon: <Send />,
  },
  {
    cif: "reels",
    icon: <Play />,
  },
  {
    cif: "stories",
    icon: <CircleFadingPlus />,
  },
  {
    cif: "feed",
    icon: <GalleryVerticalEnd />,
  },
  {
    cif: "interface",
    icon: <SwatchBook />,
  },
  {
    cif: "notes",
    icon: <StickyNote />,
  },
  {
    cif: "quality",
    icon: <Wallpaper />,
  },
  {
    cif: "profile",
    icon: <UserCircle />,
  },
  {
    cif: "comments",
    icon: <MessageCircleMore />,
  },
  {
    cif: "camera",
    icon: <Camera />,
  },
  {
    cif: "meta-ai",
    icon: <Bot />,
  },
  {
    cif: "call",
    icon: <PhoneCall />,
  },
  {
    cif: "fixes",
    icon: <Wrench />,
  },
  {
    cif: "professional",
    icon: <BriefcaseBusiness />,
  },
  {
    cif: "livestreams",
    icon: <TvMinimalPlay />,
  },

  {
    cif: "other",
    icon: <Ellipsis />,
  },
];

export default flagCategories;
