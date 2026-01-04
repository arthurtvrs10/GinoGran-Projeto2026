import { supabase } from '../lib/supabase.js';

// Função para validar o formato de e-mail
const validarEmail = (email:string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}


export async function loginUsuario(email: string, password: string){

if (!validarEmail(email)) {
  throw new Error("Formato de e-mail inválido.");
}

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  } 

  return data;
}

export async function registrarUsuario(email: string, password: string) {
  if (!validarEmail(email)) {
    throw new Error("Formato de e-mail inválido.");
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data;
}