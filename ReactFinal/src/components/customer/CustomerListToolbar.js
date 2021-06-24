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

const CustomerListToolbar = (props) => {
  const [newSearch, setNewSearch] = useState("");
  const navigate = useNavigate();
  const Search = () => {
    if (document.getElementById("123").value !== "") {
      console.log(document.getElementById("123").value);
      navigate('/app/s1', { replace: true });
    } else {
      navigate('/app/s1', { replace: true });
    }
  };
  const addNewUser = (e, field) => {
    setNewSearch({
      ...newSearch,
      [field]: e.target.value,
    });
    console.log(newSearch);
    Search();
  };
  return (
    <Box {...props}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button
          onClick={() => { localStorage.clear(); navigate('/app/s1', { replace: true }); }}
        >
          Return
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => { navigate('/app/s2', { replace: true }); }}
        >
          Add product
        </Button>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                id="123"
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
                placeholder="Search product"
                variant="outlined"
                onChange={(e) => addNewUser(e, "Searching")}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default CustomerListToolbar;
