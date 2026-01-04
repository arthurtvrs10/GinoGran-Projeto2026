"use client";

import { useState } from "react";
import { registrarUsuario } from "@/services/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from 'next/image';

export default function RegistroPage() {
  const [email, setEmail] = useState("");
  const [password, s] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("As palavras-passe não coincidem.");
      return;
    }

    setLoading(true);
    try {
      await registrarUsuario(email, password);
      alert("Conta criada! Verifique o seu e-mail para confirmar o registo.");
      router.push("/login");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col justify-center px-8 py-12 md:px-24 lg:flex-none lg:w-1/2">
        <div className="mx-auto w-full max-w-sm">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Criar Conta</h2>
          <form onSubmit={handleRegister} className="mt-10 space-y-6">
            {/* Campos de Email e Password semelhantes ao login */}
            {/* ... */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirmar Palavra-passe</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:ring-1 focus:ring-black"
              />
            </div>

            {error && <div className="text-sm text-red-600 font-medium">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-black py-2 text-white hover:bg-gray-800 disabled:opacity-50"
            >
              {loading ? "A processar..." : "Criar conta"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-500">
            Já tem conta? <Link href="/login" className="font-semibold text-black hover:underline">Entrar</Link>
          </p>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <Image className="absolute inset-0 h-full w-full object-cover" src="/Marmore2.jpeg" alt="Registro" />
      </div>
    </div>
  );
}