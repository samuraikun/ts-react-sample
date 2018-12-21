import { FormValidationResult } from 'lc-form-validation';
import * as toastr from 'toastr';
import { actionTypes } from '../../../common/constants/actionTypes';
import { MemberEntity } from '../../../model';
import { memberAPI } from '../../../api/member';
import { memberFormValidation } from '../memberFormValidation';

export const saveMemberAction = (member: MemberEntity) => async dispatch => {
  const formValidationResult = await memberFormValidation.validateForm(member);

  if (formValidationResult.succeeded) {
    saveMember(member);
  }

  dispatch(saveMemberActionCompleted(formValidationResult));
}

const saveMember = async (member: MemberEntity) => {
  try {
    await memberAPI.saveMember(member);
    await toastr.success('Member saved');
    history.back();
  } catch (error) {
    console.log(error);
  }
}

const saveMemberActionCompleted = (formValidationResult: FormValidationResult) => ({
  type: actionTypes.SAVE_MEMBER,
  payload: formValidationResult
});
