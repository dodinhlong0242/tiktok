import "react";
import { Button } from "react-bootstrap";

export default function RechargeButton({
  disabled,
  onClick,
}: {
  disabled: boolean;
  onClick?: () => void;
}) {
  return (
    <div className="text-center page-footer">
      <Button size="lg" className="px-5 recharge-btn" disabled={disabled} onClick={onClick}>
        Recharge
      </Button>
      {disabled && (
        <div className="text-muted small mt-2">
          Enter username and choose a package to continue
        </div>
      )}
    </div>
  );
}
