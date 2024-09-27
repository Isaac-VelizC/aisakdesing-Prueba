import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";

import { _posts } from "src/_mock";
import { DashboardContent } from "src/layouts/dashboard";

import { Iconify } from "src/components/iconify";
import Grid from "@mui/material/Grid2";
import { PostItem, PostItemProps } from "./post-item";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ModalView } from "src/components/modal/modal-view";

// ----------------------------------------------------------------------

export function BlogView() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<PostItemProps | null>(null);
  const navidate = useNavigate();

  const handleOpen = (blog: PostItemProps) => {
    setSelectedBlog(blog);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedBlog(null);
  };

  const handleNavigate = () => {
    navidate("/blog-store");
  };
  return (
    <DashboardContent>
      <Box display={"flex"} alignItems={"center"} mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Blog
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleNavigate}
        >
          New Blog
        </Button>
      </Box>
      <Grid container spacing={3}>
        {_posts.map((post, index) => {
          const latestPostLarge = index === 0;
          const latestPost = index === 1 || index === 2;

          return (
            <Grid
              key={post.id}
              size={{
                xs: 12,
                sm: latestPostLarge ? 12 : 6,
                md: latestPostLarge ? 6 : 3,
              }}
            >
              <PostItem
                post={post}
                latestPost={latestPost}
                latestPostLarge={latestPostLarge}
                openModal={() => handleOpen(post)}
              />
            </Grid>
          );
        })}
      </Grid>
      <Pagination count={10} color="primary" sx={{ mt: 8, mx: "auto" }} />
      <ModalView
        fullWidth={true}
        maxWidth={"md"}
        //fullScreen={true}
        aria-labelledby={`modal-${selectedBlog?.title}`}
        aria-describedby={`modal-${selectedBlog?.title}`}
        title={selectedBlog?.title}
        children={
          <Box minHeight={'auto'}>
              <Box
                component={"img"}
                src={selectedBlog?.coverUrl}
                alt={selectedBlog?.title}
                sx={{
                  width: '50%',
                }}
              />
              <Typography>
                Status: {selectedBlog?.description}
              </Typography>
            </Box>
        }
        onClose={handleClose}
        open={openModal}
      />
    </DashboardContent>
  );
}
