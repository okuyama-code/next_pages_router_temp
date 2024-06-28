import React from 'react';
import Link from 'next/link';
import { Control, Controller, FieldError, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

type RegisterSchemaType = z.infer<typeof registerSchema>;

const Register = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    console.log("submit");
    console.log(data);
    // API call would go here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <InputField
              name="firstName"
              control={control}
              placeholder="First Name"
              error={errors.firstName}
            />
            <InputField
              name="lastName"
              control={control}
              placeholder="Last Name"
              error={errors.lastName}
            />
          </div>
          <InputField
            name="username"
            control={control}
            placeholder="Username"
            error={errors.username}
          />
          <InputField
            name="email"
            control={control}
            placeholder="Email"
            type="email"
            error={errors.email}
          />
          <InputField
            name="password"
            control={control}
            placeholder="Password"
            type="password"
            error={errors.password}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-300"
          >
            Register
          </motion.button>
        </form>
        <Link href="/" passHref>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 text-center text-blue-600 hover:text-blue-800 transition-colors duration-300"
          >
            ホームへ戻る
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
};

interface InputFieldProps {
  name: keyof RegisterSchemaType;
  control: Control<RegisterSchemaType>;
  placeholder: string;
  type?: string;
  error?: FieldError;
}

const InputField: React.FC<InputFieldProps> = ({ name, control, placeholder, type = "text", error }) => (
  <div>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <input
          {...field}
          type={type}
          placeholder={placeholder}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
        />
      )}
    />
    {error && (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-red-500 text-sm mt-1"
      >
        {error.message}
      </motion.p>
    )}
  </div>
);

export default Register;