import { useNavigate } from "react-router";
import { ROUTES } from "../router/RouterConstants";

export const useAppNavigate = () => {
  const navigate = useNavigate();

  const goToWallet = () => {
    navigate(ROUTES.WALLET);
  };

  const goToWalletDetail = (coinSymbol: string) => {
    navigate(`${ROUTES.WALLET_DETAIL.replace(":coinSymbol", coinSymbol)}`);
  };

  return {
    goToWallet,
    goToWalletDetail,
  };
};
