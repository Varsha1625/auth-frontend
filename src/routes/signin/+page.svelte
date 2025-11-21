<script lang="ts">
  import axios from 'axios';

  let email = '';
  let password = '';

  async function handleLogin() {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password
      });
      console.log('Success:', response.data);
    } catch (error: any) {
      // Older axios doesn’t have isAxiosError, so check manually
      if (error.response) {
        console.error('Axios error:', error.response.data || error.message);
      } else {
        console.error('Unknown error:', error);
      }
    }
  }
</script>

<form on:submit|preventDefault={handleLogin}>
  <input type="email" bind:value={email} placeholder="Email" required />
  <input type="password" bind:value={password} placeholder="Password" required />
  <button type="submit">Login</button>
</form>
