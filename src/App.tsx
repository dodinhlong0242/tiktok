import React from "react";
import { Container } from "react-bootstrap";
import UsernameForm from "./components/UsernameForm";
import CoinList, { COINS } from "./components/CoinList";
import PaymentMethods from "./components/PaymentMethods";
import RechargeButton from "./components/RechargeButton";
import OrderSummary from "./components/OrderSummary";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export type Selection = number | "custom" | "gift" | null;

export default function App() {
  const [username, setUsername] = React.useState("");
  const [selected, setSelected] = React.useState<Selection>(null);
  const [customAmount, setCustomAmount] = React.useState<string>("");

  const canRecharge =
    username.trim().length > 0 &&
    selected !== null &&
    (selected !== "custom" || Number(customAmount) > 0);

  const [showOrder, setShowOrder] = React.useState(false);
  const [orderCompleted, setOrderCompleted] = React.useState(false);
  const [selectedPayment, setSelectedPayment] = React.useState<string | undefined>(undefined);

  function computeTotal() {
    if (!selected) return 0;
    if (selected === "custom") return Number(customAmount) || 0;
    const found = COINS.find((c) => c.amount === selected);
    return found ? found.price : 0;
  }

  const handleRecharge = () => {
    setShowOrder(true);
    setOrderCompleted(false);
    // simulate payment processing
    setTimeout(() => {
      setOrderCompleted(true);
    }, 1600);
  };

  return (
    <div className="page-bg d-flex justify-content-center py-5">
  <div className="content-card w-100" style={{ maxWidth: 1100 }}>
        <Container className="py-4">
        <h3 className="title text-center mb-4">Buy coins for other</h3>
        <UsernameForm value={username} onChange={setUsername} />
        <CoinList
          selected={selected}
          onSelect={setSelected}
          customAmount={customAmount}
          onChangeCustom={setCustomAmount}
        />
    <PaymentMethods selected={selectedPayment} onSelect={setSelectedPayment} />
    <RechargeButton disabled={!canRecharge} onClick={handleRecharge} />
  <OrderSummary show={showOrder} onClose={() => setShowOrder(false)} total={computeTotal()} completed={orderCompleted} cardMask={selectedPayment ? selectedPayment.toUpperCase() : undefined} selected={selected} />
        </Container>
      </div>
    </div>
  );
}
