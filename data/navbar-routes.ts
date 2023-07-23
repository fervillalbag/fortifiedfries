import {
  HomeIcon,
  PlusCircleIcon,
  ChatBubbleLeftIcon,
  UserCircleIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";

export const NAVBAR_ROUTES = [
  {
    id: 1,
    icon: HomeIcon,
    route: "/home",
  },
  {
    id: 2,
    icon: ShoppingBagIcon,
    route: "/search",
  },
  {
    id: 3,
    icon: PlusCircleIcon,
    route: "/create",
  },
  {
    id: 4,
    icon: ChatBubbleLeftIcon,
    route: "/messages",
  },
  {
    id: 5,
    icon: UserCircleIcon,
    route: "/profile",
  },
];
