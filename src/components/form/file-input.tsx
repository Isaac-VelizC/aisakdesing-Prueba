import { Button, Typography } from "@mui/material";

interface FileInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileName?: string;
}

const FileInput: React.FC<FileInputProps> = ({ onChange, fileName }) => {
  return (
    <>
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="thumbnail-url"
        type="file"
        onChange={onChange}
      />
      <label htmlFor="thumbnail-url">
        <Button variant="outlined" component="span" fullWidth sx={{ py: 2 }}>
          Upload Thumbnail
        </Button>
        {fileName && <Typography variant="body2">{fileName}</Typography>}
      </label>
    </>
  );
};

export default FileInput;
