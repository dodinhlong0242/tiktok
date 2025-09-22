import "react";
import { Card, Badge } from "react-bootstrap";

export default function GiftOption({
  icon,
  subtitle,
  active,
  onSelect,
}: {
  icon: string;
  subtitle: string;
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
          <div className="coin-icon gift">
            <img src={icon} alt="gift" />
          </div>
          <div>
            <div className="coin-amount">Gift</div>
            <div className="coin-price">{subtitle}</div>
          </div>
        </div>
        {active && <Badge bg="primary">Selected</Badge>}
      </Card.Body>
    </Card>
  );
}
