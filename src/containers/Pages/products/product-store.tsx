import React, { useEffect, useState } from "react";
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
import SelectInput from "src/components/form/select-input";
import CheckboxInput from "src/components/form/checkbox-input";
import { ProjectDatas } from "src/interfaces/Project";
import {
  createProject,
  listFrameworks,
  listLanguajes,
} from "src/services/crud-projects";
import { Framework } from "src/interfaces/Frameworks";
import { LanguajeData } from "src/interfaces/Languajes";
// Define las interfaces para los valores del formulario y los errores

interface FormErrors {
  title?: string;
  price?: string;
  rating?: string;
}

const initialValues: ProjectDatas = {
  id: "",
  title: "",
  short: "",
  description: "",
  thumbnail_url: "",
  file_url: "",
  is_published: false,
  preview: "",
  frameworks: [],
  programming_languages: [],
};

const ProductForm: React.FC = () => {
  const [values, setValues] = useState<ProjectDatas>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [options, setOptions] = useState<{
    frameworks: { label: string; value: string }[];
    languajes: { label: string; value: string }[];
  }>({ frameworks: [], languajes: [] });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [frameworksOptions, languajesOptions] = await Promise.all([
          listFrameworks(),
          listLanguajes(),
        ]);

        const formattedFrameworks = frameworksOptions.map(
          (framework: Framework) => ({
            label: framework.name,
            value: framework.id,
          })
        );

        const formattedLanguajes = languajesOptions.map(
          (data: LanguajeData) => ({
            label: data.languaje,
            value: data.id,
          })
        );

        setOptions({
          frameworks: formattedFrameworks,
          languajes: formattedLanguajes,
        });
      } catch (error) {
        console.error("Error loading options", error);
      }
    };

    fetchOptions();
  }, []);

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
    fieldName: keyof ProjectDatas
  ) => {
    setValues({
      ...values,
      [fieldName]: e.target.value as string[],
    });
  };

  // Maneja el cambio de archivo para la imagen del thumbnail
  /*const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setValues({
      ...values,
      thumbnail_url: file,
    });
  };*/

  // Validación del formulario
  const validate = (): boolean => {
    let tempErrors: FormErrors = {};
    tempErrors.title = values.title ? "" : "Title is required";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      // Aquí puedes añadir la lógica para enviar los datos al backend
      await createProject(values);
      //console.log("Submitting", values);
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
              <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <TextInput
                  label="Img URL"
                  name="thumbnail_url"
                  value={values.thumbnail_url}
                  onChange={handleChange}
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
              <Grid size={{ xs: 12 }}>
                <TextInput
                  isrequired
                  label="Short"
                  name="short"
                  value={values.short}
                  onChange={handleChange}
                  //error={!!errors}
                  //helperText={errors.title}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                <TextInput
                  label="Preview URL"
                  name="preview"
                  value={values.preview}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                <SelectInput
                  label="Frameworks"
                  name="frameworks"
                  value={values.frameworks}
                  onChange={(e) => handleSelectChange(e, "frameworks")}
                  options={options.frameworks}
                  multiple
                ></SelectInput>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                <SelectInput
                  label="Programming Languages"
                  name="programming_languages"
                  value={values.programming_languages}
                  onChange={(e) =>
                    handleSelectChange(e, "programming_languages")
                  }
                  options={options.languajes}
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
