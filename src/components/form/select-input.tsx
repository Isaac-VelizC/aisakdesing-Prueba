import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Chip,
    SelectChangeEvent,
  } from "@mui/material";
  
  interface SelectInputProps {
    label: string;
    name: string;
    value: string | string[];
    onChange: (e: SelectChangeEvent<string | string[]>) => void; // Cambiar el tipo aquí
    options: string[];
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
    return (
      <FormControl variant="standard" fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          name={name}
          value={value}
          onChange={onChange} // Mantener el evento ajustado
          multiple={multiple}
          renderValue={(selected) =>
            multiple ? (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {(selected as string[]).map((val) => (
                  <Chip key={val} label={val} />
                ))}
              </Box>
            ) : (
              (selected as string)
            )
          }
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };
  
  export default SelectInput;
  