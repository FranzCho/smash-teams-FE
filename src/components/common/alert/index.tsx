import { useMutation, useQuery } from 'react-query'
import Swal from 'sweetalert2'

export const ConfirmButtonClick = () => {
  Swal.fire({
    title: '승인하시겠습니까?',
    text: '승인 후 취소할 수 없습니다.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d32727',
    cancelButtonColor: '#d34747',
    confirmButtonText: '예',
    cancelButtonText: '아니요',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: '신청!',
        text: `신청이 완료되었어요 :)`,
        icon: 'success',
        confirmButtonColor: '#476FD3',
        confirmButtonText: '내역보기 페이지 바로가기',
      })
    }
  })
}

export const ConfirmAdminButtonClick = (userId: number, teamName: string, role: string) => {
  Swal.fire({
    title: '승인하시겠습니까?',
    text: '승인 후 취소할 수 없습니다.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d32727',
    cancelButtonColor: '#d34747',
    confirmButtonText: '예',
    cancelButtonText: '아니요',
  }).then((result) => {
    if (result.isConfirmed) {
      // useUpdateAdmin(userId, teamName, role)
      Swal.fire({
        title: '신청!',
        text: `신청이 완료되었어요 :)`,
        icon: 'success',
        confirmButtonColor: '#476FD3',
        confirmButtonText: '내역보기 페이지 바로가기',
      })
    }
  })
}

export const CofirmBasicButtonClick = (content: string) => {
  Swal.fire({
    title: content,
    confirmButtonColor: '#476FD3',
  })
}
