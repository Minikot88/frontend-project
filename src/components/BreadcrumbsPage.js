import * as React from "react"
import Breadcrumbs from "@mui/material/Breadcrumbs"
import Link from "@mui/material/Link"
import PropTypes from "prop-types"
import { Link as RouterLink, useLocation } from "react-router-dom"
import { Grid, Typography } from "@mui/material"
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

{/* <BreadcrumbLayout
pages={[
          { title: "Admin Menu", path: `/adminmenu` },
          { title: "Animal Lists", path: `/animal-view` },
          { title: "Add Animal" },
]}
/> */}

const BreadcrumbsPage = ({ pages }) => {

  const navigate = useNavigate()
  const [login, setLogin] = React.useState(false)
  const [user, setUser] = React.useState({})
  const token = localStorage.getItem('token')

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#fafafa',
    border: '2.5px solid #0468BF',
    boxShadow: 24,
    pt: 1,
    px: 2,
    pb: 1,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (token !== null) {
      setLogin(true)
    } else {
      setLogin(false)
    }
    window.addEventListener('storage', () => {
      alert('คุณออกจากระบบแล้ว')
      if (token !== null) {
        setLogin(true)

      }
    })
  }, [])

  React.useEffect(() => {
    const getAccountByID = async () => {
      try {
        const token = await localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_SERVER}/getAccountByID`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response) {
          setUser(response?.data[0]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getAccountByID();
  }, []);


  return (
    <Grid container spacing={2} py={2} px={4}>
      <Grid item md={12} xs={12}>

        <Breadcrumbs
          separator={<KeyboardDoubleArrowRightIcon
            fontSize="small"
            style={{
              color: "#002100"
            }}

          />}

          aria-label="breadcrumb"
          color
          style={{
            color: "#0468BF"
          }}
        >
          {!login ? (
            <Link key={"home"} to={"/"}
              component={RouterLink}
              underline="hover"
              style={{
                color: "#b2102f",
              }}
            >
              หน้าหลัก
            </Link>
          ) : login && user?.status === 1 ? (
            <Link key={"home"} to={"/home.admin"}
              component={RouterLink}
              underline="hover"
              style={{
                color: "#b2102f",
              }}
            >
              หน้าหลัก
            </Link>
          ) : (
            <Link key={"home"} to={"/home.admin"}
              component={RouterLink}
              underline="hover"
              style={{
                color: "#b2102f",
              }}
            >
              หน้าหลัก
            </Link>
          )}
          {pages?.map((page) =>
            page?.path ? (
              <Link key={page?.title} to={page?.path} component={RouterLink}
                underline="hover"
                style={{
                  color: "#ab003c",
                }} >
                {page?.title}

              </Link>
            ) : (
              <Typography key={page?.title}>{page?.title}</Typography>
            ),
          )}
        </Breadcrumbs>

      </Grid>
    </Grid>
  )
}
BreadcrumbsPage.propTypes = {
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      path: PropTypes.string,
    }),
  ),
}
BreadcrumbsPage.defaultProps = {
  pages: [],
}
export default BreadcrumbsPage
