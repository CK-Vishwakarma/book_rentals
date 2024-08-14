"use client";
import { Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import AuthWrapper from "@/components/AuthWrapper";
import { AuthRegister } from "./components";
import { PAGE_ROUTES } from "@/constants/pageRoutes";

const Login = () => (
  <AuthWrapper>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
          <Typography variant="h3">Sign up</Typography>
          <Link href={PAGE_ROUTES.authRoutes.login}>
            <Typography variant="body1" sx={{ textDecoration: 'none' }} color="primary">
              Already have an account?
            </Typography>
          </Link>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <AuthRegister />
      </Grid>
    </Grid>
  </AuthWrapper>
);

export default Login;
