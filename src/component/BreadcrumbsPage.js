import * as React from "react"
import Breadcrumbs from "@mui/material/Breadcrumbs"
import Link from "@mui/material/Link"
import PropTypes from "prop-types"
import { Link as RouterLink, useLocation } from "react-router-dom"
import { Grid, Typography } from "@mui/material"
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


{/* <BreadcrumbLayout
pages={[
          { title: "Admin Menu", path: `/adminmenu` },
          { title: "Animal Lists", path: `/animal-view` },
          { title: "Add Animal" },
]}
/> */}

const BreadcrumbsPage = ({ pages }) => {
  // const location = useLocation()
  // console.log(location)
  return (
    <Grid container spacing={2} py={2} px={4}>
      <Grid item md={12} xs={12}>

        <Breadcrumbs
          separator={<NavigateNextIcon
            fontSize="small"
            style={{
              color: "#ab003c"
            }}

          />}
          aria-label="breadcrumb"
          color
          style={{
            color: "#AA00FF"
          }}
        >
          <Link key={"home"} to={"/"}
            component={RouterLink}
            underline="hover"
            style={{
              color: "#ab003c",
            }}
          >
            Home
          </Link>

          {pages?.map((page) =>
            page?.path ? (
              <Link key={page?.title} to={page?.path} component={RouterLink}>
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
