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
  const [page, setPage] = React.useState(0);
  /**
   * API response data. Example:
   * {
   *    page: 1,
   *    per_page: 10,
   *    total: 2770,
   *    total_pages: 277,
   *    data: [{
   *      Title: "Waterworld",
   *      Year: 1995,
   *      imdbID: "tt0114898"
   *    }, ...]
   * }
   */
  const [data, setData] = React.useState(null);

  const fetchMovies = (page) => {
    // API starts at page 1
    const apiPage = page + 1;

    fetch(`https://jsonmock.hackerrank.com/api/movies/search/?page=${apiPage}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setLoading(false);
        setData(json);
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
      {loading ? (
        <Loader />
      ) : (
        <MovieTable
          movieData={data.data}
          rowCount={data.total}
          rowsPerPage={data.per_page}
          totalPages={data.total_pages}
          curPage={page}
          onPageChange={(page) => {
            setPage(page);
          }}
        />
      )}
    </div>
  );
};

export default App;
