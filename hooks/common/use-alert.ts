import Swal from "sweetalert2";

export const useAlert = () => {
  const successAlert = (message: string) => {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: message,
    });
  };

  const errorAlert = (message: string) => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: message,
    });
  };

  return { successAlert, errorAlert };
};
