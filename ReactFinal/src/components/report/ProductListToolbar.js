import { useState, useContext } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppContext } from "../../Context";

const ProductListToolbar = (props) => {
  const navigate = useNavigate();
  const { Report } = useContext(AppContext);
  const doReport = (a, b) => {
    let date = {};
    date.startdate = a;
    date.enddate = b;
    console.log(date);
    Report(date);
  };
  return (
    <Box {...props}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button>
          Import
        </Button>
        <Button sx={{ mx: 1 }}>
          Export
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => { doReport(document.getElementById("start").value, document.getElementById("end").value); }}
        >
          report
        </Button>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                id="start"
                type="date"
                placeholder="Search product"
                variant="outlined"
              />
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                id="end"
                type="date"
                placeholder="Search product"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ProductListToolbar;
