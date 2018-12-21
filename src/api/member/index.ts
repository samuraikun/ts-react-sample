import { MemberEntity, RepositoryEntity } from '../../model';
import { members } from './mockData';

const baseURL = 'https://api.github.com/orgs/lemoncode';
const userURL = 'https://api.github.com/user';
const repoURL = 'https://api.github.com/orgs/lemoncode/repos';
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

const mapToRepositories = (githubRepositories: any[]): RepositoryEntity[] => {
  return githubRepositories.map(mapToRepository);
};

const mapToRepository = (githubRepository: any):RepositoryEntity => {
  return{
    id: githubRepository.id,
    name: githubRepository.name,
    description: githubRepository.description
  }
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

const fetchMemberById = async (id: number): Promise<MemberEntity> => {
  const membersURL = `${userURL}/${id}`;
  const res = await fetch(membersURL);
  const member = await res.json();

  return mapToMember(member);
}

const fetchRepositories = async (): Promise<RepositoryEntity[]> => {
  const res = await fetch(repoURL);
  const repositories = await res.json();

  return mapToRepositories(repositories);
}

export const memberAPI = {
  fetchMembers,
  fetchMemberById,
  saveMember,
  fetchRepositories,
};
