import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "../ui";
import { NAVBAR_ROUTES } from "../../data/navbar-routes";

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div
      className={`shadow-2xl shadow-@sura-primary-900 z-20 bottom-0 left-0 fixed w-full h-[68px] bg-white transition-opacity duration-300`}
    >
      <div className="shadow-md flex items-center h-full justify-between px-7">
        {NAVBAR_ROUTES.map((link) => (
          <Button
            key={link.id}
            variant="link"
            onClick={() => {
              navigate(link.route[0]);
            }}
            className="w-6 text-center bg-transparent grid place-items-center"
          >
            <link.icon
              className={
                link.route.includes(pathname)
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
