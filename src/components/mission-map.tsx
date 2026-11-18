import { useLanguage } from "./language";
import land from "@/lib/world-land.json";

// Natural Earth country label positions; city and island markers are approximate.
const origin = { longitude: -117.8265, latitude: 33.6846 };
const destinations = [
  { name: "제주", community: "SHINE", longitude: 126.53, latitude: 33.38, dx: -4, dy: 32, bend: -88 },
  { name: "일본", community: "SHINE · 러브소나타", longitude: 138, latitude: 36.5, dx: 16, dy: -18, bend: -99 },
  { name: "폴란드", community: "SHINE · EM 연합", longitude: 19.490468, latitude: 51.990316, dx: 13, dy: -15, bend: -47 },
  { name: "콜롬비아", community: "프로미스", longitude: -73.174347, latitude: 3.373111, dx: 14, dy: 24, bend: 0 },
  { name: "도미니카", community: "성인 W", longitude: -70.66, latitude: 18.74, dx: 17, dy: -8, bend: -21 },
  { name: "튀니지", community: "프로미스", longitude: 9.007881, latitude: 33.687263, dx: 14, dy: 26, bend: -12 },
];
const project = (longitude: number, latitude: number) => ({
  x: 28 + ((longitude + 180) / 360) * 664,
  y: 24 + ((85 - latitude) / 145) * 300,
});

export default function MissionMap() {
  const {l,translate:t}=useLanguage();
  const start = project(origin.longitude, origin.latitude);
  return (
    <figure className="mission-map">
      <figcaption className="mission-map-heading">
        <div><span>2027 MISSION MAP</span><h2>{l("얼바인에서, 온누리로.","From Irvine, to the world.")}</h2></div>
        <span className="map-year">’27</span>
      </figcaption>
      <svg className="world-map" viewBox="0 0 720 350" role="img" aria-labelledby="mission-map-title mission-map-description">
        <title id="mission-map-title">{l("얼바인과 여섯 선교지를 잇는 세계지도","A world map connecting Irvine and six destinations")}</title>
        <desc id="mission-map-description">{l("미국 캘리포니아 얼바인에서 제주, 일본, 폴란드, 콜롬비아, 도미니카, 튀니지로 연결됩니다. 폴란드에는 SHINE과 EM 연합 두 팀이 갑니다. 점은 선교지의 대략적인 위치이며 연결선은 실제 항공 경로가 아닙니다.","Irvine connects with Jeju, Japan, Poland, Colombia, the Dominican Republic and Tunisia. SHINE and EM United both travel to Poland. Markers show approximate locations; lines are illustrative, not flight routes.")}</desc>
        <defs>
          <clipPath id="world-map-clip"><rect x="18" y="12" width="684" height="320" rx="8"/></clipPath>
          <linearGradient id="route-blue" x1="0" x2="1"><stop stopColor="#ffffff"/><stop offset="1" stopColor="#7cc2ff"/></linearGradient>
        </defs>
        <g clipPath="url(#world-map-clip)">
          <g className="map-graticule">
            {[-120, -60, 0, 60, 120].map(lon => <path key={lon} d={`M${project(lon, 85).x} 12V332`}/>)}
            {[-30, 0, 30, 60].map(lat => <path key={lat} d={`M18 ${project(0, lat).y}H702`}/>)}
          </g>
          <g className="map-land">{land.map((d, i) => <path key={i} d={d}/>)}</g>
          <g className="map-routes">
            {destinations.map(place => {
              const end = project(place.longitude, place.latitude);
              const span = end.x - start.x;
              return <path key={place.name} d={`M${start.x} ${start.y} C${start.x + span * .35} ${start.y + place.bend},${start.x + span * .75} ${end.y + place.bend},${end.x} ${end.y}`}/>;
            })}
          </g>
          {destinations.map(place => {
            const point = project(place.longitude, place.latitude);
            return <g key={place.name} className="map-destination">
              <circle className="map-point-halo" cx={point.x} cy={point.y} r="10"/>
              <circle className="map-point" cx={point.x} cy={point.y} r="4.6"/>
              <text x={point.x + place.dx} y={point.y + place.dy}>{t(place.name)}</text>
            </g>;
          })}
          <g className="map-origin">
            <circle className="origin-halo" cx={start.x} cy={start.y} r="16"/>
            <circle cx={start.x} cy={start.y} r="6" fill="white"/>
            <path d={`M${start.x} ${start.y + 13}v18`} stroke="white" strokeOpacity=".65"/>
            <text x={start.x} y={start.y + 49} textAnchor="middle">IRVINE</text>
            <text className="origin-korean" x={start.x} y={start.y + 67} textAnchor="middle">{l("얼바인","California")}</text>
          </g>
        </g>
      </svg>
      <ul className="map-destinations" aria-label={l("아웃리치 선교지","Outreach destinations")}>
        {destinations.filter(place => place.name!=="일본").map(place => <li key={place.name}><span className="destination-name"><i/>{place.name==="제주"?l("제주 · 일본","Jeju · Japan"):t(place.name)}</span><small>{place.community==="SHINE · EM 연합"?l(place.community,"SHINE · EM United"):t(place.community)}</small></li>)}
      </ul>
      <div className="map-caption"><span className="map-origin-key"/>{l("얼바인에서 시작되는 사랑의 여정","A journey of love, beginning in Irvine")}<span>ONE CHURCH. ONE MISSION.</span></div>
    </figure>
  );
}
