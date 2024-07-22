import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import { KeyboardArrowUp } from "@mui/icons-material";
import useScrollTrigger from "@mui/material/useScrollTrigger";

export default function ScrollToTop() {
  return (
    <Zoom in={useScrollTrigger({ threshold: 100 })}>
      <Fab
        onClick={() => {
          window.scrollTo(0, 0);
        }}
        variant="circular"
        size="small"
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
        }}
        color="primary"
        aria-label="add"
      >
        <KeyboardArrowUp fontSize="medium" />
      </Fab>
    </Zoom>
  );
}
