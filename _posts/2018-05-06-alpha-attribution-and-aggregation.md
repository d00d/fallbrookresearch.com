---
layout: post
title: Attribution & Aggregation
comments: true
published: true
---

## Quantative Trade Strategies

Algorithmic Trading is a technique of deploying algorithms that automatically buy and sell stocks in response to market data. 

## The alpha idea
At fallbrook we work the full lifecycle srom the first step in developing a trading algorithm is coming up with an "alpha idea" to iterating its implementation.

**_What is alpha?_**

Basically, the return of a portfolio can be written as:

> _r = beta \* rm + alpha_

Where beta measures the correlation of the portfolio return to the overall market return (r\_ \_m), and alpha is the excess return. 

1. For instance, an index fund has alpha=0, beta=1. But, what I am really after is a positive non-zero alpha, which would indicate that my algorithm is doing better than the market, and at the same time beta=0, i.e. I want my algorithm to be independent form the market, "market-neutral".


![alt text](/assets/img/mountains.jpg "Logo Title Text 1")

To get started, I want to try the following alpha idea: Companies with a high revenue growth are doing well, and I want to invest in them. Companies with low revenue growth are doing poorly, and I want to short them.


> •   Backtest on a larger timeframe.
	• Try adding more alpha factors.
	• Analyze alpha factor correlations.
	• Weight distribution: how to optimally weigh the factors? (this is currently one of the fields of active research, and a field where Machine Learning could help.)
	• Optimize trading behavior, e.g. the trading quantiles.
	• Analyze sector exposure.
	• etc.

## Summary
To summarize, the algorithmic trading workflow is this:
	1.  come up with an "alpha idea"
	2.  estimate alpha using alphalens
	3.  run full backtest on past market data
	4.  analyze the backtest using pyfolio
