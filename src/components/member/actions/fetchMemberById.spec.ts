import configureStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
import * as apiMember from '../../../api/member';
import { members } from '../../../api/member/mockData';
import { fetchMockMemberById } from './fetchMemberById';

const middlewares = [reduxThunk];
const getMockStore = configureStore(middlewares);

describe('member/actions/fetchMemberById tests', () => {
  it('should call to apiMember.fetchMemberById', done => {
    // Arrange
    const fetchMockMemberByIdStub = jest.spyOn(apiMember.memberAPI, 'fetchMockMemberById');
    const id = 1457912;

    // Act
    const store = getMockStore();
    store.dispatch<any>(fetchMockMemberById(id))
      .then(() => {
        // Assert
        expect(fetchMockMemberByIdStub).toHaveBeenCalled();
        done();
      });
  });
});

