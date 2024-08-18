import { MediaLibraryBar } from "./Left-side-bar";
import { MediaPlaylist } from "@/components/Content/MediaPlaylist-Component/MediaPlaylist";

export const MediaLibrary = () => {
  return (
    <MediaLibraryBar>
      <MediaPlaylist />
    </MediaLibraryBar>
  );
};
