import { actionTypes } from '../../../common/constants/actionTypes';
import { MemberEntity } from '../../../model/memberEntity';
import { memberAPI } from '../../../api/member';
import { trackPromise } from 'react-promise-tracker';

export const fetchMemberByIdAction = (id: number) => async dispatch => {
  const member = await memberAPI.fetchMemberById(id);

  dispatch(fetchMemberByIdCompleted(member));
}

export const fetchMemberById = (id: number) => (dispatch) => (
  trackPromise(
    memberAPI.fetchMemberById(id)
      .then((member) => {
        dispatch(fetchMemberByIdCompleted(member));
      })
  )
);

export const fetchMockMemberById = (id: number) => (dispatch) => (
  trackPromise(
    memberAPI.fetchMockMemberById(id)
      .then((member) => {
        dispatch(fetchMemberByIdCompleted(member));
      })
  )
);

const fetchMemberByIdCompleted = (member: MemberEntity) => ({
  type: actionTypes.FETCH_MEMBER_BY_ID_COMPLETED,
  payload: member,
});
