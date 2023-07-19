import { nanoid } from "nanoid";
import { Home } from "../screens";
import {
  Principal,
  Email,
  Name,
  Gender,
  Password,
  Username,
  Photos,
} from "../screens/Register";
import Root from "../screens/Root";

export const LIST_ROUTES_UNAUTHENTICATED = [
  {
    id: nanoid(3),
    component: Root,
    path: "/",
  },
  {
    id: nanoid(3),
    component: Principal,
    path: "/register",
  },
  {
    id: nanoid(3),
    component: Name,
    path: "/register-name",
  },
  {
    id: nanoid(3),
    component: Email,
    path: "/register-email",
  },
  {
    id: nanoid(3),
    component: Gender,
    path: "/register-gender",
  },
  {
    id: nanoid(3),
    component: Password,
    path: "/register-password",
  },
  {
    id: nanoid(3),
    component: Username,
    path: "/register-username",
  },
  {
    id: nanoid(3),
    component: Photos,
    path: "/register-photos",
  },
];

export const LIST_ROUTES_AUTHENTICATED = [
  {
    id: nanoid(3),
    component: Home,
    path: "/home",
  },
];
