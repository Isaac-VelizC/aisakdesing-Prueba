import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Label } from "src/components/label";
import { ProjectDatas } from "src/interfaces/Project";

// ----------------------------------------------------------------------

export function ProductItem({ product, onOpen }: { product: ProjectDatas; onOpen: () => void }) {
  const renderStatus = (
    <Label
      variant="inverted"
      color={(product.is_published === false && "error") || "info"}
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: "absolute",
        textTransform: "uppercase",
      }}
    >
      {product.is_published ? 'Publicado' : 'Oculto'}
    </Label>
  );

  const renderImg = (
    <Box
      component="img"
      alt={product.title}
      src={product.thumbnail_url}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: "cover",
        position: "absolute",
      }}
    />
  );

  /*const renderPrice = (
    <Typography variant="subtitle1">
      <Typography
        component="span"
        variant="body1"
        sx={{
          color: "text.disabled",
          textDecoration: "line-through",
        }}
      >
        {product.short && fCurrency(product.short)}
      </Typography>
      &nbsp;
      {fCurrency(product.short)}
    </Typography>
  );*/

  return (
    <Card onClick={onOpen} style={{ cursor: 'pointer' }}>
      <Box sx={{ pt: "50%", position: "relative", height: 0.7 }}>
        {product.is_published && renderStatus}
        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 2 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {product.title}
        </Link>

        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant={"body2"}>
            {product.short}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
}
