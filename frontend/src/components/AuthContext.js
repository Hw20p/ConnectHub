// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

// 인증 컨텍스트를 생성합니다.
export const AuthContext = createContext();

//초기값은 localStorage에서 'authToken'을 가져오거나, 없으면 null로 설정합니다.
export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);
    const [userId, setUserId] = useState(null); // 사용자 정보 상태 추가

    useEffect(() => {
        // localStorage에서 'authToken'을 가져옵니다.
        const token = localStorage.getItem('authToken');
        // 'authToken'이 존재하면, 사용자 정보를 가져옵니다.
        if (token) {
            setAuthToken(token);
        }
    }, []);
    
    const login = (token) => {
        localStorage.setItem('authToken', token);
        setAuthToken(token);
    };
    
    const logout = () => {
        // localStorage에서 'authToken'을 제거합니다.
        localStorage.removeItem('authToken');
        // authToken 상태를 null로 설정합니다.
        setAuthToken(null);
        setUserId(null);
    };

    return (
        <AuthContext.Provider value={{ authToken, userId, setUserId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};