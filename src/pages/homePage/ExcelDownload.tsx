import React from 'react'
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import { AiOutlineDownload } from 'react-icons/ai'

const download = async (data) => {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('시트 이름')

  const columns = Object.keys(data[0])
  worksheet.columns = columns.map((column) => ({
    header: column,
    key: column,
  }))
  worksheet.insertRows(2, data)

  const buffer = await workbook.xlsx.writeBuffer()
  saveAs(new Blob([buffer]), '파일명.xlsx')
}

const ExcelDownload = ({ data }) => {
  return (
    <button className="excelDownloadButton" onClick={() => download(data)}>
      Excel <AiOutlineDownload size={'14px'} />
    </button>
  )
}

export default ExcelDownload
