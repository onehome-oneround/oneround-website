/*
  Editorial section tag — the issue/index metadata that opens every section.
  Renders a mono "NN / LABEL" line above a hairline rule, broadsheet-style.
  Colour is inherited (use accent-text or text-white at the call site).
*/

export default function EditorialTag({
  index,
  label,
  className = "",
}: {
  index: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={`hair-t flex items-baseline gap-3 pt-4 ${className}`}>
      <span className="kicker">{index}</span>
      <span aria-hidden="true" className="kicker opacity-40">
        /
      </span>
      <span className="kicker">{label}</span>
    </div>
  );
}
