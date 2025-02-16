import { useEffect, useState } from 'react';
import axios from 'axios';
import KakaoMap from './KakaoMap';
import { Link, useParams, useLocation } from 'react-router-dom'

function SearchFetch(){
    const [data, setData] = useState({ items: [] });
    const [query, setQuery] = useState("포항시");

    //useEffect는 비동기적으로 동작
    useEffect(() => {
      let completed = false; //초기에는 실행해야 되기때문에 false flag 변수

      //query를 리턴하는 함수를 result에 할당
      async function get() {
        try {
        const result = await axios.get(
            `http://api.data.go.kr/openapi/tn_pubr_public_lbrry_api?serviceKey=efSREml9J5VV3VB7rUN3F1QrndFlWhJWdlTOrfPyf5al8SixYeyO%2FhQJIk9GdSCIHklk5t6iomUE6jj9uRTkZA%3D%3D&pageNo=1&numOfRows=100&type=json&SIGNGU_NM=${query}`
        );
        if (!completed){
            // console.log(result.data.response.body.items);
            setData(result.data.response.body || {items : []});
        }else{
            // console.log(completed);
        }
        } catch(error){
          console.log(error);
        }
      }
      get();

      return () => {
        completed = true;
      };
      //query가 변할때 useEffect를 실행해야하는 시점이다
    }, [query]); //input에 값이 변경이 되었을때 effect를 실행한다
    return (
      <>
        <input value={query} onChange={(e) => setQuery(e.target.value)} />
        <ul>
          {data.items &&
            data.items.map((value, index) => (
              <Link to={`/detail/${index}?name=${value.lbrryNm}&closeDay=${value.closeDay}&longitude=${value.longitude}&latitude=${value.latitude}`} key={index}>
                <li>{value.lbrryNm} : {value.closeDay}</li>
              </Link>
            ))}
        </ul>
      </>
    );
}
/**
 * @see SearchFetch() //참조해서 봐야할것
 */
function Detail() {

  /**
   * id : 인덱스번호
   * location : 현재URL가져오기
   * searchParams : 쿼리스트링 값 가져오기
   * name: 도서관이름
   * closeDay : 휴관일
   * @returns 도서관이름,휴관일,경도,위도,카카오맵
   */
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get('name');
  const closeDay = searchParams.get('closeDay');
  const longitude = searchParams.get('longitude');
  const latitude = searchParams.get('latitude');


  return (
    <>
      도서관 내용
      <p>도서관 이름: {name}</p>
      <p>휴관일: {closeDay}</p>
      <p>경도 : {longitude}</p>
      <p>위도 : {latitude}</p>
      <KakaoMap index={id} longitude = {longitude} latitude= {latitude} />
    </>
  );
}
export { SearchFetch, Detail };