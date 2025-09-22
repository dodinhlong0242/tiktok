import { useEffect, useState } from "react";
import type { Selection } from "../App";
import { Modal, Button, Image, Spinner } from "react-bootstrap";

const assetMap = import.meta.glob('../assets/*.{png,svg}', { eager: true, as: 'url' }) as Record<string, string>;
const images: Record<string, string> = {};
Object.keys(assetMap).forEach((p) => {
  const name = p.split('/').pop()?.replace(/\.(png|svg)$/i, '')?.toLowerCase();
  if (name) images[name] = assetMap[p];
});

export default function OrderSummary({
  show,
  onClose,
  total,
  cardMask,
  completed,
  selected,
}: {
  show: boolean;
  onClose: () => void;
  total: number;
  cardMask?: string;
  completed?: boolean;
  selected?: Selection | null;
}) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let t: number | undefined;
    if (show) {
      setLoading(true);
      t = window.setTimeout(() => setLoading(false), 3000);
    } else {
      setLoading(false);
    }
    return () => {
      if (t) clearTimeout(t);
    };
  }, [show]);

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Order summary</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-between mb-3">
          <div>
            {selected == null && "No coins selected"}
            {selected === "custom" && "Custom amount"}
            {selected === "gift" && "Gift"}
            {typeof selected === "number" && `${selected.toLocaleString()} coins`}
          </div>
          <div>${total.toFixed(2)}</div>
        </div>

        <div className="mb-3">Select payment method</div>

        <div className="d-flex align-items-center mb-3">
          <div style={{ width: 120, background: "#fff", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", marginRight: 12, padding: 8 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
              {cardMask && images[cardMask.toLowerCase()] ? (
                <Image src={images[cardMask.toLowerCase()]} height={28} alt={cardMask} />
              ) : (
                <strong>{cardMask ?? "VISA"}</strong>
              )}
              <div style={{ marginTop: 8, width: 72, height: 6, background: "#2e5aa6", borderRadius: 3 }} />
              <div style={{ marginTop: 4, width: 56, height: 6, background: "#f0b400", borderRadius: 3 }} />
            </div>
          </div>
          <div style={{ fontFamily: "monospace" }}>{cardMask ? `************1895` : "************1895"}</div>
        </div>

        <div className="fw-bold">Total ${total.toFixed(2)}</div>

        {loading ? (
          <div className="d-flex align-items-center gap-2 mt-3">
            <Spinner animation="border" size="sm" variant="success" />
            <div>Processing payment...</div>
          </div>
        ) : (
          completed && (
            <div className="mt-3 d-flex align-items-center gap-3">
              <div className="check-wrap">
                <div className="check-circle">
                  <div className="check-mark">✓</div>
                </div>
              </div>
              <div className="text-success">
                <strong>Payment Completed</strong>
              </div>
            </div>
          )
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
