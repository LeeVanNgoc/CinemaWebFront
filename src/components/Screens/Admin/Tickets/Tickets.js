import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

const theme = createTheme();

const columns = [
  { field: "id", headerName: "ID" },
  { field: "title", headerName: "Title" },
  { field: "price", headerName: "Price" },
  { field: "category", headerName: "Category" },
  { field: "description", headerName: "Description" },
];

export const Tickets = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        const formattedData = response.data.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          category: item.category,
          description: item.description,
        }));
        setRows(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-col h-screen p-4">
        <header className="p-4">Header</header>
        <div className="flex-1">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 20, 50]}
            checkboxSelection
            disableSelectionOnClick
            sx={{ width: "100%" }}
          />
        </div>
      </div>
    </ThemeProvider>
  );
};
