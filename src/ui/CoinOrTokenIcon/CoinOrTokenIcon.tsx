import React from "react";
import { SupportedCoinOrTokenSymbol } from "../../library/coins/types";
import { useCoinOrToken } from "../../library/coins/hooks/useCoinOrToken";
import "./CoinOrTokenIcon.css";

interface Props {
  coinSymbol: SupportedCoinOrTokenSymbol;
  size: number;
}

export const CoinOrTokenIcon: React.FC<Props> = ({ coinSymbol, size }) => {
  const coinOrToken = useCoinOrToken(coinSymbol);

  if (!coinOrToken) {
    return null;
  }

  if (!coinOrToken.metadata.isNative) {
    return (
      <span className="token-icon">
        <img
          className="coin-or-token-icon"
          src={coinOrToken.metadata.iconUrl}
          alt={coinOrToken.metadata.name}
          width={size}
          height={size}
        />
        <img
          className="token-icon-parent"
          src={coinOrToken.metadata.iconUrl}
          alt={coinOrToken.metadata.name}
          width={size / 3}
          height={size / 3}
        />
      </span>
    );
  }

  return (
    <img
      className="coin-or-token-icon"
      src={coinOrToken.metadata.iconUrl}
      alt={coinOrToken.metadata.name}
      width={size}
      height={size}
    />
  );
};
