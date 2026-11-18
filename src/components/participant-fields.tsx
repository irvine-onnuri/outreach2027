import { X } from "lucide-react";
import type { ReactNode } from "react";
import { useLanguage } from "./language";
import { COMMUNITY_OPTIONS } from "@/lib/communities.mjs";
export type Participant = { name:string; minor:boolean; community:string; otherCommunity:string };
export default function ParticipantFields({person,index,onChange,onRemove,children}:{person:Participant;index:number;onChange:(p:Participant)=>void;onRemove:()=>void;children?:ReactNode}) {
  const {l,translate}=useLanguage();
  const label = index === 0 ? l("신청자","Applicant") : l(`동반 참가자 ${index}`,`Additional participant ${index}`);
  return <div className="person-card">
    <div className="person-card-heading"><strong>{label}</strong>{index>0&&<button type="button" className="icon-btn" aria-label={l(`${label} 삭제`,`Remove ${label}`)} onClick={onRemove}><X size={16}/></button>}</div>
    <div className="person-row"><label className="person-name">{l("이름","Full name")} <em>*</em><input aria-label={l(`${label} 이름`,`${label} full name`)} value={person.name} required maxLength={80} autoComplete={index===0?"name":"off"} placeholder={l(`${label} 이름`,"Full name")} onChange={e=>onChange({...person,name:e.target.value})}/></label><label className="check-inline"><input type="checkbox" checked={person.minor} onChange={e=>onChange({...person,minor:e.target.checked})}/>{l("미성년","Minor")}</label></div>
    {children}
    <fieldset className="community-fieldset"><legend>{l("소속 공동체","Community")} <em>*</em></legend><div className="community-options">
      {COMMUNITY_OPTIONS.map(option=><label key={option} className={"community-option"+(person.community===option?" selected":"")}><input type="radio" name={`participant-community-${index}`} value={option} required checked={person.community===option} onChange={()=>onChange({...person,community:option,otherCommunity:option==="기타"?person.otherCommunity:""})}/><span>{translate(option)}</span></label>)}
    </div>{person.community==="기타"&&<label className="other-community">{l("공동체 이름을 직접 입력해 주세요","Enter your community")} <em>*</em><input aria-label={l(`${label} 기타 공동체`,`${label} other community`)} value={person.otherCommunity} required maxLength={80} placeholder={l("소속 공동체 또는 교회 이름","Community or church name")} onChange={e=>onChange({...person,otherCommunity:e.target.value})}/></label>}</fieldset>
  </div>;
}
