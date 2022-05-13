import React from "react";

const API_URL = "https://jsonmock.hackerrank.com/api/movies/search/?page=";

/**
 * Custom hook for movies API
 * Example data:
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
const useApi = (page) => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState(null);

  const fetchData = (page) => {
    // API starts at page 1
    const apiPage = page + 1;

    fetch(`${API_URL}${apiPage}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setLoading(false);
        setData(json);
      });
  };

  React.useEffect(() => {
    fetchData(page);
  }, [page]);

  return { loading, data };
};

export default useApi;
