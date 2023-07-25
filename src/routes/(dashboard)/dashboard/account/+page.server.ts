import { fail, redirect } from '@sveltejs/kit'
import type { Actions } from '../$types.js'

export const load = async ({ locals: { supabase, getSession } }) => {
  const session = await getSession();

  if (!session) {
    throw redirect(303, '/')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select(`username, first_name, last_name`)
    .eq('id', session.user.id)
    .single()

  return { session, profile, email: session.user.email }
}

export const actions: Actions = {
  signout: async ({ locals: { supabase } }) => {
    const {error} = await supabase.auth.signOut();
  
  if (error) {
    return fail(401, { message: 'Server error. Try again later.', success: false, })
  }
  console.log("Signing user out");
  }
};