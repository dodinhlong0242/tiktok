import "react";
import { Row, Col } from "react-bootstrap";
import CoinOption from "./CoinOption";
import CustomOption from "./CustomOption";
import GiftOption from "./GiftOption";
import type { Selection } from "../App";
import tiktokCoin from "../assets/tiktok-coin.png";

export const COINS = [
  { amount: 70, price: 0.6 },
  { amount: 350, price: 3.5 },
  { amount: 700, price: 7.4 },
  { amount: 1400, price: 16.3 },
  { amount: 3500, price: 37.0 },
  { amount: 7000, price: 73.2 },
  { amount: 17500, price: 180.0 },
] as const;

export default function CoinList({
  selected,
  onSelect,
  customAmount,
  onChangeCustom,
}: {
  selected: Selection;
  onSelect: (s: Selection) => void;
  customAmount: string;
  onChangeCustom: (v: string) => void;
}) {
  return (
    <Row className="g-5 justify-content-center">
      {COINS.slice(0, 6).map(({ amount, price }) => (
        <Col md={6} key={amount} className="d-flex align-items-stretch justify-content-center">
          <CoinOption
            icon={tiktokCoin}
            amount={amount}
            price={price}
            active={selected === amount}
            onSelect={() => onSelect(amount)}
          />
        </Col>
      ))}

      <Col md={4} className="d-flex align-items-stretch justify-content-center">
        <CoinOption
          icon={tiktokCoin}
          amount={COINS[6].amount}
          price={COINS[6].price}
          active={selected === COINS[6].amount}
          onSelect={() => onSelect(COINS[6].amount)}
        />
      </Col>

        <Col md={4} className="d-flex align-items-stretch justify-content-center">
        <CustomOption
          icon={tiktokCoin}
          value={customAmount}
          active={selected === "custom"}
          onFocus={() => onSelect("custom")}
          onChange={onChangeCustom}
        />
      </Col>

      <Col md={4} className="d-flex align-items-stretch justify-content-center">
        <GiftOption
          icon={tiktokCoin}
          subtitle="Instant"
          active={selected === "gift"}
          onSelect={() => onSelect("gift")}
        />
      </Col>
    </Row>
  );
}
