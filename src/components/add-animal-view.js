import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"

import { Helmet } from "react-helmet"

import Header from "../layouts/header-layout"
import Footer from "../layouts/footer-layout"
import "./archiveview.css"
import { request } from "../axios-config"
import BreadcrumbLayout from "../components/breadcrumb-layout"
import { Box } from "@mui/system"
import {
  Backdrop,
  Button,
  ButtonBase,
  Grid,
  IconButton,
  Typography,
} from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { Delete } from "@mui/icons-material"
import useAxiosPrivate from "../hook/use-axios-private"

const AnimalVeview = (props) => {
  const [me, setMe] = useState()
  const requestPrivate = useAxiosPrivate()

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const getMe = async () => {
      try {
        const response = await requestPrivate.get("/me", {
          signal: controller.signal,
        })
        isMounted && setMe(response?.data)
      } catch (error) {
        history.push("./login")
        console.error(error)
      }
    }
    getMe()
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])
  console.log(me)
  const history = useHistory()

  const [searchDatas, setSearchDatas] = useState([])
  const [refetch, setRefetch] = useState(false)
  const [openFullImage, setOpenFullImage] = useState({ open: false, img: "" })

  const columns = [
    {
      field: "index",
      headerName: "#",
      headerClassName: "super-app-theme--header",
      width: 50,
      flex: 0,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "photo",
      headerName: "photo",
      headerClassName: "super-app-theme--header",
      width: 100,
      align: "center",
      headerAlign: "center",

      renderCell: (params) =>
        params?.row?.photo ? (
          <ButtonBase
            onClick={() => {
              setOpenFullImage({ open: true, img: params?.row?.photo })
            }}
          >
            <Box
              component="img"
              sx={{ width: "40px", height: "40px" }}
              src={params?.row?.photo}
            />
          </ButtonBase>
        ) : (
          <Typography>no photo</Typography>
        ),
    },
    {
      field: "kingdom",
      headerName: "Kingdom",
      headerClassName: "super-app-theme--header",
      width: 150,
    },

    {
      field: "category",
      headerName: "Category",
      headerClassName: "super-app-theme--header",
      width: 200,
    },
    
    {
      field: "phylum",
      headerName: "Phylum",
      headerClassName: "super-app-theme--header",
      width: 150,
    },

    {
      field: "aclass",
      headerName: "Class",
      headerClassName: "super-app-theme--header",
      width: 150,
    },

    {
      field: "order",
      headerName: "Order",
      headerClassName: "super-app-theme--header",
      width: 150,
    },

    {
      field: "family",
      headerName: "Family",
      headerClassName: "super-app-theme--header",
      width: 150,
    },

    {
      field: "genericName",
      headerName: "Genus",
      headerClassName: "super-app-theme--header",
      width: 150,
    },

    {
      field: "specificEpithet",
      headerName: "Species",
      headerClassName: "super-app-theme--header",
      width: 150,
    },

    {
      field: "authorName1",
      headerName: "Author Name(s)",
      headerClassName: "super-app-theme--header",
      width: 150,
    },

    {
      field: "sp",
      headerName: "SP.(กรณีไม่ทราบสปีชีส์)",
      headerClassName: "super-app-theme--header",
      width: 150,
    },

    {
      field: "subspecies",
      headerName: "Subspecies",
      headerClassName: "super-app-theme--header",
      width: 150,
    },

    {
      field: "commonName",
      headerName: "Common Name",
      headerClassName: "super-app-theme--header",
      width: 150,
    },

    {
      field: "vercularName",
      headerName: "Local Name",
      headerClassName: "super-app-theme--header",
      width: 150,
    },

    {
      field: "locality",
      headerName: "Locality",
      headerClassName: "super-app-theme--header",
      width: 150,
    },

    {
      field: "ecologyAndHabitat",
      headerName: "Habitat",
      headerClassName: "super-app-theme--header",
      width: 150,
    },

    {
      field: "specimenRepository",
      headerName: "Specimen Repository",
      headerClassName: "super-app-theme--header",
      width: 150,
    },

    {
      field: "molecularData",
      headerName: "Molecular Data",
      headerClassName: "super-app-theme--header",
      width: 150,
    },

    {
      field: "utilization",
      headerName: "Utilization",
      headerClassName: "super-app-theme--header",
      width: 150,
    },

    {
      field: "edit",
      headerName: "Edit",
      headerClassName: "super-app-theme--header",
      width: 100,
      flex: 0,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Button
          onClick={() => {
            history.push(`/animal-edit/${params?.row?._id}`)
          }}
        >
          Edit
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "จัดการ",
      headerClassName: "super-app-theme--header",
      width: 100,
      flex: 0,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (

        <IconButton
          onClick={() => {
            RemoveArchive(params?.row?._id)
          }}
        >
          <Delete />
        </IconButton>
      ),
    },
  ]

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const search = async () => {
      try {
        const response = await request.get("/getallsitems", {
          signal: controller.signal,
        })
        isMounted && setSearchDatas(response?.data)
        if (response) {
          setRefetch(false)
        }
      } catch (error) {
        console.error(error)
      }
    }
    search()
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [refetch])
  console.log(searchDatas)

  const RemoveArchive = async (id) => {
    try {
      const confirmed = confirm("Are you sure you want to delete this item?")
      if (confirmed) {
        const response = await requestPrivate.delete(`/itemremove/${id}`, {})
        if (response) {
          setRefetch(true)
          alert("success")
        }
      }
    } catch (error) {
      alert(`${error?.data?.message}`)
    }
  }

  return (
    <div className="archiveview-container">
      <Helmet>
        <title>Archiveview - Sci PSU Archive</title>
        <meta
          name="description"
          content="Science Natural Archive Platform is initated by Faculty of Science, Prince of Songkla University."
        />
        <meta property="og:title" content="Archiveview - Sci PSU Archive" />
        <meta
          property="og:description"
          content="Science Natural Archive Platform is initated by Faculty of Science, Prince of Songkla University."
        />
      </Helmet>
      <Header rootClassName="header-root-class-name6" auth={true}></Header>
      <BreadcrumbLayout
        pages={[
          { title: "Admin Menu", path: `/adminmenu` },
          { title: "Animal Lists" },
        ]}
      />
      <div className="archiveview-archive-list">
        <h1>
          <span>Animal Lists</span>
          <br></br>
        </h1>
        <Box
          sx={{
            height: 400,
            width: 1,
            "& .super-app-theme--header": {
              backgroundColor: "primary.light",
              color: "white",
            },
          }}
        >
          <Grid container>
            <Grid container justifyContent={"flex-end"} item xs={12} md={12}>
              <Button
                component={Link}
                to="/add-animal"
                variant="contained"
                sx={{ alignContent: "flex-end", mb: 2 }}
              >
                Add
              </Button>
            </Grid>
          </Grid>
          <DataGrid
            rows={
              searchDatas ? searchDatas?.filter((data)=>
              data.category === "ANIMAL_VERTEBRATES" ||
              data.category === "ANIMAL_INVERTEBRATES"
              )  
              .map((e, index) => ({
                  ...e,
                  id: e._id,
                  index: index + 1,
                }))
                : []
            }
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </Box>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openFullImage?.open}
          onClick={() => {
            setOpenFullImage({ open: false, img: "" })
          }}
        >
          {" "}
          <Box
            component="img"
            // sx={{ width: "40px", height: "40px" }}
            src={openFullImage?.img}
          />
        </Backdrop>

      </div>
      <Footer rootClassName="footer-root-class-name5"></Footer>
    </div>
  )
}

export default AnimalVeview
