import { TextField } from "@mui/material";

interface TextInputProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
  isrequired?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  value,
  onChange,
  error = false,
  helperText = "",
  type = "text",
  multiline = false,
  rows,
  isrequired = false,
   ...props
}) => {
  return (
    <TextField
      required={isrequired}
      variant="standard"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      type={type}
      multiline={multiline}
      rows={rows}
      fullWidth
     {...props}
    />
  );
};

export default TextInput;
