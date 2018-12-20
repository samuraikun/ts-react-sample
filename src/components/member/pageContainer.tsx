import * as React from 'react';
import * as toastr from 'toastr';
import { FieldValidationResult } from 'lc-form-validation';
import { memberAPI } from '../../api/member';
import { MemberEntity, MemberErrors } from '../../model';
import { memberFormValidation } from './memberFormValidation';
import { MemberPage } from './page';
import { History } from 'history';

interface State {
  member: MemberEntity;
  memberErrors: MemberErrors;
}

interface Props {
  history: History;
  match: { params: { id: string } };
}

export class MemberPageContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      member: {
        id: -1,
        login: '',
        avatar_url: '',
      },
      memberErrors: {
        login: new FieldValidationResult(),
      }
    }

    this.onFieldValueChange = this.onFieldValueChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  public async componentDidMount() {
    const memberId = Number(this.props.match.params.id) || 0;

    const member = await memberAPI.fetchMemberById(memberId);
    console.log(member);

    if (member) {
      this.setState({
        ...this.state,
        member,
      });
    }
  }

  private async onFieldValueChange(fieldName: string, value: string) {
    const fieldValidationResult = await memberFormValidation.validateField(this.state.member, fieldName, value)
    const nextState = {
      ...this.state,
      member: {
        ...this.state.member,
        [fieldName]: value,
      },
      memberErrors: {
        ...this.state.memberErrors,
        [fieldName]: fieldValidationResult,
      }
    };

    this.setState(nextState);
  }

  private onSave = async () => {
    const formValidationResult = await memberFormValidation.validateForm(this.state.member);

    if (formValidationResult.succeeded) {
      await memberAPI.saveMember(this.state.member);
      await toastr.success('Member saved');
      this.props.history.goBack();
    }
  }

  render() {
    return (
      <MemberPage
        member={this.state.member}
        memberErrors={this.state.memberErrors}
        onChange={this.onFieldValueChange}
        onSave={this.onSave}
      />
    );
  }
}


