import React, { useEffect } from 'react'
import './feature.scss'
import { CategoriesType, CategoriesCities, PopularHotelsData, Attractions } from '../../data'
import Categories from '../../subcomponents/Categories/Categories'
import PostCards from '../../subcomponents/PostCard/PostCards'
import PopularHotels from '../../subcomponents/PopularHotels/PopularHotels'
import useFetch from '../../hooks/useFetch'
import ListItem from '../../subcomponents/ListItem/ListItem'


const feature = () => {

  const { data, loading, error } = useFetch("/api/v1/hotels?popularHotel=true")

  const typeUrl =  `/api/v1/hotels/amountoftype?type=${CategoriesType.map((type) => type.name)}`
  const cityUrl =  `/api/v1/hotels/amountofcities?city=${CategoriesCities.map((city) => city.name)}`

  return (
    <div className='feature'>
        <div className="container">

          <ListItem 
            title={"新潮目的地"}
            des={"來自臺灣的旅客的最熱門選擇"}
            component={<PostCards dataArray={Attractions}/>}
            isScrollBtnShow={Attractions.length > 5}
          />

          <ListItem 
            title={"探索臺灣"}
            des={"這些熱門目的地魅力無窮，等你來體驗！"}
            component={<Categories dataArray={CategoriesCities} url={cityUrl} />}
            isScrollBtnShow={CategoriesCities.length > 5}
          />

          <ListItem 
            title={"依住宿類型瀏覽"}
            component={<Categories dataArray={CategoriesType} url={typeUrl} />}
            isScrollBtnShow={CategoriesType.length > 5}
          />
          
          <ListItem 
            title={"入住本站的優質特色住宿"}
            des={"城堡、Villa、船屋、冰屋等等，本站什麼都有！"}
            component={<PopularHotels dataArray={data} loading={loading}/>}
            isScrollBtnShow={data.length > 4}
          />

        </div>
    </div>
  )
}

export default feature