
import { v4 as uuidv4 } from 'uuid';
import nodexlsx from 'node-xlsx'
import xlsx from 'xlsx'
import fsx from 'fs-extra'
import _ from 'lodash'
import { add } from 'mathjs'

// set prefix to execute progame.   
/**
 * BiRongLe/QianYongQiang
 */
const prefix = 'BiRongLe'


export async function main() {

    createExcelWithBackgroundColor()

}

const ExcelJS = require('exceljs');  
async function createExcelWithBackgroundColor() {  
    // 创建一个新的工作簿  
    const workbook = new ExcelJS.Workbook();  
    const worksheet = workbook.addWorksheet('MySheet');  

    // 添加一些数据  
    worksheet.addRow(['Hello', 'World']);  
    worksheet.addRow(['ExcelJS', 'is awesome']);  

    // 设置背景色  
    const cell = worksheet.getCell('A1');  
    cell.fill = {  
        type: 'pattern',  
        pattern: 'solid',  
        fgColor: { argb: 'FF00FF00' } // 背景色为绿色  
    };  

    const cellB1 = worksheet.getCell('B1');  
    cellB1.fill = {  
        type: 'pattern',  
        pattern: 'solid',  
        fgColor: { argb: 'FFFF0000' } // 背景色为红色  
    };  

    // 保存文件  
    await workbook.xlsx.writeFile('example.xlsx');  
    console.log('Excel file created with background colors!');  
}

function test2() {
    const workbook = xlsx.utils.book_new()
    const worksheetdata = [
        ['Name', 'Age'],
        ['Alice', 123456789.12],
        ['Bob', 123456789.12],
    ]

    const worksheet = xlsx.utils.aoa_to_sheet(worksheetdata)

    const cellStyle = {
        fill: {
            fgColor: { rgb: 'FF0000' }
        },
        font: {
            color: { rgb: 'FFFFFF' },
            bold: true,
        },
        numFmt: '#,##0.00'
    }

    worksheet['B2'].s = cellStyle
    worksheet['B3'].s = cellStyle

    xlsx.utils.book_append_sheet(workbook, worksheet, 'sheet_test')
    xlsx.writeFile(workbook, 'test1.xlsx')
}


main()
    .then(() => {

        console.log('------------finally then-----------:', );
    })
    .catch(err => {
        console.log('------------finally err-----------:', err);
    })


const uuid = () => uuidv4().replace(/-/g, '')
const replace = str => str && str.replace(/\s/g, '')