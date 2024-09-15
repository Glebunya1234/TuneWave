import { Dashboard } from "@/components/Dashboard/dashboard";
import { PanelTarget } from "@/components/UI/Target/PanelTarget";
import style from "./layout.module.scss";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Dashboard>
      <PanelTarget side="Top" />
      {children}
      <div className={style.dash}></div>
      <div className={style.squarDash}></div>
      <PanelTarget side="Bottom" />
    </Dashboard>
  );
}
