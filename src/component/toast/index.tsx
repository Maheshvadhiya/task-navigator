import Toast from "react-native-toast-message";

type ToastType = "success" | "error" | "info";

// Common toast message function
export const ToastMessage = ({
  type,
  message,
}: {
  type: ToastType;
  message: string;
}) => {
  Toast.show({
    type: type,
    position: "bottom",
    text1: message,
    visibilityTime:
      type === "error" ? 5000 : 3000,
    autoHide: true,
    topOffset: 0,
    swipeable: false,
    text1Style: {
      fontSize: 13,
      width: "100%",
      color:
        type === "error"
          ? "red"
          : type === "info"
            ? "orange"
            : "green",
    },
  });
};
