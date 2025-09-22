import React from "react";
import { Card, Form } from "react-bootstrap";

export default function UsernameForm({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Card className="mb-3 border-0 shadow-sm">
      <Card.Body>
        <Form.Label className="fw-semibold">Enter TikTok username</Form.Label>
        <Form.Control
          placeholder="@username"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="promo-text mt-2 small">
          TikTok Free Recharge for 24H!!
        </div>
      </Card.Body>
    </Card>
  );
}
