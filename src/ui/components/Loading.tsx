import Lottie from "react-lottie";
import loadingAnimation from "../../../assets/lottie/lottieLoading.json";

export const LoadingBig = () => {
  return (
    <div>
      <Lottie
        options={{
          animationData: loadingAnimation,
          loop: true,
          autoplay: true,
        }}
      />
      <div
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          textAlign: "center",
          marginTop: "-100px",
        }}
      >
        Loading...
      </div>
    </div>
  );
};
