import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import MovieTable from "../MovieTable";
import Loader from "../../components/Loader";

const App = () => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState(null);
  const [page, setPage] = React.useState(1);

  const fetchMovies = (page) => {
    fetch(`https://jsonmock.hackerrank.com/api/movies/search/?page=${page}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json.data);
        setLoading(false);
        setData(json.data);
      });
  };

  React.useEffect(() => {
    fetchMovies(page);
  }, [page]);

  return (
    <div className="App">
      {/** Header */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Movies
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      {/** Data table */}
      {loading ? <Loader /> : <MovieTable movieData={data} />}
    </div>
  );
};

export default App;
