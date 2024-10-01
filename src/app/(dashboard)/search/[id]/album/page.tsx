import style from "../../search.module.scss";
import { SearchTegsBtn } from "@/components/UI/Buttons/SearchTegsBtn/SearchTegsBtn";
import { PAAlist } from "@/components/SearchComponents/SearchContent/PlayList-Album-Artist-List/PAAlist";

const SearchAlbumPage = ({ params }: { params: { id: string } }) => {
  return (
    <main className={style.Search}>
      <SearchTegsBtn id={params.id} page={"Album"} />
      <aside className="w-full h-full flex items-center justify-center" >
        <PAAlist
          idForScroll={"idSearchAlbum"}
          Search={params.id}
          TypeFetchdata="albums"
        />
      </aside>
    </main>
  );
};

export default SearchAlbumPage;
