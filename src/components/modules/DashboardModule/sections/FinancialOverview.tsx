import { IOverviewData } from "../interface/IOverviewData";
import LineGraph from "../module-elements/LineGraph"

const data: IOverviewData[] = [
    { name: 'Jan', income: 4000, outcome: 2000, balance:500 },
    { name: 'Feb', income: 3000, outcome: 1500,  balance:1100 },
    { name: 'Mar', income: 5000, outcome: 3000,  balance:1200 },
    { name: 'Apr', income: 4500, outcome: 3500,  balance:1600 },
    { name: 'May', income: 6000, outcome: 4000,  balance:1700 },
    { name: 'Jun', income: 8000, outcome: 6000,  balance:1900 },
  ];
const FinancialOverview = () => {
    return <div className="flex flex-col w-full">
        <h1 className="text-2xl md:text-3xl xlg:text-4xl text-white font-bold my-8">Overview</h1>
        <LineGraph dropdownValues={['Harian', 'Mingguan', 'Bulanan']} onClickDropdownValue={function (value: string): void {
            
        } } yAxisLabel={"amount"} lineValues={data} lineLabels={['income', 'outcome', 'balance']} xAxisLabel={"name"} lineColors={['#8884d8', '#82ca9d', '#E35335']}/>
    </div>
}

export default FinancialOverview