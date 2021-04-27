// import * as XLSX from 'xlsx';
// class Excel {
//     constructor() {
//         document.querySelector('#file_input').addEventListener('change',  (e) => {
//             this.readExcel(e).then(res => {
//                 console.log(res);
//             })
//         })
//     }
//     readExcel(e) {
//         return new Promise((resolve) => {
//             const files = e.target.files;
//             const f = files[0];
//             const reader = new FileReader();
//             reader.onload = function (e) {
//                 const data = new Uint8Array(e.target.result);
//                 const workbook = XLSX.read(data, {type: 'array'});
//                 resolve(workbook);
//             };
//             reader.readAsArrayBuffer(f);
//         })
//     }
// }
// new Excel();
import * as XLSX from 'xlsx';
;(function (doc) {
    function readExcel(e) {
        return new Promise((resolve) => {
            const files = e.target.files;
            const f = files[0];
            const reader = new FileReader();
            reader.onload = function (e) {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, {type: 'array'});
                resolve(workbook);
            };
            reader.readAsArrayBuffer(f);
        })
    }
    doc.querySelector('#file_input').addEventListener('change', function (e) {
        readExcel(e).then(res => {
            console.log(res);
            const sheets = res.Sheets;
            for (const key in sheets) {
                if (sheets.hasOwnProperty(key)) {
                    console.log(XLSX.utils.sheet_to_json(sheets[key], {range: "A2:C6"}));
                }
            }
        })
    });

    function generateSheet() {
        const info_json = [
            {'姓名': '张三', '性别': '男', '地址': '北京'},
            {'姓名': '李四', '性别': '男', '地址': '上海'},
            {'姓名': '王二', '性别': '男', '地址': '长沙'},
        ]
        const sheet = XLSX.utils.json_to_sheet(info_json);
        return sheet;
    }

    function download(name) {
        const sheetName = name || 'sheet1';
        const workbook = {
            SheetNames: [sheetName],
            Sheets: {}
        };
        workbook.Sheets[sheetName] = generateSheet();
        XLSX.writeFile(workbook, 'test.xlsx');
    }
    doc.querySelector('#download').addEventListener('click', function (){
        download()
    })
})(document)


