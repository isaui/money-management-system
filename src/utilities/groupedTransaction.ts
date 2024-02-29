import { GroupedTransactions } from "@/components/modules/DashboardModule/interface/IGroupedTransaction";
import { ITransaction } from "@/components/contexts/interface/ITransaction";

export function groupTransactionsByDayAndLabel(transactions: ITransaction[]): GroupedTransactions {
    const groupedTransactions: GroupedTransactions = {};

    transactions.forEach(transaction => {
        const dateKey = transaction.time.toISOString().split('T')[0]; 
        if (!groupedTransactions[dateKey]) {
            groupedTransactions[dateKey] = {};
        }

        const label = transaction.label;
        if (!groupedTransactions[dateKey][label]) {
            groupedTransactions[dateKey][label] = [];
        }

        groupedTransactions[dateKey][label].push(transaction);
    });

    return groupedTransactions;
}

export function groupTransactionsByMonthAndLabel(transactions: ITransaction[]): GroupedTransactions {
    const groupedTransactions: GroupedTransactions = {};

    const monthNames: string[] = [
        'Jan', 'Feb', 'Mar', 'April', 'Mei', 'Juni',
        'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'
    ];

    transactions.forEach(transaction => {
        const date = new Date(transaction.time);
        const year = date.getFullYear();
        const month = monthNames[date.getMonth()]; // Mengonversi nomor bulan menjadi nama bulan dalam huruf

        const key = `${month} ${year}`; // Format "Bulan Tahun"

        if (!groupedTransactions[key]) {
            groupedTransactions[key] = {};
        }

        const label = transaction.label;
        if (!groupedTransactions[key][label]) {
            groupedTransactions[key][label] = [];
        }

        groupedTransactions[key][label].push(transaction);
    });

    return groupedTransactions;
}

export function groupTransactionsByWeekAndLabel(transactions: ITransaction[]): GroupedTransactions {
    const groupedTransactions: GroupedTransactions = {};

    const monthNames: string[] = [
        'Jan', 'Feb', 'Mar', 'April', 'Mei', 'Juni',
        'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'
    ];

    transactions.forEach(transaction => {
        const date = new Date(transaction.time);
        const year = date.getFullYear();
        const month = date.getMonth(); 
        const week = getWeekNumber(date); 

        const key = `Week ${week}(${monthNames[month]}) ${year}`; 

        if (!groupedTransactions[key]) {
            groupedTransactions[key] = {};
        }

        const label = transaction.label;
        if (!groupedTransactions[key][label]) {
            groupedTransactions[key][label] = [];
        }

        groupedTransactions[key][label].push(transaction);
    });

    return groupedTransactions;
}

function getWeekNumber(date: Date): number {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const dayOfWeek = firstDayOfYear.getDay();
    const weekStart = firstDayOfYear.valueOf() + (7 - dayOfWeek) * 24 * 60 * 60 * 1000;
    const diff = date.valueOf() - weekStart;
    return Math.ceil(diff / (7 * 24 * 60 * 60 * 1000));
}