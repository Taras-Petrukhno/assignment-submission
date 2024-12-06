"use server";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  name: z
    .string()
    .min(1, { message: "" })
    .refine((val) => val.trim().length > 0, { message: "Name is required." }),

  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Email must be a valid email address." }),

  assignment_description: z
    .string()
    .min(10, {
      message: "Assignment description must be at least 10 characters.",
    })
    .refine((val) => val.trim().length > 0, {
      message: "Assignment description is required.",
    }),

  github_repo_url: z
    .string()
    .min(1, { message: "GitHub repository URL is required." })
    .url({ message: "GitHub repository URL must be a valid URL." }),

  candidate_level: z.enum(["Junior", "Middle", "Senior", "Principal"], {
    errorMap: () => ({
      message:
        "Candidate level must be one of Junior, Middle, Senior or Principal.",
    }),
  }),
});

export async function fetchAssigmentData(bodyObject) {
  const response = await fetch(
    "https://tools.qa.public.ale.ai/api/tools/candidates/assignments",
    {
      method: "POST",
      body: JSON.stringify(bodyObject),
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    },
  );
  const data = await response.json();
  if (!response.ok) throw Error(response.statusText);
  return data;
}

export async function sendAssigment(prevState: unknown, formData: FormData) {
  const fields = {
    name: formData.get("name"),
    email: formData.get("email"),
    assignment_description: formData.get("assignment_description"),
    github_repo_url: formData.get("github_repo_url"),
    candidate_level: formData.get("candidate_level"),
  };

  const validatedFields = schema.safeParse(fields);
  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  let redirectPath;

  try {
    const data = await fetchAssigmentData(fields);
    if (!(data.status === "success" && data.data)) throw Error(data.message);
    const queryString = new URLSearchParams(data.data).toString();
    redirectPath = `/thank-you?${queryString}`;
  } catch (e) {
    return { errors: { api: [e.message] } };
  }

  redirect(redirectPath);
}
