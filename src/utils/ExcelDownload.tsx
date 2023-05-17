import React from 'react'
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import { AiOutlineDownload } from 'react-icons/ai'
import { CalendarProps } from '../interface/main'
import { ExcelDownloadProps } from '../interface/schedule'

const download = async (data: CalendarProps[]) => {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('calendarInfoDownload')

  const columns = Object.keys(data[0])
  worksheet.columns = columns.map((column) => ({
    header: column,
    key: column,
  }))
  worksheet.insertRows(2, data)

  const buffer = await workbook.xlsx.writeBuffer()
  saveAs(new Blob([buffer]), '파일명.xlsx')
}

const ExcelDownload = ({ data }: ExcelDownloadProps) => {
  return (
    <button className="excelDownloadButton" onClick={() => download(data)}>
      Excel <AiOutlineDownload size={'14px'} />
    </button>
  )
}

export default ExcelDownload
