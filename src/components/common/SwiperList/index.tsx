import { memo, useRef } from 'react'
import * as S from './style'
import SwiperCore, { Pagination, Swiper } from 'swiper'
import { MyScheduleData } from '../../../interface/schedule'
import HistoryCard from '../../historyCard'
import { SwiperSlide } from 'swiper/react'

type SwiperType = Swiper | null

function SwiperList({ seletedData }: { seletedData: MyScheduleData[] | undefined }) {
  // 스와이퍼
  SwiperCore.use([Pagination])
  const swiperRef = useRef<SwiperType>(null)

  // swiper 이전, 다음 버튼
  const handlePrevClick = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev()
    }
  }
  const handleNextClick = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext()
    }
  }
  console.log('내가  찾는 콘솔', seletedData)

  return (
    <S.ListWrapper
      onSwiper={(swiper) => {
        swiperRef.current = swiper
      }}
      slidesPerView={3}
      spaceBetween={50}
      grabCursor={true}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      slidesOffsetAfter={50}
    >
      {seletedData && seletedData.length > 0 ? (
        seletedData?.map((schedule: MyScheduleData) => (
          <SwiperSlide>
            <HistoryCard key={schedule.scheduleId} schedule={schedule}></HistoryCard>
          </SwiperSlide>
        ))
      ) : (
        <SwiperSlide>
          <S.NoDataImageWrapper>
            <S.NoDataImage src="/no-data.jpg" alt="" />
          </S.NoDataImageWrapper>
        </SwiperSlide>
      )}
      <div className="swiper-button-prev" onClick={handlePrevClick}></div>
      <div className="swiper-button-next" onClick={handleNextClick}></div>
    </S.ListWrapper>
  )
}

export default memo(SwiperList)
