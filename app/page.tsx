import AssignmentForm from "./components/AssignmentForm/AssignmentForm";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center">
      <h1 className="my-10 text-center font-bold">Fill out the form please</h1>
      <AssignmentForm />
    </main>
  );
}
