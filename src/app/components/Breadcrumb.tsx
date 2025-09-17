"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumb: React.FC = () => {
  const pathname = usePathname();
  let pathSegments = pathname.split("/").filter((segment) => segment);

  // Skip breadcrumb for careers page
  // Path like /company/careers
  if (pathname.includes("/company/careers") || pathname.includes("privacy-policy") || pathname.includes("donor-5k")) {
    return null;
  }
  // Check if we're on an aircraft detail page and remove the registration segment
  if (pathSegments.length >= 3 && pathSegments[0] === "company" && pathSegments[1] === "careers") {
    // Remove the last segment (registration) for aircraft detail pages
    pathSegments = pathSegments.slice(0, -1);
  }

  if (pathSegments.length === 0) {
    return null; // Hide breadcrumb on home page
  }

  // Check if current page should have white text
  const doWhite =
    pathname.includes("newyear") ||
    pathname.includes("donornetworkwest") ||
    pathname.includes("management") ||
    pathname === "charter" ||
    pathname.includes("maintenance") ||
    (pathname.includes("company") && pathname !== "/company/contact");

  return (
    <div
      className="absolute top-29 md:mt-5 w-1/5 z-30 px-4 py-4"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-2">
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;

          return (
            <React.Fragment key={segment}>
              {index > 0 && (
                <span
                  className={`text-xs md:text-lg ${
                    doWhite ? "text-white" : "text-black"
                  }`}
                >
                  /
                </span>
              )}
              <li>
                <Link
                  href={href}
                  className={`text-xs md:text-3xl font-medium ${
                    isLast
                      ? doWhite
                        ? "text-white cursor-default"
                        : "text-black cursor-default"
                      : doWhite
                      ? "text-white hover:text-red-500"
                      : "text-black hover:text-red-500"
                  }`}
                  aria-current={isLast ? "page" : undefined}
                >
                  {segment.toUpperCase().replace(/-/g, " ")}
                </Link>
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </div>
  );
};

export default Breadcrumb;