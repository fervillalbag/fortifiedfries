import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "../ui";
import { NAVBAR_ROUTES } from "../../data/navbar-routes";

interface NavbarProps {
  isVisible: boolean;
}

export default function Navbar({ isVisible }: NavbarProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div
      className={`z-20 bottom-0 left-0 fixed w-full ${
        isVisible && pathname === "/home"
          ? "opacity-0"
          : "opacity-100"
      } h-[70px] bg-[#f5f5f5] transition-opacity duration-200`}
    >
      <div className="shadow-md flex items-center h-full justify-between px-8">
        {NAVBAR_ROUTES.map((link) => (
          <Button
            key={link.id}
            variant="link"
            onClick={() => navigate(link.route)}
            className="w-6 text-center bg-transparent grid place-items-center"
          >
            <link.icon
              className={
                pathname === link.route
                  ? "link-active"
                  : "link-inactive"
              }
            />
          </Button>
        ))}
      </div>
    </div>
  );
}
