"use server";

import { prisma } from "@/lib/utils";

export async function addVisitAction() {
  try {
    const visits = await prisma.visit.create({
      data: {},
    });

    return JSON.parse(
      JSON.stringify({
        status: 201,
        visits,
      }),
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        status: 500,
        error,
      }),
    );
  }
}

export async function getVisitsAction() {
  try {
    const visits = await prisma.visit.findMany();

    return JSON.parse(
      JSON.stringify({
        status: 200,
        visits,
      }),
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({
        status: 500,
        error,
      }),
    );
  }
}
