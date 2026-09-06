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
    window.open(href, "cmac-contact-popup", "width=960,height=760,resizable=yes,scrollbars=yes");
  };

  return (
    <a {...props} href={href} onClick={handleClick}>
      {children}
    </a>
  );
}
