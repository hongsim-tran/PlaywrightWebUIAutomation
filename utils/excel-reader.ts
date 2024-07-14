import * as XLSX from 'xlsx';

export const readExcelFile = async (filePath: string, sheetName: string) => {
    try {
        const workbook = XLSX.readFile(filePath);
        const worksheet = workbook.Sheets[sheetName];
        return XLSX.utils.sheet_to_json(worksheet);
    }
    catch (err) {
        console.log(err);
        return [];
    }
}

