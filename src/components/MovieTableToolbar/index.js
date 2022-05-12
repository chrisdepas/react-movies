import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";

const MovieTableToolbar = ({ onFilterChange }) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Movie List
      </Typography>

      <Tooltip title="Filter list">
        <TextField
          id="input-filter"
          label="Filter by Title"
          variant="filled"
          onChange={(e) => {
            onFilterChange(e.target.value);
          }}
        />
      </Tooltip>
    </Toolbar>
  );
};

MovieTableToolbar.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default MovieTableToolbar;
