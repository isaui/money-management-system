import { IFeatureTile } from "./interface/IFeatureTile"


const FeatureTile: React.FC<IFeatureTile> = ({
  title,
  isActive,
  onTap,
}) => {
  return (
    <div
      onClick={onTap}
      className={`p-4 flex flex-col justify-center event-tile-shadow min-w-[11rem] rounded-2xl ${isActive ? 'bg-[#AA076B] text-white' : 'bg-[#E8D2B6] border-2 border-[#985951] text-[#02223E]'}`}
    >
      <h1 className={`text-center  font-bold`}>{title}</h1>
      
    </div>
  )
}

export default FeatureTile