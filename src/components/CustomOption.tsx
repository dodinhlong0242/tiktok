import "react";
import { Card, Badge, Form } from "react-bootstrap";

export default function CustomOption({
  icon,
  value,
  active,
  onFocus,
  onChange,
}: {
  icon: string;
  value: string;
  active: boolean;
  onFocus: () => void;
  onChange: (v: string) => void;
}) {
  return (
    <Card className={`coin-card ${active ? "active" : ""}`}>
      <Card.Body className="coin-body">
        <div className="coin-left w-100">
          <div className="coin-icon alt">
            <img src={icon} alt="custom" />
          </div>
          <div className="w-100">
            <div className="coin-amount">Custom</div>
            <Form.Control
              className="mt-1"
              type="number"
              min={1}
              placeholder="Choose any"
              value={value}
              onFocus={onFocus}
              onChange={(e) => onChange(e.target.value)}
            />
          </div>
        </div>
        {active && <Badge bg="primary">Selected</Badge>}
      </Card.Body>
    </Card>
  );
}
