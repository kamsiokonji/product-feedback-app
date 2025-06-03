"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { loginSchema, registerSchema } from "@/lib/validations";
import { APIError } from "better-auth/api";

// Define consistent return type
type RegisterState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  success?: string;
  redirectTo?: string;
};

type LoginState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  success?: string;
  redirectTo?: string;
};

export async function register(
  prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const registerFormData = Object.fromEntries(formData);
  const validatedRegisterFormData = registerSchema.safeParse(registerFormData);

  if (!validatedRegisterFormData.success) {
    const formFieldErrors =
      validatedRegisterFormData.error.flatten().fieldErrors;

    return {
      errors: {
        name: formFieldErrors?.name,
        email: formFieldErrors?.email,
        password: formFieldErrors?.password,
      },
    };
  }

  const { email, password, name } = validatedRegisterFormData.data;

  try {
    await auth.api.signUpEmail({
      body: {
        email,
        name,
        password,
      },
    });

    return {
      success: "Account created successfully!",
      redirectTo: "/",
    };
  } catch (error) {
    if (error instanceof APIError) {
      switch (error.status) {
        case "UNPROCESSABLE_ENTITY":
          return { errors: { email: ["User already exists"] } };
        case "BAD_REQUEST":
          return { errors: { email: ["Invalid email"] } };
        default:
          return { errors: { email: ["Something went wrong"] } };
      }
    }
    return { errors: { email: ["Something went wrong"] } };
  }
}

export async function login(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const loginFormData = Object.fromEntries(formData);
  const validatedLoginFormData = loginSchema.safeParse(loginFormData);

  if (!validatedLoginFormData.success) {
    const formFieldErrors = validatedLoginFormData.error.flatten().fieldErrors;

    return {
      errors: {
        email: formFieldErrors?.email,
        password: formFieldErrors?.password,
      },
    };
  }

  const { email, password } = validatedLoginFormData.data;

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return {
      success: "Logged in successfully!",
      redirectTo: "/",
    };
  } catch (error) {
    if (error instanceof APIError) {
      switch (error.status) {
        case "UNAUTHORIZED":
          return { errors: { email: ["Invalid email or password"] } };
        default:
          return { errors: { email: ["Something went wrong"] } };
      }
    }
    return { errors: { email: ["Something went wrong"] } };
  }
}

export async function searchAccount(email: string) {
  const account = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return account;
}
