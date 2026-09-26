export type PageStatus = "Main menu" | "Footer" | "Linked" | "Hidden";

export type SitePage = {
  path: string;
  label: string;
  description: string;
  status: PageStatus;
};

export type SitePageGroup = {
  category: string;
  pages: SitePage[];
};

// Keep in sync with src/app when pages are added, removed, or published.
export const SITE_PAGE_GROUPS: SitePageGroup[] = [
  {
    category: "Home & About",
    pages: [
      { path: "/", label: "Home", description: "Homepage", status: "Main menu" },
      { path: "/about", label: "About", description: "Mission, board, and student reps", status: "Main menu" },
      { path: "/QR_WhatIsCMAC", label: "QR / What Is CMAC", description: "Page opened from the CMAC QR code", status: "Hidden" },
    ],
  },
  {
    category: "Get Involved",
    pages: [
      { path: "/get-involved", label: "Get Involved", description: "Membership, donations, and volunteering", status: "Main menu" },
      { path: "/get-involved/volunteer", label: "Volunteer", description: "Older standalone volunteer page", status: "Linked" },
      { path: "/get-involved/membership", label: "Membership", description: "Older standalone membership page", status: "Linked" },
      { path: "/get-involved/landing", label: "Get Involved Landing", description: "Older Get Involved landing page", status: "Hidden" },
      { path: "/get-involved/board-review", label: "Get Involved Board Review", description: "Draft layout for board review", status: "Hidden" },
    ],
  },
  {
    category: "Scholarships & Grants",
    pages: [
      { path: "/scholarships", label: "Scholarships", description: "Senior and summer study scholarships", status: "Main menu" },
      { path: "/teacher-grants", label: "Teacher Grants", description: "Grants for music, art, and drama teachers", status: "Main menu" },
      { path: "/scholarships/feedback", label: "Scholarship & Grant Feedback", description: "Feedback from recipients", status: "Linked" },
    ],
  },
  {
    category: "Events & Orders",
    pages: [
      { path: "/events", label: "Events", description: "District events CMAC supports", status: "Main menu" },
      { path: "/order-here", label: "Order Here", description: "School event order portal", status: "Hidden" },
      { path: "/order-form", label: "Order Form", description: "Checkout and form embed", status: "Hidden" },
    ],
  },
  {
    category: "News",
    pages: [
      { path: "/news", label: "News", description: "Latest CMAC updates", status: "Main menu" },
      { path: "/news/logo-contest", label: "Logo Contest", description: "Logo contest story", status: "Linked" },
    ],
  },
  {
    category: "Impact",
    pages: [
      { path: "/impact-coming-soon", label: "Impact Coming Soon", description: "Placeholder shown for Our Impact", status: "Footer" },
      { path: "/our-impact", label: "Our Impact", description: "Full impact page (in progress)", status: "Hidden" },
    ],
  },
  {
    category: "Sponsors, Help & Info",
    pages: [
      { path: "/sponsors", label: "Sponsors", description: "Sponsor recognition", status: "Main menu" },
      { path: "/faq", label: "FAQ", description: "Frequently asked questions", status: "Footer" },
      { path: "/contact", label: "Contact CMAC", description: "Contact form and email", status: "Footer" },
      { path: "/privacy-policy", label: "Privacy Policy", description: "Privacy policy", status: "Footer" },
      { path: "/sitemap", label: "Sitemap", description: "Public site directory", status: "Footer" },
    ],
  },
  {
    category: "Board Tools",
    pages: [
      { path: "/snapshot-c2m0a2c3", label: "Snapshot Dashboard", description: "This page — event calendar and page list", status: "Hidden" },
    ],
  },
];
