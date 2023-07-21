import { ReactComponent as HomeIcon } from "../src/assets/icons/navbar-icon-home.svg";
import { ReactComponent as SearchIcon } from "../src/assets/icons/navbar-icon-search.svg";
import { ReactComponent as PlusIcon } from "../src/assets/icons/navbar-icon-plus.svg";
import { ReactComponent as MessageIcon } from "../src/assets/icons/navbar-icon-message.svg";
import { ReactComponent as ProfileIcon } from "../src/assets/icons/navbar-icon-profile.svg";

export const NAVBAR_ROUTES = [
  {
    id: 1,
    icon: HomeIcon,
    route: "/home",
  },
  {
    id: 2,
    icon: SearchIcon,
    route: "/search",
  },
  {
    id: 3,
    icon: PlusIcon,
    route: "/create",
  },
  {
    id: 4,
    icon: MessageIcon,
    route: "/messages",
  },
  {
    id: 5,
    icon: ProfileIcon,
    route: "/profile",
  },
];
