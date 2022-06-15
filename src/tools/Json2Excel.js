
const ExcelJS = require('exceljs');
//rows

async function ExportFile(officeDayArr){
let currentdate = new Date();
let oneJan = new Date(currentdate.getFullYear(),0,1);
let numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));

let result = Math.ceil(( currentdate.getDay() + 7 + numberOfDays) / 7);
function dates(current) {
  var week= new Array(); 
  // Starting Monday not Sunday
  current.setDate((current.getDate() - current.getDay() ));
  for (var i = 0; i < 7; i++) {
      week.push(
          new Date(current)
      ); 
      current.setDate(current.getDate() );
  }
  return week; 
}
let weekDays=dates(currentdate)


const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet('My Sheet');
worksheet.columns=[
    {header: "Id",key: "id"},
    {header:"Name",key:"name"},
    {header:`${weekDays[0].getDate()} Monday`,key:"monday"},
    {header:`${weekDays[1].getDate()} Tuesday`,key:"tuesday"},
    {header:`${weekDays[2].getDate()} Wednesday`,key:"wednesday"},
    {header:`${weekDays[3].getDate()} Thursday`,key:"thursday"},
    {header:`${weekDays[4].getDate()} Friday`,key:"friday"},
    {header:`Office Days Count`,key:"none"},
]
let row;
for(let i=0;i<officeDayArr.length;i++){
   row=worksheet.addRow(officeDayArr[i]);
   row.eachCell(function(cell,colNumber){
    
    if(worksheet.getCell(cell.address).value=='NW'){
      worksheet.getCell(cell.address).border = setBorder('thin')
        worksheet.getCell(cell.address).fill = setSolidColor('F0F0FF')
    }
    else if(worksheet.getCell(cell.address).value=='SW'){
      worksheet.getCell(cell.address).border = setBorder('thin')
      worksheet.getCell(cell.address).fill = setSolidColor('FFF0F0')
  }
  else if(worksheet.getCell(cell.address).value=='PH'){
    worksheet.getCell(cell.address).border = setBorder('thin')
    worksheet.getCell(cell.address).fill = setSolidColor('FFDD00')
}
else if(worksheet.getCell(cell.address).value=='AL'){
  worksheet.getCell(cell.address).border =setBorder('thin')
  worksheet.getCell(cell.address).fill = setSolidColor('FFFF66')
}
else if(worksheet.getCell(cell.address).value=='ML'){
  worksheet.getCell(cell.address).border = setBorder('thin')
  worksheet.getCell(cell.address).fill =setSolidColor('FF9900')
}
else if(worksheet.getCell(cell.address).value=='HR'){
  worksheet.getCell(cell.address).border =setBorder('thin')
  worksheet.getCell(cell.address).fill = setSolidColor('33cc33')
}
else if(worksheet.getCell(cell.address).value=='UL'){
  worksheet.getCell(cell.address).border = setBorder('thin')
  worksheet.getCell(cell.address).fill = setSolidColor('6666FF')
}
    });
    worksheet.getCell(`H${i+2}`).value={ formula: `=COUNTIF(C${i+2}:G${i+2},"NW")` };
    worksheet.getCell(`H${i+2}`).border = setBorder('thin')
    worksheet.getCell(`H${i+2}`).fill=setSolidColor('FFFFFF')

}

worksheet.getCell(`A${officeDayArr.length+2}`).value="Normal Working Count:"

for(let i=67;i<72;i++){
  let letter=String.fromCharCode(i);
  worksheet.getCell(`${letter}${officeDayArr.length+2}`).value={ formula: `=COUNTIF(${letter}${2}:${letter}${officeDayArr.length+1},"NW")`};
  worksheet.getCell(`${letter}${officeDayArr.length+2}`).fill= setSolidColor('FFEECC')
  worksheet.getCell(`${letter}${officeDayArr.length+2}`).border = setBorder('thin')
}
worksheet.getCell(`H${officeDayArr.length+2}`).value={formula:`=SUM(C${officeDayArr.length+2}:G${officeDayArr.length+2})`}
worksheet.getCell(`H${officeDayArr.length+2}`).fill=setSolidColor('FFCF00')
worksheet.getCell(`H${officeDayArr.length+2}`).border = setBorder('thin')


worksheet.getCell('K4').value="NW"
worksheet.getCell('K4').fill=setSolidColor('F0F0FF')
worksheet.getCell(`K4`).border =setBorder('thin')
worksheet.getCell('L4').value="Normal Working(Company)"
worksheet.getCell('L4').fill=setSolidColor('F0F0FF')
worksheet.getCell(`L4`).border =setBorder('thin')

worksheet.getCell('K5').value="AL"
worksheet.getCell('K5').fill=setSolidColor('FFFF66')
worksheet.getCell(`K5`).border =setBorder('thin')
worksheet.getCell('L5').value="Annual Leave"
worksheet.getCell('L5').fill=setSolidColor('FFFF66')
worksheet.getCell(`L5`).border =setBorder('thin')

worksheet.getCell('K6').value="HR"
worksheet.getCell('K6').fill=setSolidColor('33cc33')
worksheet.getCell(`K6`).border =setBorder('thin')
worksheet.getCell('L6').value="Health Report"
worksheet.getCell('L6').fill=setSolidColor('33cc33')
worksheet.getCell(`L6`).border =setBorder('thin')

worksheet.getCell('K7').value="UL"
worksheet.getCell('K7').fill=setSolidColor('6666FF')
worksheet.getCell(`K7`).border =setBorder('thin')
worksheet.getCell('L7').value="Unpaid Leave"
worksheet.getCell('L7').fill=setSolidColor('6666FF')
worksheet.getCell(`L7`).border =setBorder('thin')

worksheet.getCell('K8').value="SW"
worksheet.getCell('K8').fill=setSolidColor('FFF0F0')
worksheet.getCell(`K8`).border =setBorder('thin')
worksheet.getCell('L8').value="Smart Working"
worksheet.getCell('L8').fill=setSolidColor('FFF0F0')
worksheet.getCell(`L8`).border =setBorder('thin')


worksheet.getCell('K9').value="ML"
worksheet.getCell('K9').fill=setSolidColor('FF9900')
worksheet.getCell(`K9`).border =setBorder('thin')
worksheet.getCell('L9').value="Marriage Leave"
worksheet.getCell('L9').fill=setSolidColor('FF9900')
worksheet.getCell(`L9`).border =setBorder('thin')

worksheet.getCell('K9').value="PH"
worksheet.getCell('K9').fill=setSolidColor('FFDD00')
worksheet.getCell(`K9`).border =setBorder('thin')
worksheet.getCell('L9').value="Public Holiday"
worksheet.getCell('L9').fill=setSolidColor('FFDD00')
worksheet.getCell(`L9`).border =setBorder('thin')
function setBorder(border){
  return  {
    top: {style:border},
    left: {style:border},
    bottom: {style:border},
    right: {style:border}
  };
}
function setSolidColor(color){
  return  {
    type: 'pattern',
  pattern:'solid',
  fgColor:{argb:color},
    
  };
}

const buffer = await workbook.xlsx.writeBuffer();

return buffer

}
export default{
    ExportFile
}