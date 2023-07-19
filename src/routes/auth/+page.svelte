<!-- // src/routes/auth/+page.svelte -->
<script lang="ts">
	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	let email: string = '';
	let password: string = '';

	const handleSignUp = async () => {
		await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${location.origin}/auth/callback`
			}
		});

		console.log('User signed up!');
	};

	const handleSignIn = async () => {
		await supabase.auth.signInWithPassword({
			email,
			password
		});
	};

	const handleSignOut = async () => {
		await supabase.auth.signOut();
	};
</script>

<form on:submit={handleSignUp}>
	<input class="input p-2 rounded-lg" name="email" bind:value={email} />
	<input class="input p-2 rounded-lg" type="password" name="password" bind:value={password} />
	<button class="btn">Sign up</button>
</form>

<button class="btn" on:click={handleSignIn}>Sign in</button>
<button class="btn" on:click={handleSignOut}>Sign out</button>
