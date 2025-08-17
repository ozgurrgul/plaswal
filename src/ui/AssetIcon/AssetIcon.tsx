import React from "react";
import { AssetSymbol } from "../../library/coins/types";
import { useAsset } from "../../library/coins/hooks/useAsset";
import "./AssetIcon.css";

interface Props {
  assetSymbol: AssetSymbol;
  size: number;
}

export const AssetIcon: React.FC<Props> = ({ assetSymbol, size }) => {
  const coinOrToken = useAsset(assetSymbol);

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
