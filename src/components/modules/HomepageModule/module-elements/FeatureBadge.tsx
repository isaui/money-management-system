import Stack from "@/components/elements/Stack"
import { IFeature } from "../interface/IFeature"

const FeatureBadge: React.FC<IFeature> = ({
    title, description
}) =>{
    return <div>
        <Stack className="aspect-video">
            <div className="w-full max-w-md relative -top-6 md:max-w-lg mx-auto">
                <img src="badge.svg" className="w-full h-auto object-contain" alt="" />
            </div>
            <div className="flex relative flex-col mt-4 md:mt-12 px-12 max-w-md md:max-w-lg max-h-48 md:max-h-80 overflow-y-auto non-visible-scroll">
                <h1 className="mx-auto text-2xl md:text-4xl text-white font-bold text-center my-3 md:my-6 w-full px-4">{title}</h1>
                <p className="text-justify mx-auto text-white text-sm md:text-base font-normal">{description}</p>
            </div>
        </Stack>
    </div>
}

export default FeatureBadge