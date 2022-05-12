import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

/**
 * Centered animated loader
 * Takes up entire page
 */
const Loader = () => (
  <Box sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
    <CircularProgress />
  </Box>
);

export default Loader;