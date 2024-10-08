import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Chip,
  SelectChangeEvent,
} from "@mui/material";

// Cambia el tipo de options a un arreglo de objetos
interface Option {
  label: string;
  value: string;
}

interface SelectInputProps {
  label: string;
  name: string;
  value: string | string[];
  onChange: (e: SelectChangeEvent<string | string[]>) => void;
  options: Option[]; // Cambiado aquí
  multiple?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  multiple = false,
}) => {
  const getLabel = (val: string) => {
    const option = options.find(option => option.value === val);
    return option ? option.label : val; // Retorna el label o el value si no se encuentra
  };
  return (
    <FormControl variant="standard" fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        name={name}
        value={value}
        onChange={onChange}
        multiple={multiple}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: '200px', // Ajusta la altura máxima del menú aquí
              overflowY: 'auto',
            },
          },
        }}
        renderValue={(selected) =>
          multiple ? (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {(selected as string[]).map((val) => (
                <Chip key={val} label={getLabel(val)} /> 
              ))}
            </Box>
          ) : (
            (selected as string)
          )
        }
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label} {/* Usar option.label aquí */}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectInput;