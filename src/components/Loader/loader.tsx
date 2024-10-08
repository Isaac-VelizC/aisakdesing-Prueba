import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";

//type Props = {};

export const LoaderProgress = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flex="1 1 auto"
    >
      <CircularProgress
      color="primary"
        sx={{
          width: 2,
          maxWidth: 320,
        }}
      />
    </Box>
  );
};
