"use client";

import { useEffect, useState } from "react";
import { DEFAULT_FORM_LINKS, resolveFormLink } from "@/lib/site-data";

const getSchoolYearLabel = () => {
  const today = new Date();
  const startYear = today >= new Date(today.getFullYear(), 7, 15)
    ? today.getFullYear()
    : today.getFullYear() - 1;

  return `${startYear}-${startYear + 1}`;
};

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

  const handleClick = () => {
    if (!membershipUrl) {
      return;
    }

    const popup = window.open(
      "",
      "cmacJoinPopup",
      "width=980,height=760,top=80,left=120,resizable=yes,scrollbars=yes"
    );

    if (!popup) {
      return;
    }

    const yearLabel = getSchoolYearLabel();

    popup.document.write(`<!doctype html>
      <html>
        <head>
          <title>CMAC ${yearLabel} Membership Form</title>
          <style>
            html, body { margin: 0; height: 100%; background: #f3efe7; font-family: Arial, sans-serif; }
            body { display: flex; flex-direction: column; }
            .popup-header {
              padding: 1rem 1.25rem;
              text-align: center;
              background: #0f2037;
              color: #f4d38d;
              border-bottom: 3px solid #c99c3d;
              font-size: 1.35rem;
              font-weight: 800;
              letter-spacing: 0.06em;
              text-transform: uppercase;
              line-height: 1.3;
            }
            iframe {
              flex: 1;
              width: 100%;
              min-height: 680px;
              border: 0;
            }
          </style>
        </head>
        <body>
          <div class="popup-header">CMAC ${yearLabel} Membership Form</div>
          <iframe src="${membershipUrl}" title="CMAC Membership Form ${yearLabel}"></iframe>
        </body>
      </html>`);

    popup.document.close();
  };

  return (
    <button type="button" className="join-button join-button--secondary" onClick={handleClick}>
      Join CMAC <span aria-hidden="true">→</span>
    </button>
  );
}
