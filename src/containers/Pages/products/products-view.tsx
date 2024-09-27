import { Box, Button, Pagination, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { _products } from "src/_mock";
import { DashboardContent } from "src/layouts/dashboard";
import { ProductItem, ProductItemProps } from "./product-item";
import { AddOutlined } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fCurrency } from "src/utils/format-number";
import { ModalView } from "src/components/modal/modal-view";

export function ProductsView() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductItemProps | null>(null);
  const navigate = useNavigate();

  const handleOpen = (product: ProductItemProps) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedProduct(null);
  };

  const handleNavigate = () => {
    navigate("/product-store");
  };

  return (
    <DashboardContent>
      <Box display={"flex"} alignItems={"center"} mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Products
        </Typography>
        <Button
          variant={"contained"}
          color={"primary"}
          startIcon={<AddOutlined />}
          onClick={handleNavigate}
        >
          New Project
        </Button>
      </Box>
      <Grid container spacing={3}>
        {_products.map((product) => (
          <Grid key={product.id} size={{ xs: 12, sm: 6, md: 3 }}>
            <ProductItem product={product} onOpen={() => handleOpen(product)} />
          </Grid>
        ))}
      </Grid>
      <Pagination count={10} color="primary" sx={{ mt: 8, mx: "auto" }} />
      {/* DIALOG */}
      <ModalView
        fullWidth={true}
        maxWidth={"md"}
        aria-labelledby={`modal-${selectedProduct?.name}`}
        aria-describedby={`modal-${selectedProduct?.name}`}
        title={selectedProduct?.name}
        children={
          <>
            <Box></Box>
            <Typography variant="body1">
              Price:{" "}
              {selectedProduct?.price && fCurrency(selectedProduct.price)}
              <br />
              Status: {selectedProduct?.status}
            </Typography>
          </>
        }
        onClose={handleClose}
        open={openModal}
      />
    </DashboardContent>
  );
}
