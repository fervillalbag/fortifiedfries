import { Link } from "react-router-dom";

import { Button, buttonVariants } from "../ui";

export default function Auth() {
  return (
    <div className="p-4">
      <Button>Hello</Button>
      <Link
        to="/"
        className={buttonVariants({
          variant: "outline",
          className: "mt-4",
        })}
      >
        This is a link
      </Link>
    </div>
  );
}
