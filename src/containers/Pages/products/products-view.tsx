import {
  Box,
  Button,
  Link,
  Pagination,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DashboardContent } from "src/layouts/dashboard";
import { ProductItem } from "./product-item";
import { AddOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModalView } from "src/components/modal/modal-view";
import { ProjectDatas } from "src/interfaces/Project";
import { deleteDocument, readDocuments } from "src/services/crud-projects";
import { LoaderProgress } from "src/components/Loader/loader";

export function ProductsView() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProjectDatas | null>(
    null
  );
  const [projects, setProjects] = useState<ProjectDatas[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const projectsData = await readDocuments();
        setProjects(projectsData);
      } catch {
        setError("Error loading Projects");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleOpen = (product: ProjectDatas) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedProduct(null);
  };

  const handleDelete = async (id: string) => {
    console.log(id);

    try {
      await deleteDocument(id);
      setProjects((prev) => prev.filter((project) => project.id !== id)); // Actualiza el estado después de eliminar
      handleClose();
      console.log("Document deleted successfully.");
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const handleNavigate = () => navigate("/product-store");

  const renderProjects = () => {
    if (loading) return <LoaderProgress />;
    if (error)
      return (
        <Typography variant="h5" color="error">
          {error}
        </Typography>
      );

    return (
      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid key={project.id} size={{ xs: 12, sm: 6, md: 3 }}>
            <ProductItem product={project} onOpen={() => handleOpen(project)} />
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Products
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddOutlined />}
          onClick={handleNavigate}
        >
          New Project
        </Button>
      </Box>
      {renderProjects()}
      {projects.length > 0 || !loading ? (
        <Pagination
          count={Math.ceil(projects.length / 5)}
          color="primary"
          sx={{ mt: 8, mx: "auto" }}
        />
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="50vh" // Adjust height as needed
        >
          <Typography variant="h3">No hay Datos</Typography>
        </Box>
      )}
      {/* DIALOG */}
      <ModalView
        key={selectedProduct?.id}
        fullWidth
        maxWidth="lg"
        aria-labelledby={`modal-${selectedProduct?.title}`}
        aria-describedby={`modal-${selectedProduct?.title}`}
        title={selectedProduct?.title}
        children={
          selectedProduct && (
            <Box>
              <Grid container spacing={4}>
                <Grid size={{ sm: 12, md: 6 }}>
                  <Box
                    component="img"
                    src={selectedProduct.thumbnail_url}
                    alt={selectedProduct.title}
                    sx={{
                      objectFit: "cover",
                      borderRadius: "20px",
                      width: "100%",
                    }}
                  />
                </Grid>
                <Grid size={{ sm: 12, md: 6 }}>
                  <Typography variant="body1">
                    {selectedProduct.description}
                  </Typography>
                  <Box>
                    {selectedProduct.file_url && (
                      <Link variant="body1" href={selectedProduct.file_url}>
                        Files
                      </Link>
                    )}
                    {selectedProduct.preview && (
                      <Link variant="body1" href={selectedProduct.preview}>
                        Preview
                      </Link>
                    )}
                  </Box>
                  {selectedProduct.frameworks.join(", ")}
                  {selectedProduct.programming_languages.join(", ")}
                </Grid>
              </Grid>
            </Box>
          )
        }
        onClose={handleClose}
        onDelete={() => selectedProduct && handleDelete(selectedProduct.id)}
        open={openModal}
      />
    </DashboardContent>
  );
}
