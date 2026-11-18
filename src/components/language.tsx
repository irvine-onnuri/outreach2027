"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
export type Language = "ko" | "en";
const LanguageContext = createContext({ language: "ko" as Language, setLanguage: (_:Language) => {} });
export function LanguageProvider({children}:{children:ReactNode}) {
  const [language,setLanguage] = useState<Language>("ko");
  useEffect(()=>{try{if(localStorage.getItem("outreach-language")==="en")setLanguage("en");}catch{}},[]);
  useEffect(()=>{document.documentElement.lang=language;},[language]);
  function change(next:Language){setLanguage(next);try{localStorage.setItem("outreach-language",next);}catch{}}
  return <LanguageContext.Provider value={{language,setLanguage:change}}>{children}</LanguageContext.Provider>;
}
const english:Record<string,string>={
  "전체":"All teams", "성인":"Adults", "성인 N":"Adult N", "성인 W":"Adult W", "성인 S":"Adult S", "SHINE":"SHINE", "프로미스":"Promise", "EM 연합":"EM United", "YOUTH":"YOUTH",
  "성인 N 공동체":"Adult N Community", "성인 W 공동체":"Adult W Community", "성인 S 공동체":"Adult S Community", "대학청년부 SHINE":"Young Adults · SHINE", "대학청년부 프로미스":"Young Adults · Promise", "기타":"Other",
  "제주":"Jeju", "일본":"Japan", "제주/일본 러브소나타":"Jeju / Japan Love Sonata", "폴란드":"Poland", "콜롬비아":"Colombia", "튀니지":"Tunisia", "도미니카":"Dominican Republic",
  "참가 확정":"Confirmed", "참가 확정":"Confirmed", "대기 접수":"Waitlisted", "취소 완료":"Cancelled", "접수 종료":"Registration closed", "모집 준비 중":"Coming soon", "정원 마감":"Full", "마감 임박":"Filling fast", "모집 중":"Open",
  "차희영 선교 MC · 949-773-6175":"차희영 · Mission Coordinator · 949-773-6175",
  "2027 여름 아웃리치 선착순 신청을 받습니다. 정원이 차면 동의하신 분에 한해 대기 접수됩니다.":"Registration for Summer Outreach 2027 is first come, first served. If a team is full, you may choose to join its waitlist.",
  "2027 여름 아웃리치 모집을 준비하고 있습니다. 신청 일정과 세부 안내는 추후 공지합니다.":"Summer Outreach 2027 registration is being prepared. Dates and details will be announced soon.",
  "각 아웃리치의 신청 화면에서 담당 교역자와 문의 연락처를 확인해 주세요.":"See each team’s application form for its pastor and contact information.",
  "확인 코드를 다시 확인해 주세요.":"Please check your confirmation code.",
  "조회 시도가 너무 많습니다. 15분 후 다시 시도해 주세요.":"Too many lookup attempts. Please try again in 15 minutes.",
  "이메일 또는 비밀번호가 맞지 않습니다.":"The email or password is incorrect.",
  "이 신청을 변경할 수 없습니다.":"You cannot change this application.",
  "다시 시도해 주세요.":"Please try again.", "필수 항목과 입력 형식을 확인해 주세요.":"Please check all required fields and their formats.",
  "처리하지 못했습니다. 잠시 후 다시 시도해 주세요.":"We couldn’t process your request. Please try again shortly.",
  "참가자 이름이 중복되어 있습니다. 동명이인은 구분 가능한 이름을 입력해 주세요.":"Participant names are duplicated. If two people share a name, add a distinguishing detail.",
  "이미 처리된 요청입니다.":"This request has already been processed.",
  "접수 기간·팀 상태·잔여석을 확인해 주세요. 정원이 부족하면 대기 동의가 필요하며 같은 이메일은 시간당 10건까지 접수할 수 있습니다.":"Please check the registration dates, team status and available seats. If seats are full, waitlist consent is required. Each email may submit up to 10 applications per hour.",
  "같은 참가자 구성으로 이미 접수되었습니다. 신청 확인 코드로 조회하거나 담당자에게 문의해 주세요.":"This group has already applied. Use your confirmation code to look up the application, or contact your team.",
  "입력 내용을 확인해 주세요.":"Please check your information.", "입력 내용이 너무 깁니다.":"Your entry is too long.",
};
export function useLanguage(){
  const {language,setLanguage}=useContext(LanguageContext);
  const l=(ko:string,en:string)=>language==="en"?en:ko;
  const translate=(value:string)=>language==="en"?(english[value]||value.replace(/항공권/g,"Airfare").replace(/ 목사$/," (Pastor)")):value;
  return {language,setLanguage,l,translate};
}
