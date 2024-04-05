export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className="relative  h-screen  flex justify-center items-center "
      style={{ background: "#C6DADA" }}
    >
      <div
        className="grid grid-rows-1 grid-cols-2 rounded-2xl"
        style={{ background: "#009688" }}
      >
        {children}
      </div>
    </main>
  );
}
