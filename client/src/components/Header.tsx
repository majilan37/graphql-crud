import { memo } from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="px-4 py-2 shadow-md">
      <div className="max-w-7xl mx-auto">
        <Link
          className="text-2xl font-medium flex items-center gap-2 text-pink-500 "
          to="/">
          <img
            className="h-20 object-contain"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/2048px-GraphQL_Logo.svg.png"
            alt=""
          />
          <span>Graph QL</span>
        </Link>
      </div>
    </header>
  );
}

export default memo(Header);
