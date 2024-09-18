import { SearchContent } from "@/components/SearchComponents/SearchContent/SearchContent";
import style from "../../search.module.scss";
import { SearchTegsBtn } from "@/components/UI/Buttons/SearchTegsBtn/SearchTegsBtn";
import { PAAlist } from "@/components/SearchComponents/SearchContent/PlayList-Album-Artist-List/PAAlist";

const SearchPlaylistPage = ({ params }: { params: { id: string } }) => {
  return (
    <main className={style.Search}>
      <SearchTegsBtn id={params.id} page={"Playlist"} />
      <aside className={style.Search__Content__Playlist} id="idSearchPlaylist">
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
