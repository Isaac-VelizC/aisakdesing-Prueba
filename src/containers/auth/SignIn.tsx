import React, { useState, useCallback } from "react";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import InputAdornment from "@mui/material/InputAdornment";
import { Helmet } from "react-helmet-async";
import { Iconify } from "src/components/iconify";
import { useRouter } from "src/routes/hooks";
import { auth } from "./../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in successfully');
      router.push("/");
    } catch (error) {
      console.error('Error logging in with email and password:', error);
    } finally {
      setLoading(false);
    }
  }, [email, password, router]);

  const renderForm = (
    <Box component={'form'} onSubmit={handleSignIn} display="flex" flexDirection="column" alignItems="flex-end">
      <TextField
        fullWidth
        name="email"
        label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}  // Actualiza el valor de email
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
      />

      <TextField
        fullWidth
        name="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}  // Actualiza el valor de password
        InputLabelProps={{ shrink: true }}
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                <Iconify
                  icon={
                    showPassword ? "solar:eye-bold" : "solar:eye-closed-bold"
                  }
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />
      <Link
        variant="body2"
        color="inherit"
        sx={{
          cursor: "pointer",
          mb: 2,
          ":hover": {
            color: "primary.main", 
            textDecoration: "underline",
          },
        }}
      >
        Forgot password?
      </Link>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        loading={loading}  // Muestra el estado de carga
      >
        Sign in
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <Helmet>
        <title>{`Sign in - YourAppName`}</title>
      </Helmet>
      <Box
        gap={1.5}
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ mb: 5 }}
      >
        <Typography variant="h5">Sign in</Typography>
        <Typography variant="body2" color="text.secondary">
          Don’t have an account?
          <Link variant="subtitle2" sx={{ ml: 0.5 }} href="sing-up">
            Get started 
          </Link>
        </Typography>
      </Box>

      {renderForm}
    </>
  );
}

export default SignIn;
