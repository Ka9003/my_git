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

const OrderListToolbar = (props) => {
  const [newSearch, setNewSearch] = useState("");
  const navigate = useNavigate();
  const Search = () => {
    if (document.getElementById("list123").value !== "") {
      console.log(document.getElementById("list123").value);
      navigate('/app/o1', { replace: true });
    } else {
      navigate('/app/o1', { replace: true });
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
          onClick={() => { localStorage.clear(); navigate('/app/o1', { replace: true }); }}
        >
          Return
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => { navigate('/app/o2', { replace: true }); }}
        >
          Add order
        </Button>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                id="list123"
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

export default OrderListToolbar;
