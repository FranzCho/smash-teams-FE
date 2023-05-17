import ToastUIReactCalendar from '@toast-ui/react-calendar/*'
import styled, { keyframes } from 'styled-components'
import type { Options } from '@toast-ui/calendar'

import '@toast-ui/calendar/toastui-calendar.css'
import 'tui-date-picker/dist/tui-date-picker.min.css'
import 'tui-time-picker/dist/tui-time-picker.min.css'

const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`

export const HomeWrapper = styled.div`
  width: 1140px;
  display: flex;
  padding: 20px;
  flex-direction: column;
`

export const TopBar = styled.div`
  width: 1137px;
  height: 60px;
  z-index: 9;
  position: absolute;
  display: flex;
  h2 {
    font-weight: 700;
    font-size: 28px;
    width: 175px;
    margin: 0 0 0 14px;
  }
  .info {
    width: 20px;
    height: 20px;
    margin: 0 10px 0 -15px;
    transform: translateY(10px);
    z-index: 14;
  }
  .excelDownloadButton {
    font-weight: 700;
    font-size: 13px;
    background-color: #17842f;
    margin: 10px 0 0 520px;
    border-radius: 8px;
    width: 70px;
    height: 30px;
    line-height: 18px;
    color: ${({ theme }) => theme.colors.white};
    svg {
      transform: translateY(2px);
    }
    &:hover {
      background-color: #0e5f1e;
    }
  }
  /* month, today btn */
  span {
  }
  .btn {
    border-radius: 25px;
  }
  .move-today {
    &:hover {
      background-color: ${({ theme }) => theme.colors.redGray};
    }
    margin-left: 20px;
    background-color: ${({ theme }) => theme.colors.red};
    border-radius: 8px;
    border: none;
    width: 70px;
    height: 30px;
    color: ${({ theme }) => theme.colors.white};
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
  }
  .move-day {
    margin-top: 10px;
    &:hover {
      background-color: ${({ theme }) => theme.colors.mainColorGray};
    }
    background-color: ${({ theme }) => theme.colors.mainColor};
    font-weight: 600;
    font-size: 13px;
    width: 30px;
    height: 30px;
    border-radius: 0%;
    color: ${({ theme }) => theme.colors.white};
    &-prev {
      margin-left: 9px;
      border-bottom-left-radius: 8px;
      border-top-left-radius: 8px;
    }
    &-next {
      border-bottom-right-radius: 8px;
      border-top-right-radius: 8px;
    }
  }

  /* dropdown */
  .dropdown {
    margin-right: 10px;
  }
`
export const Info = styled.div`
  animation: ${fadeIn} 0.5s ease-out;
  position: relative;
  top: -5px;
  left: 0px;
  z-index: 14;
  background-color: ${({ theme }) => theme.colors.white};
  width: 100px;
  height: 80px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  div {
    font-size: 10px;
    font-weight: 700;
    margin: 6px 3px;
    display: flex;
    width: 90px;
    height: 20px;
    align-items: center;
    img {
      transform: translateY(-0.4px);
    }
  }

  .info-dayoff {
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.red};
    color: ${({ theme }) => theme.colors.white};
    img {
      margin: 0 3px 0 4px;
    }
  }
  .info-halfoff {
    border: 1.5px solid ${({ theme }) => theme.colors.red};
    border-radius: 4px;
    img {
      margin: 0 3px;
    }
  }
  .info-shift {
    margin-right: 1px;
    img {
      margin: 0 3px 0 4px;
    }
  }
`

export const calendarWrapper = styled.div`
  margin-top: 60px;
  margin-left: 10px;
`

export const theme: Options['theme'] = {
  common: {
    border: '1px solid #ddd',
    backgroundColor: 'white',
    holiday: { color: '#f54f3d' },
    saturday: { color: '#135de6' },
    dayName: { color: '#333' },
    today: { color: '#fff' },
    gridSelection: {
      backgroundColor: 'rgba(19, 93, 230, 0.1)',
      border: '1px solid #135de6',
    },
  },
  month: {
    dayName: {
      borderLeft: 'none',
      backgroundColor: 'inherit',
    },
    holidayExceptThisMonth: { color: '#f3acac' },
    dayExceptThisMonth: { color: '#bbb' },
    weekend: { backgroundColor: '#fafafa' },
    moreView: { boxShadow: 'none' },
    moreViewTitle: { backgroundColor: '#f4f4f4' },
  },
}
