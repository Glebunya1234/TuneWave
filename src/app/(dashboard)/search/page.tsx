import style from "./search.module.scss";
import { RandomPhrase } from "@/components/UI/WelcomePhrases-Component/WelcomePhrases";

const Search = ({ params }: { params: { id: string } }) => {
  return (
    <aside className={style.Search}>
      <RandomPhrase />
    </aside>
  );
};

export default Search;
