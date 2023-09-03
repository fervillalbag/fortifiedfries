import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "../ui";
import { NAVBAR_ROUTES } from "../../data/navbar-routes";

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div
      className={`shadow-md shadow-@sura-primary-600/50 z-20 bottom-0 left-0 fixed w-full h-[64px] bg-@sura-primary-50 transition-opacity duration-300`}
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
