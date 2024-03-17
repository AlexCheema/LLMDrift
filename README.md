# LLM Drift

Based on the following [paper](https://arxiv.org/pdf/2307.09009.pdf).

## Problem

The problem we're addressing is LLMs like ChatGPT changing unexpectedly with zero transparency.

The nature of these changes depend on the task you are doing. This results in breaking changes to applications in ways that are hard to plan for. This is frustrating, time consuming and costly for application developers.

<img width="1069" alt="The nature of LLM Drift" src="https://github.com/AlexCheema/LLMDrift/assets/41707476/92177932-c4e9-42ba-abc0-ac77da2647bc">

# Current Solutions

Current solutions like HuggingFace's OpenLLM leaderboard don't keep a history and require you to trust HuggingFace since they are the ones running the benchmarks and publishing the results

# Solution

We solve this by using Galadriel which leverages teeML to trustlessly query ChatGPT and other AI models. We have written a generic framework for writing benchmarks based on Galadriel.

Based on this new framework, it's very easy to add new benchmarks and they will automatically be applied to all the LLMs being tracked. For example, I managed to write a new benchmark in just 5 minutes for counting happy numbers.

# Future

Mixture-of-expert models seem to be where the world is headed, where there are several models working together to achieve the best result. Different models are suited to different tasks, for example there may be a model that is better at mathematics. LLM Drift can be intelligent middleware that automatically routes user's requests to the best performing model based on their query. This can be integrated into LLM Routers like Openrouter (started by Alex Atallah).

