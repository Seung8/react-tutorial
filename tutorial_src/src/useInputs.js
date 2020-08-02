import { useState, useCallback } from 'react';

// initialForm = input form에서 관리할 초기값
function useInputs(initialForm) {
    // form 이라는 상태를 새로 선언하기 초기값으로 initialForm으로 설정
    const [ form, setFrom ] = useState(initialForm);
    const onChange = useCallback(e => {
        const { name, value } = e.target;
        setFrom(form => ({ ...form, [name]: value }));
    }, []);
    const reset = useCallback(() => setFrom(initialForm), [initialForm]);
    return [form, onChange, reset];
}

export default useInputs;