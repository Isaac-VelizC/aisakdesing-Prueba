import React, { useState } from "react";
import {
  Typography,
  Button,
  CardContent,
  Card,
  CardActions,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { SelectChangeEvent } from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import { DashboardContent } from "src/layouts/dashboard";
import TextInput from "src/components/form/text-input";
import FileInput from "src/components/form/file-input";
import SelectInput from "src/components/form/select-input";
import CheckboxInput from "src/components/form/checkbox-input";

// Define las interfaces para los valores del formulario y los errores
interface FormValues {
  category: string;
  title: string;
  description: string;
  price: string;
  thumbnail_url: File | null;
  file_url: string;
  is_published: boolean;
  rating: string;
  preview: string;
  frameworks: string[];
  programming_languages: string[];
}

interface FormErrors {
  title?: string;
  price?: string;
  rating?: string;
}

const initialValues: FormValues = {
  category: "",
  title: "",
  description: "",
  price: "",
  thumbnail_url: null,
  file_url: "",
  is_published: false,
  rating: "",
  preview: "",
  frameworks: [],
  programming_languages: [],
};

const ProductForm: React.FC = () => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const navigate = useNavigate();

  // Opciones para Select de Frameworks, Lenguajes y Categorías
  const frameworksOptions = ["React", "Angular", "Vue", "Svelte"];
  const programmingLanguagesOptions = [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
  ];
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
      thumbnail_url: file,
    });
  };

  // Validación del formulario
  const validate = (): boolean => {
    let tempErrors: FormErrors = {};
    tempErrors.title = values.title ? "" : "Title is required";
    tempErrors.price = values.price ? "" : "Price is required";
    tempErrors.rating =
      +values.rating >= 1 && +values.rating <= 5
        ? ""
        : "Rating must be between 1 and 5";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  // Maneja el envío del formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      // Aquí puedes añadir la lógica para enviar los datos al backend
      console.log("Submitting", values);
      navigate("/products"); // Redirige a otra página después de enviar
    }
  };

  const handleExit = () => navigate("/products", { replace: true });

  return (
    <DashboardContent>
      <Typography variant="h4" mb={4}>
        Register New Product
      </Typography>
      <Card sx={{ p: 2 }}>
        <Typography
          component={"p"}
          my={1}
          ml={2}
          sx={{ fontWeight: "400", fontSize: 10, color: "text.disabled" }}
        >
          Por favor, complete todos los campos obligatorios marcados con un
          asterisco (*) antes de enviar el formulario. Asegúrese de ingresar
          información válida y precisa, especialmente en los campos de precios.
          Los archivos subidos deben cumplir con los formatos y tamaños
          especificados. Revise toda la información antes de enviar para evitar
          errores o datos incompletos.
        </Typography>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextInput
                  isrequired
                  label="Title"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  error={!!errors.title}
                  helperText={errors.title}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FileInput
                  onChange={handleFileChange}
                  fileName={values.thumbnail_url?.name}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <TextInput
                  label="Price"
                  name="price"
                  type="number"
                  value={values.price}
                  onChange={handleChange}
                  error={!!errors.price}
                  helperText={errors.price}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <TextInput
                  label="File URL"
                  name="file_url"
                  value={values.file_url}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <TextInput
                  label="Rating"
                  name="rating"
                  type="number"
                  value={values.rating}
                  onChange={handleChange}
                  error={!!errors.rating}
                  helperText={errors.rating}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <TextInput
                  label="Preview URL"
                  name="preview"
                  value={values.preview}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                <SelectInput
                  label="Category"
                  name="category"
                  value={values.category}
                  onChange={(e) => handleSelectChange(e, "category")}
                  options={categoriesOptions}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                <SelectInput
                  label="Frameworks"
                  name="frameworks"
                  value={values.frameworks}
                  onChange={(e) => handleSelectChange(e, "frameworks")}
                  options={frameworksOptions}
                  multiple
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                <SelectInput
                  label="Programming Languages"
                  name="programming_languages"
                  value={values.programming_languages}
                  onChange={(e) =>
                    handleSelectChange(e, "programming_languages")
                  }
                  options={programmingLanguagesOptions}
                  multiple
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
              <Grid size={{ xs: 12 }}>
                <TextInput
                  label="Description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>
          </CardContent>

          <CardActions sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
            <Button variant="contained" color="error" onClick={handleExit}>
              Cancelar
            </Button>
          </CardActions>
        </form>
      </Card>
    </DashboardContent>
  );
};

export default ProductForm;
