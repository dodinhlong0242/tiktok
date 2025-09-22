import "react";
import { Card } from "react-bootstrap";

export default function CoinOption({
  icon,
  amount,
  price,
  active,
  onSelect,
}: {
  icon: string;
  amount: number;
  price: number;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <Card
      className={`coin-card ${active ? "active" : ""}`}
      role="button"
      onClick={onSelect}
    >
      <Card.Body className="coin-body">
        <div className="coin-left">
          <div className="coin-icon">
            <img src={icon} alt="coin" />
          </div>
          <div>
            <div className="coin-amount">{amount.toLocaleString()}</div>
            <div className="coin-price">${price.toFixed(2)}</div>
          </div>
        </div>
        {/* selected visual handled by CSS */}
      </Card.Body>
    </Card>
  );
}
