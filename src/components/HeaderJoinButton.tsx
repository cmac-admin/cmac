"use client";

const getSchoolYearLabel = () => {
  const today = new Date();
  const startYear = today >= new Date(today.getFullYear(), 7, 15)
    ? today.getFullYear()
    : today.getFullYear() - 1;

  return `${startYear}-${startYear + 1}`;
};

export function HeaderJoinButton() {
  const handleClick = () => {
    const url =
      "https://docs.google.com/forms/d/e/1FAIpQLSd3H1Sqc-KhiCq5U9LUeACC7AUIQQnyPMifdTXLea3xW8oJHw/viewform";

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
          <div class="popup-header">CMAC ${yearLabel}</div>
          <iframe src="${url}" title="CMAC Membership Form ${yearLabel}"></iframe>
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
