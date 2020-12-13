<script>
    import { useQuery } from './query'

    const result = useQuery('repoData', () => {
        return fetch('https://api.github.com/repos/tannerlinsley/react-query')
        .then(res => res.json())
    });

    $: ({ isLoading, data, error, refetch, isFetching } = $result);
</script>

<div id="app">
{#if isLoading}
    <div>Loading...</div>
{:else if error}
    <div>An error has occurred: { error.message }</div>
{:else}
    <h1>{data.name} with Svelte</h1>
    <p>{data.description}</p>
    <strong>👀 {data.subscribers_count}</strong>
    <strong>✨ {data.stargazers_count}</strong>
    <strong>🍴 {data.forks_count}</strong>
    <div style="margin-top: 1.5rem;">
      <button on:click={refetch} disabled={isFetching}>{ isFetching ? 'Refetching...' : 'Refetch' }</button>
    </div>
{/if}
</div>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>