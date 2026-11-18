export type Team={id:string;name:string;community:string;start_date:string;end_date:string;fee:string;capacity:number;leader_slots:number;enabled:number;waitlist:number;description:string;description_en:string;internal_note?:string;pastor:string;contact:string;reserved:number;waiting:number;sort_order:number};
export type Settings={id:number;enabled:number;opens_on:string;closes_on:string;contact:string;notice:string};
export type Application={sequence:number;id:string;team_id:string;name:string;community:string;contact_name:string;email:string;phone:string;participants:string;party_size:number;status:string;paid:number;created_at:string};
export const statusLabel:Record<string,string>={reserved:"참가 확정",confirmed:"참가 확정",waitlisted:"대기 접수",cancelled:"취소 완료"};
export function laToday(){return new Intl.DateTimeFormat("en-CA",{timeZone:"America/Los_Angeles",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date());}
export function registrationOpen(s:Settings){const d=laToday();return !!s.enabled&&(!s.opens_on||s.opens_on<=d)&&(!s.closes_on||s.closes_on>=d);}
export function remaining(t:Team){return Math.max(0,t.capacity-t.leader_slots-t.reserved);}
export function teamState(t:Team,s:Settings){if(s.closes_on&&laToday()>s.closes_on)return "접수 종료";if(!registrationOpen(s)||!t.enabled)return "모집 준비 중";if(!remaining(t)||t.waiting)return t.waitlist?"대기 접수":"정원 마감";return remaining(t)<=3?"마감 임박":"모집 중";}
export function dateRange(t:Team){return t.start_date&&t.end_date?t.start_date.slice(5).split("-").map(Number).join(".")+" ~ "+t.end_date.slice(5).split("-").map(Number).join("."):"추후 공지";}

export function phoneLink(contact:string){const phone=contact.match(/(?:\+1[ .-]?)?\(?\d{3}\)?[ .-]?\d{3}[ .-]?\d{4}/);return phone?"tel:"+phone[0].replace(/[^+\d]/g,""):null;}
