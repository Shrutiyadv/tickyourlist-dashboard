import React, { useEffect, useState, Fragment } from "react";

import axios from "axios";

import { Card, CardBody, Col, Row } from "reactstrap";

import TableContainer from "components/Common/TableContainer"

import Breadcrumbs from "../../components/Common/Breadcrumb"; // Adjust the path as needed
 
function TourGroupVariantsData() {

  const [variants, setVariants] = useState([]);

  const [loading, setLoading] = useState(true);
 
  useEffect(() => {

    const fetchTourGroupVariantsData = async () => {

      try {

        const response = await axios.get(

          "https://api.univolenitsolutions.com/v1/tyltraveltourgroupvariant/list?page=1&limit=20",

          {

            headers: {

              "x-api-key": "GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj",

              Authorization:

                "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ1bml2b2xlbml0c29sdXRpb25zLmNvbSIsImF1ZCI6InVuaXZvbGVuaXRzb2x1dGlvbnMuY29tIiwic3ViIjoiNjYxNzljNGY5NDM4OWM4NWNjZDQ2OTIxIiwiaWF0IjoxNzUxOTc0NzgzLCJleHAiOjE3NTQ1NjY3ODMsInBybSI6ImFkN2NlYWU3OTQ5ZDI3MjYwYjRiNzcwNjVkMjg2ODg1MTJmMzA1ZDk3ZTdkNWZmMTVmMTY2ODEzZGQ5ODBhMjg4YjA0MTRjNzMyNDM3YzdiMmIxZjQyNzM1ZWY2ZWM3NmI3ZTU2MTA0MmY5ZmUxNTRmYjdjOWJlZmQ0MDRlOTgzIn0.DcvKg0sa7ToAThDrsHrxd78KFqEMX4tG8JCuDa3jD5497JztY54JQlbxzqH6UMr0nKzUrcwZUC9RFum1vl76Gg",

            },

          }

        );
 
        if (response?.data?.data?.variants) {

          setVariants(response.data.data.variants);

        } else {

          console.warn("Unexpected response structure", response.data);

        }

      } catch (error) {

        console.error("Error fetching tour group variants:", error);

      } finally {

        setLoading(false);

      }

    };
 
    fetchTourGroupVariantsData();

  }, []);
 
  const columns = [
    {
      Header: "Variant Name",
      accessor: "name",
    },
    {
      Header: "Tour Name",
      accessor: "name",
      Cell: ({ row }) => (
        <a href="#" style={{ color: "blue", textDecoration: "underline" }}>
          {row.original.name}
        </a>
      ),
      id: "tourName",
    },
    {
      Header: "City",
      accessor: row => {
        // Try to get city from various possible locations in the data
        const city = row.city || row.location?.city || row.tourGroup?.city || row.tour?.city || row.venue?.city;
        return city || "Not specified";
      },
      id: "cityName",
    },
    {
      Header: "City Code",
      accessor: row => {
        // Try to get city code from various possible locations in the data
        const cityCode = row.cityCode || row.location?.cityCode || row.tourGroup?.cityCode || row.tour?.cityCode || row.venue?.cityCode;
        return cityCode || "Not specified";
      },
      id: "cityCode",
    },
    {
      Header: "Price",
      accessor: row =>
        row?.listingPrice?.prices?.[0]?.finalPrice
          ? `₹${row.listingPrice.prices[0].finalPrice}`
          : "-",
      id: "price",
    },
    {
      Header: "Status",
      Cell: ({ row }) => (
        <span className={`badge ${row.original.notAvailable ? 'bg-danger' : 'bg-success'} text-white`}>
          {row.original.notAvailable ? "Inactive" : "Active"}
        </span>
      ),
      id: "status",
    },
    {
      Header: "Actions",
      Cell: () => (
        <div className="d-flex justify-content-center gap-2">
          <i className="bx bx-edit-alt cursor-pointer" title="Edit" />
          <i className="bx bx-money cursor-pointer" title="Pricing" />
          <i className="bx bx-book-content cursor-pointer" title="Bookings" />
          <i className="bx bx-copy cursor-pointer" title="Duplicate" />
          <i className="bx bx-trash text-danger cursor-pointer" title="Delete" />
        </div>
      ),
      id: "actions",
    },
  ];
 
  return (
    <Fragment>
      <div className="container-fluid">
        <Breadcrumbs title="Tour Group Variants" breadcrumbItem="Tour Group Variants" />
        <Row>
          <Col xs="12">
            <Card>
              <CardBody>
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <TableContainer
                    columns={columns}
                    data={variants}
                    isGlobalFilter={true}
                    customPageSize={10}
                    className="align-middle text-center"
                  />
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </Fragment>
  );

}
 
export default TourGroupVariantsData;