import { useMediaQuery } from "@mui/material";

const useIsMobile = () => {
  return useMediaQuery("(max-width: 600px)");
};

export default useIsMobile;
