import { PanelTarget } from "@/components/UI/Target/PanelTarget";
import style from "../search.module.scss";

const SearchId = ({ params }: { params: { id: string } }) => {
  return (
    <main className={style.Search}>
      <PanelTarget side="Top" />

      <aside className={style.Search__Content}>
        <p>{params.id}</p>
      </aside>
      <div className={style.dash}></div>
      <div className={style.squarDash}></div>
      <PanelTarget side="Bottom" />
    </main>
  );
};

export default SearchId;
