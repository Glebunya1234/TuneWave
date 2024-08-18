import style from "./CloseBarBT.module.scss";

interface IMarqueeProps {
  text?: string;
  className?: string;
  children: React.ReactNode;
  onToggle: () => void;
}

export const CloseBarBtn: React.FC<IMarqueeProps> = ({
  className,
  children,
  onToggle,
}) => {
  return (
    <div className={style.CloseBarBtn}>
      <button
        className={`${style.CloseBarBtn__Button} ${className}`}
        onClick={onToggle}
      >
        {children}
      </button>
    </div>
  );
};
