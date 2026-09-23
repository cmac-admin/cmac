"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_ORDER_SCHOOLS,
  fetchOrderSchools,
  type OrderSchool,
} from "@/lib/site-data";

function OrderButton({
  href,
  label,
}: {
  href: string | null;
  label: string;
}) {
  if (!href) {
    return (
      <button
        type="button"
        className="order-button order-button--disabled"
        disabled
      >
        {label} – Coming Soon
      </button>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="order-button"
    >
      {label}
    </a>
  );
}

export default function OrderHerePage() {
  const [schools, setSchools] = useState<OrderSchool[]>(DEFAULT_ORDER_SCHOOLS);

  useEffect(() => {
    let active = true;

    const loadSchools = async () => {
      const data = await fetchOrderSchools();
      if (active) {
        setSchools(data);
      }
    };

    loadSchools();

    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="subpage">
      <section className="subpage-hero">
        <h1>School Event Orders</h1>
        <p>
          Select your school and choose an item to order for upcoming music and
          drama events.
        </p>
      </section>

      <section className="content-card">
        <h2>Order by School</h2>
        <p className="muted-copy">
          Use the buttons below to start your order. Online checkout links can
          be updated as school-specific forms are finalized.
        </p>
        <div className="school-grid">
          {schools.map((school) => (
            <article key={school.name} className="school-card">
              <h3
                className={
                  school.longTitle
                    ? "school-card__title school-card__title--long"
                    : "school-card__title"
                }
              >
                {school.name}
              </h3>
              <div className="order-buttons">
                <OrderButton href={school.flowersUrl} label="Concert Flowers" />
                <OrderButton href={school.ornamentsUrl} label="Drama Ornaments" />
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
