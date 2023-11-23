
import { render, screen, waitFor } from '@testing-library/react';
import {jest, test} from '@jest/globals';
import Kakaoauth from '../Kakaoauth';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {BrowserRouter, MemoryRouter} from 'react-router-dom'
import "jest-location-mock";
import { mockUseNavigate } from '../../setupTests';

test('서버로부터 인가 코드를 받은 후 홈 화면으로 이동하기', async () => {
        // 현 주소 조작(KAKAO_CODE를 받기 위함.)
        window.location.assign("/loginTest?code=221112222");
        const path = '/loginTest?code=221112222';
        // https://jestjs.io/docs/mock-function-api#mockfnmockresolvedvaluevalue 참고
        const mocKakaoAccessToken = jest.fn<() => Promise<string>>().mockResolvedValue("L1Mjs_s09jTR-gDBjmlCBBXbgV8JMsianSUKPXPsAAABi-9-KhTRDLJpR7eCqA");

        // // mockData Checking
        const accessToken:string = await mocKakaoAccessToken();
        expect(accessToken).toBe("L1Mjs_s09jTR-gDBjmlCBBXbgV8JMsianSUKPXPsAAABi-9-KhTRDLJpR7eCqA");

        // // accessToken 잘 들어감.
        const mock = new MockAdapter(axios);
        mock.onGet('http://localhost:8080/login/oauth2/code/kakao').reply(200, {
            accessToken
        })

        render(
        <MemoryRouter initialEntries={[path]}>
            <Kakaoauth />
        </MemoryRouter>
        );
        expect(window.location).not.toBeAt("/");
        expect(window.location).toBeAt("/loginTest?code=221112222");
});