import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from 'react-router-dom';

export const Actions = () => {
  let [users, setUsers] = useState([]);
  let [userinfo, setUserinfo] = useState([]);
  // userLength is for showing the Data Loading message.
  let [userLength, setUserLength] = useState(null);

  let [products, setProducts] = useState([]);
  let [orderlist, setOrderlist] = useState([]);
  let [orderlistLength, setOrderlistLength] = useState(null);
  let [income, setIncome] = useState([]);
  // userLength is for showing the Data Loading message.
  let [productLength, setProductLength] = useState(null);
  let [detail, setDetail] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    fetch("http://localhost/php-react/all-users.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setUsers(data.users);
          setUserLength(true);
        } else {
          setUserLength(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    fetch("http://localhost/php-react/all-products.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setProducts(data.products);
          setProductLength(true);
        } else {
          setProductLength(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    fetch("http://localhost/php-react/all-orderlist.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setOrderlist(data.orderlist);
          setOrderlistLength(true);
        } else {
          setOrderlistLength(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Inserting a new user into the database.
  const insertUser = (newUser) => {
    fetch("http://localhost/php-react/add-user.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.id) {
          setUsers([
            {
              id: data.id,
              ...newUser,
            },
            ...users,
          ]);
          setUserLength(true);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Enabling the edit mode for a listed user.
  const editMode = (id) => {
    users = users.map((user) => {
      if (user.id === id) {
        user.isEditing = true;
        return user;
      }
      user.isEditing = false;
      return user;
    });
    setUsers(users);
  };

  // Cance the edit mode.
  const cancelEdit = (id) => {
    users = users.map((user) => {
      if (user.id === id) {
        user.isEditing = false;
        return user;
      }
      return user;
    });
    setUsers(users);
  };

  // Updating a user.
  const updateUser = (userData) => {
    fetch("http://localhost/php-react/update-user.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          users = users.map((user) => {
            if (user.id === userData.id) {
              user.isEditing = false;
              user.user_name = userData.user_name;
              user.user_email = userData.user_email;
              return user;
            }
            return user;
          });
          setUsers(users);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Deleting a user.
  const deleteUser = (theID) => {
    // filter outing the user.
    let userDeleted = users.filter((user) => {
      return user.id !== theID;
    });
    fetch("http://localhost/php-react/delete-user.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: theID }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setUsers(userDeleted);
          if (users.length === 1) {
            setUserLength(0);
          }
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Logincheck = (newUser) => {
    let x = 0;
    fetch("http://localhost/php-react/login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        console.log("res");
        return res.json();
      })
      .then((data) => {
        alert(data.result);
        if (data.success === 1) {
          setUserinfo(data.users);
          navigate('/app/dashboard', { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteProduct = (theID) => {
    let x = 0;
    fetch("http://localhost/php-react/delete-product.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: theID }),
    })
      .then((res) => {
        console.log("res");
        return res.json();
      })
      .then((data) => {
        alert(data.msg);
        fetch("http://localhost/php-react/all-products.php")
          .then((res) => {
            return res.json();
          })
          .then((data1) => {
            if (data1.success) {
              setProducts(data1.products);
              setProductLength(true);
            } else {
              setProductLength(0);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateProduct = (userData) => {
    fetch("http://localhost/php-react/update-product.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          alert(data.msg);
          fetch("http://localhost/php-react/all-products.php")
            .then((res) => {
              return res.json();
            })
            .then((data1) => {
              if (data1.success) {
                setProducts(data1.products);
                setProductLength(true);
              } else {
                setProductLength(0);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const insertProduct = (newUser) => {
    fetch("http://localhost/php-react/add-product.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          alert(data.msg);
          fetch("http://localhost/php-react/all-products.php")
            .then((res) => {
              return res.json();
            })
            .then((data1) => {
              if (data1.success) {
                setProducts(data1.products);
                setProductLength(true);
              } else {
                setProductLength(0);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(newUser);
        console.log(err);
      });
  };
  const Report = (newUser) => {
    fetch("http://localhost/php-react/report.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          alert("success");
          setIncome(data.users);
          console.log(data.users);
        } else {
          alert("fail");
        }
      })
      .catch((err) => {
        console.log(newUser);
        console.log(err);
      });
  };
  const deleteOrderlist = (theID) => {
    let x = 0;
    fetch("http://localhost/php-react/delete-orderlist.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: theID }),
    })
      .then((res) => {
        console.log("res");
        return res.json();
      })
      .then((data) => {
        alert(data.msg);
        fetch("http://localhost/php-react/all-orderlist.php")
          .then((res) => {
            return res.json();
          })
          .then((data1) => {
            if (data1.success) {
              setOrderlist(data1.orderlist);
              setOrderlistLength(true);
            } else {
              setOrderlistLength(0);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateOrderlist = (userData) => {
    fetch("http://localhost/php-react/update-orderlist.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          alert(data.msg);
          fetch("http://localhost/php-react/all-orderlist.php")
            .then((res) => {
              return res.json();
            })
            .then((data1) => {
              if (data1.success) {
                setOrderlist(data1.orderlist);
                setOrderlistLength(true);
              } else {
                setOrderlistLength(0);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const insertOrderlist = (newUser) => {
    fetch("http://localhost/php-react/add-orderlist.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          alert(data.msg);
          fetch("http://localhost/php-react/all-orderlist.php")
            .then((res) => {
              return res.json();
            })
            .then((data1) => {
              if (data1.success) {
                setOrderlist(data1.orderlist);
                setOrderlistLength(true);
              } else {
                setOrderlistLength(0);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(newUser);
        console.log(err);
      });
  };
  const Orderdetail = (newUser) => {
    fetch("http://localhost/php-react/orderdetail.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        console.log("res");
        return res.json();
      })
      .then((data) => {
        if (data.success === 1) {
          fetch("http://localhost/php-react/orderdetail.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          })
            .then((res) => {
              console.log("res");
              return res.json();
            })
            .then((data1) => {
              if (data1.success === 1) {
                alert(data1.result);
                setDetail(data1.detail);
              } else {
                alert(data1.result);
                setDetail(data1.detail);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          alert(data.result);
          setDetail([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteDetail = (theID, newUser) => {
    let x = 0;
    fetch("http://localhost/php-react/delete-detail.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: theID }),
    })
      .then((res) => {
        console.log("res");
        return res.json();
      })
      .then((data) => {
        fetch("http://localhost/php-react/orderdetail.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => {
            console.log("res");
            return res.json();
          })
          .then((data1) => {
            if (data1.success === 1) {
              alert(data1.result);
              setDetail(data1.detail);
            } else {
              alert(data1.result);
              setDetail(data1.detail);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateDetail = (userData, newUser) => {
    fetch("http://localhost/php-react/update-detail.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          alert(data.msg);
          fetch("http://localhost/php-react/orderdetail.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          })
            .then((res) => {
              console.log("res");
              return res.json();
            })
            .then((data1) => {
              if (data1.success === 1) {
                alert(data1.result);
                setDetail(data1.detail);
              } else {
                alert(data1.result);
                setDetail(data1.detail);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const insertDetail = (newUser) => {
    fetch("http://localhost/php-react/add-detail.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          alert(data.msg);
          fetch("http://localhost/php-react/orderdetail.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          })
            .then((res) => {
              console.log("res");
              return res.json();
            })
            .then((data1) => {
              if (data1.success === 1) {
                alert(data1.result);
                setDetail(data1.detail);
              } else {
                alert(data1.result);
                setDetail(data1.detail);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(newUser);
        console.log(err);
      });
  };
  return {
    users,
    products,
    userinfo,
    income,
    orderlist,
    orderlistLength,
    detail,
    editMode,
    cancelEdit,
    updateUser,
    insertUser,
    deleteUser,
    userLength,
    Logincheck,
    deleteProduct,
    updateProduct,
    insertProduct,
    Report,
    deleteOrderlist,
    updateOrderlist,
    insertOrderlist,
    Orderdetail,
    deleteDetail,
    updateDetail,
    insertDetail
  };
};
