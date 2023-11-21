import axios from 'axios';
import { render, waitFor } from '@testing-library/react';
import {jest, test} from '@jest/globals';
import Kakaoauth from '../Kakaoauth';

describe('After Accepting KakaoBack Code', () => {
    test('서버로부터 인가 코드를 받은 후 홈 화면으로 이동하기', async () => {
        // https://jestjs.io/docs/mock-function-api#mockfnmockresolvedvaluevalue 참고
        const mocKakaoAccessToken = jest.fn<() => Promise<String>>().mockResolvedValue("L1Mjs_s09jTR-gDBjmlCBBXbgV8JMsianSUKPXPsAAABi-9-KhTRDLJpR7eCqA");

        // 모의 함수 호출 및 결과 확인
        const result = await mocKakaoAccessToken();
        expect(result).toBe("L1Mjs_s09jTR-gDBjmlCBBXbgV8JMsianSUKPXPsAAABi-9-KhTRDLJpR7eCqA");
    });
});