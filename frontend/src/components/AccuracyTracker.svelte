<script>
    import { onMount, onDestroy } from 'svelte';

    import { LayerCake, Svg, Html, Canvas } from 'layercake';
    import AxisX from './layercake/AxisX.svelte';
    import AxisY from './layercake/AxisY.svelte';
    import Line from './layercake/Line.svelte';
    import Scatter from './layercake/Scatter.svg.svelte';

    let clusterOption = 'minute';
    let benchmarkGroupsData = [];
  
    onMount(async () => {
      const response = await fetch(import.meta.env.VITE_BENCHMARK_GROUPS_URL);
      const responseData = await response.json();
      benchmarkGroupsData = responseData.map(group => {
        let accuraciesByCluster = calculateAccuracies(group, clusterOption);
        let chartData = accuraciesByCluster.map(({ key, accuracy, timestamp }) => ({
          x: timestamp,
          y: accuracy,
          label: key
        }));
        return { groupName: group.name, groupDescription: group.description, chartData };
      });
    });

    function calculateAccuracies(benchmarkGroup, clusterBy) {
      const runsByCluster = benchmarkGroup.results.runs.reduce((acc, run) => {
        const timestamp = parseInt(run.blockTimestamp) * 1000;
        const date = new Date(timestamp);
        let key;
        switch (clusterBy) {
          case 'minute':
            key = `${date.toDateString()} ${date.getHours()}:${date.getMinutes()}`;
            break;
          case 'hour':
            key = `${date.toDateString()} ${date.getHours()}`;
            break;
          case 'day':
          default:
            key = date.toDateString();
            break;
        }
        if (!acc[key]) {
          acc[key] = { scoreSum: 0, runCount: 0, timestamp };
        }
        acc[key].scoreSum += parseInt(run.score);
        acc[key].runCount += 1;
        return acc;
      }, {});
  
      return Object.entries(runsByCluster).map(([key, { scoreSum, runCount, timestamp }]) => ({
        key,
        accuracy: scoreSum / runCount,
        totalRuns: runCount,
        timestamp
      }));
    }
  </script>
  
  <style>
    .chart-container {
      width: 100%;
      height: 500px;
    }

    main {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9f9;
      border-radius: 5px;
      box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
    }
    h1 {
      color: #333;
      text-align: center;
    }
    select {
      width: 100%;
      padding: 10px;
      margin-bottom: 20px;
      font-size: 16px;
    }
  </style>
  
  <main>
    <h1>How has ChatGPT Changed?</h1>
    <select bind:value={clusterOption}>
      <option value="day">Day</option>
      <option value="hour">Hour</option>
      <option value="minute">Minute</option>
    </select>
    {#each benchmarkGroupsData as { groupName, groupDescription, chartData }}
      <h2>{groupName}</h2>
      <h3>{groupDescription}</h3>
      <div class="chart-container">
          <LayerCake
            x='x'
            y='y'
            data={chartData}
          >
            <Svg>
              <AxisX format={(d) => new Date(d).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}/> 
              <AxisY/>
              <Line stroke='#f0c'/>
            </Svg>
        
            <Svg>
              <Scatter stroke='#0fc'/>
            </Svg>
          </LayerCake>
        </div>
    {/each}
  </main>
