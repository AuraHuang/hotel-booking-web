import React, { useEffect } from 'react'
import './feature.scss'
import { CategoriesType, CategoriesCities, PopularHotelsData } from '../../data'
import Categories from '../../subcomponents/Categories/Categories'
import PostCards from '../../subcomponents/PostCard/PostCards'
import PopularHotels from '../../subcomponents/PopularHotels/PopularHotels'
import useFetch from '../../hooks/useFetch'


const feature = () => {

  const { data, loading, error } = useFetch("/api/v1/hotels?popularHotel=true")

  const typeUrl =  `/api/v1/hotels/amountoftype?type=${CategoriesType.map((type) => type.name)}`
  const cityUrl =  `/api/v1/hotels/amountofcities?city=${CategoriesCities.map((city) => city.name)}`

  return (
    <div className='feature'>
        <div className="container">
          <div className="list">
            <div className="listTitle">
              <h2>新潮目的地</h2>
              <p>來自臺灣的旅客的最熱門選擇</p>
            </div>
            <div className="listItems">
              <PostCards />
            </div>
          </div>
          <div className="list">
            <div className="listTitle">
              <h2>探索臺灣</h2>
              <p>這些熱門目的地魅力無窮，等你來體驗！</p>
            </div>
            <div className="listItems">
              <Categories dataArray={CategoriesCities} url={cityUrl} />
            </div>
          </div>
          <div className="list">
            <div className="listTitle">
              <h2>依住宿類型瀏覽</h2>
            </div>
            <div className="listItems">
              <Categories dataArray={CategoriesType} url={typeUrl} />
            </div>
          </div>
          <div className="list">
            <div className="listTitle">
              <h2>入住本站的優質特色住宿</h2>
              <p>城堡、Villa、船屋、冰屋等等，本站什麼都有！</p>
            </div>
            <div className="listItems">
              <PopularHotels dataArray={data} loading={loading}/>
            </div>
          </div>
        </div>
    </div>
  )
}

export default feature