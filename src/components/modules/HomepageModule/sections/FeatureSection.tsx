import Stack from "@/components/elements/Stack";
import { useState } from "react"
import { IFeature } from "../interface/IFeature";
import FeatureTile from "@/components/elements/FeatureTile";
import FeatureBadge from "../module-elements/FeatureBadge";

const FeatureSection = () => {

    const features : IFeature[] = [{
        id:"1",
        title: "Money Management",
        description: "Fitur manajemen keuangan menyediakan pengguna dengan alat untuk melacak dan mengelola pengeluaran serta pemasukan mereka dengan mudah. Ini memungkinkan pengguna untuk memantau semua transaksi keuangan mereka, termasuk pembelian, tagihan, dan pendapatan."
    }, {
        id:"2",
        title:" Money Analysis",
        description:"Fitur analisis keuangan memberikan pengguna kemampuan untuk mengevaluasi secara mendalam pola pengeluaran dan pemasukan mereka dengan visualisasi data seperti grafik dan laporan yang membantu pengguna dalam memahami keuangan mereka."
    }, {
        id:"3",
        title: "Shared Money",
        description:"Fitur shared money memungkinkan pengguna untuk berbagi dan mengelola keuangan bersama dengan orang lain, seperti pasangan, anggota keluarga, atau rekan kerja. Dengan fitur ini, pengguna dapat membuat rekening bersama, menetapkan dana bersama, dan mengelola transaksi bersama secara efisien."
    }, {
        id:"4",
        title:"API Integration",
        description:"Fitur integrasi API memungkinkan pengguna untuk menghubungkan aplikasi manajemen keuangan dengan layanan lain, seperti bank, platform investasi,  aplikasi pembayaran digital, atau lainnya."
    }];
    const [selectedFeature, setSelectedFeature] = useState<IFeature>(features[0])

    return <div className="w-full flex flex-col text-white font-bold text-5xl mx-auto max-w-7xl px-4"
    >
        <h1 className="md:text-center md:mx-auto mb-8"> Features </h1>
        <Stack className="h-min max-w-fit mx-auto mb-4">
              <div className="w-full pl-4 h-full flex ">
                <hr className="border-black border-4 w-full my-auto " />
              </div>

              <div className="flex pl-4 py-4  overflow-x-auto text-lg non-visible-scroll space-x-9">
                {features.map((feature, index) => {
                  return (
                    <FeatureTile
                      key={`event-tile-${index}`}
                      id={feature.id}
                      title={feature.title}
                      isActive={feature.id == selectedFeature?.id}
                      onTap={() => {
                        setSelectedFeature(feature)
                      }}
                    />
                  )
                })}
              </div>
            </Stack>
        <div className="flex justify-center mt-12">
                <FeatureBadge id={selectedFeature.id} title={selectedFeature.title} description={selectedFeature.description} />
        </div>
    </div>
}

export default FeatureSection