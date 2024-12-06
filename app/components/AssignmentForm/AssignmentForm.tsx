"use client";
import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { sendAssigment } from "../../actions/sendAssigment";
import DropDown from "../DropDown/DropDown";

const initialState = {
  errors: "",
};

export default function AssignmentForm() {
  const [formState, formAction, isPending] = useFormState(
    sendAssigment,
    initialState,
  );
  const [levels, setLevels] = useState();
  const [fields, setFields] = useState({
    name: null,
    email: null,
    assignment_description: null,
    github_repo_url: null,
    candidate_level: null,
  });

  useEffect(() => {
    const fetchLevels = async () => {
      const response = await fetch(
        `https://tools.qa.public.ale.ai/api/tools/candidates/levels`,
      );
      const data = await response.json();
      const levels = data?.levels || [];
      if (response.ok) {
        setLevels(levels);
      }
    };
    fetchLevels();
  }, []);

  function ValidationError({ name }) {
    if (formState?.errors?.[name]) {
      const text = formState.errors[name].join(" ");
      const className = "text-red-700 text-xs";
      return <p className={className}>{text}</p>;
    }
    return;
  }

  function SubmitButton() {
    return (
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="submit"
      >
        {isPending ? "Fields are checked.." : "Submit"}
      </button>
    );
  }

  function inputChange(e) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input
        type="text"
        onChange={inputChange}
        value={fields.name}
        name="name"
        placeholder="Name"
        className="mb-2 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <ValidationError name="name" />

      <input
        type="text"
        onChange={inputChange}
        value={fields.email}
        name="email"
        placeholder="Email"
        className="mb-2 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <ValidationError name="email" />

      <input
        type="text"
        onChange={inputChange}
        value={fields.assignment_description}
        name="assignment_description"
        placeholder="Assigment description"
        className="mb-2 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <ValidationError name="assignment_description" />

      <input
        type="text"
        onChange={inputChange}
        value={fields.github_repo_url}
        name="github_repo_url"
        placeholder="Github Repo URL"
        className="mb-2 block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <ValidationError name="github_repo_url" />

      <DropDown
        name="candidate_level"
        value={fields.candidate_level}
        onChange={inputChange}
        list={levels}
      />
      <ValidationError name="candidate_level" />
      <ValidationError name="api" />

      <SubmitButton />
    </form>
  );
}
