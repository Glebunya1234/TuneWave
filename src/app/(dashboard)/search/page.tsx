import { SearchTegsBtn } from "@/components/UI/Buttons/SearchTegsBtn/SearchTegsBtn";
import style from "./search.module.scss";

const Search = ({ params }: { params: { id: string } }) => {
  return (
    <aside className={style.Search}>
      <p>Main</p>
    </aside>
  );
};

export default Search;
