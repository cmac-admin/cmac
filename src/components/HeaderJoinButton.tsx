"use client";

import { useEffect, useState } from "react";
import { DEFAULT_FORM_LINKS, resolveFormLink } from "@/lib/site-data";

export function HeaderJoinButton() {
  const [membershipUrl, setMembershipUrl] = useState(DEFAULT_FORM_LINKS.membership ?? "");

  useEffect(() => {
    let active = true;

    const loadMembershipUrl = async () => {
      const url = await resolveFormLink("membership", DEFAULT_FORM_LINKS);
      if (active) {
        setMembershipUrl(url || DEFAULT_FORM_LINKS.membership || "");
      }

    };

    loadMembershipUrl();

    return () => {
      active = false;
    };
  }, []);

  return (
    <a
      href={membershipUrl || DEFAULT_FORM_LINKS.membership || "#"}
      className="join-button join-button--secondary"
      target="_blank"
      rel="noopener noreferrer"
    >
      Join CMAC <span aria-hidden="true">→</span>
    </a>
  );
}