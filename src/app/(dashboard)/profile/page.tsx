import {BackgroundMarquee} from "@/components/UI/Marquee/Background-Marquee/BGmarquee";
import style from "./profile.module.scss";

const Profile = () => {
  return (
    <div className={style.profile}>
      <p className={style.outlinedText}>Hello Wold</p>
    </div>
  );
};

export default Profile;
