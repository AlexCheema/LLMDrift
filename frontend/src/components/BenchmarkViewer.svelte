<script>
    import { onMount } from 'svelte';

    let recentRunsData = [];
  
    onMount(async () => {
      const response = await fetch('http://localhost:3000/benchmarkGroups');
      const responseData = await response.json();
      recentRunsData = responseData.map(group => {
        let recentRuns = group.results.runs.map(({ prompt, response, blockTimestamp, score }) => ({
          prompt,
          response,
          blockTimestamp: new Date(parseInt(blockTimestamp) * 1000),
          blockTimestampString: new Date(parseInt(blockTimestamp) * 1000).toLocaleString(),
          score,
          scoreColor: score === 100 ? 'green' : score === 0 ? 'red' : 'grey'
        }));
        // Sort runs by date in descending order
        recentRuns.sort((a, b) => b.blockTimestamp - a.blockTimestamp);
        return { groupName: group.name, groupDescription: group.description, recentRuns };
      });
    });
</script>

<style>
    main {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9f9;
      border-radius: 5px;
      box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
    }
    h1 {
      color: #333;
      text-align: center;
      font-size: 2em;
      margin-bottom: 20px;
    }
    .run-container {
      border: 1px solid #ddd;
      padding: 20px;
      margin-bottom: 20px;
      border-radius: 5px;
      box-shadow: 0px 0px 5px rgba(0,0,0,0.1);
    }
    .run-container h2 {
      margin: 0;
      font-size: 1.5em;
      color: #333;
    }
    .run-container p {
      margin: 0;
      font-size: 1.2em;
      color: #666;
    }
    .score {
      font-weight: bold;
    }
</style>

<main>
    <h1>Recent Benchmark Runs</h1>
    {#each recentRunsData as { groupName, groupDescription, recentRuns }}
      <h2>{groupName}</h2>
      <h3>{groupDescription}</h3>
      {#each recentRuns as { prompt, response, blockTimestampString, score, scoreColor }}
        <div class="run-container">
          <h2>Prompt: {prompt}</h2>
          <p>Response: {response}</p>
          <p>Timestamp: {blockTimestampString}</p>
          <p class="score" style="color: {scoreColor};">Score: {score}</p>
        </div>
      {/each}
    {/each}
</main>
