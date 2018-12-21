import { actionTypes } from '../../../common/constants/actionTypes';
import { MemberEntity } from '../../../model/memberEntity';
import { memberAPI } from '../../../api/member';

export const fetchMemberByIdAction = (id: number) => async dispatch => {
  const member = await memberAPI.fetchMemberById(id);

  dispatch(fetchMemberByIdCompleted(member));
}

const fetchMemberByIdCompleted = (member: MemberEntity) => ({
  type: actionTypes.FETCH_MEMBER_BY_ID_COMPLETED,
  payload: member,
});
