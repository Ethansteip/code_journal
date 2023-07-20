<script lang="ts">
  import { AppShell, AppBar, Toast, toastStore, AppRail, Avatar } from '@skeletonlabs/skeleton';
  import { invalidate } from '$app/navigation';
  import Home from '$lib/components/Icons/Home.svelte';
  import Plus from '$lib/components/Icons/Plus.svelte';
  import Journal from '$lib/components/Icons/Journal.svelte';
  import Graph from '$lib/components/Icons/Graph.svelte';
  import Account from '$lib/components/Icons/Account.svelte';
  import { onMount } from 'svelte';
  import { redirect } from '@sveltejs/kit';
  import { fail } from '@sveltejs/kit';
  import type { ToastSettings } from '@skeletonlabs/skeleton';	
  
  export let data;
  let currentTile = 0;
  
  let { supabase, session } = data;
  $: ({ supabase, session } = data);
  
  onMount(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        console.log('Invalidating session');
        invalidate('supabase:auth');
      }
    });
  
    return () => subscription.unsubscribe();
  });
  
  $: console.log('Session: ', data.session);
  
  const handleSignOut = async () => {
    const {error} = await supabase.auth.signOut();
    
    if (error) {
      return fail(401, { message: 'Server error. Try again later.', success: false, })
    }
    toastStore.trigger(signoutToast);
    throw redirect(307, '/');
  };
  
  const signoutToast: ToastSettings = {
  message: 'Sign out succesfull!',
  timeout: 3000,
  background: 'variant-glass-primary'
  };
</script>


<AppShell>
  <svelte:fragment slot="header"
  ><AppBar slotDefault="flex items-center" slotLead="">
    <svelte:fragment slot="lead">
      <div class="w-full flex gap-x-3 items-center ml-2">
        <div class="w-8 h-8 rounded-lg bg-primary-500" />
        <a href="/dashboard" class="text-2xl font font-semibold text-white">Code Journal</a>
      </div>
    </svelte:fragment>
    <svelte:fragment slot="trail">
      <Avatar
      initials="ES"
        border="border-4 border-surface-300-600-token hover:!border-primary-500 transition duration-200"
        cursor="cursor-pointer"
      />
    </svelte:fragment>
  </AppBar></svelte:fragment
>
	<svelte:fragment slot="sidebarLeft">
    <AppRail width="w-72" height="h-full">
      <svelte:fragment slot="lead">
        <div class="w-full h-auto flex flex-col gap-y-2 items-center justify-center mt-10">
          <a href="/dashboard" class="btn variant-soft-primary w-[85%] flex items-center justify-start gap-x-3 text-white"><Home />Home</a>
          <a href="/dashboard/journal" class="btn variant-soft-primary w-[85%] flex items-center justify-start gap-x-3 text-white"><Journal />Journal</a>
          <a href="/dashboard" class="btn variant-soft-primary w-[85%] flex items-center justify-start gap-x-3 text-white"><Graph />Statistics</a>
          <a href="/dashboard" class="btn variant-soft-primary w-[85%] flex items-center justify-start gap-x-3 text-white"><Account />Account</a>
        </div>
      </svelte:fragment>
      <!-- --- -->
      <!-- --- -->
      <svelte:fragment slot="trail">
        <div class="w-full h-auto flex flex-col gap-y-2 items-center justify-center mb-5">
          <a href="/dashboard" class="btn variant-soft-primary w-[85%] flex items-center justify-center gap-x-3 text-white"><Plus /></a>
        </div>
      </svelte:fragment>
    </AppRail>
    </svelte:fragment>
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	<!-- (footer) -->
</AppShell>