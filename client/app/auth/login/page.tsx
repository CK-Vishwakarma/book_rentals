"use client";
import { Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { AuthLogin } from "./components";
import { PAGE_ROUTES } from "@/constants/pageRoutes";
import AuthWrapper from "@/components/AuthWrapper";

const Login = () => (
  <AuthWrapper>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
          <Typography variant="h3">Login</Typography>
          <Link href={PAGE_ROUTES.authRoutes.register}>
            <Typography variant="body1" sx={{ textDecoration: 'none' }} color="primary">
              Don&apos;t have an account?
            </Typography>
          </Link>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <AuthLogin />
      </Grid>
    </Grid>
  </AuthWrapper>
);

export default Login;
