import "./PathToNextTalent.css";

type Props = {
  isActive: boolean;
};

const PathToNextTalent = ({ isActive }: Props) => (
  <div className={isActive ? 'path' : 'path inactive'}></div>
);

export default PathToNextTalent;
