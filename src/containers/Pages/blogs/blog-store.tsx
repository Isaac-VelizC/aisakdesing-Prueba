import { Helmet } from "react-helmet-async";
import { CONFIG } from "src/config-global";
import { DashboardContent } from "src/layouts/dashboard";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import TextInput from "src/components/form/text-input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileInput from "src/components/form/file-input";
import SelectInput from "src/components/form/select-input";
import CheckboxInput from "src/components/form/checkbox-input";

/**
 * $table->unsignedBigInteger('author_id')->nullable(); // Debe coincidir con el tipo de 'categories.id'
            $table->foreign('author_id')->references('id')->on('users')->onDelete('set null');
            $table->unsignedBigInteger('category')->nullable(); // Debe coincidir con el tipo de 'categories.id'
            $table->foreign('category')->references('id')->on('categories')->onDelete('cascade');
            $table->string('title');
            $table->text('content');
            $table->boolean('is_published')->default(false);
            $table->string('image_url')->nullable(); // Imagen de portada del blog
 */
interface FormValues {
  category: string;
  title: string;
  content: string;
  image_url: File | null;
  is_published: boolean;
}

/*interface FormErrors {
  title?: string;
  price?: string;
  rating?: string;
}*/

const initialValues: FormValues = {
  category: "",
  title: "",
  image_url: null,
  is_published: false,
  content: "",
};

function PageBlogsStore() {
  const [values, setValues] = useState<FormValues>(initialValues);
  //const [errors, setErrors] = useState<FormErrors>({});
  const navigate = useNavigate();

  const categoriesOptions = [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "AI & Machine Learning",
  ];

  // Maneja el cambio de valores en los campos del formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // Maneja los cambios para campos de tipo select
  const handleSelectChange = (
    e: SelectChangeEvent<string | string[]>,
    fieldName: keyof FormValues
  ) => {
    setValues({
      ...values,
      [fieldName]: e.target.value as string[],
    });
  };

  // Maneja el cambio de archivo para la imagen del thumbnail
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setValues({
      ...values,
      image_url: file,
    });
  };

  const handleExit = () => navigate("/blog", { replace: true });

  return (
    <>
      <Helmet>
        <title> {`Blogs - Store - ${CONFIG.appName}`}</title>
      </Helmet>
      <DashboardContent>
        <Typography variant="h4" mb={4}>
          Publicar un nuevo blog
        </Typography>
        <Card sx={{ p: 2 }}>
          <form>
            <CardContent>
              <Grid container spacing={4}>
                <Grid size={{ xs: 12 }}>
                  <TextInput
                    label="Title"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={{ xs: 12, lg: 6 }}>
                  <SelectInput
                    label="Category"
                    name="category"
                    value={values.category}
                    onChange={(e) => handleSelectChange(e, "category")}
                    options={categoriesOptions}
                  />
                </Grid>
                <Grid size={{ xs: 12, lg: 6 }}>
                  <FileInput
                    onChange={handleFileChange}
                    fileName={values.image_url?.name}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                <CheckboxInput
                  label="Published"
                  checked={values.is_published}
                  onChange={(e) =>
                    setValues({ ...values, is_published: e.target.checked })
                  }
                />
              </Grid>
              </Grid>
            </CardContent>
            <CardActions sx={{ py: 2 }}>
              <Button variant="contained" type="submit">
                Submit
              </Button>
              <Button
                variant={"contained"}
                type="button"
                color="error"
                onClick={handleExit}
              >
                Cancel
              </Button>
            </CardActions>
          </form>
        </Card>
      </DashboardContent>
    </>
  );
}

export default PageBlogsStore;
