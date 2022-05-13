import React from "react";
import PropTypes  from "prop-types";
import Box from "@mui/material/Box";
import MovieIcon from "@mui/icons-material/Movie";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import MovieTableHead from "../../components/MovieTableHead";
import MovieTableToolbar from "../../components/MovieTableToolbar";

/**
 * Movie data table
 * Renders list of data from movie API
 */
const MovieTable = ({ movieData, rowCount, rowsPerPage, curPage, onPageChange }) => {

  /** Sorting order, either "asc" or "desc" */
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [filterStr, setFilterStr] = React.useState("");

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const handleRequestSort = (_, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleFilterChange = (inputStr) => {
    setFilterStr(inputStr.toLowerCase());
  };

  const filterRow = (row) =>
    row && row.Title && row.Title.toLowerCase().indexOf(filterStr) !== -1;

  const makeIMDBLink = (id) => `https://www.imdb.com/title/${id}`;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <MovieTableToolbar onFilterChange={handleFilterChange} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <MovieTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {/* Filter, sort, and render each row */}
              {movieData
                .filter(filterRow)
                .sort(getComparator(order, orderBy))
                .map((row, index) => (
                  <TableRow hover tabIndex={-1} key={`${row.Title}${index}`}>
                    <TableCell component="th" scope="row">
                      {row.Title}
                    </TableCell>
                    <TableCell align="right">{row.Year}</TableCell>
                    <TableCell align="right">
                      <Link href={makeIMDBLink(row.imdbID)} target="_blank">
                        <MovieIcon />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={rowCount}
          rowsPerPage={rowsPerPage}
          rowCount={rowCount}
          rowsPerPageOptions={[]}
          page={curPage}
          onPageChange={(_, page) => {
            onPageChange(page);
          }}
        />
      </Paper>
    </Box>
  );
};

MovieTable.propTypes = {
  movieData: PropTypes.array,
  rowCount: PropTypes.number, 
  rowsPerPage: PropTypes.number,
  curPage: PropTypes.number, 
  onPageChange: PropTypes.func, 
};

export default MovieTable;
