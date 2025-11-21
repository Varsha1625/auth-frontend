<script lang="ts">
 import { onMount } from 'svelte';

  let email = '';
  let password = '';

  // Password policy tracking
  let policy = {
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  };

  // Type-safe password check
  function checkPassword(pw: string) {
    policy.length = pw.length >= 8;
    policy.uppercase = /[A-Z]/.test(pw);
    policy.lowercase = /[a-z]/.test(pw);
    policy.number = /[0-9]/.test(pw);
    policy.special = /[!@#$%^&*(),.?":{}|<>]/.test(pw);
  }

  // Signup function (basic example)
  async function signup() {
    try {
      const res = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) throw new Error('Signup failed');
      alert('Signup successful!');
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
        alert(err.message);
      } else {
        console.error('Unknown error', err);
      }
    }
  }
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-gray-50">
  <div class="w-80 p-6 bg-white shadow-lg rounded-xl">
    <input
      type="email"
      placeholder="Email"
      bind:value={email}
      class="w-full mb-3 p-2 border rounded"
    />

    <input
      type="password"
      placeholder="Password"
      bind:value={password}
      on:input={(e: Event) => {
        const target = e.target as HTMLInputElement;
        checkPassword(target.value);
      }}
      class="w-full mb-3 p-2 border rounded"
    />

    <ul class="text-sm mb-4">
      <li class={policy.length ? 'text-green-600' : 'text-red-500'}>
        At least 8 characters
      </li>
      <li class={policy.uppercase ? 'text-green-600' : 'text-red-500'}>
        One uppercase letter
      </li>
      <li class={policy.lowercase ? 'text-green-600' : 'text-red-500'}>
        One lowercase letter
      </li>
      <li class={policy.number ? 'text-green-600' : 'text-red-500'}>
        One number
      </li>
      <li class={policy.special ? 'text-green-600' : 'text-red-500'}>
        One special character
      </li>
    </ul>

    <button
      class="w-full bg-green-500 text-white p-2 rounded disabled:opacity-50"
      on:click={signup}
      disabled={!Object.values(policy).every(Boolean)}
    >
      Sign Up
    </button>
  </div>
</div>
