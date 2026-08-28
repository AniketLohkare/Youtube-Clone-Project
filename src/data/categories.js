import {
  Gamepad2,
  Car,
  Trophy,
  Tv,
  Cpu,
  Music,
  Clapperboard,
  Newspaper,
  Home,
} from 'lucide-react'

export const categories = [
  { name: 'Home', slug: '/', id: 0, icon: Home },
  { name: 'Gaming', slug: 'gaming', id: 20, icon: Gamepad2 },
  { name: 'Automobiles', slug: 'automobiles', id: 2, icon: Car },
  { name: 'Sports', slug: 'sports', id: 17, icon: Trophy },
  { name: 'Entertainment', slug: 'entertainment', id: 24, icon: Tv },
  { name: 'Technology', slug: 'technology', id: 28, icon: Cpu },
  { name: 'Music', slug: 'music', id: 10, icon: Music },
  { name: 'Blogs', slug: 'blogs', id: 22, icon: Clapperboard  },
  { name: 'News', slug: 'news', id: 25, icon: Newspaper },
]
