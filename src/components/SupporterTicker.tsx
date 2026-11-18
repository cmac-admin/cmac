type SupporterTickerProps = {
  supporters: readonly string[];
  label: string;
};

export function SupporterTicker({ supporters, label }: SupporterTickerProps) {
  return (
    <div className="family-supporter-ticker" aria-label={label}>
      <div className="family-supporter-ticker__track">
        {[...supporters, ...supporters].map((name, index) => (
          <span key={`${name}-${index}`} className="family-supporter-ticker__item">
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
