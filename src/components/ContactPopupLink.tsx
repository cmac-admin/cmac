"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

type ContactPopupLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  href?: string;
};

export function ContactPopupLink({ children, href = "/cmac/contact", ...props }: ContactPopupLinkProps) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window === "undefined") {
      return;
    }

    event.preventDefault();

    const width = 620;
    const height = 560;
    const left = Math.max(20, (window.screen.width - width) / 2);
    const top = Math.max(30, (window.screen.height - height) / 2);
    const currentPage = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    const popupUrl = new URL(href, window.location.origin);
    popupUrl.searchParams.set("page", currentPage);

    window.open(
      popupUrl.toString(),
      "cmac-contact-popup",
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,noopener,noreferrer`
    );
  };

  return (
    <a {...props} href={href} onClick={handleClick}>
      {children}
    </a>
  );
}
