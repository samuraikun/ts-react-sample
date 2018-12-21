import { memberReducer } from './member';
import * as deepFreeze from 'deep-freeze';
import { MemberEntity } from '../model/memberEntity';
import { actionTypes } from '../common/constants/actionTypes';
import { } from '../reducers';
import { MemberFieldChangePayload } from '../components/member/actions/memberFieldChange';

describe('/reducers/member tests', () => {
  const id = 1;
  const login = 'test login';
  const avatar_url = 'test avatar url';

  const initialState: MemberEntity = {
    id: -1,
    login: '',
    avatar_url: ''
  }

  it('should return an empty member when passing no undefined currentState and some action Type', () => {
    // Arrange
    const currentState = undefined;
    const action = { type: 'some type' };

    // Act
    const nextState = memberReducer(currentState, action);
  
    // Assert
    expect(nextState.id).toEqual(initialState.id);
    expect(nextState.login).toEqual(initialState.login);
    expect(nextState.avatar_url).toEqual(initialState.avatar_url);
  });

  it('should return same currentState without mutate it when passing currentState and some action type', () => {
    // Arrange
    const currentState: MemberEntity = { id, login, avatar_url }
    const action = { type: 'some type' }
    deepFreeze(currentState);

    // Act
    const nextState = memberReducer(currentState, action);

    // Assert
    expect(nextState).toEqual(currentState);
  });

  it('should return currentState when passing an undefined payload, actionTypes.FETCH_MEMBER_BY_ID_COMPLETED action type and member payload', () => {
    // Arrange
    const currentState: MemberEntity = { id, login, avatar_url };

    const payload = undefined;

    const action = {
      type: actionTypes.FETCH_MEMBER_BY_ID_COMPLETED,
      payload,
    };
    deepFreeze(currentState);

    // Act
    const nextState = memberReducer(currentState, action);

    // Assert
    expect(nextState.id).toEqual(initialState.id);
    expect(nextState.login).toEqual(initialState.login);
    expect(nextState.avatar_url).toEqual(initialState.avatar_url);
  });

  it(`should return updated currentState without mutate it when passing currentState and updated member, actionTypes.FETCH_MEMBER_BY_ID_COMPLETED action type and member payload`, () => {
    // Arrange
    const currentState: MemberEntity = { id, login, avatar_url };
    const payload = { id, login: 'test login 2', avatar_url: 'test avatar url 2' };
    const action = {
      type: actionTypes.FETCH_MEMBER_BY_ID_COMPLETED,
      payload,
    }
    deepFreeze(currentState);

    // Act
    const nextState = memberReducer(currentState, action);

    // Assert
    expect(nextState).toEqual(payload);
  });

  it(`should return a new value for field login, actionTypes.UPDATE_MEMBER_FIELD action type and member payload with new login`, () => {
    // Arrange
    const currentState: MemberEntity = { id, login, avatar_url };
    const payload: MemberFieldChangePayload = {
      fieldValidationResult: {
        key: 'login',
        type: '',
        succeeded: true,
        errorMessage: ''
      },
      value: 'new login'
    }

    const action = {
      type: actionTypes.UPDATE_MEMBER_FIELD,
      payload,
    };
    deepFreeze(currentState);

    // Act
    const nextState = memberReducer(currentState, action);

    // Assert
    expect(nextState.login).toEqual('new login');
  });

  it(`should return a new value for field avatar_url, actionTypes.UPDATE_MEMBER_FIELD action type and member payload with new avatar_url`, () => {
    const currentState: MemberEntity = { id, login, avatar_url };
    const payload: MemberFieldChangePayload = {
      fieldValidationResult: {
        key: 'avatar_url',
        type: '',
        succeeded: true,
        errorMessage: ''
      },
      value: 'new avatar_url'
    };
    const action = {
      type: actionTypes.UPDATE_MEMBER_FIELD,
      payload,
    }
    deepFreeze(currentState);

    // Act
    const nextState = memberReducer(currentState, action);

    // Assert
    expect(nextState.avatar_url).toEqual('new avatar_url');
  });
});

