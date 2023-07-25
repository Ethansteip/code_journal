<script lang="ts">
	import Loading from '$lib/components/global/Loading.svelte';
	import Mail from '$lib/components/Icons/Mail.svelte';
  import User from '$lib/components/Icons/User.svelte';
	import { Toast, toastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';

  import { enhance, type SubmitFunction } from '$app/forms'

	export let data;
	//export let form;

	let { session, supabase, profile, email } = data
	$: ({ session, supabase, profile, email } = data)

  // console.log("Profile: ", profile);
  // console.log("Email: ", email);

  let userEmail: string = email ?? '';
  let firstName: string = profile?.first_name ?? '';
  let lastName: string = profile?.last_name ?? '';
  let userName: string = profile?.username ?? '';
	let loading: boolean = false;
</script>

<section class="w-full h-full flex-1 sm:flex-row">
	<div class="w-full h-full bg-surface-800 flex flex-col  items-center justify-center">
		<div class="w-1/2 flex flex-col gap-y-1 items-start mb-5">
			<h1 class="flex justify-start text-4xl text-white font-semibold">Account Information</h1>
		</div>
		<form
			method="POST"
			use:enhance
			on:submit|preventDefault={() => (loading = true)}
			class="w-1/2 flex flex-col gap-y-2"
		>
    <label for="email" class="label text-white">Email</label>
			<div class="input py-3 px-3 flex gap-y-2">
				<input
					name="email"
					class="bg-transparent outline-none px-3 w-full text-gray-500"
					type="email"
					placeholder="Email"
					value={userEmail}
					disabled
				/>
			</div>
    <label for="firstname" class="label text-white">First Name</label>
			<div class="input py-3 px-3 flex gap-y-2">
				<input
					name="firstname"
					class="bg-transparent outline-none px-3 w-full text-white"
					type="text"
					placeholder="First Name"
					value={firstName}
				/>
			</div>
      <label for="lastname" class="label text-white">Last Name</label>
			<div class="input py-3 px-3 flex gap-y-2">
				<input
					name="lastname"
					class="bg-transparent outline-none px-3 w-full text-white"
					type="text"
					placeholder="Last Name"
					value={lastName}
				/>
			</div>

			<label for="username" class="label text-white">Username</label>
			<div class="input py-3 px-3 flex gap-y-2">
				<input
					name="username"
					class="bg-transparent outline-none px-3 w-full text-white"
					type="text"
					placeholder="Create a username"
          value={userName}
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
		<div class="w-1/2 flex items-center justify-around mt-10 mb-4">
			<hr class="w-full">
		</div>
    <form action="?/signout" method="POST" class="w-full flex justify-center items-center">
    <button type="submit" class="btn variant-filled-error mt-2 w-1/2">Sign Out</button>
  </form>
	</div>
</section>

<style>
input:-webkit-autofill,
input:-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s;
}

</style>
