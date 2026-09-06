"use client";

type ScholarshipApplicationButtonProps = {
  href: string;
  label: string;
};

export function ScholarshipApplicationButton({ href, label }: ScholarshipApplicationButtonProps) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (typeof window === "undefined") {
      return;
    }

    const popup = window.open(
      "",
      "cmacScholarshipPopup",
      "width=980,height=760,top=80,left=120,resizable=yes,scrollbars=yes"
    );

    if (!popup) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }

    popup.document.write(`<!doctype html>
      <html>
        <head>
          <title>CMAC Scholarship Application</title>
          <style>
            html, body { margin: 0; height: 100%; background: #f3efe7; font-family: Arial, sans-serif; }
            body { display: flex; flex-direction: column; }
            .popup-header {
              padding: 1rem 1.25rem;
              text-align: center;
              background: #0f2037;
              color: #f4d38d;
              border-bottom: 3px solid #c99c3d;
              font-size: 1.2rem;
              font-weight: 700;
              letter-spacing: 0.08em;
              text-transform: uppercase;
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
          <div class="popup-header">CMAC Scholarship Application</div>
          <iframe src="${href}" title="CMAC Scholarship Application"></iframe>
        </body>
      </html>`);

    popup.document.close();
  };

  return (
    <a
      href={href}
      className="apply-btn"
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
    >
      {label}
    </a>
  );
}
