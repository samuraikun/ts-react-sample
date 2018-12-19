import { MemberEntity } from '../../model';

const baseURL = 'https://api.github.com/orgs/lemoncode';

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

export const memberAPI = {
  fetchMembers,
};
