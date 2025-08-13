import { SupportedCoinSymbol } from "@/src/library/coins";
import { useCoin } from "@/src/library/coins/hooks/useCoin";
import { useWalletDataByCoin } from "@/src/library/coins/hooks/useuseWalletDataByCoin";
import { useParams } from "react-router";
import { WalletDetailTokenItem } from "./WalletDetailTokenItem";

export const WalletDetailScreen = () => {
  const { coinSymbol } = useParams() as {
    coinSymbol: SupportedCoinSymbol;
  };
  const walletData = useWalletDataByCoin(coinSymbol);
  const coin = useCoin(coinSymbol);
  const tokens = coin?.getKnownTokenMetadata();

  if (!walletData) {
    return null;
  }

  return (
    <div>
      <div>{coin?.metadata.name}</div>
      {tokens && tokens.length > 0 && (
        <>
          <div>Tokens</div>
          <div>
            {tokens?.map((token) => (
              <WalletDetailTokenItem
                key={token.symbol}
                symbol={token.symbol}
                address={walletData?.address}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
