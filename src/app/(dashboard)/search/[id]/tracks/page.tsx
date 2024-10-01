import { SearchContent } from "@/components/SearchComponents/SearchContent/SearchContent";
import style from "../../search.module.scss";
import { SearchTegsBtn } from "@/components/UI/Buttons/SearchTegsBtn/SearchTegsBtn";
import { TrackListComponent } from "@/components/SearchComponents/SearchContent/TrackList/TrackList";

const SearchTracksPage = ({ params }: { params: { id: string } }) => (
  <main className={style.Search}>
    <SearchTegsBtn id={params.id} page={"Tracks"} />
    <aside className={style.Search__Content} id="idSearchTrack">
      <TrackListComponent idForScroll={"idSearchTrack"} Search={params.id} />
    </aside>
  </main>
);

export default SearchTracksPage;
