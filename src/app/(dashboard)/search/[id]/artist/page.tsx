import style from "../../search.module.scss";
import { SearchTegsBtn } from "@/components/UI/Buttons/SearchTegsBtn/SearchTegsBtn";
import { PAAlist } from "@/components/SearchComponents/SearchContent/PlayList-Album-Artist-List/PAAlist";

const SearchArtistPage = ({ params }: { params: { id: string } }) => {
  return (
    <main className={style.Search}>
      <SearchTegsBtn id={params.id} page={"Artist"} />
      <aside className="w-full h-full flex items-center justify-center">
        <PAAlist
          idForScroll={"idSearchArtist"}
          Search={params.id}
          TypeFetchdata="artists"
        />
      </aside>
    </main>
  );
};

export default SearchArtistPage;
