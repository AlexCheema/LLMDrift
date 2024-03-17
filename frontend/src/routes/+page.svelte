<script>
    import AccuracyTracker from '../components/AccuracyTracker.svelte';
    import BenchmarkViewer from '../components/BenchmarkViewer.svelte';
</script>

<style>
    h1 {
        color: #333;
        text-align: center;
        font-size: 2em;
        margin-bottom: 20px;
    }

    p {
        font-size: 1.2em;
        text-align: center;
        margin-bottom: 40px;
    }

    a {
        color: #1a0dab;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }
</style>

<h1>LLM Drift</h1>
<p>Read the <a href="https://arxiv.org/pdf/2307.09009.pdf">paper</a></p>
<AccuracyTracker />
<BenchmarkViewer />
