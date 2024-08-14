import { MediaPlaylist } from "@/components/Content/MediaPlaylist-Component/MediaPlaylist";
import { MediaLibraryBar } from "./Left-side-bar";

export const MediaLibrary = () => {
  return (
    <MediaLibraryBar>
      <MediaPlaylist />
    </MediaLibraryBar>
  );
};
