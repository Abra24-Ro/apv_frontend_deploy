import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
      <main className="container mx-auto md:grid md:grid-cols-2 mt-12 gap-10 p-4 items-center">
        <Outlet />
      </main>
    </>
  );
}
