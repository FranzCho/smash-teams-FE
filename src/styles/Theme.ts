/**
 * 활용예시
 * export const SideBar = styled.div`
  background-color: ${GlobalColors.blueDisable};
  `
 * mainColor: 메인컬러 입니다.
 *
 * white: 흰색이 활용되는 폰트,버튼에 활용되는 컬러입니다.
 *
 * black: 검은색이 활용되는 폰트,버튼에 활용되는 컬러입니다.
 *
 * blackTabBar: 관리자 유저 권한 설정페이지의 탭바 컬러입니다.
 *
 * blackTeamName: 연차, 당직 관리하기 페이지에 활용되는 팀명 BG컬러입니다.
 *
 * blackCompleteList: 연차, 당직 관리하기 페이지에 활용되는 "신청 중 목록","완료된 목록" BG컬러입니다.
 *
 * red: 메인색 외에 활용되는 폰트,버튼에 활용되는 레드컬러입니다.
 *
 * redSideMenu: 사이드 바에 활용되는 메뉴 하이라이트 컬러입니다.
 *
 * redTodayButton: 달력에 활용되는 Today버튼 BG컬러입니다.
 *
 * redContainer: 연차, 반차, 당직신청하기 페이지에 활용되는 컨테이너 BG컬러입니다.
 *
 * redConfirmButton: 연차, 반차, 당직신청하기 페이지에 활용되는 승인요청하기버튼 BG컬러입니다.
 *
 * redReject/blue: 연차, 당직  관리하기/내역보기 페이지에 활용되는 거절버튼 BG컬러, BorderLine입니다.
 *
 * redDisable/blueDisable: 연차, 당직  관리하기 페이지의 신청 내역에 활용되는 거절버튼 BG컬러, BorderLine입니다.
 *
 * grayAddTeam: 관리자 팀추가 페이지의 모달창에 사용되는 삭제버튼 BG컬러입니다.
 *
 * redDelete: 관리자 팀 추가 페이지의 모달창에 사용되는 추가버튼 BG컬러입니다.
 *
 * gray: 그레이가 활용되는 폰트, 버튼, disable 등에 활용되는 컬러입니다.
 *
 * grayFont: 관리자 유저 권한 설정페이지 탭바에 활용되는 폰트 컬러입니다.
 *
 * grayConfirmButton: 연차, 당직  관리하기 /  처리된 페이지 ,관리자 유저 권한 설정에 활용되는 확인버튼 BG컬러입니다.
 *
 */
export const theme = {
  colors: {
    mainColor: '#AA2727',
    mainColorGray: '#912121',

    white: '#FFFFFF',

    black: '#2D2D2D',
    blackTabBar: '#383838',
    blackTeamName: '#000000',
    blackCompleteList: '#2C2C2C',

    red: '#952A2A',
    redGray: '#772222',
    redSideMenu: '#F7CCCC',

    redTodayButton: '#E15E5E',
    redContainer: '#C94F4F',

    redConfirmButton: '#6B1E1E',

    redReject: '#D34747',
    redDisable: '#E9A3A3',

    redDelete: '#812E2E',

    greenBe: '#308FA4',

    blue: '#476FD3',
    blueDisable: '#A3B7E9',

    gray: '#D9D9D9',
    grayFont: '#A1A1A1',
    grayConfirmButton: '#454545',
    grayAddTeam: '#474747',
  },
}
