"use client";

import { useState } from "react";
import { loginUsuario } from "@/services/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from 'next/image';


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await loginUsuario(email, password);
      // Se o login for bem-sucedido, redireciona para a home ou dashboard
      router.push("/"); 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Lado Esquerdo: Formulário */}
      <div className="flex flex-1 flex-col justify-center px-8 py-12 md:px-24 lg:flex-none lg:w-1/2">
        <div className="mx-auto w-full max-w-sm">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Aceder à GinoGran
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Bem-vindo de volta. Por favor, insira os seus dados.
            </p>
          </div>

          <div className="mt-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                  placeholder="exemplo@email.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Palavra-passe
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              {error && (
                <div className="text-sm text-red-600 font-medium">
                  {error}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full justify-center rounded-md bg-black py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus:outline-none disabled:opacity-50"
                >
                  {loading ? "A entrar..." : "Entrar"}
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Não tem uma conta?{" "}
              <Link href="/registro" className="font-semibold leading-6 text-black hover:underline">
                Criar conta gratuita
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Lado Direito: Imagem Impactante */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src="/Marmore1.jpeg" 
          alt="Textura de Mármore GinoGran"
          width={300}
          height={300}
        />
        <div className="absolute inset-0 bg-black/20" /> {/* Overlay para dar profundidade */}
      </div>
    </div>
  );
}