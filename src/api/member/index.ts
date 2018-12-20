import { MemberEntity } from '../../model';
import { members } from './mockData';

const baseURL = 'https://api.github.com/orgs/lemoncode';
let mockMembers = members;

const fetchMembers = async (): Promise<MemberEntity[]> => {
  const membersURL = `${baseURL}/members`;
  const res = await fetch(membersURL);
  const members = await res.json();

  return mapToMembers(members);
};

const mapToMembers = (githubMembers: any[]): MemberEntity[] => {
  return githubMembers.map(mapToMember);
};

const mapToMember = (githubMember: MemberEntity) => {
  return {
    id: githubMember.id,
    login: githubMember.login,
    avatar_url: githubMember.avatar_url
  };
};

const saveMember = (member: MemberEntity): Promise<boolean> => {
  const index = mockMembers.findIndex(m => m.id === member.id);

  index >= 0 ? updateMember(member, index) : insertMember(member);

  return Promise.resolve(true);
}

const updateMember = (member: MemberEntity, index: number) => {
  mockMembers = [
    ...mockMembers.slice(0, index),
    member,
    ...mockMembers.slice(index + 1),
  ];

  console.table(mockMembers);
};

const insertMember = (member: MemberEntity) => {
  member.id = mockMembers.length;

  mockMembers = [
    ...mockMembers,
    member,
  ];

  console.table(mockMembers);
};

export const memberAPI = {
  fetchMembers,
  saveMember,
};
