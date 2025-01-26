import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, LogIn } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthInput from '../../components/auth/AuthInput';
import PasswordInput from '../../components/auth/PasswordInput';
import AuthButton from '../../components/auth/AuthButton';

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.email, data.password);
      navigate('/');
    } catch (err: any) {
      setError('Email ou mot de passe incorrect');
    }
  };

  return (
    <AuthLayout
      title="Connexion"
      subtitle="Ou"
      linkText="créez un compte"
      linkTo="/register"
    >
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <AuthInput
          id="email"
          type="email"
          label="Email"
          Icon={Mail}
          register={register}
          error={errors.email?.message}
          validation={{
            required: 'L\'email est requis',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email invalide'
            }
          }}
        />

        <PasswordInput
          id="password"
          label="Mot de passe"
          register={register}
          error={errors.password?.message}
          validation={{ required: 'Le mot de passe est requis' }}
        />

        {error && (
          <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md p-3">
            {error}
          </div>
        )}

        <AuthButton type="submit" Icon={LogIn}>
          Se connecter
        </AuthButton>
      </form>
    </AuthLayout>
  );
}