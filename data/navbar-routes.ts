import {
  HomeIcon,
  ChatBubbleLeftIcon,
  UserCircleIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import { BsFillPlusSquareFill } from "react-icons/bs";

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
    icon: BsFillPlusSquareFill,
    route: "/actions",
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
