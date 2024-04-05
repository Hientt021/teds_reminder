import NavBar from "@/components/nav/NavBar";
import SideBar from "@/components/nav/SideBar";
import AuthProvider from "@/middleware/AuthProvider";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <main
        style={{ height: "100vh", width: "100vw", background: "#F5F5F9" }}
        className="flex"
      >
        <SideBar />
        <div className="flex flex-col flex-1 p-5">
          <NavBar />
          <div className="">{children}</div>
        </div>
      </main>
    </AuthProvider>
  );
}
