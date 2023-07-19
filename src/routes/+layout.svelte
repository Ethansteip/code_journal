<script lang="ts">
	// Your custom Skeleton theme:
	import '../theme.postcss';

	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/skeleton.css';

	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.postcss';
	import { AppShell, AppBar, Toast, toastStore } from '@skeletonlabs/skeleton';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { redirect } from '@sveltejs/kit';
	import { fail } from '@sveltejs/kit';
	import type { ToastSettings } from '@skeletonlabs/skeleton';	

	export let data;

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
		toastStore.trigger(signoutToast);
		
		if (error) {
      return fail(401, { message: 'Server error. Try again later.', success: false, })
    }
		throw redirect(307, '/');
	};

	const signoutToast: ToastSettings = {
	message: 'Sign out succesfull!',
	timeout: 3000,
	background: 'variant-glass-primary'
	};
</script>

<Toast />

<AppShell class="">
	<svelte:fragment slot="header"
		><AppBar slotDefault="flex items-center" slotLead="">
			<svelte:fragment slot="lead">
				<div class="w-full flex gap-x-3 items-center">
					<div class="w-8 h-8 rounded-lg bg-primary-500" />
					<a href="/" class="text-2xl font font-semibold text-white">Code Journal</a>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				{#if data.session}
				<button on:click={handleSignOut} class="text-white w-full py-3 btn variant-ringed-primary gap-x-3">Sign out</button>
				{:else}
				<a href="/account/signup" class="text-white w-1/2 py-3 btn variant-ringed-primary gap-x-3">Sign Up</a>
				<a href="/account/signin" class="text-white w-1/2 py-3 btn variant-ringed-primary gap-x-3">Sign In</a>
				{/if}
			</svelte:fragment>
		</AppBar></svelte:fragment
	>
	<!-- (sidebarLeft) -->
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	<svelte:fragment slot="footer">Footer</svelte:fragment>
</AppShell>
