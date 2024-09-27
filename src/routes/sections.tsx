import { lazy, Suspense } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";

import Box from "@mui/material/Box";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

import { varAlpha } from "src/theme/styles";
import { DashboardLayout } from "src/layouts/dashboard";
import { AuthLayout } from "src/layouts/auth";
import PageProducts from "src/containers/Pages/products";
import PageBlogs from "src/containers/Pages/blogs";
import PagePayments from "src/containers/Pages/payments";
import PageProductStore from "src/containers/Pages/products/product-store";
import PageBlogsStore from "src/containers/Pages/blogs/blog-store";

export const PageHome = lazy(() => import("src/containers/Pages/home"));
export const PageUsers = lazy(() => import("src/containers/Pages/users"));

export const SignIn = lazy(() => import("src/containers/auth/SignIn"));
export const Error404 = lazy(() => import("src/containers/Error/error404"));

const renderFallback = (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    flex="1 1 auto"
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.palette.text.primary, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: "text.primary" },
      }}
    />
  </Box>
);

export function Router() {
  return useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={renderFallback}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <PageHome />, index: true },
        { path: 'user', element: <PageUsers /> },
        { path: 'products', element: <PageProducts /> },
        { path: 'product-store', element: <PageProductStore /> },
        { path: 'blog', element: <PageBlogs /> },
        { path: 'blog-store', element: <PageBlogsStore /> },
        { path: 'payments', element: <PagePayments /> },
      ],
    },
    {
      path: "sing-in",
      element: (
        <AuthLayout>
          <SignIn />
        </AuthLayout>
      ),
    },
    {
      path: "404",
      element: <Error404 />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);
}
