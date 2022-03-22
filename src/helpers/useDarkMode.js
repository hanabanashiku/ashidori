import useMediaQuery from "@mui/material/useMediaQuery";

export default function useDarkMode() {
  return useMediaQuery("(prefers-color-scheme: dark)");
}
