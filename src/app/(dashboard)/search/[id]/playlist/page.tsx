import style from "../../search.module.scss";
import { SearchTegsBtn } from "@/components/UI/Buttons/SearchTegsBtn/SearchTegsBtn";
import { PAAlist } from "@/components/SearchComponents/SearchContent/PlayList-Album-Artist-List/PAAlist";

const SearchPlaylistPage = ({ params }: { params: { id: string } }) => {
  return (
    <main className={style.Search}>
      <SearchTegsBtn id={params.id} page={"Playlist"} />
      <aside className="w-full h-full flex items-center justify-center" >
        <PAAlist
          idForScroll={"idSearchPlaylist"}
          Search={params.id}
          TypeFetchdata="playlists"
        />
      </aside>
    </main>
  );
};

export default SearchPlaylistPage;
