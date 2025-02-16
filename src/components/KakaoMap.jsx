import { useEffect, useState } from 'react';
const { kakao } = window;

/**
 * @param props 
 * @brief 카카오맵 출력
 */
function Kakao(props){
    let longitude = props.longitude;
    let latitude = props.latitude;
    console.log(props);

    useEffect(()=>{
        const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        const options = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(latitude, longitude), //지도의 중심좌표.
            level: 3 //지도의 레벨(확대, 축소 정도)
        };
        
        const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    },[])

    return(
        <div id="map" style={{width:500 +'px', height:400 + 'px'}}></div>
    )
}

export default Kakao;