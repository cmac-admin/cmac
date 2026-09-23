type ScholarshipApplicationButtonProps = {
  href: string;
  label: string;
};

export function ScholarshipApplicationButton({ href, label }: ScholarshipApplicationButtonProps) {
  return (
    <a href={href} className="apply-btn" target="_blank" rel="noopener noreferrer">
      {label}
    </a>
  );
}