export const COMMUNITY_OPTIONS = Object.freeze([
  "성인 N 공동체", "성인 W 공동체", "성인 S 공동체",
  "대학청년부 SHINE", "대학청년부 프로미스", "YOUTH", "기타",
]);
export function communityLabel(person) {
  return person.community === "기타" ? `기타 · ${person.otherCommunity || "미입력"}` : person.community || "공동체 미입력";
}
