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
        })
    })
})(document)


