import { SearchContent } from "@/components/SearchComponents/SearchContent/SearchContent";
import style from "../../search.module.scss";
import { SearchTegsBtn } from "@/components/UI/Buttons/SearchTegsBtn/SearchTegsBtn";

const SearchArtistPage = ({ params }: { params: { id: string } }) => {
  return (
    <main className={style.Search}>
      <SearchTegsBtn id={params.id} page={"Artist"} />
      <SearchContent id={params.id} />
    </main>
  );
};

export default SearchArtistPage;
