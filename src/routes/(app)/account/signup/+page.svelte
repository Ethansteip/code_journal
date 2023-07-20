<script lang="ts">
	import { enhance } from '$app/forms';
	import Google from '$lib/components/Icons/Google.svelte';
	import Github from '$lib/components/Icons/Github.svelte';
	import Loading from '$lib/components/global/Loading.svelte';
	import Mail from '$lib/components/Icons/Mail.svelte';
	import Lock from '$lib/components/Icons/Lock.svelte';
	import { Toast, toastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';

	export let form;
	let emailFocused: boolean = false;
	let passwordFocused: boolean = false;
	let loading: boolean = false;
	let password = '';

	$: if (form?.success) {
		loading = false;
		toastStore.trigger(successToast);
	} else if (form?.success === false){
		loading = false;
		password = '';
		toastStore.trigger(errorToast);
	}

	$: console.log("Form: ", form);

	const successToast: ToastSettings = {
	message: 'Please check your email for a magic link to login!',
	autohide: false,
	background: 'variant-glass-primary'
	};
	const errorToast: ToastSettings = {
	message: 'Sorry, something went wrong - please try again',
	autohide: false,
	background: 'variant-glass-error'
	};
</script>

<section class="w-screen h-full flex-1 sm:flex-row">
	<div class="w-full sm:w-1/2 h-full bg-surface-800 flex flex-col items-center justify-center">
		<div class="w-1/2 flex flex-col gap-y-1 items-start">
			<h1 class="flex justify-start text-4xl text-white font-semibold">Create an account</h1>
			<p class="text-surface-400 text-sm ml-1">Get started on your coding journey today!</p>
		</div>
		<div class="w-1/2 flex gap-x-3 my-6">
			<button class="text-white w-1/2 py-3 btn variant-ringed-primary flex gap-x-3"
				><Google />Google</button
			>
			<button class="text-white w-1/2 py-3 btn variant-ringed-primary flex gap-x-3"
				><Github />Github</button
			>
		</div>
		<div class="w-1/2 flex items-center justify-around mt-2 mb-4">
			<hr class="w-1/4">
			<p class="text-xs text-white">Or continue with email</p>
			<hr class="w-1/4">
		</div>
		<form
			method="POST"
			use:enhance
			on:submit|preventDefault={() => (loading = true)}
			class="w-1/2 flex flex-col gap-y-2"
		>
		<label for="email" class="label text-white">Email</label>
			<div class="input py-3 px-3 flex gap-y-2">
				<Mail {emailFocused}/>
				<input
				  on:focus={() => emailFocused = true}
				  on:blur={() => emailFocused = false}
					name="email"
					class="bg-transparent outline-none px-3 w-full text-white"
					type="email"
					placeholder=""
					value={form?.email ?? ''}
					required
				/>
			</div>
			<label for="password" class="label text-white">Password</label>
			<div class="input py-3 px-3 flex gap-y-2">
				<Lock {passwordFocused}/>
				<input
				  on:focus={() => passwordFocused = true}
				  on:blur={() => passwordFocused = false}
					name="password"
					class="bg-transparent outline-none px-3 w-full text-white"
					type="password"
					placeholder=""
					bind:value={password}
					required
				/>
			</div>
			<button type="submit" class="btn variant-filled-primary mt-2">
				{#if loading}
					<Loading />
				{:else}
					Submit
				{/if}</button
			>
		</form>
		<div class="w-1/2 flex justify-center items-center mt-5">
			<p class="text-sm text-white">Already have an account? <span class="text-primary-400"><a href="/account/signin">Sign In</a></span></p>
		</div>
	</div>
</section>

<style>
input:-webkit-autofill,
input:-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s;
}

</style>
