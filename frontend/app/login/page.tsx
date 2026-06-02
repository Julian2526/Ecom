'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ecom-production-d108.up.railway.app';

  // 🔥 REGISTRO
  const register = async () => {
    if (!email || !password) {
      alert('Completa todos los campos');
      return;
    }

    const res = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    alert('Usuario registrado correctamente');
  };

  // 🔥 LOGIN
  const login = async () => {
    if (!email || !password) {
      alert('Completa todos los campos');
      return;
    }

    const res = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    localStorage.setItem('user', JSON.stringify(data.user));

    alert('Login exitoso');

    router.push('/');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>🔐 Login / Registro</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={register}>
        Registrarse
      </button>

      <button
        onClick={login}
        style={{ marginLeft: '10px' }}
      >
        Ingresar
      </button>
    </div>
  );
}