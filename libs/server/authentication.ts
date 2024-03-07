"use server";

import { prisma } from "@/prisma";
import type { User } from "@prisma/client";
import argon2 from "argon2";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import z from "zod";
import { ServerError, handleError } from "./error";
import { validate } from "./validate";

if (!process.env.COOKIE_PASSWORD)
  throw new Error("`COOKIE_PASSWORD` does not included in .env.local");

const COOKIE_PASSWORD = process.env.COOKIE_PASSWORD;
const COOKIE_NAME = "session";
const CREDENTIAL_SCHEMA = z
  .object({
    account: z.string(),
    password: z.string(),
  })
  .required();

export async function getSession() {
  const session = await getIronSession<Pick<User, "id" | "account" | "name">>(
    cookies(),
    {
      password: COOKIE_PASSWORD,
      cookieName: COOKIE_NAME,
    },
  );
  return session;
}

export async function signIn(formData: FormData) {
  try {
    const { account, password } = await validate(CREDENTIAL_SCHEMA, formData);
    const user = await prisma.user.findUnique({ where: { account } });
    if (!user) throw new ServerError("AUTH_USER_NOT_FOUND");
    const match = await argon2.verify(password, user.password);
    if (!match) throw new ServerError("AUTH_WRONG_PASSWORD");
    const session = await getSession();
    session.id = user.id;
    session.account = user.account;
    session.name = user.name;
    await session.save();
  } catch (error) {
    return handleError(error);
  }
}

export async function signOut() {
  try {
    const session = await getSession();
    session.destroy();
  } catch (error) {
    return handleError(error);
  }
}
