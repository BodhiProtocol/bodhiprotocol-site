import {
  Brain,
  Coins,
  Crown,
  Globe,
  Landmark,
  Layers,
  Lightbulb,
  MapPin,
  Radio,
  Scale,
  Shield,
  Target,
  TrendingUp,
  UserCog,
  Users,
  type LucideIcon,
} from "lucide-react";

// Shared icon-name lookup for Mental Models, Big Ideas, Enduring Influence, and
// Central Thesis cards across all Great Minds pages. Extend this map when a
// new figure's frontmatter references an icon name that isn't here yet.
const GREAT_MINDS_ICON_MAP: Record<string, LucideIcon> = {
  Brain,
  Lightbulb,
  Globe,
  Layers,
  TrendingUp,
  Scale,
  UserCog,
  MapPin,
  Landmark,
  Coins,
  Radio,
  Target,
  Crown,
  Shield,
  Users,
};

export { GREAT_MINDS_ICON_MAP };
