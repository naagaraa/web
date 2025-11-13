/* eslint-disable jsx-a11y/alt-text */
import {
  LayoutDashboard,
  Image,
  Text,
  Upload,
  SlidersHorizontal,
  Camera,
  Mic,
  Video,
  Layers,
  Download,
} from "lucide-react";

export const categories = [
  { id: "design", icon: <LayoutDashboard size={20} />, label: "Design" },
  { id: "elements", icon: <Image size={20} />, label: "Elements" },
  { id: "text", icon: <Text size={20} />, label: "Text" },
  { id: "uploads", icon: <Upload size={20} />, label: "Uploads" },
  { id: "tools", icon: <SlidersHorizontal size={20} />, label: "Tools" },
  { id: "images", icon: <Camera size={20} />, label: "Images" },
  { id: "audio", icon: <Mic size={20} />, label: "Audio" },
  { id: "video", icon: <Video size={20} />, label: "Video" },
  { id: "layers", icon: <Layers size={20} />, label: "Layers" },
  { id: "export", icon: <Download size={20} />, label: "Export" },
];
