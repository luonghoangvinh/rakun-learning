const API = '/api/auth';

export const login = async (data: {
    gmail: string;
    password: string;
}) => {
    const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Đăng nhập thất bại');
    }

    return res.json();
};

export const signup = async (data: {
    userName: string;
    gmail: string;
    password: string;
}) => {
    const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Đăng ký thất bại');
    }

    return res.json();
};