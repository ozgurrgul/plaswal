import { useNavigate, useLocation } from "react-router";
import { ROUTES } from "../router/RouterConstants";

export const useAppNavigate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we can go back by looking at the location state or history
  const canGoBack = window.history.length > 1 && location.key !== "default";

  const goBack = () => {
    navigate(-1);
  };

  const goToWallet = () => {
    navigate(ROUTES.WALLET);
  };

  return {
    canGoBack,
    goBack,
    goToWallet,
  };
};
