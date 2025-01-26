import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, User, UserPlus } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthInput from '../../components/auth/AuthInput';
import PasswordInput from '../../components/auth/PasswordInput';
import PasswordStrength from '../../components/auth/PasswordStrength';
import AuthButton from '../../components/auth/AuthButton';

interface RegisterForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export default function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterForm>();
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const { register: registerUser } = useAuthStore();
  const password = watch('password', '');

  const onSubmit = async (data: RegisterForm) => {
    try {
      await registerUser(data);
      navigate('/');
    } catch (err: any) {
      setError('Une erreur est survenue lors de l\'inscription');
    }
  };

  return (
    <AuthLayout
      title="Créer un compte"
      subtitle="Ou"
      linkText="connectez-vous à votre compte"
      linkTo="/login"
    >
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <AuthInput
            id="firstName"
            type="text"
            label="Prénom"
            Icon={User}
            register={register}
            error={errors.firstName?.message}
            validation={{ required: 'Le prénom est requis' }}
          />

          <AuthInput
            id="lastName"
            type="text"
            label="Nom"
            Icon={User}
            register={register}
            error={errors.lastName?.message}
            validation={{ required: 'Le nom est requis' }}
          />
        </div>

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
          validation={{
            required: 'Le mot de passe est requis',
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
              message: 'Le mot de passe ne respecte pas les règles de sécurité'
            }
          }}
        />

        <PasswordStrength password={password} />

        {error && (
          <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md p-3">
            {error}
          </div>
        )}

        <AuthButton type="submit" Icon={UserPlus}>
          S'inscrire
        </AuthButton>
      </form>
    </AuthLayout>
  );
}