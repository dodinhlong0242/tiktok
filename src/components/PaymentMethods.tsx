import { Card } from "react-bootstrap";

// dynamically load assets in src/assets (png/svg). Vite provides import.meta.glob
const assetMap = import.meta.glob('../assets/*.{png,svg}', { eager: true, as: 'url' }) as Record<string, string>;
const images: Record<string, string> = {};
Object.keys(assetMap).forEach((p) => {
  const name = p.split('/').pop()?.replace(/\.(png|svg)$/i, '')?.toLowerCase();
  if (name) images[name] = assetMap[p];
});

export default function PaymentMethods({
  selected,
  onSelect,
}: {
  selected?: string;
  onSelect?: (s: string) => void;
}) {
  const brands = [
    { id: "visa", label: "VISA", img: images['visa'] },
    { id: "mastercard", label: "Mastercard", img: images['mastercard'] },
    { id: "discover", label: "Discover", img: images['discover'] },
    { id: "amex", label: "Amex", img: images['amex'] },
    { id: "momo", label: "MoMo", img: images['momo'] },
    { id: "zalopay", label: "ZaloPay", img: images['zalopay'] },
    { id: "jcb", label: "JCB", img: images['jcb'] },
    { id: "unionpay", label: "UnionPay", img: images['unionpay'] },
  ];

  return (
    <Card className="border-0 shadow-sm mb-3">
      <Card.Body>
        <div className="fw-semibold mb-2">Payment method</div>
        <div className="d-flex align-items-center gap-2 flex-wrap">
          {brands.map((b) => {
            const active = selected === b.id;
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => onSelect && onSelect(b.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    if (onSelect) onSelect(b.id);
                  }
                }}
                aria-pressed={active}
                title={b.label}
                className={`payment-badge btn ${active ? "active" : ""}`}
              >
                {b.img ? (
                  <img src={b.img} alt={b.label} />
                ) : (
                  <div className="payment-fallback">{b.label[0]}</div>
                )}
                {active && (
                  <span className="payment-check" aria-hidden="true">✓</span>
                )}
              </button>
            );
          })}
        </div>
      </Card.Body>
    </Card>
  );
}
